from typing import Optional
from upload.schemas.recognized_file import RecognizedFile, RecognizedFileWithChekResult
from abc import ABC, abstractmethod
from typing import BinaryIO


class IRecognizer(ABC):
    """ Интерфейс класс опознавателя """

    @abstractmethod
    def get_file_from_disk(self, des_path: str) -> BinaryIO:
        """ Достаем файл с диска """
        raise NotImplementedError

    @abstractmethod
    def recognize(self, file: BinaryIO) -> Optional[RecognizedFile]:
        """ Распознаем файл, получая его полную схему """
        raise NotImplementedError

    @abstractmethod
    def check_licence(self, file: RecognizedFile) -> RecognizedFileWithStatus:
        """ Определяем лицензию на использование файла """
        raise NotImplementedError
