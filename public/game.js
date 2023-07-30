
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
let selected_enemy; //the name of the mascot of the enemy
let mascotAttack;// The attack the player has chosen
let enemyAttack=null; //The attack the enemy has chosen
let result; //The result of each round; victory or defeat
let jugador_id
let enemigo_id;
let mokepones_enemigos =[]
let ataque_queue = []
let attackers_queue = []
let esperar_ataque

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

const attackOptions=[ 
    "Fuego", // All possible attacks that can be made
    "Agua",
    "Tierra",
    "Viento",
    "Rayo"
]
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

const hipodoge_attacks = ["Agua","Tierra","Fuego","Viento"];
const capipepo_attacks = ["Agua","Tierra","Fuego"];
const ratigueya_attacks = ["Agua","Tierra","Fuego","Rayo"];
const langostelvis_attacks = ["Agua","Tierra","Fuego"];
const tucapalma_attacks = ["Agua","Tierra","Fuego","Viento"];
const pydos_attacks = ["Agua","Tierra","Fuego","Viento","Rayo"];

mokepon_hipodoge.ataques.push(...hipodoge_attacks);
mokepon_capipepo.ataques.push(...capipepo_attacks);
mokepon_ratigueya.ataques.push(...ratigueya_attacks);
mokepon_langostelvis.ataques.push(...langostelvis_attacks);
mokepon_tucapalma.ataques.push(...tucapalma_attacks);
mokepon_pydos.ataques.push(...pydos_attacks);

let mokepon_array = []

mokepon_array.push(mokepon_hipodoge,mokepon_capipepo,mokepon_ratigueya,mokepon_langostelvis,mokepon_tucapalma,mokepon_pydos)

function iniciarJuego(){
    getPlayerId()
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
    if(ataque=="Fuego"){
        bonton_ataque = `<button id="btnFire" class="botonAtaque">Fuego <br>🔥</button>`
    }else if(ataque=="Agua"){
        bonton_ataque = `<button id="btnWater" class="botonAtaque">Agua <br>💧</button>`
    }else if(ataque=="Tierra"){
        bonton_ataque = `<button id="btnEarth" class="botonAtaque">Tierra <br>🌍</button>`
    }else if(ataque=="Viento"){
        bonton_ataque = `<button id="btnWind" class="botonAtaque">Viento <br>🌪</button>`
    }else if(ataque=="Rayo"){
        bonton_ataque = `<button id="btnLightning" class="botonAtaque">Rayo <br>💡</button>`
    }
    divAtaques.innerHTML +=bonton_ataque;
    }); 
    if(currentMokepon.ataques.includes("Agua")){
        btnWater = document.getElementById("btnWater");
        btnWater.addEventListener("click",waterAttack)
    }if(currentMokepon.ataques.includes("Agua")){
        btnFire=document.getElementById("btnFire");
        btnFire.addEventListener("click",fireAttack)
    }if(currentMokepon.ataques.includes("Tierra")){
        btnEarth=document.getElementById("btnEarth");
        btnEarth.addEventListener("click",earthAttack)
    }if(currentMokepon.ataques.includes("Viento")){
        btnWind=document.getElementById("btnWind");
        btnWind.addEventListener("click",windAttack)
    }if(currentMokepon.ataques.includes("Rayo")){
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
    if(rdHipodoge.checked){
        selectedMascot=rdHipodoge.id;
        currentMokepon=mokepon_hipodoge;
    }else if(rdCapipepo.checked){
        selectedMascot=rdCapipepo.id;
        currentMokepon=mokepon_capipepo;
    }else if(rdRatigueya.checked){
        selectedMascot=rdRatigueya.id;
        currentMokepon=mokepon_ratigueya;
    }else if(rdLangostelvis.checked){
        selectedMascot=rdLangostelvis.id;
        currentMokepon=mokepon_langostelvis;
    }else if(rdTucapalma.checked){
        selectedMascot=rdTucapalma.id;
        currentMokepon=mokepon_tucapalma;
    }else if(rdPydos.checked){
        selectedMascot=rdPydos.id;
        currentMokepon=mokepon_pydos;
    }else{
        alert("Debe seleccionar algo")
        isSelected=false;
    }  
    if(isSelected){
        sectionMascots.style.display = "none";
        section_mapa.style.display = "flex"
        enviarMokepon(currentMokepon);
        poner_mokepon()
        let intevervalo
        intevervalo = setInterval(poner_mokepon,50)
        btnSelectMascot.disabled = true;
        divJugador_img.src = currentMokepon.imagen;
        set_fight_background()
        cargar_tarjetas_ataque()
    }
}
function enviarMokepon(currentMokepon){
    const nombre = currentMokepon.nombre
    fetch(`http://192.168.20.14:8000/mokepon/${jugador_id}`,
    {   method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            mokepon:nombre
        })
    })
    
}

