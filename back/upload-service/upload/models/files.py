from enum import Enum

from sqlalchemy import Column, Integer, String

from sqlalchemy_utils.types import URLType
from upload.db.base_class import Base


class FileStatusEnum(str, Enum):
    """ Перечисление доступных статусов для файла """

    new: str = "new"
    in_queue: str = "in queue"
    finished: str = "finished"


class FileResultEnum(str, Enum):
    """ Перечисление доступных вариантов звершения обработки файла """

    allowed: str = "allowed"
    restricted: str = "restricted"


class File(Base):
    """ Модель файла, загруженного в систему """

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, primary_key=False, index=True, nullable=False)
    status = Column(String, nullable=False, default=FileStatusEnum.new, index=True)
    result = Column(String, nullable=True, index=True)
    type = Column(String, nullable=False, default="audio", index=True)
    saved_file_path = Column(String, nullable=False)
    download_url = Column(URLType, nullable=True)
    artist = Column(String, nullable=True)
    title = Column(String, nullable=True)
    song_link = Column(URLType, nullable=True)
