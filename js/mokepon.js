//declaration of variables ++++++++++++++++++++++++
let selectedMascot;
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

//assign events for buttons and whatnot ++++++++++++
btnSelectMascot.addEventListener("click",selectMascot)

//Functions for the events +++++++++++++++++++++++++
function selectMascot(){
    if(rdHipodoge.checked){
        selectedMascot=rdHipodoge;
    }else if(rdCapipepo.checked){
        selectedMascot=rdCapipepo;
    }else if(rdRatigueya.checked){
        selectedMascot=rdRatigueya;
    }else if(rdLangostelvis.checked){
        selectedMascot=rdLangostelvis;
    }else if(rdTucapalma.checked){
        selectedMascot=rdTucapalma;
    }else if(rdPydos.checked){
        selectedMascot=rdPydos;
    }else{
        selectedMascot="No mascot selected";
    }
    console.log(selectedMascot)
}