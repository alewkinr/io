from sqlalchemy.orm import Session

from upload.crud.base import CRUDBase
from upload.models.files import File
from upload.schemas.files_links import FileLinks as FileSchema


class CRUDFileLink(CRUDBase[File, FileSchema]):
    """ Круд для операций над файлами, которые были скачаны по ссылке """

    def upload(self, db: Session, *, file: FileSchema) -> File:
        """ Загружаем файл на сервер и схораняем мета информацию в БД """
        # todo: add logic to upload file from resource
        # todo: add save to filesystem logic
        return super(CRUDFileLink, self).create(db, obj_in=file)


file_link = CRUDFileLink(File)
