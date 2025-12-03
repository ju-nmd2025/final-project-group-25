import { character } from "./character";
import platform from "platform";

// Floor position
const FloorY = 580;

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

  character.update();
  character.draw();

  //platform draw
  for (let p of platforms) {
    p.draw();
  }

  //platform movement
  if (character.y + character.h < 250) {
    for (let p of platforms) {
      p.update();
    }
  }

  //platform collision
  platformCollision();

  //character jumping
  character.update();

  //new platforms
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
    let isYColliding =
      character.y + character.h >= p.y &&
      character.y + character.h <= p.y + 10 &&
      character.vy > 0;

    if (isXColliding && isYColliding) {
      character.y = p.y - character.h;
      character.vy = 0;
      character.onGround = true;
    }
  }
}

function keyPressed() {
  // Jump
  if ((key === " " || keyCode === UP_ARROW) && character.onGround) {
    character.jump();
  }
}
