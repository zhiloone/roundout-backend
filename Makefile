run:
	docker-compose up

build:
	docker-compose build

remove:
	docker-compose down -v

rebuild: remove build

migrate:
	docker-compose exec web python manage.py migrate --noinput