from raven import Client
from typing import Any
from upload.core.celery import celery_app
from upload.core.config import settings
from .tasks import RecognizeAudioTaskWithAudd
from upload.crud import crud_files
from upload.models.files import File
from upload.schemas.recognized_file import FileToRecognize
from typing import List, Optional
from upload.schemas.recognized_file import (
    RecognizedFile,
    RecognizedFileWithChekResult,
    RecognizedFileWithChekResultID,
)
from sqlalchemy.orm import Session

from upload.recognizer import IRecognizer
from upload.recognizer.audd import AuddRecognizer

from fastapi import Depends

from .deps import get_db, get_recognizer

client_sentry = Client(settings.SENTRY_DSN)


def format_file_to_file_to_recognize(db_file: File) -> FileToRecognize:
    """ Форматируем файл для удобства обработки """
    return FileToRecognize(id=db_file.id, saved_file_path=db_file.saved_file_path)


def guess_file(
    recognizer: IRecognizer, db: Session, *, _to_rec: FileToRecognize
) -> Optional[RecognizedFile]:
    """ Опознаем трек """
    _recognized_file = recognizer.recognize(file_path=_to_rec.saved_file_path)
    return _recognized_file


def check_license(
    recognizer: IRecognizer, *, to_check: RecognizedFile
) -> RecognizedFileWithChekResult:
    """ Проверяем наличие лицензии на файл"""
    _with_status = recognizer.check_licence(file=to_check)
    return _with_status


def mark_checked(
    db: Session, *, init_file: File, to_mark: RecognizedFileWithChekResult
) -> None:
    """ Отмечаем проверенные треки в БД """
    return crud_files.file.update(
        db=db,
        db_obj=File,
        obj_in=RecognizedFileWithChekResultID(**to_mark.dict(), id=init_file.id),
    )


# @celery_app.task(name="fingerprint_files", bind=True, base=RecognizeAudioTaskWithAudd)
# def fingerprint_files(self) -> Any:
#     """ Фингерпринтим несколько файлов """
#     try:
#         _type = "audio"
#         _queue = crud_files.file.find_pending_files_by_type(db=self.db, _type=_type)
#         if _queue is None:
#             return
#     except Exception as err:
#         self.retry(exc=err)
#         return
#
#     _queue: Optional[List] = [
#         format_file_to_file_to_recognize(db_file=item) for item in _queue
#     ]
#     if _queue is None:
#         return
#
#     recognized_files: Optional[List[RecognizedFile]] = [
#         guess_file(celery=self, _to_rec=item) for item in _queue
#     ]
#     if recognized_files is None:
#         return
#
#     with_status: Optional[List[RecognizedFileWithChekResult]] = [
#         check_license(celery=self, to_check=item) for item in recognized_files
#     ]
#
#     _ = [mark_checked(celery=self, to_mark=item) for item in with_status]


def fingerprint_file(rec: AuddRecognizer, db: Session, _id: int) -> Any:
    """ Фингерпринтим файл """
    try:
        _type = "audio"
        _file = crud_files.file.find_by_id(db=db, _id=_id)
        if _file is None:
            return
    except Exception as err:
        print(err)
        return

    _file = format_file_to_file_to_recognize(_file)
    if _file is None:
        return None
    recognized_file = guess_file(recognizer=rec, db=db, _to_rec=_file)
    if recognized_file is None:
        return

    with_status = check_license(recognizer=rec, to_check=recognized_file)
    mark_checked(recognizer=rec, db=db, to_mark=with_status)
