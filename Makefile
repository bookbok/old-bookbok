.DEFAULT_GOAL := help

.PHONY: help run migrate migrate/fresh c routes test install build json phplint

PHPUNIT := vendor/bin/phpunit
TEST_DB := test_sqlite

help: Makefile
	@-bat Makefile || \
	cat Makefile

run:
	php artisan serve --host=0.0.0.0

migrate:
	php artisan migrate

migrate/fresh:
	composer dump-autoload
	php artisan migrate:fresh --seed
	php artisan passport:install --force

migrate/test:
	php artisan migrate:fresh --seed --database=$(TEST_DB)

c:
	php artisan tinker

routes:
	php artisan route:list

test: tests/
	$(PHPUNIT) tests/

install:
	composer install
	npm install

build:
	npm run dev

json:
	python -m json.tool

phplint:
	find ./ -type d \( -name 'resources' -o -name 'bootstrap' -o -name 'public' -o -name 'vendor' -o -name 'node_modules' -o -name '.git' -o -name 'storage'  \) -prune -o -type f -name '*.php' -print | xargs -n1 php -l > /dev/null


.PHONY: docker/*

docker/build: Dockerfile
	docker-compose build

docker/run:
	docker-compose up -d

# 依存パッケージが変更された時に実行するターゲット(vendorなどはvolume化されているのでホスト側に共有される)
docker/install:
	docker-compose exec app make install

docker/bash:
	docker-compose exec app bash

docker/remove_all:
	docker-compose down -v --rmi all
