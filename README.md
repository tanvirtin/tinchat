# Tinchat
Chat Application built using NestJS, PSQL and ReactJS.

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
    - If the receiver is currently online, then the messages are delivered instantly which shows up in real time. (If jwt token for receiver exists in the cache)
    - If the receiver is not currently online, the message is stored in a queue, of messages. These messages get delivered instantly when the client comes online. After messages have been delivered the queue is emptied out.
    - Similar to slack you can send message to yourself.

### Design Flaws
  - If someone gets hold the user's jwt token they can make requests to all routes only authorized to that user despite authenticating themselves.
    - Solution:
        - Using sessions instead over relying purely on JWT validation.
  - Everytime the server restarts all the users are logged out.
    - Solution:
        - Use caching that persists outside the instance of the server. For example: Redis.

### Endpoints:
  - POST /register
    - Registers a user and gives you back a jwt token
  - POST /login
    - Logs in the user and gives you back a jwt token
  - POST /logout
    - Logs the user out and deletes the jwt token from server cache
  - GET /api/users
    - Retrieves all user (Protected)
  - POST /api/message
    - Creates a message (Protected)
  - GET /api/conversation/:with/:page/:limit
    - Retrieves all conversation between two users (Protected)
    - The query parameter `with` is the email of the user you are having the conversation with
    - The query parameter `page` is a pagination variable to indicate which page of conversation you want to retrieve
    - The query parameter `limit` is a pagination variable to indicate how many conversations you want in each page to have
  - GET api/search/:index
    - Retrieves all documents of a given index (Protected)
    - The query parameter `index` is the name of the Elasticsearch index
  - POST api/search/:index
    - Retrives particular documents depending on the query provided (Protected)
    - The query parameter `index` is the name of the Elasticsearch index

### How to run:
  - `$ make docker-up`
  - `$ make start-server`