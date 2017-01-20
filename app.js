/*
	Purpose: Http server made with Express Framework.
	Author: Md. Tanvir Islam
 */
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongo = require("mongodb").MongoClient;
var cookieParser = require("cookie-parser")
const ROOT = "./public";
var server = require('http').Server(app);
var io = require("socket.io")(server);
var obj = {names: []};
var userList = [];
var clients = [];
var clientObjs = {};
var socketCounter = 1;
var userCounter = 0;
var currentUser;

// clients and userList is the same thing here

app.set("views", "./views");
app.set("view engine", "pug");
app.use(express.static(ROOT));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());


app.use(function(req, res, next) {
	console.log(req.method + " request for: " + req.url);
	next();
})

// route for index page

app.get("/", function(req, res) {
	mongo.connect("mongodb://localhost:27017/chatDB", function(err, db) {
		if (err) {
			console.log("Error in opening database: ", err);
			res.sendStatus(500);
			db.close();
		} else {
			userList = [];
			var cursor = db.collection("users").find();
			cursor.forEach(function(doc) {
				userList.push(doc.name);
			})
		}
		db.close();
	});
	setTimeout(function() {
		if(req.cookies.username) {
			res.status(200).render("login", {signal: "blocked"});
		} else {
			res.status(200).render("login");
		}
	}, 10);
})

// route for dashboard

app.get("/homepage", function(req, res) {
	res.status(200).render("index");
})

// route for username

app.get("/name", function(req, res) {
	var data = {};
	data.name = currentUser;
	res.status(200).send(data);
})

// route to set cookies

app.post("/getCookies", function(req, res) {
	res.cookie("username",req.body.name,{path: "/", maxAge: 600000});
	res.sendStatus(200);
})

// route to check if cookies exist

app.get("/moreCookies", function(req, res) {
	// check if cookies exist
	var obj = {flag: true};
	if (req.cookies.username) {
		res.status(200).send(obj);
	}
})

// route to clear cookies when user clicks on the logout button

app.get("/clearCookies", function(req, res) {
	res.clearCookie("username");
	res.sendStatus(200);
})

// route to get the name of the user from the cookies

app.get("/getName", function(req, res) {
	if(req.cookies.username) {
		currentUser = req.cookies.username;
		res.status(200).send(currentUser);
	} else {
		res.status(200).send(currentUser);
	}
})

// route to render redirect page

app.get("/register", function(req, res) {
	res.status(200).render("register");
})

// route for user authentication while logging in

app.post("/secured", function(req, res) {
	var indicator = {};
	if(req.body.name.length === 0 && req.body.password.length === 0) {
		indicator.flag = false;
		indicator.condition = "both";
		res.status(200).send(JSON.stringify(indicator));
	} else if (req.body.name.length === 0) {
		indicator.flag = false;
		indicator.condition = "emptyName";
		res.status(200).send(JSON.stringify(indicator));
	} else if (req.body.password.length === 0) {
		indicator.flag = false;
		indicator.condition = "emptyPassword";
		res.status(200).send(JSON.stringify(indicator));
	} else {
		var nameFlag = false;
		mongo.connect("mongodb://localhost:27017/chatDB", function(err, db) {
			if (err) {
				console.log("Error in opening database: ", err);
				res.sendStatus(500);
				db.close();
			}
			var cursor = db.collection("users").find();
			cursor.forEach(function(doc) {
				if (doc.name === req.body.name) {
					nameFlag = true; // found username
				}
			})
			setTimeout(function() {
				if (nameFlag) { // send the success of finding it
					db.collection("users").findOne({name: req.body.name}, function(err, doc) {
						if(req.body.password === doc.password) {
							indicator.flag = true;
							currentUser = req.body.name;
							res.status(200).send(JSON.stringify(indicator));
						}
					});
				} else { // send the success of not finding it
					// username or password incorrect
					indicator.flag = false;
					indicator.condition = "wrongEntry";
					res.status(200).send(JSON.stringify(indicator));
				}
				db.close();
			}, 20);
		});
	}
})

// route for registering a user in the server

app.post("/registration", function(req, res) {
	var indicator = {};
	if (req.body.name.length === 0 && req.body.password.length === 0) {
		indicator.flag = false;
		indicator.condition = "both";
		res.status(200).send(JSON.stringify(indicator));
	} else if (req.body.name.length === 0) {
		indicator.flag = false;
		indicator.condition = "emptyName";
		res.status(200).send(JSON.stringify(indicator));
	}
	else if (req.body.password.length === 0) {
		indicator.flag = false;
		indicator.condition = "emptyPassword";
		res.status(200).send(JSON.stringify(indicator));
	} else {
		mongo.connect("mongodb://localhost:27017/chatDB", function(err, db) {
			if (err) {
				console.log("Error in opening database: ", err);
				res.sendStatus(500);
				db.close();
			} else {
				userList = [];
				var cursor = db.collection("users").find();
				cursor.forEach(function(doc) {
					userList.push(doc.name);
				})
				var user = {};
				user.name = req.body.name;
				user.password = req.body.password;
				user.token = tokenGenerator(user.password);
				setTimeout(function() {
					if (!inArray(userList, user.name)) {
						db.collection("users").insert(user, function(err, result) {
							if (err) {
								console.log("Error in adding to database: ", err);
								res.sendStatus(500);
								db.close();
							} else {
								indicator.flag = true;
								res.status(200).send(JSON.stringify(indicator));
							}
						});			
					} else {
						indicator.flag = false;
						indicator.condition = "wrongEntry";
						res.status(200).send(JSON.stringify(indicator));		
					}
					db.close();
				}, 10);
			}
		})
	}
})
// route that serves all 404 pages if something goes wrong

