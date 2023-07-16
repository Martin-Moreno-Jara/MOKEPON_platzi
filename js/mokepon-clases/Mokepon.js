  class Mokepon {

    constructor(nombre,imagen,vida,tipo){
        this.nombre = nombre;
        this.imagen= imagen;
        this.vida= vida
        this.ataques = []
        this.canvasImg = new Image()
        this.canvasImg.src = this.imagen
        this.x=20
        this.y=20
        this.ancho=80
        this.alto=50
    }

}
