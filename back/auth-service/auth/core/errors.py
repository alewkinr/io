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


class NotAuthorizedErr(HTTPException):
    """ Ответ с ошибкой авторизации пользователя """

    def __init__(self) -> None:
        super().__init__(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="unauthorized request"
        )
        pass
