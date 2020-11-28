from enum import Enum

from pydantic import BaseModel


class TokenCookies(Enum):
    """ Перечисление с ключами для кук """

    ACCESS_TOKEN = "access_token"
    REFRESH_TOKEN = "refresh_token"


class Token(BaseModel):
    """ Схема токена """

    id: int
    access_token: str
    refresh_token: str
    token_type: str


class TokenValid(BaseModel):
    """Схема ответа при валидном токене"""

    status: bool
