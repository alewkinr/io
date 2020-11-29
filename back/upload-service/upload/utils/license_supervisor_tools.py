import requests
from upload.core.config import settings
from fastapi import status
from typing import Optional


def get_license_status(author: str, tack_name: str) -> Optional[str]:
    """ Определяем статус лиценизии трека """
    _url = f"{settings.LICENCE_SUPERVISOR_BASE_URL}/api/v1/licenses/search"
    res = requests.post(
        _url,
        json={
            "performers": author,
            "phonogram_title": tack_name,
        },
        headers={"content-type": "application/json"},
    )
    if res.status_code == status.HTTP_204_NO_CONTENT:
        return None
    elif res.status_code == status.HTTP_200_OK:
        _data = res.json()
        return _data["check_result"]
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
