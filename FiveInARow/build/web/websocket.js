/* 
 This javascript file is to handle client request and server response
 */

window.onload = init;
//url of web socket server
var socket = new WebSocket("ws://192.168.0.40:8080/FiveInARow/actions");
socket.onmessage = onMessage;
var playername='';
var disableColorChoice = false;
var enableMove = true; //flag to enable alternative moves
//chess board details
var board = new Array(13);
var EMPTY=0;
var WHITE=1;
var BLACK=2;
var key = 15; //key for encryption /decryption

//handle servers response and perform necessary client action 
function onMessage(event) {
    var player = JSON.parse(event.data);
    if (player.action === "button_clicked") {
       console.log(player.action);
       console.log(player.status);
       console.log('Encrypted Coordinated'+player.coordinate);
       console.log(player.playername);
       console.log(player.colorname);
       /*if(player.coordinate ==="")
       {
           enableMove =true;
           console.log("Coordinate is empty");
           return;
       }*/
       var x =  parseInt(player.coordinate.split("x")[0])-key;
       var y =   parseInt(player.coordinate.split("x")[1])-key;
       var coordinate = ""+x+"x"+y;
       console.log('Decrypted coordinate'+coordinate);
       document.getElementById(coordinate).disabled = true;
       var colorname ='';
       if(player.colorname==="black")
       {
           //change background color of button to black
            document.getElementById(coordinate).style.background='#000000';
            colorname = '#000000';
            board[x][y]=BLACK;
       }
       else
       {
            //change background color of button to white
           document.getElementById(coordinate).style.background='#FFFFFF';
           colorname = '#FFFFFF';
           board[x][y]=WHITE;

       }
       //console.log(isWinner(colorname,player.coordinate.split("x")[0],player.coordinate.split("x")[1]));
      //console.log(isWinner(player.coordinate.split("x")[0],player.coordinate.split("x")[1]));
      
       console.log('Disable color choice:'+disableColorChoice);
        //For First Time
        if(!disableColorChoice)
        {
            disableColorChoice = true;
            console.log('Disable color choice:'+disableColorChoice);
            if(player.colorname==="black" && document.getElementById("playerName").value==="")
                document.getElementById("whiteColor").checked =true;
            if(player.colorname==="white" && document.getElementById("playerName").value==="")
                document.getElementById("blackColor").checked = true;
            document.getElementById("blackColor").disabled =true;
            document.getElementById("whiteColor").disabled = true;
        }
      if(document.getElementById("playerName").value !== player.playername)
      {
          enableMove = true; 
          console.log("re-enabling move");
      }
       //if(isWinner(player.coordinate.split("x")[0],player.coordinate.split("x")[1])===true)
//      if(isWinner(colorname,player.coordinate.split("x")[0],player.coordinate.split("x")[1])===true)
     //determine winning move
      var winner =isWinner();
      console.log("winner is:"+winner);
      if (winner!==0)
      {
          //announce winner and start new game
          alert("Winner is :"+player.playername);
          startNewGame();
      }
      else
      {
          //check for game draw
          if(isDraw()===true)
          {
              alert("Match Draw!!!");
              startNewGame();
          }
      }
    }
 }

//Create users move JSON object and send it to server
function addPlayersMove(playerName,colorName, co_ordinate) {
    var ButtonAction = {
        action:"button_clicked",
        status: "On",
        coordinate:co_ordinate,
        playername:playerName,
        colorname:colorName
    };
    socket.send(JSON.stringify(ButtonAction)); 
}

//Action performed when button is clicked
function formSubmit() {
            document.getElementById("tableGrid").onclick = handleButtonClick;    
}

//Handle button click event and read current coordinate
function handleButtonClick(event) {
    var playerName= document.getElementById("playerName").value;
    var color_elements = document.getElementsByName("colorName");
    var colorName='';

    for(var i = 0; i < color_elements.length; i++) {
        if(color_elements[i].checked)
            colorName = color_elements[i].value;
    }
    if (playerName==="")
    {
        alert('Please enter your name to get started');
    }
    if (colorName==="")
    {
        alert('Please select color to get started');
    }
    
    if(playerName && colorName)
    {
        if(enableMove)
        {     
            if(event.target.id === "")
            {
                alert("Unable to detect click.Please click on button properly");
                return;
            }
            var X = parseInt(event.target.id.split("x")[0])+key;
            var Y = parseInt( event.target.id.split("x")[1])+key;
            var coordinate = ""+X+"x"+Y;
            console.log('X:'+X);
            console.log('Y:'+Y);
            
            //addPlayersMove(playerName,colorName,event.target.id);
            addPlayersMove(playerName,colorName,coordinate);
            enableMove = false; 
        }
        else
        {
            alert("Wait for opponents move");
        }
    }
}
//to initialize chase board
function init(){
    for (var i = 0; i < 13; i++) {
        board[i] = new Array(13);
    } 
    
    for(var i=0;i<13;i++){
        for(var j=0;j<13;j++){
            board[i][j]=EMPTY;
        }
    }
   
}

//start new game
function startNewGame() {

    //enable all button and reset color
    for(var i=0;i<13;i++)
    {
        for(var j=0;j<13;j++)
        {
            document.getElementById(i+"x"+j).disabled =false;
            document.getElementById(i+"x"+j).style.background="#f2791d";
        }
    }
    for(var i=0;i<13;i++){
        for(var j=0;j<13;j++){
            board[i][j]=EMPTY;
        }
    }

}

//determine winner
function isWinner()
{
    for (var row = 0; row < 13; row++) {
        for (var col = 0; col < 13; col++) {
            var p = board[row][col];
            if (p !== EMPTY) {
                //  4 kinds of rows of 5
                //  1. a column going up
                //  2. a row going to the right
                //  3. a diagonal up and to the right
                //  4. a diagonal up and to the left

                if (row < 13-4) // Look up
                    if (_count5(row, 1, col, 0)) return p;

                if (col < 13-4) { // row to right
                    if (_count5(row, 0, col, 1))  return p;

                    if (row < 13-4) { // diagonal up to right
                        if (_count5(row, 1, col, 1)) return p;
                    }
                }
                if (col > 3 && row < 13-4) { // diagonal up left
                    if (_count5(row, 1, col, -1)) return p;
                }
            }//end if position wasn't empty
        }//end for row
    }//end for col
    return 0;
}

//count 5 moves to determine win
function _count5( r,  dr,  c,  dc) {
    var player = board[r][c];  // remember the player.
    for (var i = 1; i < 5; i++) {
        if (board[r+dr*i][c+dc*i] !== player) return false;
    }
    return true;  // There were 5 in a row!
}

//determine game draw condition
function isDraw(){
    for(var r=0;r<13;r++){
        for(var c=0;c<13;c++){
            if(board[r][c]=== EMPTY)
                return false;
        }
    }
    return true;
}