app.get("*", function(req, res) {
	res.status(404).render("404");
})

io.on("connection", function(socket) {
		console.log("Socket no." + socketCounter++ + " connected");
		socket.on("check", function(data) {
			if (data === "User") {
				userCounter++;
				socket.emit("report", userCounter);
			} else {
				socket.emit("report", null);
			}

		})
		socket.on("intro", function(data) {
			socket.username = data;
			socket.blockList = []; // socket field to check who the user blocks
			socket.blockedBy = []; // socket field to check who blocked the user
			clients.push(socket);
			clientObjs[socket.username] = socket;
			var users = currentClients();
			io.emit("userList", users);
			socket.broadcast.emit("messageFromServer", time() + ": " + socket.username + " has entered the chatroom.");
			socket.emit("messageFromServer", "Welcome, " + socket.username + ".");
			socket.emit("colorMe", socket.username);
		});
		socket.on("messageFromClient", function(data) {
			var copy = currentClients();
			copy.splice(copy.indexOf(socket.username), 1);
			socket.friends = copy;
			for (var i = 0; i < socket.friends.length; i++) {
				for (var j = 0; j < socket.blockList.length; j++) {
					if (socket.friends[i] === socket.blockList[j]) {
						socket.friends.splice(socket.friends.indexOf(socket.blockList[j]), 1);
					}
				}
			}
			//console.log(socket.username + " got blocked by: " + socket.blockedBy);
			for (var i = 0; i < socket.friends.length; i++) {
				for (var j = 0; j < socket.blockedBy.length; j++) {
					if (socket.friends[i] === socket.blockedBy[j]) {
						socket.friends.splice(socket.friends.indexOf(socket.blockedBy[j]), 1);
					}
				}
			}
			//console.log(socket.username +"'s friends: " + socket.friends);		
			for (var i = 0; i < socket.friends.length; i++) {
				clientObjs[socket.friends[i]].emit("messageFromServer", time() + ": " + socket.username + ": " + data);
			}
		});
		socket.on("unblock", function(data) {
			socket.blockList.splice(socket.blockList.indexOf(data.username), 1);
			var selectedId = find(clients, data);
			selectedId.blockedBy.splice(selectedId.blockedBy.indexOf(socket.username), 1);
			socket.emit("messageFromServer", time() + ": " + "You have unblocked " + data.username + ".");
		})
		socket.on("blockUser", function(data) {
			socket.blockList.push(data.username);
			var selectedId = find(clients, data);
			selectedId.blockedBy.push(socket.username);
			socket.emit("messageFromServer", time() + ": " + "You have blocked " + data.username + ".");
		})
		socket.on("privateMessage", function(data) {
			var selectedId = find(clients, data);
			var obj = {};
			obj.username = socket.username;
			obj.message = data.message;

			var signal = true; // problem
			for (var j = 0; j < selectedId.blockList.length; j++) {
				if (socket.username === selectedId.blockList[j]) {
					signal = false;
				}
			}
			if (signal !== false) {
				if (data.message !== null && data.message !== "") {
					selectedId.emit("privateMessage", obj);
				}
			}
		})
		socket.on("disconnect", function() {
			socketCounter--;
			console.log(socket.username + " disconnected");
			clients.pop(socket);
			io.emit("messageFromServer", time() + ": " + socket.username + " disconnected.");
			io.emit("userLeft", socket.username);
		});
	})
	/*
		Function: find
		Purpose: Goes through the clients array and and finds the socket depending on the username extracte from the data
			 in: code, data
			out: selectedId   

	*/
function find(clients, data) {
	var selectedId = {};
	for (var i = 0; i < clients.length; i++) {
		if (data.username === clients[i].username) {
			selectedId = clients[i];
		}
	}
	return selectedId;
}
/*
	Function: currentClients
	Purpose: Returns a list containing the username field of all the activated sockets
		out: list  
*/
function currentClients() {
	var list = [];
	for (var i = 0; i < clients.length; i++) {
		list.push(clients[i].username);
	}
	return list;
}
/*
	Function: currentClients
	Purpose: Returns the exact time on the machine that runs the code

*/
function time() {
	return new Date().toLocaleTimeString();
}

/*
	Function: inArray
	 Purpose: checks to see if a a value is in an array
		  in: array, value  
*/

function inArray(array, value) {
	for (var i = 0; i < array.length; i++) {
		if(array[i] === value) {
			return true;
		}
	}
	return false;
}

/*
	Function: tokenGenerator
	 Purpose: generates random letters and strings which acts as a unique identifier besides password
		  in: password
*/

function tokenGenerator(password) {
	var str = password.toString();
	var str2 = Math.random().toString(36).substring(5);
	return (((Math.floor(Math.random() * 10000)) * (str.length * 77)) + str2);
}


server.listen(3000, function() {
	console.log("Server is listening on port 2406...");
})