let id; //id kliknutog polja
let moves = 0; //broj poteza
let clicked_fields = [0, 0, 0,  //detektujemo koje smo polje kliknuli 
                      0, 0, 0, 
                      0, 0, 0];
let winner;
let username="";
var fields = document.querySelectorAll('.field');

fields.forEach(field => field.addEventListener('click', game));

function loadUsername() {
    username = document.getElementById("p_name").value; //ucitavamo ime igraca
    
    console.log(username);
};

function start_game() {
  let enter_name = document.getElementById("player");
  if(enter_name.style.display === "none"){
      enter_name.style.display = "none";
  } 
  else{
  enter_name.style.display = "block"; //prikazi polje za unos imena
  }
}

function game() {
     if(clicked_fields[id] === 0) {
        document.getElementById(id).innerHTML = "X";
        clicked_fields[id] = 1;
        
        this.removeEventListener('click', game);
        moves++;
        //console.log(username + ' from game');
        check_board(); 
        if(winner===1){
            
            sendResult(username);
            restart_game();
        }
        else if(winner===2){
            sendResult('computer');
            restart_game();
        }
        else {
        let num = Math.floor((Math.random() * 9));
        while(clicked_fields[num] != 0) 
            num = Math.floor((Math.random() * 9));
    
        document.getElementById(num).innerHTML = "O";
        
        clicked_fields[num] = 2;
      
        fields[num].removeEventListener('click', game);
        moves++;
        }
     }
}

// proveri stanje na tabeli
function check_board() {
    winner = 0;
   if( (clicked_fields[0]==1 && clicked_fields[1]==1 && clicked_fields[2]==1) ||
       (clicked_fields[3]==1 && clicked_fields[4]==1 && clicked_fields[5]==1) ||
       (clicked_fields[6]==1 && clicked_fields[7]==1 && clicked_fields[8]==1) ||
       (clicked_fields[0]==1 && clicked_fields[3]==1 && clicked_fields[6]==1) ||
       (clicked_fields[1]==1 && clicked_fields[4]==1 && clicked_fields[7]==1) ||
       (clicked_fields[2]==1 && clicked_fields[5]==1 && clicked_fields[8]==1) ||
       (clicked_fields[0]==1 && clicked_fields[4]==1 && clicked_fields[8]==1) ||
       (clicked_fields[2]==1 && clicked_fields[4]==1 && clicked_fields[6]==1)) {
        winner = 1;
    }
    else if( (clicked_fields[0]==2 && clicked_fields[1]==2 && clicked_fields[2]==2) ||
             (clicked_fields[3]==2 && clicked_fields[4]==2 && clicked_fields[5]==2) ||
             (clicked_fields[6]==2 && clicked_fields[7]==2 && clicked_fields[8]==2) ||
             (clicked_fields[0]==2 && clicked_fields[3]==2 && clicked_fields[6]==2) ||
             (clicked_fields[1]==2 && clicked_fields[4]==2 && clicked_fields[7]==2) ||
             (clicked_fields[2]==2 && clicked_fields[5]==2 && clicked_fields[8]==2) ||
             (clicked_fields[0]==2 && clicked_fields[4]==2 && clicked_fields[8]==2) ||
             (clicked_fields[2]==2 && clicked_fields[4]==2 && clicked_fields[6]==2)) {
        winner = 2;
 }
}

// id polja na koje je kliknuto
function reply_click(clicked_id) {
    id = clicked_id;
}

//restartovanje igrice
function restart_game(){
  moves = 0; 
  clicked_fields = [0, 0, 0, 
                    0, 0, 0, 
                    0, 0, 0];
  winner=0;
  
  for(let i=0; i<9; i++){
    document.getElementById(i).innerHTML = "";
  }
  fields.forEach(field => field.addEventListener('click', game));
}

//pozovamo kad neko pobedi
const sendResult = async (username) => {
    try { 
        const URL = 'http://localhost:3002/';
        const response = await fetch(URL, {
            method : 'POST',
            headers : {
                'Content-Type': 'application/json'
            },
            mode : 'cors',
            body : JSON.stringify({
                name : username
            })
        });
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        
    } catch (err) {
        console.error(err);
    }
};