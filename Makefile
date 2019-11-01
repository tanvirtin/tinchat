build-server-image:
	docker build -t tinchat-server .

run-server-container:
	docker run -d -t -p 8000:8000 tinchat-server

create-web-client-build:
	cp -r .env ./web-client/.env
	rm -rf server/public
	rm -rf web-client/build
	echo 'Removed old folders'
	cd ./web-client/ && yarn build production
	mv web-client/build server/public
	echo 'Client build created and moved'
	echo 'DONE'

deploy:
	$(MAKE) create-web-client-build
	$(MAKE) build-server-image
	$(MAKE) docker-up

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
	. script/delete_database_entries.sh

delete-es-indices:
	. script/delete_es_indices.sh

breakdown:
	$(MAKE) delete-database-entries
	$(MAKE) delete-es-indices