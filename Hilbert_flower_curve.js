p5.checkFriendlyErrors = false;



let rendering = true;

let order =4;
let N = Math.pow(2, order);
let total = N * N;

let paths = [];

function setup(){
    
   createCanvas(650,
				700);
    
   background(42);
	
  fill(255);
  
	text("Order = " + order +
		 "\nN = " + N +
		 "\nTotal = " + total,
		 width/1.2,42);
	
	
	for (let i = 0; i < total; i++){
		paths[i] = hilbert(i);
		let len = height/N/2;
		paths[i].mult(len);
		paths[i].add(len/2,len/2);
	}

	colorMode(HSB,360,255,255);
	stroke(255);
	strokeWeight(1);
	noFill();
	
	textSize(0.0000002);
}

let counting = true;

function mousePressed(){
  counter = 0;
  background(42);
  
  //counting = !counting;
	rendering = true;
}

let counter = 0;
function draw(){
	
	translate(width/2 ,
			  height/2);
  
  let whatCount;
  if (counting){
    whatCount = counter;
  } else whatCount = total;
  
	if (rendering || whatCount == counting){
		
		for (let i = 1; i < whatCount; i++){
			
			// Colouring.
			h = map(i, 0, paths.length, 360,128);
			
			stroke(h,255,255);
			strokeWeight(0.4);
			noFill();
rotate(counter);
			let wiggle = 0;
      
			line(	paths[i-1].x + wiggle,
			  		paths[i-1].y - wiggle,
				 	paths[i].x - wiggle,
			  		paths[i].y + wiggle)
			
			fill(0);
			text(i, paths[i].x,
					paths[i].y)
			
			
		}
	//endShape();
		
	if (whatCount == total)
	rendering = false;
		
  let speed = 1.5;
  
	if (counter < paths.length){
	counter+=speed;
    if (counter>= paths.length)
      counter = 0;
  }
	else counter = 0;
		
	}
		
}

function hilbert(i){
	
	let points = [];
	
	points.push(createVector(0,0));
	points.push(createVector(0,1));
	points.push(createVector(1,1));
	points.push(createVector(1,0));
	
	// Binary me up.
	// (Bit masking).
	let index = i & 3;
	let v = points[index];
	
	for (let j = 1; j < order; j++){
	i = i >>> 2;
	index = i & 3;
	
	let len = pow(2,j);
		
	if (index == 0){
				let temp = v.x;
				v.x = v.y;
				v.y = temp;
	}
	else if (index == 1){
			 	v.y+=len;
			 }
	else if (index == 2){
			 	v.y+=len;
				v.x+=len;
			 }
	else if (index == 3){
		
				let temp = len-1-v.x;
				v.x = len-1-v.y;
				v.y = temp;
		
			 	v.x+=len;
				
	}
		
	} // End of j.
	
	return v;
	
}