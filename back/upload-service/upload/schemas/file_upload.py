from fastapi import UploadFile
from pydantic import BaseModel
from upload.models.files import FileResultEnum, FileStatusEnum
from typing import Optional


class FileUpload(BaseModel):
    """ Схема данных для файлов """

    user_id: int
    type: str
    file: UploadFile


class FileUploadInDB(BaseModel):
    """ Файл в БД """

    user_id: int
    type: str
    saved_file_path: str  # FilePath is not properly parsing


class FileStatus(BaseModel):
    """ Статус файла без лишней информации """

    id: int
    status: FileStatusEnum
    result: Optional[FileResultEnum] = None
