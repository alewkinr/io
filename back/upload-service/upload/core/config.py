import secrets
from os import path, getenv
from typing import Any, Dict, List, Optional, Union

from pydantic import (
    AnyHttpUrl,
    BaseSettings,
    DirectoryPath,
    HttpUrl,
    PostgresDsn,
    validator,
)


class Settings(BaseSettings):
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = secrets.token_urlsafe(32)
    SERVER_NAME: str
    SERVER_HOST: AnyHttpUrl
    SERVER_PORT: int = 8080

    LICENCE_SUPERVISOR_BASE_URL: str

    STATIC_FILES_DIR: DirectoryPath

    @validator("STATIC_FILES_DIR", pre=True)
    def static_directory_exists(cls, v: DirectoryPath):
        # todo: debugging setting

        if not bool(getenv("IS_DOCKER")):
            return path.abspath(f"{path.pardir}/../upload-service/static")

        _path_from_project_source = f"{path.pardir}/{v}"
        _is_exists = path.exists(_path_from_project_source)
        _is_dir = path.isdir(_path_from_project_source)
        if _is_exists and _is_dir:
            return _path_from_project_source
        return ValueError("set STATIC_FILES_DIR variable")

    RABBIT_MQ_DSN: str

    BACKEND_CORS_ORIGINS: List[AnyHttpUrl] = []

    @validator("BACKEND_CORS_ORIGINS", pre=True)
    def assemble_cors_origins(cls, v: Union[str, List[str]]) -> Union[List[str], str]:
        if isinstance(v, str) and not v.startswith("["):
            return [i.strip() for i in v.split(",")]
        elif isinstance(v, (list, str)):
            return v
        raise ValueError(v)

    PROJECT_NAME: str

    SENTRY_DSN: Optional[HttpUrl] = None

    @validator("SENTRY_DSN", pre=True)
    def sentry_dsn_can_be_blank(cls, v: str) -> Optional[str]:
        if len(v) == 0:
            return None
        return v

    AUDD_API_TOKEN: str = None

    @validator("AUDD_API_TOKEN", pre=True)
    def audd_token_is_not_none(cls, v: str) -> Optional[str]:
        if v is None or len(v) == 0:
            return None
        return v

    POSTGRES_SERVER: str
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str
    POSTGRES_DB: str
    SQLALCHEMY_DATABASE_URI: Optional[PostgresDsn] = None

    @validator("SQLALCHEMY_DATABASE_URI", pre=True)
    def assemble_db_connection(cls, v: Optional[str], values: Dict[str, Any]) -> Any:
        if isinstance(v, str):
            return v
        return PostgresDsn.build(
            scheme="postgresql",
            user=values.get("POSTGRES_USER"),
            password=values.get("POSTGRES_PASSWORD"),
            host=values.get("POSTGRES_SERVER"),
            path=f"/{values.get('POSTGRES_DB') or ''}",
        )

    class Config:
        case_sensitive = True


settings = Settings()
