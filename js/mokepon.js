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

let sectionMessages = document.getElementById("resultado")
let ataqueJugador = document.getElementById("ataqueJugador")
let ataqueEnemigo = document.getElementById("ataqueEnemigo")
let botonAtaque = document.getElementById("botonAtaque")

let sectionAttack = document.getElementById("attackSelect");
let sectionMascots = document.getElementById("mascotSelect");
let mascotL = document.getElementById("mascotLives");
let enemyL = document.getElementById("enemyLives");
let divMessages = document.getElementById("messages");
let divJugador_img = document.getElementById("jugador_imagen")
let divEnemigo_img = document.getElementById("enemigo_imagen")



//assign events for buttons and whatnot ++++++++++++
btnSelectMascot.addEventListener("click",selectMascots)
btnEarth.addEventListener("click",earthAttack);
btnWater.addEventListener("click",waterAttack);
btnFire.addEventListener("click",fireAttack);
btnReload.addEventListener("click",doLoad)

selection_backgrounds = [

    "assets/background_select/forest_day.webp",
    "assets/background_select/forest_noon.jpg",
    "assets/background_select/forest-midday.jpeg",
    "assets/background_select/forest-night.jpg",
    "assets/background_select/street-noon.jpeg",
]

function set_selection_background(){
    randomIndex = generate_random(0,4)
    selected_image = selection_backgrounds[randomIndex]
    sectionMascots.style.backgroundImage = "url(\"" + selected_image + "\")";

}

window.onload = function (){
    set_selection_background()

}
fight_backgrounds = [
    "assets/background_fight/fight1.webp",
    "assets/background_fight/fight2.webp",
    "assets/background_fight/fight3.webp",
    "assets/background_fight/fight4.jpg"
]

function set_fight_background(){
    randomIndex = generate_random(0,3)
    selected_image = fight_backgrounds[randomIndex]
    sectionAttack.style.backgroundImage = "url(\"" + selected_image + "\")";
}


mascotL.innerHTML=mascotLives; //Initialy assing lives to both player and enemy
enemyL.innerHTML=enemyLives;
sectionAttack.style.display = "none";
btnReload.style.display="none";

mokepons_imgs = {
    capipepo:"assets/capipepo.jpg",
    hipodoge:"assets/hipodoge.jpg",
    langostelvis:"assets/langostelvis.jpg",
    pydos:"assets/pydos.jpeg",
    ratigueya:"assets/ratigueya.jpeg",
    tucapalma:"assets/tucapalma.jpg"
}

function selectMascots(){ //let's player select, and selects for the enemy
    var isSelected=true;
    selectedMascot="";
    enemy="";
    img_route="";
    if(rdHipodoge.checked){
        selectedMascot=rdHipodoge.id;
        img_route= mokepons_imgs.hipodoge;

    }else if(rdCapipepo.checked){
        selectedMascot=rdCapipepo.id;
        img_route= mokepons_imgs.capipepo;

    }else if(rdRatigueya.checked){
        selectedMascot=rdRatigueya.id;
        img_route= mokepons_imgs.ratigueya;

    }else if(rdLangostelvis.checked){
        selectedMascot=rdLangostelvis.id;
        img_route= mokepons_imgs.langostelvis;

    }else if(rdTucapalma.checked){
        selectedMascot=rdTucapalma.id;
        img_route= mokepons_imgs.tucapalma;

    }else if(rdPydos.checked){
        selectedMascot=rdPydos.id;
        img_route= mokepons_imgs.pydos;

    }else{
        alert("Debe seleccionar algo")
        isSelected=false;
    }  
    if(isSelected){
        route_enemy=selectEnemy(1,6);
        sectionAttack.style.display = "flex";
        sectionMascots.style.display = "none";
        enemyName.innerHTML=enemy;
        mascotName.innerHTML=selectedMascot+" (tú)";
        btnSelectMascot.disabled = true;
        divJugador_img.src = img_route;
        divEnemigo_img.src = route_enemy
        set_fight_background()
    }
    
}

function selectEnemy(min,max){ //selects an enemy
    let randomNumber = generate_random(min,max);
    enemy=enemyOptions[randomNumber];
    return mokepons_imgs[enemy]
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
        divMessages.style.border = "4px solid gray"
    }else if(
        mascotAttack=="Agua" && enemyAttack=="Fuego" ||
        mascotAttack=="Fuego" && enemyAttack=="Tierra" ||
        mascotAttack=="Tierra" && enemyAttack=="Agua"){
        result ="Ganaste 🎉"
        enemyLives-- 
        divMessages.style.border = "4px solid #50CA4A"
    }else{
        result="perdiste 😭"
        mascotLives--;
        divMessages.style.border = "4px solid #F32915"
    }
    mascotL.innerHTML=mascotLives;
    enemyL.innerHTML=enemyLives;
    createMessage();
    checkLives();
    
}
function createMessage(){ //creates a message after each attack

    sectionMessages.innerHTML=result;
    ataqueJugador.innerHTML="Atacaste con "+mascotAttack;
    ataqueEnemigo.innerHTML= "El enemigo atacó con "+enemyAttack;

}

function checkLives(){ //checks wether the enemy or the player has lost 
    if(mascotLives==0){
        sectionMessages.innerHTML = "Has perdido";
        blockButtons();
       btnReload.style.display="block";
    }else if(enemyLives==0){
        sectionMessages.innerHTML="Has ganado"
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


