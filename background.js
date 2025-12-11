export class Background {
  constructor() {
    this.stars = [];

    // Generate soft glowing stars
    for (let i = 0; i < 40; i++) {
      this.stars.push({
        x: random(width),
        y: random(height),
        size: random(1, 3),
        flicker: random(0.01, 0.03),
        phase: random(TWO_PI),
      });
    }

    // Bamboo positions
    this.bamboo = [];
    for (let i = 0; i < 10; i++) {
      this.bamboo.push({
        x: random(width),
        height: random(200, 500),
        wobbleOffset: random(1000),
      });
    }
  }

  draw() {
    // Night sky gradient (top blue, bottom purple)
    for (let y = 0; y < height; y++) {
      let inter = map(y, 0, height, 0, 1);
      let c = lerpColor(color(20, 20, 60), color(50, 0, 70), inter);
      stroke(c);
      line(0, y, width, y);
    }

    // Stars
    noStroke();
    for (let s of this.stars) {
      let glow = sin(frameCount * s.flicker + s.phase) * 1.5 + 2;
      fill(255, 255, 180, 200);
      circle(s.x, s.y, s.size + glow);
    }

    // Bamboo silhouettes
    for (let b of this.bamboo) {
      push();
      let wobble = sin(frameCount * 0.01 + b.wobbleOffset) * 2;
      translate(b.x + wobble, height);

      fill(20, 40, 40);
      rect(0, -b.height, 12, b.height);

      // Bamboo nodes
      fill(30, 60, 60);
      for (let y = -20; y > -b.height; y -= 40) {
        rect(-2, y, 16, 6);
      }
      pop();
    }
  }
}

export { Background }