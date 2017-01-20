// Purpose: Logic for the registration page
// Author: Md. Tanvir Islam

$(document).ready(function() {
	$("#register").click(next);
	$("#username").keypress(function(event) {
		if(event.which === 13) {
			next();
		}
	});
	$("#password").keypress(function(event) {
		if(event.which === 13) {
			next();
		}
	});
})
/*
	Function: next
	 Purpose: performs basic error checking check if the username is taken or not and sends info back to the server
	 	 	  and registers users
*/
function next() {
	var obj = {};
	obj.name = $("#username").val();
	obj.password = $("#password").val();
	$.ajax({
		url: "registration",
		type: "POST",
		dataType: "json",
		data: obj, 
		success: function(data) {
			if (!data.flag) {
				if (data.condition === "both") {
					$("#p1").css({color: "red"}).html("&nbsp &#10008");
					$("#p2").css({color: "red"}).html("&nbsp &#10008");
					setTimeout(function() {
						$("#p1").css({color: "red"}).html("");
						$("#p2").css({color: "red"}).html("");	
					}, 2000);
				} else if (data.condition === "emptyName") {
					$("#p1").css({color: "red"}).html("&nbsp &#10008");
					setTimeout(function() {
						$("#p1").css({color: "red"}).html("");	
					}, 2000);
				} else if (data.condition === "emptyPassword") {
					$("#p2").css({color: "red"}).html("&nbsp &#10008");
					setTimeout(function() {
						$("#p2").css({color: "red"}).html("");	
					}, 2000);
				} else if (data.condition === "wrongEntry") {
					$("#breakLine").html("&nbsp &nbsp &nbsp &nbsp Username is already taken!");
					setTimeout(function() {
						$("#breakLine").html("");
					}, 3000);
				}
			} else {
				$("#contents").remove();
				$("#complete").append("<p style = 'display: inline-block;'>Redirecting to login page...<p>");
				window.setTimeout(function() {
					window.location.href = "/";
				}, 2000);			
			}
		}
	})
}