FROM tiangolo/uvicorn-gunicorn-fastapi:python3.7

COPY . /service
COPY static /static
WORKDIR /service
RUN pip install -r requirements.txt

ENV PYTHONPATH=/service
ENV IS_DOCKER=1
WORKDIR /service

EXPOSE $SERVER_PORT
ENTRYPOINT ["sh", "-c", "/service/prestart.sh"]
