
var angle = 119;
var val = 0.50;
var intival = 180;
var inc = 1.5;


function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  stroke(256, 150, 0, 100);
}

function draw() {
  colorMode(HSB);
  
  background(0, 190);
  angle += inc; //slider.value();
  translate(width / 2, height / 2 + intival / 2);
  branch(intival);
  if (angle >= 120 || angle <= 24) {
    inc *= -1;
  }
}

function branch(len) {

  if (len > 1.45) {
    push();
    rotate(angle);
    line(0, 0, 0, -len);
    translate(0, -len);
    branch(val * len);
    pop();
    push();
    line(0, 0, 0, -len);
    translate(0, -len);
    branch(val * len);
    pop();
    push();
    rotate(-angle);
    line(0, 0, 0, -len);
    translate(0, -len);
    branch(val * len);
    pop();
  }

  //line(0, 0, 0, -len * 0.67);
}