
//affine transformation 
var x=0;
var y=0;

function setup() {
  createCanvas(850, 850);
   background(0);
}


function nextPoint(){
  var nextx;
  var nexty;
  var r = random (1);
  //1
  if (r<0.01){
 nextx = 0;
nexty =  0.16*y;
  //2
  }else if (r<0.86){
   nextx = 0.85*x +  0.04*y;
   nexty = -0.04*x + 0.85*y + 1.6;
} else if(r<0.93){

  nextx = 0.20*x -0.26*y;
  nexty = 0.23*x +0.22*y + 1.6;
}else {
    
nextx = -0.15*x + 0.28*y;
 nexty = 0.26*x + 0.24*y +0.44;
}
  x = nextx;
  y = nexty;
}



function drawPoint(){
 
   colorMode(HSB, 255, 255, 255);
  var r = 
   stroke(map(y, 0, 9.9983, height, 0), 255, 100);
   
  strokeWeight(0.85);
  var px = map(x, -2.1820, 2.6558, 0, width);
  var py = map(y, 0, 9.9983, height, 0);
  point(px,py);

   
}

function draw(){
 
  for (let i = 0; i< 200; i++){
  drawPoint();
  nextPoint();
  }
}