compile:
	docker build -t tinchat .
	docker tag tinchat:latest tinchat:server

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

create-web-client-build:
	rm -rf server/public
	rm -rf web-client/build
	echo 'Removed old folders'
	cd ./web-client/ && yarn build production
	mv web-client/build server/public
	echo 'Client build created and moved'
	echo 'DONE'

breakdown:
	$(MAKE) delete-database-entries
	$(MAKE) delete-es-indices