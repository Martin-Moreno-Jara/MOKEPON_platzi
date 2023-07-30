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
    setAtaque(attack){
        this.ataque = attack;
    }
}
module.exports = Jugador;