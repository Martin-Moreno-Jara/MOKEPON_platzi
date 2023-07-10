
const btnReload = document.getElementById("btnReload"); //button to reload the page
const btnFire = document.getElementById("btnFire");
const btnWater = document.getElementById("btnWater");
const btnEarth = document.getElementById("btnEarth");

const mascotName = document.getElementById("mascotName");
const enemyName = document.getElementById("enemyName");

const sectionMessages = document.getElementById("resultado")
const ataqueJugador = document.getElementById("ataqueJugador")
const ataqueEnemigo = document.getElementById("ataqueEnemigo")
const botonAtaque = document.getElementById("botonAtaque")

const sectionAttack = document.getElementById("attackSelect");
const sectionMascots = document.getElementById("mascotSelect");
const mascotL = document.getElementById("mascotLives");
const enemyL = document.getElementById("enemyLives");
const divMessages = document.getElementById("messages");
const divJugador_img = document.getElementById("jugador_imagen");
const divEnemigo_img = document.getElementById("enemigo_imagen");
const divTarjetas = document.getElementById("div_tarjetas_mokepon");

let selectedMascot; //the name of the mascot of the player
let enemy; //the name of the mascot of the enemy
let mascotAttack;// The attack the player has chosen
let enemyAttack; //The attack the enemy has chosen
let result; //The result of each round; victory or defeat

let mascotLives=3; // Lives of the player
let enemyLives=3; // Lives of the enemy

const btnSelectMascot = document.getElementById("btnSelectMascot"); //button to select the mascot
const enemyOptions={  // All possible mascots the player can select
    1:"hipodoge",
    2:"capipepo",
    3:"ratigueya",
    4:"langostelvis",
    5:"tucapalma",
    6:"pydos"
}

const attackOptions={ 
    1:"Fuego", // All possible attacks that can be made
    2:"Agua",
    3:"Tierra"
}

const mokepons_imgs = {
    capipepo:"assets/capipepo.jpg",
    hipodoge:"assets/hipodoge.jpg",
    langostelvis:"assets/langostelvis.jpg",
    pydos:"assets/pydos.jpeg",
    ratigueya:"assets/ratigueya.jpeg",
    tucapalma:"assets/tucapalma.jpg"
}

const selection_backgrounds = [

    "assets/background_select/forest_day.webp",
    "assets/background_select/forest_noon.jpg",
    "assets/background_select/forest-midday.jpeg",
    "assets/background_select/forest-night.jpg",
    "assets/background_select/street-noon.jpeg",
]
const fight_backgrounds = [
    "assets/background_fight/fight1.webp",
    "assets/background_fight/fight2.webp",
    "assets/background_fight/fight3.webp",
    "assets/background_fight/fight4.jpg"
]

let rdHipodoge
let rdCapipepo 
let rdRatigueya 
let rdLangostelvis
let rdTucapalma 
let rdPydos 

var mokepon_hipodoge = new Mokepon("hipodoge",mokepons_imgs.hipodoge,3,"agua");
var mokepon_capipepo = new Mokepon("capipepo",mokepons_imgs.capipepo,3,"tierra");
var mokepon_ratigueya = new Mokepon("ratigueya",mokepons_imgs.ratigueya,3,"fuego");
var mokepon_langostelvis = new Mokepon("langostelvis",mokepons_imgs.langostelvis,3,"agua");
var mokepon_tucapalma = new Mokepon("tucapalma",mokepons_imgs.tucapalma,3,"viento");
var mokepon_pydos = new Mokepon("pydos",mokepons_imgs.pydos,3,"rayo");

let mokepon_array = []

mokepon_array.push(mokepon_hipodoge,mokepon_capipepo,mokepon_ratigueya,mokepon_langostelvis,mokepon_tucapalma,mokepon_pydos)

function iniciarJuego(){
    mascotL.innerHTML=mascotLives; //Initialy assing lives to both player and enemy
    enemyL.innerHTML=enemyLives;
    sectionAttack.style.display = "none";
    btnReload.style.display="none";
    cargar_tarjetas();

    //assign events for buttons and whatnot ++++++++++++
    btnSelectMascot.addEventListener("click",selectMascots)
    btnEarth.addEventListener("click",earthAttack);
    btnWater.addEventListener("click",waterAttack);
    btnFire.addEventListener("click",fireAttack);
    btnReload.addEventListener("click",doLoad)
    }

function cargar_tarjetas(){
    mokepon_array.forEach((mokepon)=>{
        mokepon_tarjeta = `<input type="radio" name="mascot" id=${mokepon.nombre}>
        <label class="mokeponCard" for=${mokepon.nombre}>
            <p>${mokepon.nombre}</p>
            <img src=${mokepon.imagen} alt=${mokepon.nombre}>
        </label> `
        
        console.log(mokepon.nombre)
        divTarjetas.innerHTML += mokepon_tarjeta;

         rdHipodoge= document.getElementById("hipodoge");
         rdCapipepo= document.getElementById("capipepo"); 
         rdRatigueya=document.getElementById("ratigueya"); 
         rdLangostelvis=document.getElementById("langostelvis");
         rdTucapalma=document.getElementById("tucapalma"); 
         rdPydos=document.getElementById("pydos"); 
         console.log(rdHipodoge)
    });
}



function set_selection_background(){
    randomIndex = generate_random(0,4)
    selected_image = selection_backgrounds[randomIndex]
    sectionMascots.style.backgroundImage = "url(\"" + selected_image + "\")";
}



function set_fight_background(){
    randomIndex = generate_random(0,3)
    selected_image = fight_backgrounds[randomIndex]
    sectionAttack.style.backgroundImage = "url(\"" + selected_image + "\")";
}

window.onload = function (){
    set_selection_background()
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

iniciarJuego()

