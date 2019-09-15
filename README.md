# Tinchat
Chat Application built using NestJS, PSQL and ReactJS.

### Features
  - User creation
    - Registration.
    - Login.
    - Clients are verified via JSON web tokens.
    - A socket will only send messages to the receiver if their jwt token exists in chache.