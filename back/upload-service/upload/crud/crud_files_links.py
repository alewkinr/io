from sqlalchemy.orm import Session
from upload.core.config import settings
from upload.core.errors import DownloadNotFoundFileErr
from upload.crud.base import CRUDBase
from upload.models.files import File
from upload.schemas.files_links import FileLinks as FileSchema
from upload.schemas.files_links import FileLinksUploadInDB
from upload.utils import download_file_by_link, generate_safe_dest, save_file_from_link
from os import path


class CRUDFileLink(CRUDBase[File, FileSchema]):
    """ Круд для операций над файлами, которые были скачаны по ссылке """

    @staticmethod
    def _download(file: FileSchema) -> bytes:
        """ Скачиваем файл по предоставленной ссылке """
        try:
            content = download_file_by_link(url=file.link).content
            return content

        except DownloadNotFoundFileErr as err:
            raise Exception(f"{err}")

    def upload(self, db: Session, *, file: FileSchema) -> File:
        """ Загружаем файл на сервер и схораняем мета информацию в БД """
        bin_data = self._download(file)

        _file_dist_path = generate_safe_dest(
            dest_dir=settings.STATIC_FILES_DIR, filename=file.link
        )

        _file_in_db = FileLinksUploadInDB(
            user_id=file.user_id,
            type=file.type,
            download_url=file.link,
            saved_file_path=path.abspath(_file_dist_path),
        )

        save_file_from_link(file=bin_data, dest_path=_file_dist_path)

        return super(CRUDFileLink, self).create(db, obj_in=_file_in_db)


file_link = CRUDFileLink(File)
