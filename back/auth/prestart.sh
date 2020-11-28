#! /usr/bin/env bash

# Let the DB start
python /service/auth/backend_pre_start.py

# Run migrations
alembic upgrade head

# Create initial data in DB
python /service/auth/initial_data.py
python /service/auth/main.py
