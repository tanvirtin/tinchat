build-server-image:
	docker build -t tanvirtin/tinchat .

run-server-container:
	docker run -d -t -p 8000:8000 tanvirtin/tinchat

create-web-client-build:
	cp -r .env ./web-client/.env
	rm -rf server/public
	rm -rf web-client/build
	echo 'Removed old folders'
	cd ./web-client/ && yarn build production
	mv web-client/build server/public
	echo 'Client build created and moved'
	echo 'DONE'

docker-up:
	docker-compose up -d

docker-down:
	docker-compose down

delete-database-entries:
	. script/delete_database_entries.sh

delete-es-indices:
	. script/delete_es_indices.sh

breakdown:
	$(MAKE) delete-database-entries
	$(MAKE) delete-es-indices

# Make commands for development process.
start-server:
	cd server/ && yarn start:dev

start-web-client:
	cd web-client/ && yarn start

lint:
	cd server/ && yarn lint