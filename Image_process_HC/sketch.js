// Hilbert Curve
// Coding in the Cabana
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingInTheCabana/003-hilbert-curve.html
// https://youtu.be/dSK-MW-zuAc

let order = 9;
let N;
let total;

let path = [];

let counter = 0;
let animateCheckbox;

let imageInput;
let img;

let orderSlider;

let resetButton;
let forLabel;

function hilbertpath(o){
  path = [];
  N = int(pow(2, o));
  total = N * N;

  for (let i = 0; i < total; i++) {
    path[i] = hilbert(i);
    let len = width / N;
    path[i].mult(len);
    path[i].add(len / 2, len / 2);
  }
}

function setup() {
  createCanvas(512, 512).parent("#canvas-container");
  
  colorMode(HSB, 360, 255, 255);
  imageInput = createFileInput(handleFile).parent("#gui-container");
  resetButton = createButton("Clear Image").mousePressed(() => {
    img = undefined;
    redraw();
  }).parent("#gui-container");
  createP(`<input type="range" id="order" name="order" min="0" max="12" value="${order}" step="1"> <label id="for-label" for="order">Order: ${order}</label>`).parent("#gui-container");
  forLabel = select("#for-label");
  orderSlider = select("#order").input(() => {
    order = orderSlider.value();
    hilbertpath(orderSlider.value());
    counter = 0;
    forLabel.html("Order: "+orderSlider.value())
    redraw();
  }).parent("#gui-container");
  animateCheckbox = createCheckbox("Animate Curve").changed(() => {
    loop();
    counter = 0;
  }).parent("#gui-container");
  // noLoop();
  
  background(0);
  
  hilbertpath(orderSlider.value());
}

function handleFile(file){
  if (file.type === 'image') {
    img = loadImage(file.data, (img) => {
      img.resize(width, height);
      redraw();
    });
    
    // img.hide();
    
  } else {
    img = null;
  }
  redraw();
}

function draw() {
  background(0); 
  // if(img)
  //   image(img, 0, 0);
   


  stroke(255);
  let sw = 10-orderSlider.value();
  // print(sw)
  strokeWeight(1);
  noFill();
  

  if(!animateCheckbox.checked()){
    if(img){
      drawImageCurve(path.length);
    }else{
      drawCurve(path.length); 
    }
    noLoop();
  }else{
    if(img){
      drawImageCurve(counter)
    }else{
      drawCurve(counter);
    }
    let inc = max(int(path.length/100), 1)
    counter += inc;
    if (counter >= path.length) {
      counter = 0;
    }
  }
}

function drawCurve(end){
  for (let i = 1; i < end; i++) {
    let h = map(i, 0, path.length, 0, 360);
    stroke(h, 255, 255);
    line(path[i].x, path[i].y, path[i - 1].x, path[i - 1].y);
  }
}

function drawImageCurve(end){
  let b = 255-(brightness(img.get(0, 0)));
  for (let i = 1; i < end; i++) {
    let c1 = img.get(int(path[i].x), int(path[i].y));
    let c2 = img.get(int(path[i-1].x), int(path[i-1].y));
    let diff = brightness(c2)-brightness(c1);
    b += diff;
    b = constrain(b, 0, 255);
    let h = map(i, 0, path.length, 0, 360);
    
    stroke((255-b));
    line(path[i].x, path[i].y, path[i - 1].x, path[i - 1].y);
  }
}


function hilbert(i) {
  const points = [
    new p5.Vector(0, 0),
    new p5.Vector(0, 1),
    new p5.Vector(1, 1),
    new p5.Vector(1, 0)
  ];

  let index = i & 3;
  let v = points[index];

  for (let j = 1; j < order; j++) {
    i = i >>> 2;
    index = i & 3;
    let len = pow(2, j);
    if (index == 0) {
      let temp = v.x;
      v.x = v.y;
      v.y = temp;
    } else if (index == 1) {
      v.y += len;
    } else if (index == 2) {
      v.x += len;
      v.y += len;
    } else if (index == 3) {
      let temp = len - 1 - v.x;
      v.x = len - 1 - v.y;
      v.y = temp;
      v.x += len;
    }
  }
  return v;
}