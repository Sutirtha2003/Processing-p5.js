

let phase = 0;
let sliderNoise;
let sliderLoop;
let sliderPhase;
let sliderBGAlpha;
let b = 0;

function setup() {
  createCanvas(600, 500);
  background(0);
  createP("Crinkliness Slider");
  sliderNoise = createSlider(0, 10, 3, 0.1);
  createP("Speed Slider");
  sliderLoop = createSlider(-10, 10, 0.3, 0.1);
  createP("Spinning Slider");
  sliderPhase = createSlider(-3.6, 3.6, 0, 0.1);
  createP("Fading Slider");
  sliderBGAlpha = createSlider(1, 255, 5, 1);
}
function draw() {
  let noiseMax = sliderNoise.value();
  let loopSpeed = sliderLoop.value();
  let phaseSpeed = sliderPhase.value();
  let bgAlpha = sliderBGAlpha.value();
  colorMode(RGB);
  background(0, bgAlpha);
  translate(width / 2, height / 2);
  //stroke(map(noiseMax,0,10,0,255),map(loopSpeed,-10,10,0,255),map(noise(cos(b),sin(b)),-1,1,0,255));
  //stroke(255);
  strokeWeight(2);
  noFill();
/**  beginShape();
  for (let a = 0; a < TWO_PI; a += radians(1)) {
    let xoff = map(cos(a + phase), -1, 1, 10-noiseMax, 10+noiseMax)+cos(b)
    let yoff = map(sin(a + phase), -1, 1, 100-noiseMax, 100+noiseMax)+sin(b)
    let r = map(noise(xoff, yoff), 0, 1, 100, height / 2);
    let x = r * cos(a);
    let y = r * sin(a);
    vertex(x, y);
  }
  endShape(CLOSE);
*/
  colorMode(HSB);
    let xoff = map(cos(radians(-1) + phase), -1, 1, -noiseMax, noiseMax)+cos(b)
    let yoff = map(sin(radians(-1) + phase), -1, 1, -noiseMax, noiseMax)+sin(b)
    let r = map(noise(100+xoff, 100+yoff), 0, 1, 100, height / 2);
    let lastX =r * cos(radians(-1));
    let lastY =r * sin(radians(-1));
    for (let a = 0; a < TWO_PI; a += radians(1)) {
      xoff = map(cos(a + phase), -1, 1, -noiseMax, noiseMax)+cos(b)
      yoff = map(sin(a + phase), -1, 1, -noiseMax, noiseMax)+sin(b)
      r = map(noise(100+xoff, 100+yoff), 0, 1, 100, height / 2);
      let x = r * cos(a);
      let y = r * sin(a);
      stroke((degrees(a+phase)%360), 100+phase, map(r,100,height/2,0,100));
      line(lastX, lastY, x, y);
      lastX = x;
      lastY = y;
    }
	b += radians(loopSpeed)
	phase += radians(phaseSpeed)
}