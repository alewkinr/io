from abc import ABC
from upload.core.errors import FileRecognitionErr
from . import IRecognizer
from upload.schemas.recognized_file import RecognizedFile, RecognizedFileWithChekResult
from typing import BinaryIO, Optional
from upload.utils.audd_tools import fetch_from_audd
from upload.utils.license_supervisor_tools import get_license_status
from upload.models.files import FileResultEnum


class AuddRecognizer(IRecognizer, ABC):
    """ Распознователь музыки через сервис audd.io """

    def get_file_from_disk(self, des_path: str) -> BinaryIO:
        """ Читаем айдиозапись из файла """
        _file = open(des_path, "rb")
        _file.close()
        return _file

    def recognize(self, file: BinaryIO) -> Optional[RecognizedFile]:
        """ Отправляем файл в систему распознования """
        try:
            _data = fetch_from_audd(file=file)
            if _data is None:
                return None
        except Exception as err:
            raise FileRecognitionErr(err=err)

        return RecognizedFile(**_data)

    def check_licence(self, file: RecognizedFile) -> RecognizedFileWithChekResult:
        _author, _track_name = file.artist, file.title
        license_status = get_license_status(author=_author, tack_name=_track_name)
        if license_status is None:
            return RecognizedFileWithChekResult(
                **file.dict(), result=FileResultEnum(FileResultEnum.allowed)
            )

        return RecognizedFileWithChekResult(
            **file.dict(), result=FileResultEnum(FileResultEnum.restricted)
        )
