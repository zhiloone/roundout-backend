run:
	@echo "Running docker-compose.yml application #"
	docker-compose --file docker-compose.yml up --remove-orphans

rebuild:
	@echo "Rebuild docker-compose.yml application"
	docker-compose --file docker-compose.yml up --build