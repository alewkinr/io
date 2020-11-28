REGISTRY=docker.pkg.github.com/alewkinr/io

build:
	docker build . -t ${REGISTRY}/upload
	docker tag ${REGISTRY}/upload ${REGISTRY}/upload && docker push ${REGISTRY}/upload

make-migration:
	alembic revision --autogenerate -m $1


migrate:
	alembic upgrade head