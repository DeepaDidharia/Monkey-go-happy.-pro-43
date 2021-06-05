var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score, survivalTime;
var backgroundImg;
var score = 0;
var gameState ;
var END ;




function preload(){
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  backgroundImg = loadImage("jungle.jpg");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png"); 
}






function setup() {
  createCanvas(600,600);
  
  score = 0;
  survivalTime = 0;
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(500,590,900,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;

  foodGroup = new Group();
  obstacleGroup = new Group();
}

function draw() {
  background(backgroundImg);
  
  if(ground.x < 0){
    ground.x = ground.width/2;
  }
  
  if(keyDown("space")){
    monkey.velocityY = -12;
  }
  monkey.velocityY = monkey.velocityY + 0.8;
  
  monkey.collide(ground);
  
  spawnFood();
  spawnObstacle();
  


  if(obstacleGroup.isTouching(monkey)){
    background.velocityX = 0;
    monkey.visible = false;

    foodGroup . destroyEach();
    obstacleGroup.destroyEach();

    textSize(30);
    stroke("white");
    fill("black");
    text ("Game Over !!!", 200,200);
      
    
  }
  


  if(foodGroup.isTouching(monkey)){
     foodGroup.destroyEach();
     score = score + 2 ;
     monkey.scale += +0.01;
  }
  
  survivalTime = Math.ceil(frameCount/getFrameRate());
  
  stroke("black");
  fill("white");
  textSize(20);
  text("Survival Time: "+ survivalTime, 100, 50);
  

  stroke("black");
  fill("white");
  textSize(20);
  text("Score : " + score , 450, 50);

  drawSprites();
}






function spawnFood(){
  if(frameCount % 80 === 0){
    var banana = createSprite(500,900,40,10);
    banana.addImage("banana", bananaImage);
    banana.scale = 0.1;
    banana.y = random(320,500);
    banana.velocityX = -5;
    banana.lifetime = 300;
    
    monkey.depth = banana.depth+1;
    
    foodGroup.add(banana);
  }
}






function spawnObstacle(){
  if(frameCount % 300 === 0){
    var obstacle = createSprite(800,580,10,40);
    obstacle.addImage("obstacle", obstacleImage);
    obstacle.scale = 0.15;
    obstacle.velocityX = -6;
    obstacle.lifetime = 300;
    
    obstacleGroup.add(obstacle);
  }
}