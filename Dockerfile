FROM node:12-slim
# Create app directory
WORKDIR /tinchat
COPY /server ./
CMD ["yarn", "start"]
EXPOSE 8000