class Enemies{
    constructor(gameHeight,gameWidth){
        this.gameWidth = gameWidth
        this.gameHeight =gameHeight
        this.image = document.getElementById('enemy')
        this.x =1000;
        this.y = 470;
        this.width =  160;
        this.height =  119;
       this.frameX = 0;
       this.frameY = 0;
       this.speed = 8;
       this.maxFrame = 5
       this.frameTimer = 0;
       this.fps = 20;
       this.frameInterval = 1000/this.fps;
       this.marked = false
    }
    draw() {
       
        ctx.drawImage(this.image,this.frameX * this.width,0,this.width,this.height,this.x,this.y,this.width,this.height)

    }
    update(delta){
        if (this.frameTimer >= this.frameInterval) {
            if (this.frameX < this.maxFrame) {
                this.frameX = 0
            }  
            else{
                this.frameX++
                this.frameTimer = 0

            }
        } else{
            this.frameTimer += delta
        }
        this.x-= this.speed
       if (this.x < 0 - this.width) {
        this.marked = true
       }
    }
    
   
}