import requests

from fastapi import status
from pydantic import HttpUrl
from upload.core.errors import DownloadNotFoundFileErr, SaveFileException
import os
from pathlib import Path


def download_file_by_link(url: HttpUrl) -> requests.Response:
    """ Скачиваем файл по ссылке """
    r = requests.get(url=url, headers={"user-agent": "io-app/0.0.1"})

    if r.status_code == status.HTTP_200_OK:
        return r
    elif 300 <= r.status_code < 500:
        raise DownloadNotFoundFileErr(err="target server error, check url link")
    elif r.status_code >= 500:
        raise DownloadNotFoundFileErr(err="target server is not available for now")
    else:
        raise DownloadNotFoundFileErr(err="undefined status code returned back")


def save_file_from_link(file: bytes, dest_path: str) -> None:
    """ Сохраняем файл на файловую систему """
    _path = Path(dest_path)
    try:
        with _path.open("wb") as buffer:
            buffer.write(file)
    except Exception as err:
        _path.close()
        raise SaveFileException(err=err)
