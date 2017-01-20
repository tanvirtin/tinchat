/* 
	Purpose: Main logic of the chat application
	Author: <Md. Tanvir Islam> 
*/
var originalList = [];
var socketBlocks = [];
var flag = false;
$(document).focus();
$(document).ready(function() {
	var userName = "";
	$.ajax({
		url: "/name",
		type: "GET",
		dataType: "json",
		async: false,
		success: function(data) {
			userName = data.name;
		}
	})
	var socket = io();
	$("#logout").click(getOut);
	$(document).on("keydown", function(event) {
		if (event.keyCode === 17) {
			flag = true; // as long as ctrl key is pressed flag will be changed to true hundreds and millions of time in a loop
		}
	})
	$(document).on("keyup", function(event) {
			if (event.keyCode === 17) {
				flag = false; // only turns flag to false when ctrl key is released you can release a key only when you press it first so wont loop forever
			}
		})
		/*
	Function: doubleClick
	 Purpose: Takes in id name as a parameter and attaches a double click event handler to the provided id
		  in: data
	*/
	function doubleClick(data) {
		$("#" + data).on("dblclick", function() {
			var flagTwo = false;
			if (flag === true) {
				for (var i = 0; i < socketBlocks.length; i++) {
					if (this.id === socketBlocks[i]) {
						flagTwo = true;
						flag = false;
						socketBlocks.splice(socketBlocks.indexOf(this.id), 1);
						var select = {};
						select.username = this.id;
						$("#" + data).css("color", "black"); // changes color back to normal
						unblock(select);
					}
				}
			}
			if (flag === true && flagTwo === false) {
				if (this.id !== userName) {
					socketBlocks.push(this.id);
					flag = false;
					var select = {};
					select.username = this.id;
					$("#" + data).css("color", "red"); // fancy css that turns the name red when the user blocks someone
					block(select);
				}
			} else if (flag === false && flagTwo === false) {
				var flagThree = true;
				for (var i = 0; i < socketBlocks.length; i++) {
					if (this.id === socketBlocks[i]) {
						flagThree = false;
					}
				}
				if (this.id !== userName && flagThree === true) {
					var input = prompt("Enter your private message");
					var select = {};
					select.username = this.id;
					select.message = input;
					pm(select);
				}
			}
		})
	}
	/*
		Function: getOut
		 Purpose: clears cookies and redirects to login page
	*/

	function getOut() {
		$.ajax({
			url: "/clearCookies",
			type: "GET",
			success: function() {
				window.location.href = "/";
			}
		})
	}	
	/*
	Function: unblock
	 Purpose: Sends an object server via socket connection instructing the server who to unblock
		  in: select
	*/
	function unblock(select) {
		socket.emit("unblock", select);
	}
	/*
	Function: block
	 Purpose: Sends an object server via socket connection instructing the server who to block 
		  in: select
	*/
	function block(select) {
		socket.emit("blockUser", select);
	}
	/*
	Function: pm
	 Purpose: Sends an object server via socket connection instructing the server who to private message
		  in: select
	*/
	function pm(select) {
		socket.emit("privateMessage", select);
	}
	socket.on("privateMessage", function(data) {
		var moreInput = prompt(data.username + ": " + data.message);
		var select = {};
		select.username = data.username;
		select.message = moreInput;
		pm(select);
	})
	socket.on("connect", function() {
		socket.emit("check", userName);
	});
	socket.on("report", function(data) {
		if (data !== null) {
			userName = userName + "_" + data;
		}
		socket.emit("intro", userName);
	})
	$("#inputText").keypress(function(ev) {
		if (ev.which === 13) {
			socket.emit("messageFromClient", $(this).val());
			ev.preventDefault();
			$("#chatLog").append((new Date()).toLocaleTimeString() + ", " + userName + ": " + $(this).val() + "\n");
			$(this).val("");
		}
	});
	socket.on("messageFromServer", function(data) {
		$("#chatLog").append(data + "\n");
		$('#chatLog')[0].scrollTop = $('#chatLog')[0].scrollHeight;
	});
	socket.on("userLeft", function(data) {
		$("#" + data).remove();
	})
	socket.on("userList", function(data) {
		for (var i = 0; i < data.length; i++) {
			if (originalList.length !== 0) {
				if (data[i] !== originalList[i]) {
					$("#userList").append("<li id = " + data[i] + ">" + data[i] + "</li>");
					doubleClick(data[i]);
				}
			} else {
				$("#userList").append("<li id = " + data[i] + ">" + data[i] + "</li>");
				doubleClick(data[i]);
			}
		}
		originalList = data;
	});
	socket.on("colorMe", function(data) {
		$("#" + data).css("color", "blue"); // changes color of the list item to blue so that i can keep track of who you are
	})

});