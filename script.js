let id; //id kliknutog polja
let moves = 0; //broj poteza
let clicked_fields = [0, 0, 0,  //detektujemo koje smo polje kliknuli 
                      0, 0, 0, 
                      0, 0, 0];
let winner;

var fields = document.querySelectorAll('.field');

fields.forEach(field => field.addEventListener('click', game));

function loadUsername() {
    let username = document.getElementById("p_name").value;
    
    console.log(username);       
    return username;
};

let username=loadUsername(); //ucitavamo ime igraca

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
     
        check_board(); 
        if(winner===1){
            //console.log(username);
            sendResult(username, moves);
            restart_game();
        }
        else if(winner===2){
            sendResult('computer', moves);
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
const sendResult = async (username, moves) => {
    try { 
        const URL = 'http://localhost:3002/';
        const response = await fetch(URL, {
            method : 'POST',
            headers : {
                'Content-Type': 'application/json'
            },
            mode : 'cors',
            body : JSON.stringify({
                name : username,
                score : moves
            })
        });
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        
    } catch (err) {
        console.error(err);
    }
};