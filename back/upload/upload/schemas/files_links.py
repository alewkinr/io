from pydantic import BaseModel, HttpUrl


class FileLinks(BaseModel):
    """ Схема данных файла загруженного по ссылке """

    user_id: int
    type: str
    link: HttpUrl
    file: bytes


class FileLinksFromDB(FileLinks):
    """ Файл в БД """

    id: int
