#! /usr/bin/env bash

# Let the DB start
python /service/upload/backend_pre_start.py

# Run migrations
alembic upgrade head

# Create initial data in DB
python /service/upload/initial_data.py
python /service/upload/main.py
