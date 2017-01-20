# chat-website
A chat application created using Express Framework, Javascript, HTML, Pug Template Engine, CSS, MongoDB and Socket.IO with a login/registration system which uses cookies.

Installation Instruction:

You need to have NodeJS and MongoDB installed on your computer in order to run this application. If you do so open the terminal in the directory and type in "npm install". This will install all the dependencies related to the application.

Considering you have MongoDB configured, open up a terminal and type in "mongod" for the MongoDB server to run. 

After the installation type in "node app.js" to run server. Open up a browser of your choice and type in "localhost:3000". 

You need to register yourself as a user to login and use the chat application, you can choose to check the remember me radio box to set cookies in the browser, so that it can remember you the next time you want to sign in. There is a logout option inside the chat application as well, which will remove the cookies and sign you out.

To send a private message to another user double-click on the user's name, to block the user control + double-click on ther user's name.
To unblock the user ctrl + double-click again on the user's name. The blocked user won't be able to see what messages the person who blocked him/her is sending, neither can the person who blocked the other user see what messages he/she is sending to others in the chatroom.


