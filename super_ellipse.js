
// Choo Choo!
// Thanks for the great workshop at PCD in Copenhagen!
// June 14th 2022, Copenhagen
// 

let col = 0;

function setup() {
  createCanvas(700, 700);
  colorMode(HSB, 360, 100, 100)
  angleMode(DEGREES);
}

function sgn(w){
  if (w < 0) return -1;
  else if (w == 0) return 0;
  else return 1;
}

function draw() {
  background(0);
  
  
  translate(width / 2, height / 2);
    
  let distance = dist(width / 2, height / 2, mouseX, mouseY);
  let n = map(distance, 0, 300, 2.5, 0);
  let a =80;
  let b = 80;

  noFill()
  strokeWeight(map(mouseX, 0, width, 8, 64));
  
  for (let t = 0; t < 360; t += 1){
    stroke(col, 100, 100);
    
    col += 1;
    
    if(col > 360) {
      col = 0;
    }
    
    let  r = 100 ;
    let x = pow(abs(cos(t)), 2/n) * a * sgn(cos(t));
    let y = pow(abs(sin(t)), 2/n) * b * sgn(sin(t));
    
    point(x,y);
  }
  
}