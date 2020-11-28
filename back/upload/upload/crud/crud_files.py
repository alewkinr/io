from typing import List, Optional

from sqlalchemy.orm import Session

from upload.crud.base import CRUDBase
from upload.models.files import File
from upload.schemas.file_upload import FileUpload as FileSchema


class CRUDFile(CRUDBase[File, FileSchema]):
    """ Круд для операций над файлами """

    def upload(self, db: Session, *, _file: FileSchema) -> File:
        """ Загружаем файл на сервер и схораняем мета информацию в БД """
        # todo: add save to filesystem logic
        return super(CRUDFile, self).create(db, obj_in=_file)

    def find_by_id(self, db: Session, *, _id: int) -> File:
        """ Получаем файл по ID"""
        return self.get(db=db, _id=_id)

    def find_by_user_id(self, db: Session, *, user_id: int) -> Optional[List[File]]:
        """ Получаем файл по ID пользователя, который его загрузил"""
        return db.query(self.model).filter(self.model.user_id == user_id).all()

    def find_by_type(self, db: Session, *, _type: str) -> Optional[List[File]]:
        """ Получаем файл по ID пользователя, который его загрузил"""
        return db.query(self.model).filter(self.model.type == _type).all()

    def find_status_by_id(self, db: Session, *, _id: int) -> Optional[File]:
        """ Получаем статус файла по его ID """
        return self.find_by_id(db=db, _id=_id)

    def find_by_filters(
        self, db: Session, *, user_id: int, _type: str = None
    ) -> Optional[List[File]]:
        """ Получаем список файлов по разным фильтрам"""

        _by_user_id = self.find_by_user_id(db=db, user_id=user_id)
        if _by_user_id is None:
            return None

        if _type is None:
            return _by_user_id
        return list(filter(lambda f: f.type == _type, _by_user_id))


file = CRUDFile(File)
