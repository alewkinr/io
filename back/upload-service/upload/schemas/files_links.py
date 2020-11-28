from pydantic import BaseModel, HttpUrl


class FileLinks(BaseModel):
    """ Схема данных файла загруженного по ссылке """

    user_id: int
    type: str
    link: HttpUrl


class FileLinksUploadInDB(BaseModel):
    """ Файл в БД """

    user_id: int
    type: str
    download_url: HttpUrl
    saved_file_path: str
