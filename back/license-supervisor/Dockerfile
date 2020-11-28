FROM cethy/alpine-supercronic as supercronic
FROM python:3.7-alpine


COPY . /service
COPY --from=supercronic /bin/supercronic /supercronic

RUN apk add build-base postgresql-dev
WORKDIR /service
RUN pip install -r requirements.txt

ENV PYTHONPATH=/service
WORKDIR /service

COPY crontab /crontab
