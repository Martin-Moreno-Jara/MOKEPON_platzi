  class Mokepon {

    constructor(nombre,imagen,vida){
        this.nombre = nombre;
        this.imagen= imagen;
        this.vida= vida
        this.ataques = []
        this.canvasImg = new Image()
        this.canvasImg.src = this.imagen
        this.x=20
        this.y=5
        this.ancho=65
        this.alto=40
    }
    pintarMokepon(posx=this.x,posy=this.y,posancho=this.ancho,posalto=this.alto){
      canvas.drawImage(this.canvasImg,posx,posy,posancho,posalto)
    }
}
