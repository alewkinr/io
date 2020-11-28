REGISTRY=docker.pkg.github.com/alewkinr/io

build:
	docker build . -t ${REGISTRY}/auth
	docker tag ${REGISTRY}/auth ${REGISTRY}/auth && docker push ${REGISTRY}/auth

make-migration:
	alembic revision --autogenerate -m $1


migrate:
	alembic upgrade head