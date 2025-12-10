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
      if (!this.broken) {
        fill(120, 70, 200);
        rect(this.x, this.y, this.w, this.h);

        stroke(100, 30, 50);
        strokeWeight(2);
        let crackX = this.x + this.w / 2;
        line(crackX, this.y, crackX, this.y + this.h);
        noStroke();
      } else {
        fill(150, 70, 90);
        rect(this.leftX, this.y, this.w / 2, this.h);
        rect(this.rightX, this.y, this.w / 2, this.h);
      }
    } else if (this.type === "moving") {
      fill(200, 100, 220);
      rect(this.x, this.y, this.w, this.h);
    } else {
      fill(100, 200, 180);
      rect(this.x, this.y, this.w, this.h);
    }
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
