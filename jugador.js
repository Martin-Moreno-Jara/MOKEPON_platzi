class Jugador{
    constructor(id){
        this.id=id;
        this.mokepon
    }
    printId(){
        console.log(this.id)
    }
    asignarMokepon(moke){
        this.mokepon = moke;
    }
}
module.exports = Jugador;