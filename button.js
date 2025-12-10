export class button{
    constructor(x, y, w, h, label) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.label = label;

        this.fillColor = "#9e2d00ff";
        this.textColor = "#FFFFFF";
    }

draw() {
    push();
    // Draw button rectangle
    fill(this.fillColor);
    rect(this.x, this.y, this.w, this.h, 10);  
    // Draw button label
    fill(this.textColor);
    textSize(24);
    textAlign(CENTER, CENTER);
    text(this.label, this.x + this.w / 2, this.y + this.h / 2);
    pop();
}

// handleClick(mouseX, mouseY) {
//     if (
//         mouseX >= this.x &&
//         mouseX <= this.x + this.w &&
//         mouseY >= this.y &&
//         mouseY <= this.y + this.h
//     ) {
//         return true; // Button was clicked
//     }  
//     return false; // Button was not clicked
// }
}