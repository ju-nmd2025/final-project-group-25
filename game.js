import { character } from "./character.js";
import { platform } from "./platform.js";

// Floor position
const FloorY = 580;

let score = 0;
let maxScore = 0;
let gameStarted = false; // Track if the game has started

function setup() {
  createCanvas(360, 580);
}

let platforms = [
  new platform(random(0, 280), 580, 80, 20),
  new platform(random(0, 280), 480, 80, 20),
  new platform(50, 380, 80, 20),
  new platform(150, 280, 80, 20),
  new platform(random(0, 280), 180, 80, 20),
  new platform(random(0, 280), 80, 80, 20),
];

let x = 100;
let y = 100;

function draw() {
  background(100, 100, 100);

  if (!gameStarted) {
    // Display start screen
    fill(255);
    textSize(32);
    textAlign(CENTER);
    text("Ninja Jump", width / 2, height / 2 - 40);

    // start button
    fill(200, 0, 0);
    rect(width / 2 - 60, height / 2, 120, 50, 10);
    fill(255);
    textSize(24);
    text("Start", width / 2, height / 2 + 32);
  } else {
    // Game is running

    // Score display
    fill(255);
    textSize(24);
    textAlign(LEFT);
    text("Score: " + Math.floor(score), 10, 30);

    push();

    character.update();
    platformCollision();
    character.draw();

    //platform draw
    if (character.y + character.h < 250) {
      for (let p of platforms) {
        p.update();
      }
    } else {
      for (let p of platforms) {
        p.draw();
      }
    }
    pop();

    newPlatform();
  }
}

// Start game on mouse click
function mousePressed() {
  if (!gameStarted) {
    if (
      mouseX >= width / 2 - 60 &&
      mouseX <= width / 2 + 60 &&
      mouseY >= height / 2 &&
      mouseY <= height / 2 + 50
    ) {
      gameStarted = true;
    }
  }
}

//platform collision
function platformCollision() {
  character.onGround = false;
  for (let p of platforms) {
    let isXColliding =
      character.x + character.w >= p.x && character.x <= p.x + p.w;
    let isYColliding =
      character.y - 25 + character.h / 2 >= p.y &&
      character.y - 25 + character.h / 2 <= p.y + 20 &&
      character.vy > 0;

    if (isXColliding && isYColliding) {
      character.y = p.y + 25 - character.h / 2;
      character.vy = 0;
      character.onGround = true;
      character.jump();
    }
  }
}

// Spawn new platforms
function newPlatform() {
  if (platforms[0].y > height) {
    platforms.shift();
    platforms.push(new platform(random(0, 280), -20, 80, 20));
  }

  // Increase score
  let currentHeight = FloorY - character.y;
  maxScore = Math.max(maxScore, currentHeight);
  score = Math.floor(maxScore);
}
