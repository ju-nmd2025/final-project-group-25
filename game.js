import { character } from "./character.js";
import { createPlatform, platforms } from "./platform.js";

function setup() {
  createCanvas(400, 400);

  // multiple platforms setup
  platforms.push(createPlatform(100, 350));
  platforms.push(createPlatform(200, 250));
  platforms.push(createPlatform(300, 150));
  platforms.push(createPlatform(150, 100));
}

// Obstacle / Spike / Death
function drawObstacle() {
  push();
  fill("red");
  triangle(180, 300, 210, 240, 240, 300);
  pop();
}

function draw() {
  background(100, 100, 100);

  //Move all platforms
  platforms.forEach((platform) => {
    platform.draw();
    platform.x -= 10;
    if (platform.x + platform.w < 0) {
      platform.x = width;
    }
  });

  character.draw();

  // character gravity
  if (character.y + character.h < 300) {
    character.y += 10;
  }

  // Floor
  stroke(255);
  line(0, 300, 400, 300);
}

function keyPressed() {
  if (character.y + character.h === 300) {
    character.y -= 80;
  }
}
