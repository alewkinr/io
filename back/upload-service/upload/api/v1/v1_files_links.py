import logging
from typing import Any

from sqlalchemy.orm import Session

from fastapi import APIRouter, Depends, Form
from pydantic import HttpUrl
from upload.api import deps
from upload.core.errors import InternalServerErr
from upload.crud import crud_files_links
from upload.schemas import files_links, file_upload

router = APIRouter()
logging.basicConfig(level=logging.ERROR)
logger = logging.getLogger(__name__)


@router.post("/", response_model=file_upload.FileStatus)
async def upload_file_by_link(
    db: Session = Depends(deps.get_db),
    _id: int = Form(...),
    user_id: int = Form(...),
    _type: str = Form(...),
    link: HttpUrl = Form(...),
) -> Any:
    """ Загружаем файл на сервер """
    try:
        _file = crud_files_links.file_link.upload(
            db=db,
            file=files_links.FileLinks(user_id=user_id, type=_type, link=link),
        )

        return file_upload.FileStatus(id=_file.id, status=_file.status)

    except Exception as err:
        logger.error(f"error to upload file with link: {err}")
        return InternalServerErr("error to upload file")
