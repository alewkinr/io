import logging
from typing import Any

from fastapi import HTTPException, status

logging.basicConfig(level=logging.ERROR)
logger = logging.getLogger(__name__)


class InternalServerErr(HTTPException):
    """ Ошибка работы сервера """

    def __init__(self, detail: Any = None) -> None:
        logger.error(f"internal server error: {detail}")
        super().__init__(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=detail,
            headers=None,
        )
        pass


class BadRequestErr(HTTPException):
    """ Ошибка входных параметров сервера """

    def __init__(self, detail: Any = None) -> None:
        super().__init__(
            status_code=status.HTTP_400_BAD_REQUEST, detail=detail, headers=None
        )
        pass


class SaveFileException(Exception):
    """ Ошибка сохранения файла"""

    def __init__(self, err: Exception) -> None:
        logger.error(f"error to save file: {err}")
        super().__init__(err)
        pass


class DownloadNotFoundFileErr(Exception):
    """ Ошибка скачивания файла, похожа на 404"""

    def __init__(self, err: str) -> None:
        super().__init__(err)
        pass


class FileRecognitionErr(Exception):
    """ Ошибка опознования файла"""

    def __init__(self, err: Exception) -> None:
        logger.error(f"error to recognize file: {err}")
        super().__init__(err)
        pass
