REGISTRY=docker.pkg.github.com/alewkinr/io

build:
	docker build . -t ${REGISTRY}/upload
	docker tag ${REGISTRY}/upload ${REGISTRY}/upload && docker push ${REGISTRY}/upload

migration:
	alembic revision --autogenerate


migrate:
	alembic upgrade head