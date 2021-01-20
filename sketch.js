
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint=Matter.Constraint;
var counter=1
var START = 1;
var PLAY = 2;
var END = 3;
var gameState = START;
var start, startImage,ball;
var end, endImage;
var track1, track2, track3, track4, track5, track6, trackGp;
var player, playerAnimation;
var rail1, rail2, rail3, railGroup;
var bombs, bombImage, bombRand, bombGp;
var energyDrink, energyRand, energyImage, energyGp;
var coins, coinRand, coinImage, coinGp;
var sound;
var score;
var tilesgroup,engine,world
function preload(){
  //Loading the images and animation.
//  playerAnimation = loadAnimation("sprite1.png", "sprite2.png", "sprite3.png", "sprite4.PNG","sprite5.png");
  
 startImage = loadImage("subway-surfers.jpg");
  endImage = loadImage("game-over-1.jpeg")
  
  bombImage = loadImage("bomb.png"); 
  energyImage = loadImage("energyDrink.png");
  coinImage = loadImage("coin.png");
 // ball=loadImage("2.png")
  
 // sound = loadSound("sound.mp3");
}

function setup(){
    createCanvas(1600, 700);


	engine = Engine.create();
	world = engine.world;
  //creating the canvas of width 600 and height 600. 
  
  
  //Creating the player, tracks, startImage and groups.
  player = createSprite(300,500,20,20);
// player.addAnimation("player",ball);
  //player.visible = false;
  //player.shapeColor=("red")
 // player.scale=0.2      
   ball=Bodies.circle(300,500,10,{isStatatic:false,restitution:0.2,friction:1})
   World.add(world,ball)
  coinRand = Math.round(random(1,3));
  energyRand = Math.round(random(1,3));
  bombRand = Math.round(random(1,3));
  
  
  start = createSprite(400,290,30,30)
  start.addImage("start", startImage);
  start.scale = 0.79;
  start.visible=false
  end = createSprite(300,300,20,20);
  end.addImage("end", endImage);
  end.visible = false;
  
  
  
  railGroup = new Group();
  coinGp = new Group();
  energyGp = new Group();
  bombGp = new Group();
tilesgroup = new Group();

  score = 0;
}

function draw() {
  //clearing the canvas
  background("#c2b280");
  textSize(15);
  fill("white");
  stroke("white");
  text("score :" + score, 360, 50);
  player.x=ball.position.x 
  player.y=ball.position.y
  //Calling the functions for the rails
  tiles();
  
  score = score + Math.round(getFrameRate()/60);
  
  if(gameState === START){
    if(keyDown("space")){
      gameState = PLAY;
    }   
  } else if (gameState === PLAY){
    start.destroy();
   // player.visible = true;
  /*   if(keyIsDown("UP_ARROW")){
  for (var i = 0; i < counter; i++) {
    var temp=tilesgroup.get(i);
   // text(i, temp.x, temp.y);
  }   
   
      player.x=tilesgroup.x                     
    player.y=tilesgroup.y
  }*/
 //   if(mousePressedOver(tilesgroup)){
  //   player.x=mouseX                     
  //  player.y=mouseY
//Matter.Body.setPosition(ball.body,ball.body.position,{x:mouseX,y:mouseY})
// }
   //Selecting random things to spawn it
   var select_object = Math.round(random(1,3));
   if(World.frameCount % 30 == 0){
     if(select_object == 1){
       coin();
     }
     else if(select_object == 2){
       bomb();
     }
     else{
       energy();
     }
   }
   
    
 

    //if(player.x == 300||player.x == 500||player.x == 100){
     // player.velocityX = 0;
   // } 

    if(keyDown("right")&&player.x<500){
      player.velocityX = 8;
    }

    if(keyDown("left")&&player.x>100){
      player.velocityX = -8;
    }
    if(keyDown("up")){
      player.velocityY = -50;
    }
    
    if(coinGp.isTouching(player)){
      coinGp.destroyEach();
    }
    
    if(bombGp.isTouching(player)){
      gameState = END;
    }
    
    if(energyGp.isTouching(player)){
      energyGp.destroyEach();
    }
  }  else if (gameState === END){
     player.destroy();
     coinGp.destroyEach();
     bombGp.destroyEach();
     energyGp.destroyEach();
   
    
     background(0);
     
    end.visible = true; 
  }
  
  drawSprites();
  
  if(gameState == START){
    stroke("white");
    fill("white")
    textSize(30);
    text("Press Space to continue ", 170, 500); 
    text("Use right and left keys to move", 150, 450);
  }
}

