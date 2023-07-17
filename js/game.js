
const btnReload = document.getElementById("btnReload"); //button to reload the page
let currentMokepon;
let mascotName = document.getElementById("mascotName");
let enemyName = document.getElementById("enemyName");

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
const divAtaques = document.getElementById("div_tarjetas_ataques");
const section_mapa = document.getElementById("vista-mapa");
const mapa = document.getElementById("mapa");
let canvas = mapa.getContext("2d");
document.addEventListener("keydown",mover_mokepon)

let selectedMascot; //the name of the mascot of the player
let enemy; //the name of the mascot of the enemy
let mascotAttack;// The attack the player has chosen
let enemyAttack; //The attack the enemy has chosen
let result; //The result of each round; victory or defeat

let mascotLives=3; // Lives of the player
let enemyLives=3; // Lives of the enemy
const btnSelectMascot = document.getElementById("btnSelectMascot"); //button to select the mascot

let background_map = new Image()
background_map.src = "assets/map/mokemap.png"
let btnFire;
let btnWater;
let btnEarth;
let btnWind;
let btnLightning;

const attackOptions={ 
    1:"Fuego", // All possible attacks that can be made
    2:"Agua",
    3:"Tierra",
    4:"Viento",
    5:"Rayo"
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

var mokepon_hipodoge = new Mokepon("hipodoge","assets/mokepon_images/hipodoge.webp",3,);
var mokepon_capipepo = new Mokepon("capipepo","assets/mokepon_images/capipepo.webp",3);
var mokepon_ratigueya = new Mokepon("ratigueya","assets/mokepon_images/ratigueya.png",3);
var mokepon_langostelvis = new Mokepon("langostelvis","assets/mokepon_images/langostelvis.png",3);
var mokepon_tucapalma = new Mokepon("tucapalma","assets/mokepon_images/tucapalma.png",3);
var mokepon_pydos = new Mokepon("pydos","assets/mokepon_images/pydos.png",3);

mokepon_hipodoge.ataques.push("agua","tierra","fuego","viento");
mokepon_capipepo.ataques.push("agua","tierra","fuego");
mokepon_ratigueya.ataques.push("agua","tierra","fuego","rayo");
mokepon_langostelvis.ataques.push("agua","tierra","fuego");
mokepon_tucapalma.ataques.push("agua","tierra","fuego","viento");
mokepon_pydos.ataques.push("agua","tierra","fuego","viento","rayo");

let mokepon_array = []

mokepon_array.push(mokepon_hipodoge,mokepon_capipepo,mokepon_ratigueya,mokepon_langostelvis,mokepon_tucapalma,mokepon_pydos)

function iniciarJuego(){
    mascotL.innerHTML=mascotLives; //Initialy assing lives to both player and enemy
    enemyL.innerHTML=enemyLives;
    sectionAttack.style.display = "none";
    btnReload.style.display="none";
    section_mapa.style.display="none"
    cargar_tarjetas_seleccion();

    //assign events for buttons and whatnot ++++++++++++
    btnSelectMascot.addEventListener("click",selectMascots)
    btnReload.addEventListener("click",doLoad)
    }

function cargar_tarjetas_seleccion(){
    mokepon_array.forEach((mokepon)=>{
        mokepon_tarjeta = `<input type="radio" name="mascot" id=${mokepon.nombre}>
        <label class="mokeponCard" for=${mokepon.nombre}>
            <p>${mokepon.nombre}</p>
            <img src=${mokepon.imagen} alt=${mokepon.nombre}>
        </label> `
        
        divTarjetas.innerHTML += mokepon_tarjeta;

         rdHipodoge= document.getElementById("hipodoge");
         rdCapipepo= document.getElementById("capipepo"); 
         rdRatigueya=document.getElementById("ratigueya"); 
         rdLangostelvis=document.getElementById("langostelvis");
         rdTucapalma=document.getElementById("tucapalma"); 
         rdPydos=document.getElementById("pydos"); 
    });
}
function cargar_tarjetas_ataque(){
    currentMokepon.ataques.forEach((ataque)=>{
    let bonton_ataque;
    if(ataque=="fuego"){
        bonton_ataque = `<button id="btnFire" class="botonAtaque">Fuego <br>🔥</button>`
    }else if(ataque=="agua"){
        bonton_ataque = `<button id="btnWater" class="botonAtaque">Agua <br>💧</button>`
    }else if(ataque=="tierra"){
        bonton_ataque = `<button id="btnEarth" class="botonAtaque">Tierra <br>🌍</button>`
    }else if(ataque=="viento"){
        bonton_ataque = `<button id="btnWind" class="botonAtaque">Viento <br>🌪</button>`
    }else if(ataque=="rayo"){
        bonton_ataque = `<button id="btnLightning" class="botonAtaque">Rayo <br>💡</button>`
    }
    divAtaques.innerHTML +=bonton_ataque;
    }); 
    if(currentMokepon.ataques.includes("agua")){
        btnWater = document.getElementById("btnWater");
        btnWater.addEventListener("click",waterAttack)
    }if(currentMokepon.ataques.includes("agua")){
        btnFire=document.getElementById("btnFire");
        btnFire.addEventListener("click",fireAttack)
    }if(currentMokepon.ataques.includes("tierra")){
        btnEarth=document.getElementById("btnEarth");
        btnEarth.addEventListener("click",earthAttack)
    }if(currentMokepon.ataques.includes("viento")){
        btnWind=document.getElementById("btnWind");
        btnWind.addEventListener("click",windAttack)
    }if(currentMokepon.ataques.includes("rayo")){
        btnLightning=document.getElementById("btnLightning");
        btnLightning.addEventListener("click",lightningAttack)
    }
    
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
    selectedMascot;
    enemy="";
    img_route="";
    if(rdHipodoge.checked){
        selectedMascot=rdHipodoge.id;
        currentMokepon=mokepon_hipodoge;
        img_route= mokepon_hipodoge.imagen;
    }else if(rdCapipepo.checked){
        selectedMascot=rdCapipepo.id;
        currentMokepon=mokepon_capipepo;
        img_route= mokepon_capipepo.imagen;
    }else if(rdRatigueya.checked){
        selectedMascot=rdRatigueya.id;
        currentMokepon=mokepon_ratigueya;
        img_route= mokepon_ratigueya.imagen;
    }else if(rdLangostelvis.checked){
        selectedMascot=rdLangostelvis.id;
        currentMokepon=mokepon_langostelvis;
        img_route= mokepon_langostelvis.imagen;
    }else if(rdTucapalma.checked){
        selectedMascot=rdTucapalma.id;
        currentMokepon=mokepon_tucapalma;
        img_route= mokepon_tucapalma.imagen;
    }else if(rdPydos.checked){
        selectedMascot=rdPydos.id;
        currentMokepon=mokepon_pydos;
        img_route= mokepon_pydos.imagen;
    }else{
        alert("Debe seleccionar algo")
        isSelected=false;
    }  
    if(isSelected){
        enemy=selectEnemy(0,mokepon_array.length-1);
        //sectionAttack.style.display = "flex";
        sectionMascots.style.display = "none";
        section_mapa.style.display = "flex"
        poner_mokepon()
        let intevervalo
        intevervalo = setInterval(poner_mokepon,50)
        enemyName.innerHTML=enemy.nombre;
        mascotName.innerHTML=selectedMascot+" (tú)";
        btnSelectMascot.disabled = true;
        divJugador_img.src = img_route;
        divEnemigo_img.src = enemy.imagen
        set_fight_background()
        cargar_tarjetas_ataque()
    }
}
function poner_mokepon(){
    canvas.clearRect(0,0,mapa.width,mapa.height)
    canvas.drawImage(background_map,0,0,mapa.width,mapa.height)
    currentMokepon.pintarMokepon();
    poner_enemigos()
}
function poner_enemigos(){
    mokepon_capipepo.pintarMokepon(60,60,35,25);
    mokepon_hipodoge.pintarMokepon(150,50,35,25);
    mokepon_langostelvis.pintarMokepon(180,90,35,25);
    mokepon_pydos.pintarMokepon(250,75,35,25);
    mokepon_ratigueya.pintarMokepon(5,110,35,25);
    mokepon_tucapalma.pintarMokepon(100,5,35,25);
}

function mover_mokepon(e){

    if(e.key=="ArrowRight"){
        currentMokepon.x+=5
    }if(e.key=="ArrowLeft"){
        currentMokepon.x-=5
    }if(e.key=="ArrowUp"){
        currentMokepon.y-=5
    }if(e.key=="ArrowDown"){
        currentMokepon.y+=5
    }
    poner_mokepon()
}

function selectEnemy(min,max){ //selects an enemy
    let randomNumber = generate_random(min,max);
    enemy=mokepon_array[randomNumber];
    return enemy;
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
function windAttack(){
    mascotAttack=attackOptions[4];
    selectEnemyAttack();
    combatResult();
}
function lightningAttack(){
    mascotAttack=attackOptions[5];
    selectEnemyAttack();
    combatResult();
}
function selectEnemyAttack(){ // selects and attack for the enemy
    var number = generate_random(0,enemy.ataques.length-1);
    enemyAttack=enemy.ataques[number] 
}

function combatResult(){ //evaluates the attacks and gives the output, life deduction
    if(mascotAttack==enemyAttack ||
        mascotAttack=="Fuego" && enemyAttack=="Rayo" ||
        mascotAttack=="Rayo" && enemyAttack=="Fuego" ||
        mascotAttack=="Viento" && enemyAttack=="Tierra" ||
        mascotAttack=="Tierra" && enemyAttack=="Viento" ){
        result="empate";
        divMessages.style.border = "4px solid gray"
    }else if(
        mascotAttack=="Agua" && enemyAttack=="Fuego" ||
        mascotAttack=="Fuego" && enemyAttack=="Tierra" ||
        mascotAttack=="Tierra" && enemyAttack=="Rayo" ||
        mascotAttack=="Rayo" && enemyAttack=="Agua" ||
        mascotAttack=="Tierra" && enemyAttack=="Agua" ||
        mascotAttack=="Fuego" && enemyAttack=="Viento" ||
        mascotAttack=="Viento" && enemyAttack=="Rayo" ||
        mascotAttack=="Agua" && enemyAttack=="Viento"){
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
    if(currentMokepon.ataques.includes("viento")){
        btnWind.disabled=true;
    }if(currentMokepon.ataques.includes("rayo")){
        btnLightning.disabled=true;
    }
    
}



function doLoad(){//function to reload the page
    location.reload();
 }
 
function generate_random(min,max){//generates a random number
    return Math.floor(Math.random()*(max-min+1))+min;
}

iniciarJuego()