function poner_mokepon(){
    canvas.clearRect(0,0,mapa.width,mapa.height)
    canvas.drawImage(background_map,0,0,mapa.width,mapa.height)
    currentMokepon.pintarMokepon();
    enviarPosicion(currentMokepon.x,currentMokepon.y)
    mokepones_enemigos.forEach((moke)=>{moke.pintarMokepon();
        revisarColision(moke)})
}
function enviarPosicion(pos_x,pos_y){
    fetch(`http://192.168.20.14:8000/mokepon/${jugador_id}/posicion`,
    {
        method:"post",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({x:pos_x,y:pos_y})
    }).then((res)=>{
        if(res.ok){
            res.json()
                .then(function ({enemigos}){
                    mokepones_enemigos= enemigos.map((enemigo)=>{
                        let nombre_enemigo = enemigo.mokepon.nombre;
                        let current_enemy;
                        if(nombre_enemigo=="hipodoge"){
                            current_enemy = new Mokepon("hipodoge","assets/mokepon_images/hipodoge.webp",3,150,50,35,25,id=enemigo.id);
                        }else if(nombre_enemigo=="capipepo"){
                            current_enemy = new Mokepon("capipepo","assets/mokepon_images/capipepo.webp",3,60,60,35,25,id=enemigo.id); 
                        }else if(nombre_enemigo=="ratigueya"){
                            current_enemy = new Mokepon("ratigueya","assets/mokepon_images/ratigueya.png",3,5,110,35,25,id=enemigo.id);
                        }else if(nombre_enemigo=="langostelvis"){
                            current_enemy = new Mokepon("langostelvis","assets/mokepon_images/langostelvis.png",3,180,90,35,25,id=enemigo.id);
                        }else if(nombre_enemigo=="tucapalma"){
                            current_enemy = new Mokepon("tucapalma","assets/mokepon_images/tucapalma.png",3,100,5,35,25,id=enemigo.id);
                        }else if(nombre_enemigo=="pydos"){
                            current_enemy = new Mokepon("pydos","assets/mokepon_images/pydos.png",3,250,75,35,25,id=enemigo.id);
                        }else{console.log("por alguna razón hay un error")}
                        current_enemy.x=enemigo.x
                        current_enemy.y=enemigo.y
                        return current_enemy;

                    })
                }).catch((err)=>{console.error("Error en json: ",err)})
        }
})
}

