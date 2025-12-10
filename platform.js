export class platform {
  constructor(x, y, w, h, type = "normal") {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.speed = 3;

    this.type = type;
    this.broken = false;
    // this.fallSpeed = 0;
  }

  draw() {
    push();
    if (this.type === "broken") {
      fill(this.broken ? color(150, 70, 90) : color(180, 70, 120));
    } else if (this.type === "moving") {
      fill(200, 100, 220);
    } else {
      fill(100, 200, 180);
    }

    rect(this.x, this.y, this.w, this.h);
    pop();
  }

  update() {
    switch (this.type) {
      case "normal":
        this.normalUpdate();
        break;

      case "broken":
        this.brokenUpdate();
        break;

      // case "moving":
      //   this.movingUpdate();
      //   break;
      default:
        this.y += this.speed;
        break;
    }
    this.draw();
  }
  normalUpdate() {
    this.y += this.speed;
  }

  brokenUpdate() {
    this.y += this.speed;
    if (this.broken) {
      this.x = -this.w; // Move off-screen
    }
  }

  movingUpdate() {
    if (this.moveDirection === undefined) {
      this.moveDirection = 1;
    }
    switch (this.moveDirection) {
      case 1:
        this.x += 2;
        if (this.x + this.w >= width) {
          this.moveDirection = -1;
        }
        break;
      case -1:
        this.x -= 2;
        if (this.x <= 0) {
          this.moveDirection = 1;
        }
        break;
    }
  }

  break() {
    if (!this.broken) {
      this.broken = true;
    }
  }
}
