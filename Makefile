.DEFAULT_GOAL := help

.PHONY: help run migrate migrate/fresh c routes test install build

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

c:
	php artisan tinker

routes:
	php artisan route:list

test: tests/
	vendor/bin/phpunit tests/

install:
	composer install
	npm install

build:
	npm run dev

json:
	python -m json.tool