function revisarColision(enemigo){
    const enemigo_up = enemigo.y;
    const enemgio_down = enemigo.y +enemigo.alto;
    const enemigo_left = enemigo.x;
    const enemgio_right = enemigo.x +enemigo.ancho;

    const up = currentMokepon.y;
    const down = currentMokepon.y +currentMokepon.alto;
    const left = currentMokepon.x;
    const right = currentMokepon.x +currentMokepon.ancho;

    if(down<enemigo_up+18 ||
        up+18>enemgio_down ||
        left+18>enemgio_right ||
        right<enemigo_left+18){
            return 
        }else{
            selected_enemy = enemigo;
            enemigo_id = selected_enemy.id
            sectionAttack.style.display = "flex";
            section_mapa.style.display = "none"
            enemyName.innerHTML=selected_enemy.nombre;
            mascotName.innerHTML=currentMokepon.nombre+" (tú)";
            divEnemigo_img.src = selected_enemy.imagen
        } 
}
function mover_mokepon(e){
    if(section_mapa.style.display!="none"){
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
}
function moverArriba(){
    currentMokepon.y-=5
}
function moverAbajo(){
    currentMokepon.y+=5
}
function moverIzquierda(){
    currentMokepon.x-=5
}
function moverDerecha(){
    currentMokepon.x+=5
}

function waterAttack(){ //attacks for each type 
    mascotAttack=attackOptions[1];
    ataque_queue.push(mascotAttack);
    setInterval(()=>{console.log(ataque_queue)},3000)
    blockButtons()
    attackers_queue.push(jugador_id)
    enviarAtaques();
    esperar_ataque = setInterval(recibirAtaque,2000)
    
}
function fireAttack(){
    mascotAttack=attackOptions[0];
    ataque_queue.push(mascotAttack);
    setInterval(()=>{console.log(ataque_queue)},4000)
    blockButtons()
    attackers_queue.push(jugador_id)
    enviarAtaques();    
    esperar_ataque = setInterval(recibirAtaque,4000)

}
function earthAttack(){
    mascotAttack=attackOptions[2];
    ataque_queue.push(mascotAttack);
    setInterval(()=>{console.log(ataque_queue)},4000)
    blockButtons()
    attackers_queue.push(jugador_id)
    enviarAtaques(); 
    esperar_ataque = setInterval(recibirAtaque,4000)
}
function windAttack(){
    mascotAttack=attackOptions[3];
    ataque_queue.push(mascotAttack);
    setInterval(()=>{console.log(ataque_queue)},4000)
    blockButtons()
    attackers_queue.push(jugador_id)
    enviarAtaques(); 
    esperar_ataque = setInterval(recibirAtaque,4000)
    }

function lightningAttack(){
    mascotAttack=attackOptions[4];
    ataque_queue.push(mascotAttack);
    setInterval(()=>{console.log(ataque_queue)},4000)
    blockButtons()
    attackers_queue.push(jugador_id)
    enviarAtaques();   
    esperar_ataque = setInterval(recibirAtaque,4000) 
}

 function enviarAtaques(){ // selects and attack for the enemy
    fetch(`http://192.168.20.14:8000/mokepon/${jugador_id}/ataques`,{
        method:"post",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
            ataque:mascotAttack
        })
    })
}

 function recibirAtaque(){
    fetch(`http://192.168.20.14:8000/mokepon/${jugador_id}/ataques/${enemigo_id}`)
        .then((resp)=>{
            if(resp.ok){
                resp.json()
                    .then(({ataque_enemigo})=>{
                        console.log(`El ataque enemigo ${ataque_enemigo}`)
                        if(ataque_enemigo!=undefined){
                            enemyAttack=ataque_enemigo;
                            ataque_queue.push(ataque_enemigo)
                            clearInterval(esperar_ataque)
                            combatResult()
                        }
                    })
            }
        })
}

 function combatResult(){ 
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
        desblockButtons();
        ataque_queue.length=0;
        enemyAttack=null;
        
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
    btnFire.style.background ="gray"
    btnEarth.disabled=true;
    btnEarth.style.background ="gray"
    btnWater.disabled=true;
    btnWater.style.background ="gray"
    if(currentMokepon.ataques.includes("Viento")){
        btnWind.disabled=true;
        btnWind.style.background ="gray"
    }if(currentMokepon.ataques.includes("Rayo")){
        btnLightning.disabled=true;
        btnLightning.style.background ="gray"
    }  
}
function desblockButtons(){
    btnFire.disabled=false;
    btnFire.style.background ="#3093C8"
    btnEarth.disabled=false;
    btnEarth.style.background ="#3093C8"
    btnWater.disabled=false;
    btnWater.style.background ="#3093C8"
    if(currentMokepon.ataques.includes("Viento")){
        btnWind.disabled=false;
        btnWind.style.background ="#3093C8"
    }if(currentMokepon.ataques.includes("Rayo")){
        btnLightning.disabled=false;
        btnLightning.style.background ="#3093C8"
    } 
}

function getPlayerId(){
    fetch("http://192.168.20.14:8000/join").then((res)=>{
            if(res.ok){
                res.text().then((respuesta)=>{
                        jugador_id=respuesta
                        console.log(jugador_id)
                    })
            }
        })
}

function doLoad(){//function to reload the page
    location.reload();
 }
 
function generate_random(min,max){//generates a random number
    return Math.floor(Math.random()*(max-min+1))+min;
}

iniciarJuego()

