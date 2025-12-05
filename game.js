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
  new platform(
    random(0, 280),
    580,
    80,
    20,
    random(1) < 0.3 ? "broken" : "normal"
  ),
  new platform(
    random(0, 280),
    505,
    80,
    20,
    random(1) < 0.3 ? "broken" : "normal"
  ),
  new platform(200, 430, 80, 20, random(1) < 0.3 ? "broken" : "normal"),
  new platform(50, 355, 80, 20, random(1) < 0.3 ? "broken" : "normal"),
  new platform(150, 280, 80, 20, random(1) < 0.3 ? "broken" : "normal"),
  new platform(100, 205, 80, 20, random(1) < 0.3 ? "broken" : "normal"),
  new platform(50, 130, 80, 20, random(1) < 0.3 ? "broken" : "normal"),
  new platform(200, 55, 80, 20, random(1) < 0.3 ? "broken" : "normal"),
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
    if (character.y + character.h < 400) {
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
      // If platform is broken, break it
      if (p.type === "broken") {
        character.y = p.y + 25 - character.h / 2;
        character.vy = 0;
        character.onGround = true;
        character.jump();
        p.break();
        continue;
      }
      // Normal platform behavior
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

    let type = random(1) < 0.3 ? "broken" : "normal";
    let newX = random(0, 280);
    let tries = 0;

    while (tries < 10) {
      let candidateX = random(0, 280);
      let tooClose = false;

      for (let i = 0; i < platforms.length; i++) {
        if (Math.abs(platforms[i].x - candidateX) < 100) {
          tooClose = true;
          break;
        }
      }

      if (!tooClose) {
        newX = candidateX;
        break;
      }

      tries++;
    }

    platforms.push(new platform(random(0, 280), -20, 80, 20, type));
  }

  // Increase score
  let currentHeight = FloorY - character.y;
  maxScore = Math.max(maxScore, currentHeight);
  score = Math.floor(maxScore);
}
