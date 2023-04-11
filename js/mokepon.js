let selectedMascot; //the name of the mascot of the player
let enemy; //the name of the mascot of the enemy
let mascotAttack;// The attack the player has chosen
let enemyAttack; //The attack the enemy has chosen
let result; //The result of each round; victory or defeat

let mascotLives=3; // Lives of the player
let enemyLives=3; // Lives of the enemy

let attackOptions={ 1:"Fuego", // All possible attacks that can be made
                    2:"Agua",
                    3:"Tierra"}

let btnSelectMascot = document.getElementById("btnSelectMascot"); //button to select the mascot
let btnReload = document.getElementById("btnReload"); //button to reload the page
let btnFire = document.getElementById("btnFire");
let btnWater = document.getElementById("btnWater");
let btnEarth = document.getElementById("btnEarth");

let rdHipodoge = document.getElementById("hipodoge"); //radio selectors for the mascot
let rdCapipepo = document.getElementById("capipepo");
let rdRatigueya = document.getElementById("ratigueya");
let rdLangostelvis = document.getElementById("langostelvis");
let rdTucapalma = document.getElementById("tucapalma");
let rdPydos = document.getElementById("pydos");
let enemyOptions={  // All possible mascots the player can select
    1:rdHipodoge.id,
    2:rdCapipepo.id,
    3:rdRatigueya.id,
    4:rdLangostelvis.id,
    5:rdTucapalma.id,
    6:rdPydos.id}

let mascotName = document.getElementById("mascotName");
let enemyName = document.getElementById("enemyName");
let sectionMessages = document.getElementById("messages")
let sectionAttack = document.getElementById("attackSelect");
let sectionMascots = document.getElementById("mascotSelect");
let mascotL = document.getElementById("mascotLives");
let enemyL = document.getElementById("enemyLives");



//assign events for buttons and whatnot ++++++++++++
btnSelectMascot.addEventListener("click",selectMascots)
btnEarth.addEventListener("click",earthAttack);
btnWater.addEventListener("click",waterAttack);
btnFire.addEventListener("click",fireAttack);
btnReload.addEventListener("click",doLoad)


mascotL.innerHTML=mascotLives; //Initialy assing lives to both player and enemy
enemyL.innerHTML=enemyLives;
sectionAttack.style.display = "none";
btnReload.style.display="none";
function selectMascots(){ //let's player select, and selects for the enemy
    var isSelected=true;
    selectedMascot="";
    enemy="";
    if(rdHipodoge.checked){
        selectedMascot=rdHipodoge.id;
    }else if(rdCapipepo.checked){
        selectedMascot=rdCapipepo.id;
    }else if(rdRatigueya.checked){
        selectedMascot=rdRatigueya.id;
    }else if(rdLangostelvis.checked){
        selectedMascot=rdLangostelvis.id;
    }else if(rdTucapalma.checked){
        selectedMascot=rdTucapalma.id;
    }else if(rdPydos.checked){
        selectedMascot=rdPydos.id;
    }else{
        alert("Sie müssen etwas entscheiden")
        isSelected=false;
    }
    mascotName.innerHTML=selectedMascot;
    btnSelectMascot.disabled = true;
    if(isSelected){
        selectEnemy(1,6);
    }
    sectionAttack.style.display = "block";
    sectionMascots.style.display = "none";
    enemyName.innerHTML=enemy;
}

function selectEnemy(min,max){ //selects an enemy
    let randomNumber = generate_random(min,max);
    enemy=enemyOptions[randomNumber];
}

function waterAttack(){ //attacks for each type 
    mascotAttack=attackOptions[2];
    selectEnemyAttack();
    combatResult()
}
function fireAttack(){
    mascotAttack=attackOptions[1];
    selectEnemyAttack();
    combatResult()
}
function earthAttack(){
    mascotAttack=attackOptions[3];
    selectEnemyAttack();
    combatResult()
}
function selectEnemyAttack(){ // selects and attack for the enemy
    var number = generate_random(1,3);
    enemyAttack=attackOptions[number] 
}

function combatResult(){ //evaluates the attacks and gives the output, life deduction
    if(mascotAttack==enemyAttack){
        result="empate";
    }else if(mascotAttack=="Agua" && enemyAttack=="Fuego"){
        result ="Ganaste 🎉"
        enemyLives-- 
    }else if(mascotAttack=="Fuego" && enemyAttack=="Tierra"){
        result ="Ganaste 🎉" 
        enemyLives--
    }else if(mascotAttack=="Tierra" && enemyAttack=="Agua"){
        result ="Ganaste 🎉"
        enemyLives-- 
    }else{
        result="perdiste 😭"
        mascotLives--;
    }
    mascotL.innerHTML=mascotLives;
    enemyL.innerHTML=enemyLives;
    createMessage();
    checkLives();
    
}
function createMessage(){ //creates a message after each attack
    let parrafo = document.createElement("p");
    parrafo.innerHTML="Tu mascota atacó con "+mascotAttack+", la mascota enemiga atacó con "+enemyAttack+" - "+result;
    sectionMessages.appendChild(parrafo);

}

function checkLives(){ //checks wether the enemy or the player has lost 
    let defeat = document.createElement("p");
    if(mascotLives==0){
        defeat.innerHTML = "Has perdido"
        sectionMessages.appendChild(defeat);
        blockButtons();
       btnReload.style.display="block";
    }else if(enemyLives==0){
        defeat.innerHTML="Has ganado"
        sectionMessages.appendChild(defeat);
        blockButtons();
        btnReload.style.display="block";
    }
}
function blockButtons(){ //blocks attack buttons
    btnFire.disabled=true;
    btnEarth.disabled=true;
    btnWater.disabled=true;
}



function doLoad(){//function to reload the page
    location.reload();
 }
 
function generate_random(min,max){//generates a random number
    return Math.floor(Math.random()*(max-min+1))+min;
}


