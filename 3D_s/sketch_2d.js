//implemenation of random 2d walk backtrack using alpha with random colors

let walker;

function setup() {
	createCanvas(windowWidth, windowHeight);
	walker = new Walker(width/2, height/2);
	background(0);
}

function draw() {
	walker.update();
	walker.show();
	switch(floor(random(1, 5))) {
		case 1:
			walker.dir(0, 1);
			break;
		case 2:
			walker.dir(1, 0);
			break;
		case 3:
			walker.dir(0, -1);
			break;
		case 4:
			walker.dir(-1, 0);
			break;
		default:
			walker.dir(0);
	}
}