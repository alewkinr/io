from celery import Celery
from .config import settings

celery_app = Celery("worker", broker=settings.RABBIT_MQ_DSN)

celery_app.conf.task_routes = {"upload.worker.fingerprint_file": "main-queue"}