function rails(){
  
  //Creating the rails
  if(frameCount%20 === 0) {   
    for (var a = 0; a < 50; a=a+50){
      rail1 = createSprite(100,a,100,10);
      rail1.velocityY = 4;
                 
      rail2 = createSprite(300,a,100,10);
      rail2.velocityY = 4;
            
      rail3 = createSprite(500,a,100,10);
      rail3.velocityY = 4;
      
      railGroup.add(rail1);
      railGroup.add(rail2);
      railGroup.add(rail3);      
                 
      //adjusting the depths      
      player.depth = rail1.depth;
      rail1.depth = rail1.depth+1;
      
      player.depth = rail2.depth;
      rail2.depth = rail2.depth+1;
      
      player.depth = rail3.depth;
      rail3.depth = rail3.depth+1;
            
      rail1.visible = false;
      rail2.visible = false;
      rail3.visible = false;
    }
  }
}

function coin(){
  
  coins = createSprite(100, -40, 20, 20);
  coins.addImage("coins", coinImage);
  coins.scale = 0.5;
  coins.lifetime = 120;
  coinGp.add(coins);
  
  //Asigning random places for the coins
  if(frameCount%30 === 0){
    switch(coinRand) {
        case 1: coins.x = 100;
                coins.velocityY = +(6 + 3*score/100);
                break;
        case 2: coins.x = 300;
                coins.velocityY = +(6 + 3*score/100);
                break;
        case 3: coins.x = 500;
                coins.velocityY = +(6 + 3*score/100);
                break;
        default: break;
    }
  }
}
function energy(){
  
  energyDrink = createSprite(100, -50, 20, 20);
  energyDrink.addImage("energyDrink", energyImage);
  energyDrink.scale = 0.2;
  energyDrink.lifetime = 120;
  energyGp.add(energyDrink);
  
  energyDrink.depth = start.depth;
  start.depth = start.depth+1;
  
  //Asigning random places for the energyDrinks
  if(frameCount%30 === 0){
    switch(energyRand) {
        case 1: energyDrink.x = 100;
                energyDrink.velocityY = +(6 + 3*score/100);
                break;
        case 2: energyDrink.x = 300;
                energyDrink.velocityY = +(6 + 3*score/100);
                break;
        case 3: energyDrink.x = 500;
                energyDrink.velocityY = +(6 + 3*score/100);
                break;
        default: break;
    }
  }
}

function bomb(){
  bombs = createSprite(100, -50, 20, 20);
  bombs.addImage("bombs", bombImage);
  bomb.scale = 0.2;
  bombs.scale = 0.1;
  bombs.lifetime = 120;
  bombGp.add(bombs);
  
  bombs.depth = start.depth;
  start.depth = start.depth+1;
  
  //Asigning random places for the bombs
  if(frameCount%30 === 0){
    switch(bombRand) {
        case 1: bombs.x = 100;
                bombs.velocityY = +(6 + 3*score/100);
                break;
        case 2: bombs.x = 300;
                bombs.velocityY = +(6 + 3*score/100);
                break;
        case 3: bombs.x = 500;
                bombs.velocityY = +(6 + 3*score/100);
                break;
        default: break;
    }
  }
}
function tiles(){
  if (frameCount%80==0){
    var tile =createSprite(random(50,380),10,100,100)
    tile.shapeColor=("aqua")
    tile.velocityY=+4
    player.depth=tile.depth
    player.depth=player.depth+1
    tilesgroup.add(tile)
    counter++
  }
}
function keyPressed(){
if(keyDown==UP_ARROW){
  player.y=player.y-100
//Matter.body.setPositon(ball.body,ball.body.position,{x:100,y:300})
//translation={x:0,y:-100}
//Matter.Body.translate(ball,translation)
}
}