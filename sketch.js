var trexAnimation,trex,groundImage,ground,invisibleGround,cloudImage,cloudGroup,obstacle1Image,obstacle2Image,obstacle3Image,obstacle4Image,obstacle5Image,obstacle6Image,obstacleGroup
//initiate Game STATEs
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var trexCollide;
var gameOverImage;
var restartImage;
var restart;
var gameOver;
var score;

function preload() {
  trexAnimation = loadAnimation("trex1.png","trex3.png","trex4.png")
  trexCollide = loadAnimation("trex_collided.png")
  groundImage = loadImage("ground2.png")
  cloudImage = loadImage("cloud.png")
  obstacle1Image = loadImage("obstacle1.png")
  obstacle2Image = loadImage("obstacle2.png")
  obstacle3Image = loadImage("obstacle3.png")
  obstacle4Image = loadImage("obstacle4.png")
  obstacle5Image = loadImage("obstacle5.png")
  obstacle6Image = loadImage("obstacle6.png")
  gameOverImage = loadImage("gameOver.png")
  restartImage = loadImage("restart.png")
  
}

function setup() {
  createCanvas(600, 200);
  trex = createSprite(50,175,10,10);
  trex.addAnimation("trexRun",trexAnimation)
  trex.addAnimation("trexCollide",trexCollide)
  trex.scale = 0.5
  ground = createSprite(300,190,10,300)
  ground.addImage("groundMove",groundImage)
  score = 0
  ground.x = ground.width/2
  console.log(ground.width)
  invisibleGround = createSprite(300,195,600,10)
  invisibleGround.visible = false
  cloudGroup = new Group()
  obstacleGroup = new Group()
  gameOver = createSprite(300,100);
  restart = createSprite(300,140);
  gameOver.addImage("gameOver.png",gameOverImage);
  gameOver.scale = 0.5;
  restart.addImage("restart.png",restartImage);
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
}

function draw() {
  textSize(18);
  textFont("Georgia");
  textStyle(BOLD);
  background(180);
  text("Score: "+ score, 50, 50);
  if(gameState === PLAY) {
    ground.velocityX = -7;
    score = score + Math.round(getFrameRate()/60);
    if(ground.x < 0) {
      ground.x = ground.width/2
    }
    if(keyDown("SPACE") & trex.y >= 166.5) {
      trex.velocityY = -8
    }
    trex.velocityY = trex.velocityY + 0.4
    spawnClouds()
    spawnObstacles()
    if(obstacleGroup.isTouching(trex)) {
      gameState = END;
    }
  }
  else if(gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("trexCollide",trexCollide)
    
    //set lifetime of the game objects so that they are never destroyed
    obstacleGroup.setLifetimeEach(-1);
    cloudGroup.setLifetimeEach(-1);
    
    
  }
  if(mousePressedOver(restart)) {
    reset();
  }
  trex.collide(invisibleGround)
  drawSprites()
  //console.log(trex.y)
  //text(mouseX+","+mouseY,mouseX,mouseY);
}
function spawnClouds() {
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10)
    cloud.y = Math.round(random(80,120))
    cloud.addImage("cloud.png",cloudImage)
    cloud.scale = 0.5
    cloud.velocityX = -3
    cloud.lifetime = 200
    
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1
    cloudGroup.add(cloud)
  }
  
}
function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  obstacleGroup.destroyEach();
  cloudGroup.destroyEach();
  
  trex.changeAnimation("trexRun",trexAnimation)
  
  score = 0;
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,170,10,40)
    obstacle.velocityX = -6
    
    var rand = Math.round(random(1,6))
  switch(rand) {
    case 1:obstacle.addImage("obstacle1",obstacle1Image);
      break
      case 2:obstacle.addImage("obstacle2",obstacle2Image);
      break
      case 3:obstacle.addImage("obstacle3",obstacle3Image);
      break
      case 4:obstacle.addImage("obstacle4",obstacle4Image);
      break
      case 5:obstacle.addImage("obstacle5",obstacle5Image);
      break
      case 6:obstacle.addImage("obstacle6",obstacle6Image);
      break
      default:break
  }
    
         
    obstacle.scale = 0.5
    obstacle.lifetime = 100
      obstacleGroup.add(obstacle)
  }
}
