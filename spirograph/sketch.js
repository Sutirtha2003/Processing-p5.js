

var path = [];

var angle = 0;
var resolution = 50;

var sun;
var end;

function setup() {
  createCanvas(800, 800);
  sun = new Orbit(width/2, height/2, width/4, 0);
  var next = sun;
  for (var i = 0; i < 10; i++) {
    next = next.addChild();
  }
  end = next;
}

function gradient(x1, y1, x2, y2, col1, col2) {
  let grad = drawingContext.createLinearGradient(x1, y1, x2, y2);
  grad.addColorStop(0, col1);
  grad.addColorStop(1, col2);
  drawingContext.fillStyle = grad;
}

function draw() {
  background(51);
  colorMode(RGB);

  for (var i = 0; i < resolution; i++) {
    var next = sun;
    while (next != null) {
      next.update();
      next = next.child;
    }
    path.push(createVector(end.x, end.y));
  }

  var next = sun;
  while (next != null) {
    next.show();
    next = next.child;
  }

  beginShape();
  noFill();
  
  var gradientColors = [
    color(255, 0, 0),  // Red
    color(255, 255, 0),  // Yellow
    color(0, 255, 0),  // Green
    color(0, 255, 255)  // Cyan
  ];
  
  for (var i = 0; i < path.length; i++) {
    var pos = path[i];
    var gradientColor = gradientColors[i % gradientColors.length];
    stroke(gradientColor);
    vertex(pos.x, pos.y);
  }
  
  endShape();
}

