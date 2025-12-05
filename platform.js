export class platform {
  constructor(x, y, w, h, type = "normal") {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.speed = 3;

    this.type = type;
    this.broken = false;
    this.fallSpeed = 0;
  }

  draw() {
    push();
    if (this.type === "broken") {
      if (!this.broken) {
        fill("red");
      } else {
        fill("brown");
      }
    } else {
      fill("blue");
    }

    rect(this.x, this.y, this.w, this.h);
    pop();
  }

  update() {
    if (this.broken) {
      this.fallSpeed += 0.5;
      this.y += this.fallSpeed;
    } else {
      this.y += this.speed;
    }
    this.draw();
  }
  break() {
    if (!this.broken) {
      this.broken = true;
    }
  }
}
