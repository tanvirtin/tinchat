// Purpose: Contains logic for the login page
// Author: <Md. Tanvir Islam>

$(document).ready(function() {
	$.ajax({
		url: "/moreCookies",
		type: "GET",
		dataType: "json",
		success: function(data) {
			console.log(data);
			window.location.href = "/homepage";
		}
	})	
	$("#login").click(next);
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
	 Purpose: performs basic error checking sends get request to set cookies if remembered and sends the login info for 
	 		  the server to check
*/
function next() {
	var obj = {};
	obj.name = $("#username").val();
	obj.password = $("#password").val();
	if($("#rememberMe").is(":checked")) { //document.getElementById("rememberMe").checked
		$.ajax({
			url: "/getCookies",
			type: "POST",
			dataType: "json", 
			data: obj
		})
	}
	$.ajax({
		url: "/secured",
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
					$("#breakLine").html("&nbsp &nbsp &nbsp Invalid username!");
					setTimeout(function() {
						$("#breakLine").html("");
					}, 3000);
				} else if (data.condition === "wrongPassword") {
					$("#breakLine").html("&nbsp &nbsp &nbsp Wrong password!");
					setTimeout(function() {
						$("#breakLine").html("");
					}, 3000);
				} 
			} else {
				window.location.href = "/homepage";
			}
		}
	})
}