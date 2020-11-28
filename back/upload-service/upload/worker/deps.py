from typing import Generator

from upload.db.session import SessionLocal
from upload.recognizer.audd import AuddRecognizer


def get_db() -> Generator:
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()


def get_recognizer() -> Generator:
    """ Генератор распознавателя для DI """
    r = AuddRecognizer()
    yield r
