

let x = 0;
let y = 0;
let spacing = 7;

function setup() {
  createCanvas(600, 600);
  background(0);
}

function draw() {
     
  
  if (random(1) < 0.3) {
    line(x, y, x + spacing, y + spacing);
  } else {
    line(x, y + spacing, x + spacing, y);
  }
  x = x + spacing;
  if (x > width) {
    x = 0;
    y = y + spacing;
    let h = map(x, 1, spacing, 0, 360);
    stroke(h, 255, 255);
  }

}