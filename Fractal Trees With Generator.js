

var angle = 0;

// change the speed of the color changing effect
var colorShift = 0.4;
var slider;

var tree;
// produced by each call to next() on the generator
var nextObject;

// used to loop the animation and set it up
function resetTree() {
  tree = branch(150);
  nextObject = null; 
  background(51, 0, 14);
}

function setup() {
  createCanvas(700, 800);
  colorMode(HSB);
  slider = createSlider(0, TWO_PI, PI / 4, 0.01);
  slider.input(() => {
    resetTree();
  })
  
  resetTree();

}

function draw() {
  angle = slider.value();
  stroke(55);
  translate(200, height);
  if (!nextObject || !nextObject.done) {
    nextObject = tree.next()
  } else {
    print(frameCount);
    resetTree();
  }
}

// starting hue = 1
let hu = 1
function* branch(len) {
  line(0, 0, 0, -len);
  translate(0, -len);
  if (len > 6) {
    push();
    rotate(angle);
    stroke(hu = (hu + colorShift) % 360, 100, 100);
    yield* branch(len * 0.87);
    pop();
    push();
    rotate(-angle);
    stroke(hu = (hu + colorShift) % 360, 100, 100);
  
    yield* branch(len * 0.67);
    pop();
  }
  yield
}
