import { character } from "./character.js";
import { platform } from "./platform.js";

// Floor position
const FloorY = 580;

let cameraY = 0;

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

  //camera movement
  if (character.y + character.h < 250) {
    let delta = 250 - (character.y + character.h);
    cameraY += delta;
    character.y += delta;
    for (let p of platforms) {
      p.y += delta;
    }
  }

  push();
  translate(0, cameraY);

  character.update();
  character.draw();

  //platform draw
  for (let p of platforms) {
    p.draw();
  }
  pop();

  //platform movement
  if (character.y + character.h < 250) {
    for (let p of platforms) {
      p.update();
    }
  }

  //platform collision
  platformCollision(platforms);
  newPlatform();
}

function newPlatform() {
  if (platforms[0].y > height) {
    platforms.shift();
    platforms.push(new platform(random(0, 280), -20, 80, 20));
  }
}

function platformCollision() {
  character.onGround = false;

  for (let p of platforms) {
    let isXColliding =
      character.x + character.w >= p.x && character.x <= p.x + p.w;

    // check is falling and crossed platform
    let wasAbove = character.y + character.h - character.vy <= p.y;
    let isFalling = character.vy >= 0;

    if (isXColliding && wasAbove && isFalling) {
      character.y = p.y - character.h;
      character.vy = character.jumpforce;
    }
  }
}

// jump on space or up arrow
function keyPressed() {
  if (key === " " || keyCode === UP_ARROW) {
    character.jump();
    if (character.vy === 0) {
      character.vy = character.jumpforce;
    }
  }
}
