# Import all the models, so that Base has them before being
# imported by Alembic
from upload.db.base_class import Base  # noqa
from upload.models.files import File  # noqa
