import { character } from "./character";
import platform from "platform";

function setup() {
  createCanvas(360, 580);
}

let platforms = [new platform(150,380,80,20),new platform(150,280,80,20),new platform(random(0,320),180,80,20),new platform(random(0,320),80,80,20)];

let x = 100;
let y = 100;

function draw() {
  background(100, 100, 100);

    character.draw();
	
    //platform draw
    for(let p of platforms){
        p.draw();
    }

    //platform movement
    if(character.y + character.h < 250){
        for(let p of platforms){
            p.update();
        }
    }

    //new platforms
    newPlatform();

    if(character.y + character.h < 300){
        character.y += 10;
    }

    //platform collision
    platformCollision();

    // Floor
    line(0, 300, 400, 300);
}

function newPlatform(){
    if(platforms[0].y>380){
        platforms.shift();
        platforms.push(new platform(random(0,320),-20,80,20));
    }
}

function platformCollision(){
    for(let p of platforms){
        let isXColliding = character.x+character.w>=p.x && character.x<=p.x+p.w;
        let isYColliding = character.y+character.h>=p.y && character.y+character.h<=p.y+10;

        if(isXColliding && isYColliding){
            character.y = p.y - character.h;
        }
}
}

function keyPressed(){
    // Jump
    if(key==" " &&character.y + character.h === 300){
        character.y -= 150;
    }

    // Move left and right
    if(keyCode === LEFT_ARROW || key=="a"){
        character.x -= 20;
    }
    if(keyCode === RIGHT_ARROW || key=="d"){
        character.x += 20;
    }
}
