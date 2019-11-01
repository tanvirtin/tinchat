FROM node:12-slim
# Create app directory
WORKDIR /tinchat
COPY /server ./
EXPOSE 8000