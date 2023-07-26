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

app.get("/",(request,response)=>{
        response.send("Hola")
})
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
    }else{console.group("Nada enviado")}
    const enemigos = lista_jugadores.filter((jugador)=>jugador_id !==jugador.id) || "erro"

    res.send({
        enemigos
    });
})

app.get("/mamaguebo",(request,response)=>{
    response.send("Mamaguebo")
})
app.listen(port,()=>{console.log(`El servidor ${port} va volando`)})

