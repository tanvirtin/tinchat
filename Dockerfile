FROM node:12-slim

# Create app directory
WORKDIR /tinchat

COPY /server/public ./public
COPY /server/src ./src
COPY /server/nest-cli.json ./nest-cli.json
COPY /server/ormconfig.js ./ormconfig.js
COPY /server/package.json ./package.json
COPY /server/tsconfig.build.json ./tsconfig.build.json
COPY /server/tsconfig.json ./tsconfig.json
COPY /server/yarn.lock ./yarn.lock

RUN yarn install

EXPOSE 8000
EXPOSE 8001