// Constants
const players = ["Player 2","Player 1"];

// Global Variables
var turn = 1;
			 
var score = [0,0];
	
var board = [ [null, null, null, null, null, null],
			  [null, null, null, null, null, null] ];

//sets up board
newGame();

/** @function movePebbles
  * Moves pebbles from a selected cup.
  * @param {Object} cup - the selected cup from which the pebbles are being moved from.
  */
function movePebbles(cup){
	
	var player = turn;
	
	if(cup.row != turn){
		displayInvalidMove();
	}else if(cup.pebbles <= 0){
		displayEmptyCup();
	} else {		
		var x = cup.row;
		var y = cup.column;	
		var numOfPebbles = cup.pebbles;
		cup.pebbles = 0;
		document.getElementById('UI').innerHTML = numOfPebbles + " pebble(s) have been moved.";
		document.getElementById("cup"+cup.row+cup.column).innerHTML = cup.pebbles;
		
		for(numOfPebbles; numOfPebbles > 0; numOfPebbles--){			
			if(x==0 && y==0){
				score[0]++;
				x++;
				y--;
				document.getElementById('scoringCup0').innerHTML = score[0];
				displayPebbleInGoal(0,score[0]);
			} else if (x==1 && y==5){
				score[1]++;
				x--;
				y++;
				document.getElementById('scoringCup1').innerHTML = score[1];
				displayPebbleInGoal(1,score[1]);
			} else if (x==0){
				y--;
				board[x][y].pebbles++;
				document.getElementById('cup'+x+y).innerHTML = board[x][y].pebbles;
				displayPebbleInCup(x,y,board[x][y].pebbles);
			} else if (x==1){
				y++;
				board[x][y].pebbles++;
				document.getElementById('cup'+x+y).innerHTML = board[x][y].pebbles;
				displayPebbleInCup(x,y,board[x][y].pebbles);
			}	
		}
		
		if(checkEndGame(player)){
			endGame();
		} else {
			if((x==1 && y==-1) || (x==0 && y==6)){
				setTimeout(displayTurn,2000);
			} else {
				setTimeout(updateTurn, 2000);
				setTimeout(displayTurn,2000);
			}
		}

	}
}

/** @function displayPebbleInCup
  * Shows the current number of pebbles in a cup on the mancala board. Is called
  * in function movePebbles after a player moves a pebble
  * @param {integer} row - row numbr given cup is located in.
  * @param {integer} column - column number given cup is loated in.
  * @param {integer} num - number of pebbles in cup.
  */
function displayPebbleInCup(row,column,num){
	for(num; num > 0; num--){
		var pebble = document.createElement('div');
		pebble.classList.add("pebble");
		if(num > 10){
			var temp = (num - 10)*15;
			pebble.setAttribute("Style","top:"+temp+"px; left:45px;");
		} else if (num > 5){
			var temp = (num - 5)*15;
			pebble.setAttribute("Style","top:"+temp+"px; left:30px;");
		} else {
			var temp = num*15;
			pebble.setAttribute("Style","top:"+temp+"px; left:15px;");
		} 		
		var cup = document.getElementById('cup'+row+column);
		cup.appendChild(pebble);
	}
}

/** @function displayPebbleInGoal
  * Shows the current number of pebbles in a player's scoring cup. Is called in 
  * funtion movePebbles after a player scores.
  * @param {integer} playerCup - the number corresponding to the player's cup.
  * @param {integer} num - the number of pebbles in a player's scoring cup.
  */
function displayPebbleInGoal(playerCup,num){
	for(num; num > 0; num--){
		var pebble = document.createElement('div');
		pebble.classList.add("pebble");
		if(num > 24){			
			var temp = (num - 24)*20;
			pebble.setAttribute("Style","top:"+temp+"px; left:70px;");
		} else if(num > 16){
			var temp = (num - 16)*20;
			pebble.setAttribute("Style","top:"+temp+"px; left:55px;");
		} else if (num > 8){
			var temp = (num - 8)*20;
			pebble.setAttribute("Style","top:"+temp+"px; left:40px;");
		} else {
			var temp = num*20;
			pebble.setAttribute("Style","top:"+temp+"px; left:25px;");
		} 
		var cup = document.getElementById('scoringCup'+playerCup);
		cup.appendChild(pebble);
	}
}

/** @function displayEmptyCup
  * Notifies current player that they are trying to move pebbles from an 
  * empty cup
  */
function displayEmptyCup(){
	displayMessage("Please select a cup with pebbles!");
	setTimeout(displayTurn, 2000);
}	

/** @function displayInvalidMove
  * Notifies current player that they are trying to make an invalid move
  */
function displayInvalidMove(){
	displayMessage("Please select a cup on "+ players[turn] +"'s side of the board!");
	setTimeout(displayTurn, 2000);
}

/** @function displayTurn
  * Displays which player's turn it is.
  */
function displayTurn(){
	displayMessage("It is "+ players[turn]+"'s turn!");
}

/** @function updateTurn
  * Updates turn to the next player
  */
function updateTurn(){
	if( turn == 0 ){
		turn = 1;
	} else {
		turn = 0;
	}
}

/** @function displayMessage
  * Displays a message to the players
  * @param {string} message - message wanting to be displayed to players
  */
function displayMessage(message) {
	document.getElementById('UI').innerHTML = message;
}

/** @function checkEndGame
  * Checks if a player has cleared their side of the board and calls endGame if so.
  * @param {integer} player - player's side being evaulated.
  */
function checkEndGame(player){
	for(var i = 0; i < 6; i++){
		if(board[turn][i].pebbles >= 1){
			return false;
		}
	}
	return true;
}

/** @function endGame
  * Scores the remaining pebbles on the board and tallies the scores to determine a 
  * winner to the game.
  */
function endGame(){
	
	updateTurn();
	for(var i = 0; i < 6; i++){
		score[turn] = score[turn] + board[turn][i].pebbles
		document.getElementById('cup'+turn+i).innerHTML = 0;
	}
	document.getElementById('scoringCup'+turn).innerHTML = score[turn];
	displayPebbleInGoal(turn,score[turn]);
	if(score[1] > score[0]){
		displayMessage("Game Over! "+players[1]+" Wins with a score of "+score[1]+"!");
	} else if(score[0] > score[1]){
		displayMessage("Game Over! "+players[0]+" Wins with a score of "+score[0]+"!");
	} else {
		displayMessage("Game Over! It's a TIE with a score of 18!");
	}
}

/** @function newGame
  * Allows the user to start a new game when the click on the "New Game" Button
  */
function newGame(){
	
	turn = 1;
	score = [0,0];
	
	board = [ [null, null, null, null, null, null],
			  [null, null, null, null, null, null] ];
			  
	for(var i = 0; i < 2; i++){
		for(var j = 0; j < 6; j++){
			board[i][j] = new cup(i, j, 3);
			document.getElementById("cup"+i+j).innerHTML = 3;
			displayPebbleInCup(i,j,3);
		}
	}
	
	document.getElementById('scoringCup1').innerHTML = 0;
	document.getElementById('scoringCup0').innerHTML = 0;	
	displayTurn();
}
