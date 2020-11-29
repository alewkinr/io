from abc import ABC
from typing import Optional

from upload.core.errors import FileRecognitionErr
from upload.models.files import FileResultEnum
from upload.schemas.recognized_file import (RecognizedFile,
                                            RecognizedFileWithChekResult)
from upload.utils.audd_tools import fetch_from_audd
from upload.utils.license_supervisor_tools import get_license_status

from . import IRecognizer


class AuddRecognizer(IRecognizer, ABC):
    """ Распознователь музыки через сервис audd.io """

    def recognize(self, file_path: str) -> Optional[RecognizedFile]:
        """ Отправляем файл в систему распознования """
        try:
            _data = fetch_from_audd(file_path=file_path)
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
