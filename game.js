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

function draw() {
    background(100, 100, 100);

    character.draw();
	platform.draw();

    if (character.y+character.h < 250){
    platform.y += 5 ;
    if(platform.y + platform.h > 400){  
        platform.y = 0;
    }
    }

    if(character.y + character.h < 300){
        character.y += 10;
    }

    // Floor
    line(0, 300, 400, 300);
}


function keyPressed(){
    if(key==" " &&character.y + character.h === 300){
        character.y -= 150;
    }
    if(keyCode === LEFT_ARROW || key=="a"){
        character.x -= 20;
    }
    if(keyCode === RIGHT_ARROW || key=="d"){
        character.x += 20;
    }
}
