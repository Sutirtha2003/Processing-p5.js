let noiseStep = 10;
let densityX = 0.01;
let densityY = 0.01;
let densityProgress = 0.5;
let sliderA, sliderB, sliderNumOfVert, checkboxMove;
let progress = 0;

function setup() {
	createCanvas(640, 320);

	sliderA = createSlider(0, 8, 3);
	sliderA.position(10, 10);
	sliderB = createSlider(0, 8, 3);
	sliderB.position(10, 30);
	sliderNumOfVert = createSlider(10, 100, 100);
	sliderNumOfVert.position(10, 50);
	checkboxMove = createCheckbox('move', true);
	checkboxMove.position(10, 70);
}

function draw() {
	background(0);
	
	let a = sliderA.value();
	let b = sliderB.value();
	let numberOfVertices = sliderNumOfVert.value();
	let selectedVertIndex = (int)(millis() / 500);
	if (checkboxMove.checked()) {
		progress = millis() / 1000 * densityProgress;
	}

	noStroke();
	for (let x = 0; x < height; x += noiseStep) {
		for (let y = 0; y < height; y += noiseStep) {
			let color = map(noise(x * densityX, y * densityY, progress), 0, 1, 0, 255);
			fill(color);
			rect(x, y, noiseStep, noiseStep);
		}
	}

	fill(255);
	text(a, sliderA.x * 2 + sliderA.width, 22);
	text(b, sliderB.x * 2 + sliderB.width, 42);
	text(numberOfVertices, sliderNumOfVert.x * 2 + sliderNumOfVert.width, 62);

	stroke(255);
	strokeWeight(1);
	noFill();

	beginShape();
	for (let i = 0; i < numberOfVertices; i++) {
		let rad = radians(360 / numberOfVertices * i);
		let x = (height / 2) * (1 + cos(a * rad));
		let y = (height / 2) * (1 + sin(b * rad));
		vertex(x, y);
		if (i == selectedVertIndex % numberOfVertices) {
			fill(255);
			circle(x, y, 10);
			noFill();
		}
	}
	endShape(CLOSE);

	translate(width / 4 * 3, height / 2);

	beginShape();
	for (let i = 0; i < numberOfVertices; i++) {
		let rad = radians(360 / numberOfVertices * i);
		let x = (height / 2) * (1 + cos(a * rad));
		let y = (height / 2) * (1 + sin(b * rad));
		let offset = map(noise(x * densityX, y * densityY, progress), 0, 1, height / 8, height / 2);
		let circleX = offset * cos(rad);
		let circleY = offset * sin(rad);
		vertex(circleX, circleY);
		if (i == selectedVertIndex % numberOfVertices) {
			fill(255);
			circle(circleX, circleY, 10);
			noFill();
		}
	}
	endShape(CLOSE);
}