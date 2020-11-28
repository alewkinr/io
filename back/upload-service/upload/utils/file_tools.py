import base64
import shutil
from pathlib import Path

from fastapi import UploadFile
from upload.core.errors import SaveFileException

FILENAME_ENCODING = "ascii"


def save_upload_file(file: UploadFile, dest_path: str) -> None:
    """ Сохраняем файл на файловую систему"""
    _path = Path(dest_path)
    try:
        with _path.open("wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
    except Exception as err:
        _path.close()
        raise SaveFileException(err=err)


def generate_safe_dest(dest_dir: str, filename: str) -> str:
    """ Генерируем валидный путь до файла """
    try:
        _filename = base64.urlsafe_b64encode(str.encode(filename)).decode()
        return f"{dest_dir}/{_filename}"
    except Exception as err:
        return f"{err}"
