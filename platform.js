export class platform {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.speed = 3;
  }

  draw() {
    push();
    fill("blue");
    rect(this.x, this.y, this.w, this.h);
    pop();
  }

  update() {
    this.y += this.speed;
  }
}
