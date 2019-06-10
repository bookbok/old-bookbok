.DEFAULT_GOAL := help

.PHONY: help run migrate migrate/fresh c routes test install build json phplint

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
	php artisan migrate:fresh --seed --database=test_sqlite

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

phplint:
	find ./ -type d \( -name 'resources' -o -name 'bootstrap' -o -name 'public' -o -name 'vendor' -o -name 'node_modules' -o -name '.git' -o -name 'storage'  \) -prune -o -type f -name '*.php' -print | xargs -n1 php -l > /dev/null
