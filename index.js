const express = require("express");
const app = express();
const port = 8000;
const cors = require('cors')
const Jugador = require("./jugador.js");
const lista_jugadores = []

class Mokepon{
    constructor(nombre){
        this.nombre=nombre
    }
}
app.use(cors())
app.use(express.json())
app.use(express.static('public'))

app.get("/join",(request,response)=>{
    const jugador_id = `${Math.random()}`
    const jugador = new Jugador(jugador_id)
    lista_jugadores.push(jugador)
    response.send(jugador_id)
})
app.post("/mokepon/:jugador_id",(req,res)=>{
    const jugador_id = req.params.jugador_id || "tumama"
    const moke_nombre = req.body.mokepon || "null";
    const mokepon = new Mokepon(moke_nombre);
    let jugador_index = lista_jugadores.findIndex((jugador)=>jugador.id === jugador_id)
    if(jugador_index>=0){
        lista_jugadores[jugador_index].asignarMokepon(mokepon);
    }else{console.group("No asignado")}
    res.end();
})
app.post("/mokepon/:jugador_id/posicion",(req,res)=>{
    const jugador_id = req.params.jugador_id || "tumama"
    const pos_x = req.body.x || 0
    const pos_y = req.body.y || 0
    let jugador_index = lista_jugadores.findIndex((jugador)=>jugador.id === jugador_id)
    if(jugador_index>=0){
        lista_jugadores[jugador_index].actualizarPosicion(pos_x,pos_y)
    }else{console.log("Nada enviado")}
    const enemigos = lista_jugadores.filter((jugador)=>jugador_id !==jugador.id) || "erro"

    res.send({
        enemigos
    });
})
app.post("/mokepon/:jugador_id/ataques",(req,res)=>{
    const jugador_id = req.params.jugador_id;
    const ataque = req.body.ataque || "etwas hat passiert"
    let jugador_index = lista_jugadores.findIndex((jugador)=>jugador.id === jugador_id)
    if(jugador_index>=0){
        lista_jugadores[jugador_index].setAtaque(ataque)
    }else{console.log("Nada enviado en ataques")}
    res.send({ataque});
})
app.get("/mokepon/:jugador_id/ataques/:jugador_enemigo",(req,res)=>{
    const jugador_id = req.params.jugador_id;
    const enemigo_id = req.params.jugador_enemigo;
    let ataque_enemigo;
    let jugador_index = lista_jugadores.findIndex((jugador)=>jugador.id === jugador_id)
    let enemigo_index = lista_jugadores.findIndex((jugador)=>jugador.id === enemigo_id)
    if(jugador_index>=0 && enemigo_index>=0){
        ataque_enemigo = lista_jugadores[enemigo_index].ataque;
        lista_jugadores[enemigo_index].ataque = undefined;
    }else{console.log("Nada recibido en ataques");
    }
    res.send({ ataque_enemigo })});
    

app.listen(port,()=>{console.log(`El servidor ${port} va volando`)})

