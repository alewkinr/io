import requests
from upload.core.config import settings
from typing import Optional
from fastapi import status


def fetch_from_audd(file_path: str) -> Optional[dict]:
    """Запрос с api AUDD"""
    with open(file_path, "rb") as file:
        res = requests.post(
            "https://api.audd.io/",
            data={
                "api_token": settings.AUDD_API_TOKEN,
                "return": "apple_music,spotify",
            },
            files={"file": file},
        )
    file.close()

    if res.status_code == status.HTTP_200_OK:
        _data = res.json()
        if "status" in _data and _data["status"] == "success":
            return _data["result"]
        return None

    elif (
        status.HTTP_400_BAD_REQUEST
        <= res.status_code
        < status.HTTP_500_INTERNAL_SERVER_ERROR
    ):
        raise Exception(
            f"error to recognize file in audd, response code {res.status_code}, body: {res.text}"
        )
    else:
        raise Exception(f"unexpected response code from audd: {res.status_code}")
