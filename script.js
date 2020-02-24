var fields = document.querySelectorAll('.field');

let id; //id kliknutog polja
let moves = 0; //broj poteza
let clicked_fields = [0, 0, 0,  //detektujemokoje smo polje kliknuli 
                      0, 0, 0, 
                      0, 0, 0];
let winner;

fields.forEach(field => field.addEventListener('click', game));

function start_game() {
  let enter_name = document.getElementById("player");
  if(enter_name.style.display === "none"){
      enter_name.style.display = "none";
  } 
  else{
  enter_name.style.display = "block"; //prikazi polje za unos imena
  }
}

// igrac je prvi na potezu
function game() {
  let ind_player = player_turn();
  if(ind_player)
      computer_turn();
}

function player_turn() {
  // proveri da li ima pobednika
  if(moves == 9) { //proveravamo da li je nereseno ili je ipak neko pobedio
      check_board();
      
      if(winner == 0) 
          alert("Nereseno")
      else if (winner == 1)
          alert("Pobedili ste");
      else
          alert("Nazalost, niste uspeli da pobedite");
      return false;
  }
  
  if(clicked_fields[id] == 0) {
      document.getElementById(id).innerHTML = "X";
      clicked_fields[id] = 1;
      
      this.removeEventListener('click', game);
      moves++;
      
      check_board();
      if(winner == 1) {
          alert("Pobedili ste");
          exit();
          return false;
      }
      else if(winner == 2) {
          alert("Nazalost, niste uspeli da pobedite");
          exit();
          return false;
      }
  } else {
      return false;
  }
  
  return true;
}

// racunar je na potezu
function computer_turn() {
  // da li ima pobednika
  if(moves == 9) {
      check_board();
      
      if(winner == 0) 
          alert("Nereseno")
      else if (winner == 1)
          alert("Pobedili ste")
      else 
          alert("Nazalost, niste uspeli da pobedite")
      return;
  }
  
  let num = Math.floor((Math.random() * 9));
  while(clicked_fields[num] != 0) 
      num = Math.floor((Math.random() * 9));
  id = num;
  document.getElementById(num).innerHTML = "O";
  clicked_fields[num] = 2;
  
  
  fields[num].removeEventListener('click', game);
  moves++;
  
  check_board();
  if(winner == 1) {
      alert("Pobedili ste");
      exit();
  }
  else if(winner == 2) {
      alert("Nazalost, niste uspeli da pobedite");
      exit();
  }
  
  return;
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
    return;
}

function exit() {
  fields.forEach(field => field.removeEventListener('click', game));
}

// id polja na koje je kliknuto
function reply_click(clicked_id) {
    id = clicked_id;
}

function restart_game(){
  let ind_player=player_turn();
  let moves = 0; 
  let clicked_fields = [0, 0, 0, 
                        0, 0, 0, 
                        0, 0, 0];
  let winner=0;
}