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
      fill(this.broken ? "brown" : "red");
    } else if (this.type === "moving") {
      fill("green");
    } else {
      fill("blue");
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

      case "moving":
        this.movingUpdate();
        break;
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
    this.y += this.speed;

    if (this.startX === undefined) this.startX = this.x;
    if (this.moveSpeed === undefined) this.moveSpeed = 2;
    if (this.moveDirection === undefined) this.moveDirection = 1;
    if (this.moveRange === undefined) this.moveRange = 60;

    this.x += this.moveSpeed * this.moveDirection;

    if (
      this.x > this.startX + this.moveRange ||
      this.x < this.startX - this.moveRange
    ) {
      this.moveDirection *= -1; // Reverse direction
    }
  }

  break() {
    if (!this.broken) {
      this.broken = true;
    }
  }
}
