#! /usr/bin/env bash
set -e

python /service/upload/celeryworker_pre_start.py
celery --app=upload.worker.worker worker -l INFO -Q main-queue -c 1
