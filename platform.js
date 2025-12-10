export class platform {
  constructor(x, y, w, h, type = "normal") {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.speed = 3;

    this.type = type;
    this.broken = false;
    this.isBrokenFalling = false;
    // this.fallSpeed = 0;
  }

  draw() {
    push();
    if (this.type === "broken") {
      if (!this.broken) {
        fill(120, 70, 200);
        rect(this.x, this.y, this.w, this.h);

        stroke(75, 0, 130);
        strokeWeight(1);
        let crackX = this.x + this.w / 2;
        line(crackX, this.y, crackX, this.y + this.h);
        noStroke();
      } else {
        fill(75, 0, 130);
        //left half
        push();
        translate(this.leftX + this.w / 4, this.y + this.h / 2);
        rotate(radians(35));
        rectMode(CENTER);
        rect(0, 0, this.w / 2, this.h);
        pop();

        //right half
        push();
        translate(this.rightX + this.w / 4, this.y + this.h / 2);
        rotate(radians(-35));
        rectMode(CENTER);
        rect(0, 0, this.w / 2, this.h);
        pop();
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

    if (this.broken && !this.isBrokenFalling) {
      this.breakTimer = (this.breakTimer || 0) + 1;
      if (this.breakTimer > 20) {
        this.isBrokenFalling = true;
      }

      this.leftX = this.x;
      this.rightX = this.x + this.w / 2;
      this.leftY = this.y;
      this.rightY = this.y;
      this.fallSpeed = 0;
    } else if (this.isBrokenFalling) {
      this.fallSpeed += 0.5;
      this.leftY += this.fallSpeed;
      this.rightY += this.fallSpeed;
      this.leftX -= 2;
      this.rightX += 2;

      if (
        this.leftY - this.h / 2 > height &&
        this.rightY - this.h / 2 > height
      ) {
        this.isBrokenFalling = false;
        this.broken = false;
        // Move off-screen
        this.x = -this.w;
      }
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
