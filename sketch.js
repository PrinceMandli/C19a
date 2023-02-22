var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

var score = 0;

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  doorsGroup = createGroup();
  climbersGroup = createGroup();
  invisibleBlockGroup = createGroup();

  ghost = createSprite(200,200,50,50);
  ghost.scale=0.2;
  ghost.addImage(ghostImg);
}

function draw() {
  if (gameState==="end")
  textSize(20);
  stroke("Blue")
  fill("Blue")
  text("Score: "+ score,30,50);{
    

    if(keyDown("left_arrow")){
      ghost.x=ghost.x-3;
    }
    
    if(keyDown("right_arrow")){
      ghost.x=ghost.x+3;
    }

    if(keyDown("space")){
      ghost.velocityY=-10;
    }
    if(keyDown("ecs")){
      (restartGame);   
     }

    ghost.velocityY = ghost.velocityY + 0.8;

    if(tower.y > 400){
      tower.y = 300
    }

    spawnDoors();
    
    if(climbersGroup.isTouching(ghost)){
    ghost.destroy();
    gameState="end";
    }

    if(invisibleBlockGroup.isTouching(ghost) || ghost.y>600){
      ghost.destroy();
      gameState="end";
    }
    
    drawSprites();
  }

  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250);
    playSound("spookey.wav");
  }
}

function spawnDoors() {
  //write code here to spawn the doors in the tower
  if (frameCount % 240 === 0) {
    var door = createSprite(200, -50);
    var climber = createSprite(200,10);
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    
    door.x = Math.round(random(120,400));
    climber.x = door.x;
    invisibleBlock.x = door.x;
    
    door.addImage(doorImg);
    climber.addImage(climberImg);
    
    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;
    
    ghost.depth = door.depth;
    ghost.depth +=1;
   
    //assign lifetime to the variable
    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;

    
    //add each door to the group
    doorsGroup.add(door);
    invisibleBlock.debug = true;
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}