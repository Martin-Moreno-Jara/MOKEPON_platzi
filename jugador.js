class Jugador{
    constructor(id){
        this.id=id;
    }
    printId(){
        console.log(this.id)
    }
    asignarMokepon(moke){
        this.mokepon = moke;
    }
    actualizarPosicion(x,y){
        this.x=x;
        this.y=y;
    }
}
module.exports = Jugador;