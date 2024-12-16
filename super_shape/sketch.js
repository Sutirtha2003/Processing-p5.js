var shape;
var x, y;
var xspeed = 2;
var yspeed = 3;
var gui;
var n1 = 1;
var n2 = 1.7;
var n3 = 1.7;
var m = 5;
var a = 1;
var b = 1;
var timesPI = 2;
var n1off = 0;
var n2off = 0;
var n3off = 0;
var moff = 0;
var n1_Sine_Wave = false;
var n2_Sine_Wave = false;
var n3_Sine_Wave = false;
var m_Sine_Wave = false;
var star = false;
var shape_196 = false;
var shape_f = false;

function setup() {
  createCanvas(600, 600);
  shape = new Shapes();
  x = width / 2;
  y = height / 2;
  controlGui();
}

function draw() {
  background(51); 
  setShape();
  addOffSet();
  shape.display(x, y);  
}

function controlGui()  {
  gui = createGui('Super Shape');
  sliderRange(0.1, 30, 0.1);
  gui.addGlobals('n1_Sine_Wave','n1');
  sliderRange(0.1, 30, 0.1);
  gui.addGlobals('n2_Sine_Wave', 'n2', 'n3_Sine_Wave', 'n3');
  sliderRange(0.1, 90, 0.1);
  gui.addGlobals('m_Sine_Wave', 'm');
  sliderRange(0.1, 5, 0.1);
  gui.addGlobals('a', 'b');
  sliderRange(2, 12, 2);
  gui.addGlobals('timesPI');
  gui.addGlobals('star', 'shape_196', 'shape_f');
}

function setShape() {
  if(star) {
    n1 = 0.20;
    n2 = 1.7;
    n3 = 1.7;
    m = 5;
    a = 1;
    b = 1;
  }else if(shape_196) {
    n1 = 1;
    n2 = 0.3;
    n3 = 0.3;
    m = 50;
    a = 3;
    b = 3;
  }else if(shape_f) {
    n1 = 0.1;
    n2 = 1.5;
    n3 = 1.7;
    m = 77;
    a = 0.9;
    b = 1.1;
    timesPI = 6;
  }

}

function addOffSet() {
  if(n1_Sine_Wave) {
    n1 = map(sin(n1off), -1, 1, 0.3, 2);
    n1off += 0.01; 
  }
  if(n2_Sine_Wave) {
    n2 = map(sin(n2off), -1, 1, 0.3, 4);
    n2off += 0.01;
  }
  if(n3_Sine_Wave) {
    n3 = map(sin(n3off), -1, 1, 0.3, 2);
    n3off += 0.01;
  }
  if(m_Sine_Wave) {
    m = map(sin(moff), -1, 1, 10, 90);
    moff += 0.02;
  }
}

