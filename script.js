
canvas=document.getElementById("canvas");
ctx=canvas.getContext('2d');

var board=[[0, 0, 0, 0], [0, 0, 0, 2],
           [0, 0, 0, 0], [0, 0, 0, 0]];
var colors=["gray", "yellow", "orange", "red",
            "bisque", "coral","blue", "palegreen", 
            "pink", "purple", "linen", "brown"];

var score=0;

//show board 4x4
function  display(){
    console.log(board);
    for(var i=0; i<4; i++)
        for(var j=0; j<4; j++){
            if(board[i][j]!=0)
                ctx.fillStyle=colors[Math.log2(board[i][j])];
            else
                ctx.fillStyle="azure";
                
            ctx.fillRect(i*100, j*100, 99, 99);
            ctx.beginPath();
            ctx.rect(i*100, j*100, 100, 100);
            ctx.stroke();
            if(board[i][j]!=0){
                ctx.font="30px Arial";
                ctx.fillStyle="black";
                ctx.textAlign="center";
                ctx.fillText(board[i][j], i*100+50, j*100+60);
            }
            
        }
}

display();
var disable=0;

window.addEventListener('keydown', function (e) {
    if( disable==1)
	   return;
	
    key = e.keyCode;
    if(key==37){
    	e.preventDefault();
    	left_key();
    }
    if(key==38){
    	e.preventDefault();
    	up_key();
    }
    if(key==39){
    	e.preventDefault();
    	right_key();
    }
    if(key==40){
    	e.preventDefault();
    	down_key();
    }
	
	//if everything is full.
	var count=0;
	for(var i=0;i<4;i++)
	for(var j=0;j<4;j++){
		if( board[i][j]==0){
            count++;
 		}  
	}
	
	if(count==0){
        gameover();
	 return;
	}
	else{
	    var n=Math.floor(Math.random()*16);
	    for(;n<32;n++){
	        m=n%16;
	        if(board[Math.floor(m/4)][m%4]==0){
                board[Math.floor(m/4)][m%4]=2;
	            break;
	        }
	    }
    }
	 display();
});

function left_key(){
    for(var i=0; i<4; i++){
        for(var j=0; j<4; j++){
            if(board[i][j]){
                var row=i;
                while(row){
                    if(!board[row-1][j]){
                        board[row-1][j]=board[row][j];
                        board[row][j]=0;
                        row--;
                    }
                    else if(board[row-1][j]==board[row][j]){
                        board[row-1][j]*=2;
                        score+=board[row-1][j];
                        board[row][j]=0;
                        break;
                    }
                    else
                        break;
                }
            }
        }
    }
}

function right_key() {
  var i, j, row;
  for(j = 0; j < 4; j++) {
    for(i = 4 - 2; i >= 0; i--) {
      if(board[i][j]) {
        row = i;
        while (row + 1 < 4) {
          if (!board[row + 1][j]) {
            board[row + 1][j] = board[row][j];
            board[row][j] = 0;
            row++;
          } else if (board[row][j] == board[row + 1][j]) {
            board[row + 1][j] *= 2;
            score +=  board[row + 1][j];
            board[row][j] = 0;
            break;
          } else {
            break; 
          }
        }
      }
    }
  }
}

function down_key() {
  var i, j;
  var coll;
  for(i = 0; i < 4; i++) {
    for(j = 4 - 2; j >= 0; j--) {
      if(board[i][j]) {
        coll = j;
        while (coll + 1 < 4) {
          if (!board[i][coll + 1]) {
            board[i][coll + 1] = board[i][coll];
            board[i][coll] = 0;
            coll++;
          } else if (board[i][coll] == board[i][coll + 1]) {
            board[i][coll + 1] *= 2;
            score +=  board[i][coll + 1];
            board[i][coll] = 0;
            break;
          } else {
            break;
          }
        }
      }
    }
  }
}

function up_key() {
  var i, j;
  var coll;
  for(i = 0; i < 4; i++) {
    for(j = 1; j < 4; j++) {
      if(board[i][j]) {
        coll = j;
        while (coll - 1 >= 0) {
          if (!board[i][coll - 1]) {
            board[i][coll - 1] = board[i][coll];
            board[i][coll] = 0;
            coll--;
          } else if (board[i][coll] == board[i][coll - 1]) {
            board[i][coll - 1] *= 2;
            score +=   board[i][coll - 1];
            board[i][coll] = 0;
            break;
          } else {
            break; 
          }
        }
      }
    }
  }
}

function gameover(){
    ctx.font = "40px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER!!", 200,180); 
    disable=1;
}
