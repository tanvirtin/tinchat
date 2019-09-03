FROM node:9-slim
WORKDIR /tinchat
COPY package.json ./tinchat
RUN yarn install
COPY . ./server
CMD ["yarn", "start"]
