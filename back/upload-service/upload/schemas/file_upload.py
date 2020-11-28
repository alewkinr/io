from pydantic import BaseModel
from upload.models.files import FileResultEnum, FileStatusEnum


class FileUpload(BaseModel):
    """ Схема данных для файлов """

    user_id: int
    type: str
    file: bytes


class FileFromDB(FileUpload):
    """ Файл в БД """

    id: int


class FileStatus(BaseModel):
    """ Статус файла без лишней информации """

    id: int
    status: FileStatusEnum
    result: FileResultEnum
