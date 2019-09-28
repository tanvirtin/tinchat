docker-up:
	docker-compose up -d

docker-down:
	docker-compose down

start-server-dev:
	cd server/ && yarn start:dev

start-server:
	cd server/ && yarn start

start-web-client:
	cd web-client/ && yarn start

lint:
	cd server/ && yarn lint

delete-database-entries:
	. server/script/delete_database_entries.sh

delete-es-indices:
	. server/script/delete_es_indices.sh

breakdown:
	$(MAKE) delete-database-entries
	$(MAKE) delete-es-indices