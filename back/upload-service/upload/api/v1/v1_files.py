import logging
from typing import Any, Optional

from sqlalchemy.orm import Session

from fastapi import APIRouter, Depends, File, Form, UploadFile, BackgroundTasks
from upload.api import deps
from upload.core.errors import BadRequestErr, InternalServerErr
from upload.crud import crud_files
from upload.schemas import file_upload
from upload.worker.worker import fingerprint_file
from upload.recognizer.audd import AuddRecognizer

router = APIRouter()
logging.basicConfig(level=logging.ERROR)
logger = logging.getLogger(__name__)


@router.post("/", response_model=file_upload.FileStatus)
async def upload_file(
    bgt: BackgroundTasks,
    rec: AuddRecognizer = Depends(deps.get_recognizer),
    db: Session = Depends(deps.get_db),
    _id: int = Form(...),
    user_id: int = Form(...),
    _type: str = Form(...),
    file: UploadFile = File(...),
) -> Any:
    """ Загружаем файл на сервер """
    try:
        _file = crud_files.file.upload(
            db=db,
            _file=file_upload.FileUpload(
                user_id=user_id,
                type=_type,
                file=file,
            ),
        )

        # отправляем асинхронный запрос в celery
        bgt.add_task(fingerprint_file, rec=rec, db=db, _id=_file.id)
        # fingerprint_file(rec=rec, db=db, _id=_file.id)
        return file_upload.FileStatus(
            id=_file.id, status=_file.status, result=_file.result
        )
    except Exception as err:
        return InternalServerErr(f"error to upload file, {err}")


@router.get("/status", response_model=file_upload.FileStatus)
async def get_file_status(
    _id: Optional[int],
    db: Session = Depends(deps.get_db),
) -> Any:
    """ Получаем статус файла по его ID """
    if not _id:
        return BadRequestErr("unable to check undefined file")
    try:

        status_file = crud_files.file.find_status_by_id(db=db, _id=_id)
        return file_upload.FileStatus(
            id=status_file.id, status=status_file.status, result=status_file.result
        )
    except Exception as err:
        logger.error(f"error to find file by status id: {err}")
        return InternalServerErr("unable to upload file")
