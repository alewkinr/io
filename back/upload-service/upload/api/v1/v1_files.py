import logging
from typing import Any, Optional

from sqlalchemy.orm import Session

from fastapi import APIRouter, Depends, File, Form, UploadFile
from upload.api import deps
from upload.core.errors import BadRequestErr, InternalServerErr
from upload.crud import crud_files
from upload.schemas import file_upload

router = APIRouter()
logging.basicConfig(level=logging.ERROR)
logger = logging.getLogger(__name__)


@router.post("/", response_model=file_upload.FileFromDB)
async def upload_file(
    db: Session = Depends(deps.get_db),
    _id: int = Form(...),
    user_id: int = Form(...),
    _type: str = Form(...),
    file: UploadFile = File(...),
) -> Any:
    """ Загружаем файл на сервер """
    try:
        content = await file.read()
        _file = crud_files.file.upload(
            db=db,
            file=file_upload.FileUpload(
                user_id=user_id,
                type=_type,
                file=content,
            ),
        )

        return file_upload.FileFromDB(
            id=_file.id, user_id=_file.user_id, type=_file.type, file=_file.file
        )
    except Exception as err:
        logger.error(f"error to upload file {err}")
        return InternalServerErr("error to upload file")


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