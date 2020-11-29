from celery import Task
from sqlalchemy.orm import Session
from fastapi import Depends

from .deps import get_db, get_recognizer
from upload.recognizer import IRecognizer


class RecognizeAudioTaskWithAudd(Task):
    """ Задача для celery для распознавания аудиодорожек """

    _db: Session = None
    _recognizer: IRecognizer = None

    @property
    def db(self):
        """Получаем БД из поля или реинициализируем"""
        if self._db is None:
            self._db = Depends(get_db)
        return self._db

    @property
    def recognizer(self):
        """ Достаем класс распознавателя из кэша """
        if self._recognizer is None:
            self._recognizer = Depends(get_recognizer)

        return self._recognizer
