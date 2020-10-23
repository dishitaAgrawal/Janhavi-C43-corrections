const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;

var engine, world;

//gamestates
var ONE = 1;
var TWO = 2;
var THREE = 3;
var gameState = ONE;

var checkpointImage;
var checkpoints;
var score;
var lives;

//FIRST LEVEL
//Groups
var debrisGroup;

//Character
var jet;

//Obstacles
var debris;
var debrisArray = [];

//Images
var jetImage;
var obstaclesImage;

//Sounds
var checkpointSound, upgraderSound;
var die;

//SECOND LEVEL
//Groups
var obstaclesGroup;

//Character
var player;

//Objects
var ground, invisibleGround;
var obstacles;

//Images
var playerImage;
var bg;
var backgroundImg;
var obstacle1_image, obstacle2_image, obstacle3_image, obstacle4_image;
var groundImage;

//Sounds
var checkpointSound, upgraderSound;
var die, jump;

//THIRD LEVEL
//Characters
var playerShip;
var enemyShip;

//Obstacles
var asteroids;

//Images
var playerShipImage;
var background_image;
var asteroid_image;

function preload() {
  backgroundImg = loadImage("Images/background1.jpg");

  jetImage = loadImage("Images/Jet.png");

  asteroid = loadImage("Images/Asteroid 1.png");

  playerImage = loadImage(
    "Images/1.png",
    "Images/2.png",
    "Images/3.png",
    "Images/4.png",
    "Images/5.png",
    "Images/6.png",
    "Images/7.png",
    "Images/8.png"
  );

  obstacle1_image = loadImage("Images/obstacle1.png");
  obstacle2_image = loadImage("Images/obstacle2.png");
  obstacle3_image = loadImage("Images/obstacle3.png");
  obstacle4_image = loadImage("Images/obstacle4.png");
}

function setup() {
  createCanvas(800, 400);

  engine = Engine.create();
  world = engine.world;

  //Jet for the first game
  jet = createSprite(50, 200, 10, 10);
  jet.addImage("jet", jetImage);
  jet.scale = 0.5;

  debrisGroup = new Group();

  // //To create debris for the first game
  // for (var a = 0; a < 10; a++) {
  //   debrisArray.push(new Debris());
  // }

  //Background for the second game
  bg = createSprite(400, 130, 400, 500);
  bg.addImage("bg", backgroundImg);
  bg.visible = false;
  bg.width = width * 2;

  //Player and ground for the second game
  player = createSprite(50, 365, 20, 30);
  player.addImage("image", playerImage);
  player.scale = 0.7;
  player.visible = false;

  //Obstacle's Group for the second game
  obstaclesGroup = new Group();

  //An invisible ground for the second game
  invisibleGround = createSprite(400, 390, 1000, 10);
  invisibleGround.visible = false;

  //spaceship for the third game
  spaceship = createSprite(50, 200, 10, 10);
  spaceship.visible = false;

  for (var y = 0; y < 50; y++) {
    asteroids = createSprite(50, 200, 10, 10);
    asteroids.visible = false;
  }

  score = 0;
  lives = 2;
}

function draw() {
  background(0, 0, 0);

  Engine.update(engine);

  if (gameState === ONE) {
    //creating debris at regular frameCount, adding them to group and assigning them lifetime to avoid memory leak
    createDebris();
    if (keyIsDown(RIGHT_ARROW)) {
      jet.x += 20;
    }

    if (debrisGroup.isTouching(jet)) {
      text("Try Again", 380, 50);
      jet.x = 50;
      lives--;
    }

    if (jet.x > 800) {
      gameState = TWO;
    }

    drawSprites();
  } else if (gameState === TWO) {
    // DESTROYED THE DEBRIS GROUP so that thye dont appear on screen
    debrisGroup.destroyEach();
    jet.destroy();
    levelTwo();

    drawSprites();

    score = score + Math.round(player.x % 150 === 0);
    fill("white")
    text("Score: " + score, player.x + 500, 60);

    if (score === 20) {
      gameState = THREE;
    }
  } else if (gameState === THREE) {
    bg.destroy();
    player.destroy();
    invisibleGround.destroy();
    obstaclesGroup.destroyEach();
    drawSprites();
  }
}

function createDebris() {
    if(frameCount%20 ===0){
        var debris = createSprite(Math.round(random(50,displayWidth)),0,10,10);
        debris.addImage("Asteroid", asteroid);
        debris.velocityY = 3;
        debris.scale = 0.3;
        debris.lifetime = displayHeight/3;
        debrisGroup.add(debris)
    }

  // for (var b = 0; b < debrisArray.length; b++) {
  //   debrisArray[b].gravity();
  // }
}

function levelTwo() {
  background(0, 0, 0);
  bg.visible = true;
  player.visible = true;
  bg.depth = 1;

  camera.position.x = camera.position.x + 10;

  if (player.x % 250 === 0) {
    bg.x = player.x + 500;
  }

  if (player.x % 100 === 0) {
    invisibleGround.x = player.x + 100;
  }

  if (keyDown("space") && player.y >= 300) {
    player.velocityY = -12;
  }

  player.velocityY = player.velocityY + 0.8;
  player.collide(invisibleGround);
  player.x = camera.position.x - 300;

  if (frameCount % 110 === 0) {
    obstacles = createSprite(50, 350, 20, 50);
    obstacles.x = player.x + 600;
    obstacles.lifetime = 100;

    var rand = round(random(1, 3));

    switch (rand) {
      case 1:
        obstacles.addImage(obstacle1_image);
        break;
      case 2:
        obstacles.addImage(obstacle2_image);
        break;
      case 3:
        obstacles.addImage(obstacle3_image);
        break;

      default:
        break;
    }
    obstacles.scale = 1.5;
    obstaclesGroup.add(obstacles);
  }
}

function levelThree() {
  console.log("level three");
}
