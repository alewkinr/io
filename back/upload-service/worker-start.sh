#! /usr/bin/env bash
set -e

python /service/upload/celeryworker_pre_start.py

celery worker -A upload.worker -l info -Q main-queue -c 1
