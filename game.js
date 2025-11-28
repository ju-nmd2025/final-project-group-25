import { character } from "./character";
import { createPlatform, platforms } from "./platform.js";

function setup() {
  createCanvas(400, 400);

  // multiple platforms setup
  platforms.push(createPlatform(100, 400));
  platforms.push(createPlatform(200, 300));
  platforms.push(createPlatform(300, 200));
  platforms.push(createPlatform(150, 100));
}

// Obstacle / Spike / Death
function drawObstacle() {
  push();
  fill("red");
  triangle(180, 300, 210, 240, 240, 300);
  pop();
}

let x = 100;
let y = 100;

function draw() {
  background(100, 100, 100);

  character.draw();

  // Draw all platforms
  platforms.forEach((platform) => platform.draw());

  //Move all platforms
  platforms.forEach((platform) => {
    platform.x -= 10;
    if (platform.x + platform.w < 0) {
      platform.x = 500;
    }
  });

  // character gravity
  if (character.y + character.h < 300) {
    character.y += 10;
  }

  // Floor
  line(0, 300, 400, 300);
}

function keyPressed() {
  if (character.y + character.h === 300) {
    character.y -= 80;
  }
}
