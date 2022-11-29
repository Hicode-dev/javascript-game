addEventListener('load',function (params) {
    
canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const gravity = 0.8;
let enemies = []
let flyings = []
let gameOver = false;
let score = 0;

class Player {
    constructor(gameHeight,gameWidth) {
        this.gameWidth = gameWidth
        this.gameHeight =gameHeight
        this.position = {
            x: 200,
            y: 0,
        };
       this.velocity = {
           x: 0,
           y: 7,
       };
        this.width =200;
        this.height =200;
        this.frameX = 0;
        this.frameY = 0;
        this.image = document.getElementById('player')
        this.speed = 0
        this.weight = 1;
        this.maxFrame = 3;
        this.row = 2;
        this.col = 9;
        this.timer = 0
        this.fps = 100
        this.interval = 1000/this.fps
        }

    draw() {
        ctx.drawImage(this.image, this.frameX * this.width, this.frameY *this.height,this.width,this.height,this.position.x,this.position.y,this.width,this.height)
    }

   update(delta) {
    //colission-theory collision  colision  coliision collision
    enemies.forEach(enemy =>{
        const dx =  enemy.x - this.position.x
        const dy = enemy.y - this.position.y
        const distance = Math.sqrt(dx*dx + dy* dy)
        if (distance < enemy.width/2 + this.width/2) {
            gameOver = true
        }
    })
    flyings.forEach(fly =>{
        const dx =  fly.x - this.position.x
        const dy = fly.y - this.position.y
        const distance = Math.sqrt(dx*dx + dy* dy)
        if (distance < fly.width/3 + this.width/3) {
            gameOver = true
        }
    })
    if (this.timer > this.interval) {
        if (this.frameX >= this.maxFrame) {
            this.frameX = 0
        }else{
            this.frameX++
            this.timer = 0
        }
    }else{
        this.timer += 5
    }
  
         this.draw();
        
         this.position.y += this.velocity.y;
         this.position.x += this.velocity.x;

       if (this.position.y + this.height + this.velocity.y <= canvas.height) {
           this.velocity.y += gravity;
       } else {
           this.velocity.y = -1;
       }
    this.position.x += this.speed
    addEventListener('keydown' , e =>{
    if (e.code == 'ArrowRight') {
    
        this.speed = 2

    
    } else if (e.code == 'ArrowLeft') {
        this.speed = -5
        this.frameY = 1;

        
    }else if (e.code == 'ArrowUp' && this.onGroung()) {
        this.velocity.y = -10
        this.frameY = 1;
        // this.maxFrame = 2
    }else if (e.code == 'Shift') {
        
    }
    })
    addEventListener('touchstart',e =>{
        console.log(e.code);
    })
    addEventListener('keyup' , e =>{
    if (e.code == 'ArrowRight') {
        this.speed = 0
    }else if (e.code == 'ArrowLeft') {
        this.speed = 0
        this.frameY = 0;

        
    }else if (e.code == 'ArrowUp') {
        this.speed = 0
        this.frameY = 0;
        this.maxFrame = 5;

        
    }

    })
    if (this.position.x < 0) {
        this.position.x = 0
    } else if (this.position.x > canvas.width - this.width ) {
        this.position.x -= 5
    }

    this.position.y += this.velocity.y
    }
    onGroung(){
        return this.position.y >= 300 - this.height 
    }
   
    
}
class Background{
    constructor(gameHeight,gameWidth){
        this.gameWidth = gameWidth
        this.gameHeight =gameHeight
        this.image = document.getElementById('background')
        this.image2 = document.getElementById('background2');

        this.x = 0;
        this.y = 0
        this.width = 1300;
        this.height =700;
        this.speed = 10;
       
    }
    draw(ctx){
        if (score == 10 % 0) {
            ctx.drawImage(this.image,this.x ,this.y,this.width,this.height)
            ctx.drawImage(this.image, this.x + this.width + 5 ,this.y,this.width,this.height)
            
             
        } else {
              
            ctx.drawImage(this.image,this.x ,this.y,this.width,this.height)
            ctx.drawImage(this.image, this.x + this.width ,this.y,this.width,this.height)
        this.speed = 20
        }
  

    }
    update(){
        this.x -= this.speed
       if (this.x < 0 - this.width) {
           console.log('wueh');
           this.x = 0
        }

    }
}

class Enemies{
    constructor(gameHeight,gameWidth){
        this.gameWidth = gameWidth
        this.gameHeight =gameHeight
        this.image = document.getElementById('enemy')
        this.x =1000;
        this.y = 500;
        this.width =  160;
        this.height =  119;
       this.frameX = 0;
       this.frameY = 0;
       this.speed = 8;
       this.maxFrame = 5
       this.frameTimer = 0;
       this.fps = 40;
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
class flying{
    constructor(gameHeight,gameWidth){
        this.gameWidth = gameWidth
        this.gameHeight =gameHeight
        this.image = document.getElementById('flying')
        this.x =500;
        this.y = 10;
        this.width =  180;
        this.height =  69;
       this.frameX = 0;
       this.frameY = 0;
       this.speed = 50;
       this.maxFrame = 7
       this.frameTimer = 0;
       this.fps = 50;
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

function handler(delta) {
console.log(enemyTimer);
    if (enemyTimer > enemyInterval + randomEnemyInterval) {
enemies.push( new Enemies(canvas.width,canvas.height))
        enemyTimer = 0
        score++;
    }
    else{
        enemyTimer += delta
    }
    enemies.forEach(enemy =>{
        enemy.draw(ctx)
        enemy.update()
    })
}

function handle(delta) {
    if (flyingTimer  > flyingInterval + flyingEnemyInterval) {
        flyings.push( new flying(canvas.width,canvas.height))
        flyingTimer  = 0
                score++;
            }
            else{
                flyingTimer += delta
            }
            flyings.forEach(flying =>{
                flying.draw(ctx)
                flying.update()
            })
}
function text(context) {
    context.fillStyle = ' white'
    context.font = ' 40px Helvetica'
    context.fillText('score: ' + score ,canvas.width/2,200)
    // context.fillText('score: ' + score ,canvas.width/2,200)
    if (gameOver) {
        context.fillStyle = ' black'
        ctx.fillRect(10,10 , 1100, 400);
        context.textAlign = 'center'
        context.fillStyle = ' white'
        context.font = ' 100px Helvetica'
        context.fillText('Game Over!!!!!!!: ' ,canvas.width/2,200)

    context.font = ' 40px Helvetica'
        
    context.fillText('score: ' + score ,canvas.width/2,400)
    }
}
let player = new Player();
let background = new Background(); 
let offset = 0;
let lastTime  = 0;
let enemyTimer =0;
let enemyInterval = 1000;
let randomEnemyInterval = Math.random() * 1000 +500;
let flyingTimer =0;
let flyingInterval = 1000;
let flyingEnemyInterval = Math.random() *1000 ;
function animate(timeStamp) {
  const  delta = timeStamp - lastTime
    lastTime = timeStamp
    console.log(delta);
   if (!gameOver) {
    requestAnimationFrame(animate);
   } 
    ctx.clearRect(0, 0, 940, 500);
    console.log("hello");
    background.draw(ctx);
    background.update();
    player.update(delta);
    player.draw();
    text(ctx)
handler(delta);
handle(delta);
}
animate(0);

})


