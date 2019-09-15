docker-up:
	docker-compose up -d

docker-down:
	docker-compose down

start-server-dev:
	cd server/ && yarn start:dev

start-server:
	cd server/ && yarn start:dev

lint:
	cd server/ && yarn lint