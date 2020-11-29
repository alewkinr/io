FROM tiangolo/uvicorn-gunicorn-fastapi:python3.7
# todo add as base

COPY . /service

WORKDIR /service
RUN pip install -r requirements.txt

ENV PYTHONPATH=/service
WORKDIR /service

EXPOSE $SERVER_PORT
ENTRYPOINT ["sh", "-c", "/service/prestart.sh"]
