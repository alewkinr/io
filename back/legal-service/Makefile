REGISTRY=docker.pkg.github.com/alewkinr/io

build:
	docker build . -t ${REGISTRY}/legal
	docker tag ${REGISTRY}/legal ${REGISTRY}/legal && docker push ${REGISTRY}/legal

make-migration:
	alembic revision --autogenerate -m $1


migrate:
	alembic upgrade head