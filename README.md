# Tinchat
Chat Application built using NestJS, PSQL and ReactJS.

![tinchat](https://user-images.githubusercontent.com/25164326/68090274-ce5b5e80-fe3f-11e9-93bb-0977fff37696.PNG)

## <3 NestJS

### Features
  - User creation
    - Registration.
    - Login.
    - Clients are verified via JSON web tokens.
    - A socket will only send messages to the receiver if their jwt token exists in cache.
  - Messaging
    - Search
      - Clients can look up one another via first name, last name and email
    - Messaging is instant, if client is online they will receive the message in real time.
    - Similar to slack you can send message to yourself.

### Design Flaws
  - If someone gets hold the user's jwt token they can make requests to all routes only authorized to that user despite authenticating themselves.
    - Solution:
        - Using sessions instead over relying purely on JWT validation.
  - Everytime the server restarts all the users are logged out.
    - Solution:
        - Use caching that persists outside the instance of the server. For example: Redis.

### Endpoints:
  - POST `'register'`
    - Registers a user and gives you back a jwt token
  - POST `'login'`
    - Logs in the user and gives you back a jwt token
  - POST `'logout'`
    - Logs the user out and deletes the jwt token from server cache
  - GET `'api/users'`
    - Retrieves all user (Protected)
  - POST `'api/message'`
    - Creates a message (Protected)
  - GET `'api/conversation/?with=${with}&page=${page}&limit=${limit}'`
    - Retrieves all conversation between two users (Protected)
    - `with` is the email of the user you are having the conversation with
    - `page` is a pagination variable to indicate which page of conversation you want to retrieve
    - `limit` is a pagination variable to indicate how many conversations you want in each page to have
  - GET `'api/search/:index'`
    - Retrieves all documents of a given index (Protected)
    - `index` is the name of the Elasticsearch index
  - POST `'api/search/:index'`
    - Retrives particular documents depending on the query provided (Protected)
    - `index` is the name of the Elasticsearch index

### Dependencies:
  - Docker
  - Docker Compose

### How to run:
  - `$ make docker-up`