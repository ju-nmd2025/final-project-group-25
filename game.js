import { character } from "./character";
import platform from "platform";

function setup() {
    createCanvas(400, 400);
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
    // if (character.y+character.h < 250){
    // platform.y += 5 ;
    // if(platform.y + platform.h > 400){  
    //     platform.y = 0;
    // }
    // }

    if(character.y + character.h < 300){
        character.y += 10;
    }

    // Floor
    line(0, 300, 400, 300);
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
