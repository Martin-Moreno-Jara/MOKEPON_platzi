  class Mokepon {

    constructor(nombre,imagen,vida,x=20,y=5,ancho=35,alto=25,id=null){
        this.nombre = nombre;
        this.id=id;
        this.imagen= imagen || null;
        this.vida= vida || null;
        this.ataques = [] 
        this.canvasImg = new Image()
        this.canvasImg.src = this.imagen
        this.x=x
        this.y=y
        this.ancho = ancho
        this.alto= alto
    }
    pintarMokepon(posx=this.x,posy=this.y,posancho=this.ancho,posalto=this.alto){
      canvas.drawImage(this.canvasImg,posx,posy,posancho,posalto)
    }
}
