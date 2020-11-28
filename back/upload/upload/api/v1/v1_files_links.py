import logging
from typing import Any

from sqlalchemy.orm import Session

from fastapi import APIRouter, Depends, File, Form, UploadFile
from pydantic import HttpUrl
from upload.api import deps
from upload.core.errors import BadRequestErr, InternalServerErr
from upload.crud import crud_files_links
from upload.schemas import files_links

router = APIRouter()
logging.basicConfig(level=logging.ERROR)
logger = logging.getLogger(__name__)


@router.post("/", response_model=files_links.FileLinksFromDB)
async def upload_file_by_link(
    db: Session = Depends(deps.get_db),
    _id: int = Form(...),
    user_id: int = Form(...),
    _type: str = Form(...),
    link: HttpUrl = Form(...),
    file: UploadFile = File(...),
) -> Any:
    """ Загружаем файл на сервер """
    try:
        content = await file.read()
        _file = crud_files_links.file_link.upload(
            db=db,
            file=files_links.FileLinks(
                user_id=user_id,
                type=_type,
                link=link,
                file=content,
            ),
        )

        return files_links.FileLinksFromDB(
            id=_file.id,
            user_id=_file.user_id,
            type=_file.type,
            link=_file.link,
            file=_file.file,
        )
    except Exception as err:
        logger.error(f"error to upload file with link: {err}")
        return InternalServerErr("error to upload file")
