import requests
from upload.core.config import settings
from fastapi import status
from typing import Optional


def get_license_status(author: str, tack_name: str) -> Optional[str]:
    """ Определяем статус лиценизии трека """
    # todo: add endpoint url
    _url = f"{settings.LICENCE_SUPERVISOR_BASE_URL}/"
    res = requests.post(
        _url,
        json={
            "author": author,
            "track_name": tack_name,
        },
    )
    if res.status_code == status.HTTP_204_NO_CONTENT:
        return None
    elif res.status_code == status.HTTP_200_OK:
        _data = res.json()
        # todo: add contract info
    else:
        _wrap_errors(res)


def _wrap_errors(res: requests.Response) -> None:
    """ Обертка ошибок сервера """
    if (
        status.HTTP_400_BAD_REQUEST
        <= res.status_code
        < status.HTTP_500_INTERNAL_SERVER_ERROR
    ):
        raise Exception(
            f"error to get track license info, response code {res.status_code}, body: {res.text}"
        )
    else:
        raise Exception(
            f"unexpected response code from license supervisor: {res.status_code}"
        )
