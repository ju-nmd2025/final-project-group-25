export let character = {
  x: 50,
  y: 300,
  w: 50,
  h: 50,
  vy: 0,
  vx: 0,
  speed: 3,
  gravity: 0.3,
  jumpforce: -11,
  onGround: false,

  draw() {
    push();
    noStroke();

    //Knot Headband
    fill(140, 20, 30);
    rect(this.x + 47, this.y - this.h, 25, 45, 0, 90, 0, 90);
    fill(160, 10, 30);
    ellipse(this.x + 52, this.y - this.h - 2, 22, 22);

    //Ears
    fill(110, 235, 90);
    triangle(
      this.x + 25,
      this.y - this.h - 8,
      this.x + this.w,
      this.y - this.h - 40,
      this.x + this.w,
      this.y - this.h - 8
    );
    fill(90, 180, 90);
    triangle(
      this.x + 5,
      this.y - this.h - 8,
      this.x + this.w - 20,
      this.y - this.h - 40,
      this.x + this.w - 20,
      this.y - this.h - 8
    );

    // Legs
    fill(90, 180, 90);
    rect(this.x + 8, this.y - 15, 12, 15);
    fill(110, 235, 90);
    rect(this.x + 29, this.y - 15, 12, 15);

    // Head
    fill(110, 235, 90);
    ellipse(this.x + this.w / 2, this.y - this.h, this.w, this.h * 0.8);

    // Body
    fill(110, 235, 90);
    rect(this.x, this.y - this.h, this.w, this.h - 10, 0, 0, 10, 10);

    // Eyes
    fill("white");
    ellipse(this.x + 12, this.y - this.h + 7, 16, 16);
    ellipse(this.x + 25, this.y - this.h + 7, 16, 16);
    fill("black");
    ellipse(this.x + 7, this.y - this.h + 7, 5, 5);
    ellipse(this.x + 21, this.y - this.h + 7, 5, 5);

    // Headband
    fill(210, 0, 40);
    rect(this.x - 1, this.y - this.h - 8, this.w + 4, 12);

    pop();
  },

  //automatic jumping
  jump(){
    if(this.onGround){
      this.vy = this.jumpforce;
      this.onGround = false;
    }
  },

  // movement left/right when key is pressed
  handleInput() {
    this.vx = 0;
    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
      this.vx = -this.speed;
    }
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
      this.vx = this.speed;
    }
  },

  update() {
    this.handleInput();

    // apply gravity
    this.vy += this.gravity;
    this.y += this.vy;

    // apply horizontal movement
    this.x += this.vx;

    // ground collision
    if (this.y + this.h >= height) {
      this.y = height - this.h;
      this.vy = 0;
      this.onGround = true;
    }

    // screen wrapping
    if (this.x + this.w < 0) {
      this.x = width;
    }
    if (this.x > width) {
      this.x = 0;
    }
  },
};

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(100, 100, 100);
  character.update();
  character.draw();

  // Floor
  line(0, 350, width, 350);
}
