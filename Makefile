run:
	docker-compose up

build:
	docker-compose build

remove:
	docker-compose down -v

rebuild: remove build

pre-commit-install:
	pip install pre-commit
	pre-commit install;

pre-commit-run:
	pre-commit run --all-files

chmod:
	sudo chmod 777 -R .

app=
# Create migrations, if they don't exist.
makemigrations:
	docker-compose exec web python manage.py makemigrations ${app}

app=
name=
# Generates a preview of the SQL to be executed when running said migration.
sqlmigrate:
	@if [ -z "${app}" ]; then \
		echo "Error: App name not specified."; \
		echo "Please specify an app by typing app=app_name at the end of the command."; \
		exit 1; \
	fi
	@if [ -z "${name}" ]; then \
			echo "Error: Migration name not specified."; \
			echo "Please specify a migration name by adding 'name=migration_name' at the end of the command."; \
			echo "For example, to check a migration named '0001_initial', use 'name=0001'."; \
			exit 1; \
	fi
	docker-compose exec web python manage.py sqlmigrate ${app} ${name}

# Runs pending Django migrations.
migrate:
	docker-compose exec web python manage.py migrate

shell:
	docker-compose exec web python manage.py shell

createsuperuser:
	docker-compose exec web python manage.py createsuperuser
