//declaration of variables ++++++++++++++++++++++++
let selectedMascot;
let enemy;

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

let enemyOptions={  1:rdHipodoge.id,
    2:rdCapipepo.id,
    3:rdRatigueya.id,
    4:rdLangostelvis.id,
    5:rdTucapalma.id,
    6:rdPydos.id}
//assign events for buttons and whatnot ++++++++++++
btnSelectMascot.addEventListener("click",selectMascots)

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
    if(isSelected){
        selectEnemy();
    }
    enemyName.innerHTML=enemy;
}
function selectEnemy(){
    let randomNumber = generate_random(1,6);
    enemy=enemyOptions[randomNumber];
}

function generate_random(min,max){
    return Math.floor(Math.random()*(max-min+1))+min;
}

