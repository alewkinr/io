from os import path
from typing import List, Optional

from sqlalchemy.orm import Session

from upload.core.config import settings
from upload.crud.base import CRUDBase
from upload.models.files import File, FileStatusEnum
from upload.schemas.file_upload import FileUpload as FileSchema
from upload.schemas.file_upload import FileUploadInDB
from upload.schemas.recognized_file import RecognizedFileWithChekResultID
from upload.utils import generate_safe_dest, save_upload_file


class CRUDFile(CRUDBase[File, FileSchema]):
    """ Круд для операций над файлами """

    def upload(self, db: Session, *, _file: FileSchema) -> File:
        """ Загружаем файл на сервер и схораняем мета информацию в БД """
        _file_dist_path = generate_safe_dest(
            dest_dir=settings.STATIC_FILES_DIR, filename=_file.file.filename
        )

        _file_in_db = FileUploadInDB(
            user_id=_file.user_id,
            type=_file.type,
            saved_file_path=path.abspath(_file_dist_path),
        )
        save_upload_file(file=_file.file, dest_path=_file_dist_path)

        return super(CRUDFile, self).create(db, obj_in=_file_in_db)

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

    def find_pending_files_by_type(
        self, db: Session, *, _type: str
    ) -> Optional[List[File]]:
        """ Достаем файлы из БД, которые еще не отправлены на проверку """
        _files = (
            db.query(self.model)
            .filter(
                File.type == _type,
                File.status == FileStatusEnum.new,
                File.result.is_(None),
            )
            .all()
        )
        return _files

    def update(self, db: Session, *, obj_in: RecognizedFileWithChekResultID) -> File:
        """ Обновляем в базе данных сущность """
        _db_file = self.find_by_id(db=db, _id=obj_in.id)
        _db_file.artist = (obj_in.artist,)
        _db_file.title = obj_in.title
        _db_file.song_link = obj_in.song_link
        _db_file.result = obj_in.result
        _db_file.status = FileStatusEnum.finished
        db.commit()
        db.refresh(_db_file)
        return _db_file


file = CRUDFile(File)
