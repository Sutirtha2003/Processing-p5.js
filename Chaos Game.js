const SIZE = 700,
  HALF_SIZE = SIZE >> 1,
  MARGIN = 10,
  AUTO_WEIGHTS = [0.35, 0.45, 0.525, 0.575, 0.6, 0.65, 0.675, 0.7, 0.725, 0.75];

let anchors = [],
	degSlider, wgtSlider, qualSlider, spdSlider, drwCheckbox, autoCheckbox,
  degree = 5, weight = AUTO_WEIGHTS[degree - 2], quality = 1, speed = 100, 
  drawAnchors = false, autoWeight = true,
  maxFrames, 
  ancPt, lastAncPt, curPt;

function setup() {
  createCanvas(SIZE, SIZE);
  let controls = document.getElementById('controls');
  degSlider = createSlider(3, 12, degree, 1);
  degSlider.size(200, AUTO);
  degSlider.parent(controls.getElementsByClassName('degree ctrl')[0]);
  degSlider.input(resetDrawing);
  
  wgtSlider = createSlider(0.25, 0.75, weight, 0.025);
  wgtSlider.size(200, AUTO);
  wgtSlider.parent(controls.getElementsByClassName('weight ctrl')[0]);
  wgtSlider.input(resetDrawing);
  
  spdSlider = createSlider(10, 200, speed, 10);
  spdSlider.size(200, AUTO);
  spdSlider.parent(controls.getElementsByClassName('speed ctrl')[0]);
  spdSlider.input(resetDrawing);
  
  qualSlider = createSlider(0.1, 1, quality, 0.1);
  qualSlider.size(200, AUTO);
  qualSlider.parent(controls.getElementsByClassName('quality ctrl')[0]);
  qualSlider.input(resetDrawing);
  
  drwCheckbox = createCheckbox('draw anchors', drawAnchors);
  drwCheckbox.parent(controls.getElementsByClassName('draw')[0]);
  drwCheckbox.changed(resetDrawing);
  
  autoCheckbox = createCheckbox('auto lerp', autoWeight);
  autoCheckbox.parent(controls.getElementsByClassName('auto-weight')[0]);
  autoCheckbox.changed(resetDrawing);
  
  angleMode(DEGREES);
  colorMode(HSB);
  // Set origin to center of canvas.
  translate(HALF_SIZE, HALF_SIZE);
  // Make 0deg point up instead of right.
  rotate(-90);

  resetDrawing();
  // noLoop();
  // frameRate(1);
}

function draw() {
  translate(HALF_SIZE, HALF_SIZE);
  rotate(-90);
  for (let i = 0; i < speed; i++) {
    do {
      ancPt = random(anchors);
    } while (ancPt === lastAncPt);
    lastAncPt = ancPt;
    curPt.lerp(ancPt, weight);
    let hueAngle = normDeg(curPt.heading()),
        magn = 150 * norm(curPt.mag(), 0, HALF_SIZE),
        sat = constrain(magn, 0, 100),
        brt = constrain(magn, 20, 100);
    stroke(hueAngle, sat, 100);
    point(curPt.x, curPt.y);
    // print(`(${dec(curPt.y, 3)}, ${dec(curPt.x, 3)}) = hsb(${dec(hueAngle, 3)}°, ${dec(magn, 3)}, 100)`);
  }
  if (frameCount === maxFrames) {
    console.log(`Done after ${frameCount} frames.`);
    noLoop();
  }
}

function normDeg(deg) {
  let raw = deg % 360,
    norm = (raw + 360) % 360;
  // console.log(`raw°: ${raw}; norm°: ${norm}`);
  return norm;
}

function dec(f, p) {
  return Number.parseFloat(f).toFixed(p);
}

function resetDrawing() {
  noLoop();
  background(0);
  noFill();
  strokeWeight(1);
  
  degree = degSlider.value();
  if (this === wgtSlider) {
    autoCheckbox.checked(false);
  }
  autoWeight = autoCheckbox.checked();
  if (autoWeight) {
	  weight = AUTO_WEIGHTS[degree - 3];
    wgtSlider.value(weight);
  }
	else {
    weight = wgtSlider.value();
  }
  speed = spdSlider.value();
  quality = qualSlider.value();
  drawAnchors = drwCheckbox.checked();
  
  
  document.querySelector('.degree.value').innerText = degree;
  document.querySelector('.weight.value').innerText = weight;
  document.querySelector('.speed.value').innerText = speed;
  document.querySelector('.quality.value').innerText = dec(quality, 2);
  
  // Create (and optionally draw) anchor points: <degree> points spaced evenly 
  // equally spaced around a circle.
  anchors = [];
  for (let i = 0; i < degree; i++) {
    ancPt = p5.Vector.fromAngle(i * TWO_PI / degree);
    ancPt.setMag(HALF_SIZE - MARGIN);
    anchors.push(ancPt);
    if (drawAnchors) {
      let hueAngle = normDeg(degrees(ancPt.heading()));
      stroke(hueAngle, 100, 100, 1);
      ellipse(ancPt.x, ancPt.y, 3, 3);
      // print(`${i + 1}: (${dec3(ancPt.y)}, ${dec3(ancPt.x)}) = ${dec3(hueAngle)}°`);
    }
  }

  // Create the starting point.
  curPt = createVector(0, 0);
  if (drawAnchors) {
    stroke(0, 0, 100, 1);
    ellipse(curPt.x, curPt.y, 3);
  }
  
  // Calculate how long the drawing will take.
  maxFrames = floor(PI * sq(HALF_SIZE) / speed * quality);
  let estDrawTime = round(maxFrames / frameRate());
  if (Number.isFinite(estDrawTime)) {
    print(`Drawing will take about ${estDrawTime} seconds (${maxFrames} frames).`);
	}
	else {
    print(`Drawing will take ${maxFrames} frames.`);
  }
  
  // Draw it!
  loop();
}


