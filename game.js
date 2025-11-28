import { character } from "./character";
import platform from "platform";

function setup() {
    createCanvas(400, 400);
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

let goingUp = true;
let speed = 8;        // smaller = smoother
let jumpPeak = 100;   // how high the jump goes
let groundY = 300;    // ground position


function draw() {
    background(100, 100, 100);

    character.draw();
	platform.draw();

    // Smooth left/right movement
    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {   // 'a'
        character.x -= 4;
    }
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {  // 'd'
        character.x += 4;
    }

    if (character.x < -25) {
        character.x = 375;
    }
    if (character.x > 375) {
        character.x = -25;
    }


    // Platform movement
    if (character.y+character.h < 250){
    platform.y += 5 ;
    if(platform.y + platform.h > 400){  
        platform.y = 0;
    }
    }

    // Automatic smooth jump
if (goingUp) {
    character.y -= speed;

    // Reached top of jump?
    if (character.y + character.h <= jumpPeak) {
        goingUp = false; // start going down
    }
} else {
    character.y += speed;

    // Reached ground?
    if (character.y + character.h >= groundY) {
        character.y = groundY - character.h; // stay on ground
        goingUp = true;                      // start going up again
    }
}

    // if(character.y + character.h >= 300){
    //     if(character.y + character.h > 100){
    //     character.y -= 10;
    //     }
    // }
    // if(character.y + character.h < 300){
    //     character.y += 10;
    // }

    // Floor
    line(0, 300, 400, 300);
}


//function keyPressed(){
//    if(key==" " &&character.y + character.h === 300){
//        character.y -= 150;
//    }
//}
