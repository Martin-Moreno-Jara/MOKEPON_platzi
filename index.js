const express = require("express");
const app = express();
const port = 8000;
const cors = require('cors')
const Jugador = require("./jugador.js");
const lista_jugadores = []

app.use(cors())
app.use(express.json())

app.get("/",(request,response)=>{
        response.send("Hola")
})
app.get("/join",(request,response)=>{
    const jugador_id = `${Math.random()}`
    const jugador = new Jugador(jugador_id)
    lista_jugadores.push(jugador)
    //response.setHeader("Access-Control-Allow-Origin","*")
    response.send(jugador_id)
})
app.post("/mokepon/:jugadorId",(req,res)=>{
    const jugadorId = req.params.jugadorId || "tumama"
    console.log(lista_jugadores)
    console.log(jugadorId)
    res.end();
})

app.get("/mamaguebo",(request,response)=>{
    response.send("Mamaguebo")
})
app.listen(port,()=>{console.log(`El servidor ${port} va volando`)})

