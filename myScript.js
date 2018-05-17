var elements = document.getElementsByClassName("cell");
//var Starthead=document.getElementById("startHead");
var id = 0;

function idChanger(value) {
	id=value;
	colorChoice();
}
function colorChoice() {
	if (id == 0) {
		defaultColor();
	}else if (id == 1) {
		primaryColor();
	}else if (id == 2) {
		color1();
	}else if (id == 3) {
		color2();
	}
	
}
document.getElementById("primary").addEventListener("mouseover", primaryColor);
document.getElementById("primary").addEventListener("mouseout", colorChoice);
document.getElementById("color1").addEventListener("mouseover", color1);
document.getElementById("color1").addEventListener("mouseout", colorChoice);
document.getElementById("color2").addEventListener("mouseover", color2);
document.getElementById("color2").addEventListener("mouseout", colorChoice);

function defaultColor() {
	document.getElementById("startHead").style.backgroundColor = "#281c8b";	document.getElementById("restart").style.backgroundColor = "#281c8b";
	document.getElementById("result").style.backgroundColor = "#281c8b";
	document.getElementById("x").style.color = "	black";
	document.getElementById("o").style.color = "black";
	for (var i = 0; i < elements.length; i++) {
		elements[i].style.color = "black";
		elements[i].style.borderColor = "black";
	}
}

function primaryColor() {
	document.getElementById("startHead").style.backgroundColor = "black";
	document.getElementById("restart").style.backgroundColor = "black";
	document.getElementById("result").style.backgroundColor = "black";
	document.getElementById("x").style.color = "	black";
	document.getElementById("o").style.color = "black";
	for (var i = 0; i < elements.length; i++) {
		elements[i].style.color = "black";
		elements[i].style.borderColor = "black";
	}
}

function color1() {
	document.getElementById("startHead").style.backgroundColor = "red";
	document.getElementById("restart").style.backgroundColor = "red";
	document.getElementById("result").style.backgroundColor = "red";
	document.getElementById("x").style.color = "red";
	document.getElementById("o").style.color = "red";
	for (var i = 0; i < elements.length; i++) {
		elements[i].style.color = "red";
		elements[i].style.borderColor = "black";
	}
}

function color2() {
	document.getElementById("startHead").style.backgroundColor = "pink";
	document.getElementById("restart").style.backgroundColor = "pink";
	document.getElementById("result").style.backgroundColor = "pink";
	document.getElementById("x").style.color = "blue";
	document.getElementById("o").style.color = "blue";
	for (var i = 0; i < elements.length; i++) {
		elements[i].style.color = "blue";
		elements[i].style.borderColor = "pink";
	}
}

var userChoice;
var compPlayer;
var humanPlayer;
var GameCounter=0;
var random = Math.floor(Math.random()*9);
var origBoard = [0,1,2,3,4,5,6,7,8];
var round = 0;
var iter = 0;

function startGame(userChoice) {
	document.getElementById("startScreen").style.display = "none";
	document.getElementById("gameplay").style.display = "";
	humanPlayer=userChoice;
	if (userChoice == 'x') {
		compPlayer = 'o';
	}else {
		round = 1;
		compPlayer = 'x';
		for (var i = 0; i <= (i+1); i++) {
			random = Math.floor(Math.random()*9);
			if (random == 4) {
				document.getElementById(random).innerText = compPlayer;
				origBoard[random]=compPlayer;
				break;
			}else if (random == 0 || random == 2 || random == 4 || random == 6 || random == 8) {
				document.getElementById(random).innerText = compPlayer;
				origBoard[random]=compPlayer;
				break;
			}
		}
	}
}

var boxID;

function turn(boxID) {
	if (document.getElementById(boxID).innerText != "x" && document.getElementById(boxID).innerText != "o" && GameCounter == 0) {
		round++;
		document.getElementById(boxID).innerText = humanPlayer;
		origBoard[boxID]=humanPlayer;
		
		if (winning(origBoard, humanPlayer)) { 
			document.getElementById("change").innerHTML = "You Win";
			GameCounter = 1;
			round=0;
		} else if (round > 8) { 
			document.getElementById("change").innerHTML = "Tie";
			round=0;
			GameCounter = 1;
		}else {
			round++;
			var aimove = minimax(origBoard, compPlayer).index;
			document.getElementById(aimove).innerText = compPlayer;
			origBoard[aimove]=compPlayer;	
			if (winning(origBoard, compPlayer)) {
			  document.getElementById("change").innerHTML = "You Lose";
			  GameCounter = 1;
			  round=0;
			} else if (round > 8) {
			  document.getElementById("change").innerHTML = "Tie";
			  round=0;
			  GameCounter = 1;
			}
		}
	}
}

var player;

function minimax(newBoard, Player) {
	var availableSpots = emptyIndex(newBoard);
	if (winning(newBoard, humanPlayer)) {
		return {score:-10};
	}else if (winning(newBoard, compPlayer)) {
		return {score:10};
	}else if (availableSpots.length === 0) {
		return {score:0};
	}
	
	var moves = [];
	
	for (var i = 0; i < availableSpots.length; i++) {
		var move = {};
		
		move.index = newBoard[availableSpots[i]];
		
		newBoard[availableSpots[i]] = Player;
		
		if (Player == compPlayer) {
			var result = minimax(newBoard, humanPlayer);
			move.score = result.score;
		}
		else {
			var result = minimax(newBoard, compPlayer);
			move.score = result.score;
		}
		
		newBoard[availableSpots[i]]=move.index;
		moves.push(move);
	}
	
	var bestMove;
	if (Player === compPlayer) {
		var bestScore = -10000;
		for (var i = 0; i < moves.length; i++) {
			if (moves[i].score > bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	}else {
		var bestScore = 10000;
		for (var i = 0; i < moves.length; i++) {
			if (moves[i].score < bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}	
	}
	return moves[bestMove];
}

function emptyIndex(board) {
	var newArray = [];
	for (var i = 0; i < 9; i++) {
		if (board[i] != "x" && board[i] != "o") {
			newArray.push(board[i]);
		}
	}
	return newArray;
}

function winning(board, player) {
	if ((board[0] == player && board[1] == player && board[2] == player) ||
	 (board[3] == player && board[4] == player && board[5] == player) ||
	 (board[6] == player && board[7] == player && board[8] == player) ||
	 (board[0] == player && board[3] == player && board[6] == player) ||
	 (board[1] == player && board[4] == player && board[7] == player) ||
	 (board[2] == player && board[5] == player && board[8] == player) ||
	 (board[0] == player && board[4] == player && board[8] == player) ||
	 (board[2] == player && board[4] == player && board[6] == player)) {
		return true;
	}else {
		return false;
	}
}

function reset() {
	for (var i = 0; i <= 8; i++) {
		document.getElementById(i).innerText = "";
	}
	origBoard = [0,1,2,3,4,5,6,7,8];
	round=0;
	GameCounter = 0;
	document.getElementById("change").innerHTML = "";
	if (humanPlayer == 'x') {
		startGame('x');
	}else {
		round = 1;
		startGame('o');
	}
}