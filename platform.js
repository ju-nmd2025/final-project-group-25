// Function to create a single platform
export function createPlatform(x, y) {
  return {
    x,
    y,
    w: 80,
    h: 20,

    draw() {
      push();
      fill("green");
      rect(this.x, this.y, this.w, this.h);
      pop();
    },
  };
}

export let platforms = [];
