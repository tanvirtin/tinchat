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

### How to run:
  - `$ make docker-up`