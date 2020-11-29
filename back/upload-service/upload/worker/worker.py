from raven import Client
from typing import Any
from upload.core.celery import celery_app
from upload.core.config import settings
from .tasks import RecognizeAudioTaskWithAudd
from upload.crud import crud_files
from upload.models.files import File
from upload.schemas.recognized_file import FileToRecognize
from typing import List, Optional
from upload.schemas.recognized_file import RecognizedFile, RecognizedFileWithChekResult

client_sentry = Client(settings.SENTRY_DSN)


def format_file_to_file_to_recognize(db_file: File) -> FileToRecognize:
    """ Форматируем файл для удобства обработки """
    return FileToRecognize(id=db_file.id, saved_file_path=db_file.saved_file_path)


def guess_file(celery, _to_rec: FileToRecognize) -> Optional[RecognizedFile]:
    """ Опознаем трек """
    _file = celery.recognizer.get_file_from_disk(des_path=_to_rec.saved_file_path)
    _recognized_file = celery.recognizer.recognize(file=_file)
    return _recognized_file


def check_license(celery, to_check: RecognizedFile) -> RecognizedFileWithChekResult:
    """ Проверяем наличие лицензии на файл"""
    _with_status = celery.recognizer.check_licence(file=to_check)
    return _with_status


def mark_checked(celery, to_mark: RecognizedFileWithChekResult) -> None:
    """ Отмечаем проверенные треки в БД """
    return crud_files.file.update(
        db=celery.db,
        db_obj=File,
        obj_in=to_mark,
    )


@celery_app.task(bind=True, base=RecognizeAudioTaskWithAudd)
def fingerprint_file(self) -> Any:
    """ Фингерпринтим файл """
    try:
        _type = "audio"
        _queue = crud_files.file.find_pending_files_by_type(db=self.db, _type=_type)
        if _queue is None:
            return
    except Exception as err:
        self.retry(exc=err)
        return

    _queue: Optional[List] = [
        format_file_to_file_to_recognize(db_file=item) for item in _queue
    ]
    if _queue is None:
        return

    recognized_files: Optional[List[RecognizedFile]] = [
        guess_file(celery=self, _to_rec=item) for item in _queue
    ]
    if recognized_files is None:
        return

    with_status: Optional[List[RecognizedFileWithChekResult]] = [
        check_license(celery=self, to_check=item) for item in recognized_files
    ]

    _ = [mark_checked(celery=self, to_mark=item) for item in with_status]
