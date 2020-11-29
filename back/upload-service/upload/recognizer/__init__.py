from typing import Optional
from upload.schemas.recognized_file import RecognizedFile, RecognizedFileWithChekResult
from abc import ABC, abstractmethod


class IRecognizer(ABC):
    """ Интерфейс класс опознавателя """

    @abstractmethod
    def recognize(self, file_path: str) -> Optional[RecognizedFile]:
        """ Распознаем файл, получая его полную схему """
        raise NotImplementedError

    @abstractmethod
    def check_licence(self, file: RecognizedFile) -> RecognizedFileWithChekResult:
        """ Определяем лицензию на использование файла """
        raise NotImplementedError
