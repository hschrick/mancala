
	var p1score = document.getElementById("p1score");
    var pit1count = document.getElementById("pit1count");
    var pit2count = document.getElementById("pit2count");
    var pit3count = document.getElementById("pit3count");
    var pit4count = document.getElementById("pit4count");
    var pit5count = document.getElementById("pit5count");
    var pit6count = document.getElementById("pit6count");
    var pit7count = document.getElementById("pit7count");
    var pit8count = document.getElementById("pit8count");
    var pit9count = document.getElementById("pit9count");
    var pit10count = document.getElementById("pit10count");
    var pit11count = document.getElementById("pit11count");
    var pit12count = document.getElementById("pit12count");
    var p2score = document.getElementById("p2score");

    //decides the turn of the player
    var turn = 1;

    var blimp = document.getElementById('blimp');
    blimp.src = "player1.png";

    var rock = document.createElement('pebble');

	var player1pitcount = [4,4,4,4,4,4,0,4,4,4,4,4,4,0];
	var slots = [pit6count, pit5count, pit4count, pit3count, pit2count, pit1count, 
            p1score, pit7count, pit8count, pit9count, pit10count, pit11count, 
            pit12count, p2score];


    
                
    
        

    //Build the game with starting positions.
	function buildGame() {
        document.getElementById('ui').style.display = "none";

        turn = 1;
        blimp.src = "player1.png";

        
        
		for (i = 0; i < 14; i += 1) {
			slots[i].innerHTML = player1pitcount[i];


                   
          //document.getElementById('tile-' + i).removeChild(rock);
		}
}


    function manageRocks(){
        
        

            
        for (var i = 0; i < 14; i++) {
            const tile = i;
             tileElement = document.getElementById("tile-" + i);
           // tileElement.removeChild(rock.removeChild[0]);
            tileElement.removeChild(rock.lastChild);
        }
        
    }

    
    //switch players turn when called
    function turnswitcher(){
        if(turn == 1){
            turn = 2;
            blimp.src = "player2.png";
        }
        else if(turn == 2){
            turn = 1;
            blimp.src = "player1.png";
        }
    }


    function attemptMove(tileIndex){
        //takes the value of the tile selected
        var curTile = slots[tileIndex].innerHTML;


        //if you click on a tile with value 0, must rechoose
        if (slots[tileIndex].innerHTML == 0) {
            return;
        }

        //tells us if the tile is valid to make move
        if (slots[tileIndex].innerHTML > 0) {
        //removes all pieces from tile I.E picked up
            slots[tileIndex].innerHTML = 0;
        for (var i = 0; i < curTile; i++) {
            if (slots[tileIndex] == 0) {
                slots[tileIndex = 0].innerHTML;
            }
            //moves to next tile
            slots[tileIndex++].innerHTML;
            //if array is at max bring it to zero.
            if (tileIndex == 14) {
                tileIndex = 0;
            }
            //if you hit opponents pit, skip it
            if(turn == 1 && tileIndex == 6) {
                tileIndex = 7;
            }
            else if (turn == 2 && tileIndex == 13) {
                tileIndex = 0;
            }
            //add pebble to pit
            slots[tileIndex].innerHTML++;
            }//end of loop
            //if after we incremented the last index amnt it is 1 then take adjacent.
            if (slots[tileIndex].innerHTML == 1) {
                if (turn == 1) {
                    adjacentTakeAllCheckPlayer1(tileIndex);
                }
                else {
                    adjacentTakeAllCheckPlayer2(tileIndex);
                }
                
            }
        }


          checkEndGame(tileIndex);
           
           //manageRocks();
    }

    function checkEndGame(tileIndex){
        
        if(slots[7].innerHTML == 0 && slots[8].innerHTML == 0 && slots[9].innerHTML == 0 
            && slots[10].innerHTML == 0 && slots[11].innerHTML == 0 
            && slots[12].innerHTML == 0)
        {
            slots[6].innerHTML = parseFloat(slots[5].innerHTML) + parseFloat(slots[4].innerHTML) + parseFloat(slots[3].innerHTML) + parseFloat(slots[2].innerHTML) + parseFloat(slots[1].innerHTML) + parseFloat(slots[0].innerHTML) + parseFloat(slots[6].innerHTML);
            commitEndGame();
            return;
        }

       else if(slots[0].innerHTML == 0 && slots[1].innerHTML == 0 && slots[2].innerHTML == 0 
            && slots[3].innerHTML == 0 && slots[4].innerHTML == 0 
            && slots[5].innerHTML == 0)
        {
            slots[13].innerHTML = parseFloat(slots[7].innerHTML) + parseFloat(slots[8].innerHTML) + parseFloat(slots[9].innerHTML) + parseFloat(slots[10].innerHTML) + parseFloat(slots[11].innerHTML) + parseFloat(slots[12].innerHTML) + parseFloat(slots[13].innerHTML);
            commitEndGame();
            return;
        }


            //These two statements allow for users to get a consecutive turn
            //if turn 1 and you dont land on score pit then you can switch
            if(turn == 1 && tileIndex != 13) {
                //switch turns
                turnswitcher();
            }
            //if turn 2 and you dont land on score pit then you can switch
            else if(turn == 2 && tileIndex != 6) {
                //switch turns
                turnswitcher();
            }
    }

    function commitEndGame(){
        slots[0].innerHTML = 0;
        slots[1].innerHTML = 0;
        slots[2].innerHTML = 0;
        slots[3].innerHTML = 0;
        slots[4].innerHTML = 0;
        slots[5].innerHTML = 0;
        slots[7].innerHTML = 0;
        slots[8].innerHTML = 0;
        slots[9].innerHTML = 0;
        slots[10].innerHTML = 0;
        slots[11].innerHTML = 0;
        slots[12].innerHTML = 0;
        document.getElementById('ui').style.display = "block";
        
            if (slots[6].innerHTML > slots[13].innerHTML) { displayWinner2();}
            if (slots[13].innerHTML > slots[6].innerHTML) { displayWinner1();}
            if (slots[6].innerHTML == slots[13].innerHTML) { displayTie();}
    }

   function displayWinner2(){
        displayMessage("Player 2 Wins");
        blimp.src = "player2.png";
    } 

    function displayWinner1(){
        displayMessage("Player 1 Wins");
        blimp.src = "player1.png";
    } 

    function displayTie(){
        displayMessage("Its a Tie");
    } 

    function displayMessage(message) {
  document.getElementById('ui').innerHTML = message;
}
    //checks the adjacent depending on whos turn it is when piece lands
    function adjacentTakeAllCheckPlayer1(tileIndex){
        var takeTile = 0;
         
           if (slots[tileIndex].innerHTML == slots[7].innerHTML) {
              takeTile = slots[5].innerHTML;
              slots[5].innerHTML = 0;
              slots[13].innerHTML = parseFloat(slots[13].innerHTML) + parseFloat(takeTile) + 1;
              slots[7].innerHTML--;
            }
            else if (slots[tileIndex].innerHTML == slots[8].innerHTML) {
              takeTile = slots[4].innerHTML;
              slots[4].innerHTML = 0;
              slots[13].innerHTML = parseFloat(slots[13].innerHTML) + parseFloat(takeTile) + 1;
              slots[8].innerHTML--;
            }
            else if (slots[tileIndex].innerHTML == slots[9].innerHTML) {
              takeTile = slots[3].innerHTML;
              slots[3].innerHTML = 0;
              slots[13].innerHTML = parseFloat(slots[13].innerHTML) + parseFloat(takeTile) + 1;
              slots[9].innerHTML--;
            }
            else if (slots[tileIndex].innerHTML == slots[10].innerHTML) {
             takeTile = slots[2].innerHTML;
              slots[2].innerHTML = 0;
              slots[13].innerHTML = parseFloat(slots[13].innerHTML) + parseFloat(takeTile) + 1;
              slots[10].innerHTML--;
            }
            else if (slots[tileIndex].innerHTML == slots[11].innerHTML) {
             takeTile = slots[1].innerHTML;
              slots[1].innerHTML = 0;
              slots[13].innerHTML = parseFloat(slots[13].innerHTML) + parseFloat(takeTile) + 1;
              slots[11].innerHTML--;
            }
           else if (slots[tileIndex].innerHTML == slots[12].innerHTML) {
             takeTile = slots[0].innerHTML;
             slots[0].innerHTML = 0;
            slots[13].innerHTML = parseFloat(slots[13].innerHTML) + parseFloat(takeTile) + 1;
            slots[12].innerHTML--;
            }
    }

    //checks the adjacent depending on whos turn it is when piece lands
    function adjacentTakeAllCheckPlayer2(tileIndex){
        var takeTile = 0;
         
           if (slots[tileIndex].innerHTML == slots[5].innerHTML) {
              takeTile = slots[7].innerHTML;
              slots[7].innerHTML = 0;
              slots[6].innerHTML = parseFloat(slots[6].innerHTML) + parseFloat(takeTile) + 1;
              slots[5].innerHTML--;
            }
            else if (slots[tileIndex].innerHTML == slots[4].innerHTML) {
              takeTile = slots[8].innerHTML;
              slots[8].innerHTML = 0;
              slots[6].innerHTML = parseFloat(slots[6].innerHTML) + parseFloat(takeTile) + 1;
              slots[4].innerHTML--;
            }
            else if (slots[tileIndex].innerHTML == slots[3].innerHTML) {
              takeTile = slots[9].innerHTML;
              slots[9].innerHTML = 0;
              slots[6].innerHTML = parseFloat(slots[6].innerHTML) + parseFloat(takeTile) + 1;
              slots[3].innerHTML--;
            }
            else if (slots[tileIndex].innerHTML == slots[2].innerHTML) {
             takeTile = slots[10].innerHTML;
              slots[10].innerHTML = 0;
              slots[6].innerHTML = parseFloat(slots[6].innerHTML) + parseFloat(takeTile) + 1;
              slots[2].innerHTML--;
            }
            else if (slots[tileIndex].innerHTML == slots[1].innerHTML) {
             takeTile = slots[11].innerHTML;
              slots[11].innerHTML = 0;
              slots[6].innerHTML = parseFloat(slots[6].innerHTML) + parseFloat(takeTile) + 1;
              slots[1].innerHTML--;
            }
           else if (slots[tileIndex].innerHTML == slots[0].innerHTML) {
             takeTile = slots[12].innerHTML;
             slots[12].innerHTML = 0;
            slots[6].innerHTML = parseFloat(slots[6].innerHTML) + parseFloat(takeTile) + 1;
            slots[0].innerHTML--;
            }
        
    }




    


    //Attach click listeners to all tiles.
    for (var i = 0; i < 14; i++) {
        const tile = i;
        document.getElementById('tile-' + tile)
        .addEventListener('click', function(event){
            event.preventDefault();

            //checks for player 1's turn
            if (turn == 1) {
            //if the current tile clicked is not the score pits then attempt to move
            if (!(tile == 6 || tile == 13 || tile == 0 || tile == 1 || tile == 2 || tile == 3 || tile == 4 || tile == 5)) {
                attemptMove(tile);
            }
            }
            //checks for player 2's turn
            else if(turn == 2){
            if (!(tile == 6 || tile == 13 || tile == 7 || tile == 8 || tile == 9 || tile == 10 || tile == 11 || tile == 12)) {
                attemptMove(tile);
            }
            }
        });
        }


        /*
        var tile = 0;
        //creates starting amount of rocks
        for (var a = 0; a < slots.length; a++) {
            
            var tileElement = document.getElementById("tile-" + a);
            alert(slots[a].tileElement);
           for (var j = 0; j < tile; j++) {
                if(a != 6){
                if (a != 13) {
          var rock = document.createElement('div');
          rock.id = 'pebble'; 
          tileElement.appendChild(rock);
                }
              }
            }  
        }
*/

        
    
