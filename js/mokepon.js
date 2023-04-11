//declaration of variables ++++++++++++++++++++++++
let selectedMascot;
let enemy;
let mascotAttack;
let enemyAttack;
let result;

let mascotLives=3;
let enemyLives=3;

//Get elements from html +++++++++++++++++++++++
let btnSelectMascot = document.getElementById("btnSelectMascot");
let btnReload = document.getElementById("btnReload");
let btnFire = document.getElementById("btnFire");
let btnWater = document.getElementById("btnWater");
let btnEarth = document.getElementById("btnEarth");

let rdHipodoge = document.getElementById("hipodoge");
let rdCapipepo = document.getElementById("capipepo");
let rdRatigueya = document.getElementById("ratigueya");
let rdLangostelvis = document.getElementById("langostelvis");
let rdTucapalma = document.getElementById("tucapalma");
let rdPydos = document.getElementById("pydos");
let mascotName = document.getElementById("mascotName");
let enemyName = document.getElementById("enemyName");
let sectionMessages = document.getElementById("messages")
let mascotL = document.getElementById("mascotLives");
let enemyL = document.getElementById("enemyLives");
mascotL.innerHTML=mascotLives;
enemyL.innerHTML=enemyLives;

let enemyOptions={  
    1:rdHipodoge.id,
    2:rdCapipepo.id,
    3:rdRatigueya.id,
    4:rdLangostelvis.id,
    5:rdTucapalma.id,
    6:rdPydos.id}
let attackOptions={ 1:"Fuego",
                    2:"Agua",
                    3:"Tierra"}
//assign events for buttons and whatnot ++++++++++++
btnSelectMascot.addEventListener("click",selectMascots)
btnEarth.addEventListener("click",earthAttack);
btnWater.addEventListener("click",waterAttack);
btnFire.addEventListener("click",fireAttack);
btnReload.addEventListener("click",doLoad)

function doLoad(){
   location.reload();
}

//Functions for the events +++++++++++++++++++++++++
function selectMascots(){
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
        alert("Sie mussen etwas entscheiden")
        isSelected=false;
    }
    mascotName.innerHTML=selectedMascot;
    btnSelectMascot.disabled = true;
    if(isSelected){
        selectEnemy(1,6);
    }
    enemyName.innerHTML=enemy;

}

function waterAttack(){
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
function selectEnemyAttack(){
    var number = generate_random(1,3);
    enemyAttack=attackOptions[number] 
}
function selectEnemy(min,max){
    let randomNumber = generate_random(min,max);
    enemy=enemyOptions[randomNumber];
}

function generate_random(min,max){
    return Math.floor(Math.random()*(max-min+1))+min;
}

function combatResult(){
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
function checkLives(){
    let defeat = document.createElement("p");
    if(mascotLives==0){
        defeat.innerHTML = "Has perdido"
        sectionMessages.appendChild(defeat);
        blockButtons();
    }else if(enemyLives==0){
        defeat.innerHTML="Has ganado"
        sectionMessages.appendChild(defeat);
        blockButtons();
    }
}
function blockButtons(){
    btnFire.disabled=true;
    btnEarth.disabled=true;
    btnWater.disabled=true;
}

function createMessage(){
    let parrafo = document.createElement("p");
    parrafo.innerHTML="Tu mascota atacó con "+mascotAttack+", la mascota enemiga atacó con "+enemyAttack+" - "+result;
    sectionMessages.appendChild(parrafo);

}

