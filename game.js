import { character } from "./character";
import platform from "platform";

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

  //smooth character movement
  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
    character.x -= 3;
  }
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
    character.x += 3;
  }

  //character reapearing when going off screen
  if (character.x + character.w < 0) {
    character.x = width;
  }
  if (character.x > width) {
    character.x = 0;
  }

  //platform collision
  platformCollision();

  //character jumping
  character.update();

  //new platforms
  newPlatform();

  // Floor
  //line(0, 300, 400, 300);
}

function newPlatform() {
  if (platforms[0].y > 580) {
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
      character.jump();
    }
  }
}

// function keyPressed(){
//     // Jump
//     if(key==" " &&character.y + character.h === 300){
//         character.y -= 150;
//     }

//     // Move left and right
//     if(keyCode === LEFT_ARROW || key=="a"){
//         character.x -= 20;
//     }
//     if(keyCode === RIGHT_ARROW || key=="d"){
//         character.x += 20;
//     }
// }
