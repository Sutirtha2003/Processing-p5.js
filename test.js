let chapterCount;
let divisions = [];
let squares = [];
let userInputStep = 0;

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
  
  // Prompt user for the number of chapters
  chapterCount = parseInt(prompt("Enter the number of chapters:"));
  if (!isNaN(chapterCount) && chapterCount > 0) {
    userInputStep++;
    calculateDivisions();
  }
}

function draw() {
  background(220);

  if (userInputStep === 1) {
    drawThemeWheel();
    drawSquares();
  }
}

function calculateDivisions() {
  divisions = [];
  let angleStep = 360 / chapterCount;
  for (let i = 0; i < chapterCount; i++) {
    divisions.push(i * angleStep);
  }
}

function drawThemeWheel() {
  let cx = width / 2;
  let cy = height / 2;
  let radius = min(width, height) / 2 - 20;

  // Draw division lines
  strokeWeight(2);
  stroke(0);
  for (let angle of divisions) {
    line(cx, cy, cx + cos(angle) * radius, cy + sin(angle) * radius);
  }

  // Draw sector labels
  textAlign(CENTER, CENTER);
  textSize(16);
  noStroke();
  fill(0);
  for (let i = 0; i < divisions.length; i++) {
    let angle = divisions[i];
    let label = i + 1;
    let x = cx + cos(angle / 2) * radius * 0.7;
    let y = cy + sin(angle / 2) * radius * 0.7;
    text(label, x, y);
  }
}

function drawSquares() {
  for (let square of squares) {
    let { x, y, size, color } = square;
    fill(color);
    rect(x, y, size, size);
  }
}

function mouseClicked() {
  if (userInputStep === 1) {
    let cx = width / 2;
    let cy = height / 2;
    let mx = mouseX - cx;
    let my = mouseY - cy;
    let mouseAngle = atan2(my, mx);

    // Calculate the distance from the center to the mouse position
    let radius = sqrt(mx * mx + my * my);

    for (let i = 0; i < divisions.length; i++) {
      let angle = divisions[i];
      let nextAngle = divisions[(i + 1) % divisions.length];

      if (
        mouseAngle >= angle &&
        mouseAngle <= nextAngle &&
        radius < width / 2 &&
        radius > width / 4
      ) {
        // Prompt user for the number of rings within the selected sector
        let ringCount = parseInt(prompt("Enter the number of rings for this sector:"));

        if (!isNaN(ringCount) && ringCount > 0) {
          let squareCount = squares.filter((square) => square.division === i).length;
          let size = width / (squareCount + 2);
          let x = cx + cos(angle) * radius - size / 2;
          let y = cy + sin(angle) * radius - size / 2;

          for (let j = 0; j < ringCount; j++) {
            let color = getRandomColor();
            squares.push({ x, y, size, color, division: i });
            size += 20;
          }
        }

        break;
      }
    }
  }
}

function getRandomColor() {
  return color(random(255), random(255), random(255));
}
