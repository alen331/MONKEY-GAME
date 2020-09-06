var ground;
var monkey , monkey_running
var banana ,bananaImage, bananaGroup, obstacle, obstacleImage, obstacleGroup;
var FoodGroup, obstacleGroup
var survivaltime = 0;
       
function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
 obstacleImage = loadImage("obstacle.png");
}

function setup() {
  createCanvas(800, 700);

monkey = createSprite(100, 560);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.2;
  
  ground = createSprite(400, 625, 1600, 10);
  ground.velocityX = -5;
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
}

function draw() {
background(500);
  
  textSize(20);
  fill("black");
  text("SurvivalTime" + survivaltime, 350, 100);
  
  if(keyDown("space")&& monkey.y >= 550){
  monkey.velocityY = -14;
  }
  
  if(ground.x < 0){
  ground.x = ground.width/2;
  }
  
  monkey.velocityY = monkey.velocityY +0.3;
  monkey.collide(ground);
      
    if(bananaGroup.isTouching(monkey)){
    survivaltime = survivaltime +1;
      bananaGroup.destroyEach();
    }
  
  if(survivaltime < 0){
     bananaGroup.destroyEach();
    obstacleGroup.destroyEach();
    bananaGroup.setVelocityEach(0);
     obstacleGroup.setVelocityEach(0);
    
    monkey.destroy();
    monkey.setVelocity(0);
     }
  
  stone();
  drawSprites();
}

function stone() {
  if(frameCount % 300 === 0){
  obstacle = createSprite(570, 562, 20, 20);
    obstacle.velocityX = -(5+2* survivaltime/2);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.3;
    obstacle.lifetime = 150;
    obstacleGroup.add(obstacle);
  }
  
  if(frameCount % 100 === 0){
  banana = createSprite(570, Math.round(random(200, 300)));
  banana.addImage(bananaImage);
    banana.scale = 0.2;
    banana.velocityX = -6;
    banana.lifetime = 150;
    bananaGroup.add(banana);
            if(obstacleGroup.isTouching(monkey)){
     survivaltime = survivaltime -1;
    }
  } 
}


