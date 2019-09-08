docker-up:
	docker-compose up -d

docker-down:
	docker-compose down

start-server:
	cd server/ && yarn start