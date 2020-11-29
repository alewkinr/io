#! /usr/bin/env bash

# Let the DB start
python /service/legal/backend_pre_start.py
python /service/legal/main.py
