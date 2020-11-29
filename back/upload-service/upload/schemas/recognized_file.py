from pydantic import BaseModel, HttpUrl
from upload.models.files import FileResultEnum


class FileToRecognize(BaseModel):
    id: int
    saved_file_path: str


class RecognizedFile(BaseModel):
    """ Отгаданный провайдером-проверки файл """

    artist: str
    title: str
    song_link: HttpUrl


class RecognizedFileWithChekResult(RecognizedFile):
    """ Отгаданный провайдером-проверки файл """

    result: FileResultEnum


class RecognizedFileWithChekResultID(RecognizedFileWithChekResult):
    """ Файл на проверку с нужной инфой """

    id: int
