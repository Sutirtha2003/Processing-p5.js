let sandpiles;
let tops;
let size = 600;
let startSand = 2000000000000;
let clickAmountSlider;
let speedSlider;

function setup () {
    

	createP('Drop amount');
	clickAmountSlider = createSlider(100, 10000000000000, 10000);

	createP('Speed');
	speedSlider = createSlider(1, 1000, 10);

	createCanvas(size, size);
	//frameRate(1);
	pixelDensity(1);
	initPiles();

}

function initPiles () {

	sandpiles = new Array (width);
	for (let x = 0; x < sandpiles.length; x++) {
		sandpiles[x] = new Array(height);
		for (let y = 0; y < sandpiles[x].length; y++) {
			sandpiles[x][y] = 0;
		}
	}

	let x = Math.floor(width/2);
	let y = Math.floor(height/2);
	sandpiles[x][y] = startSand;
	tops = new Array();
	tops.push(x + y*width);

}

function addIfNotExists(arr,  value) {
	if (!arr.includes(value)) {
		arr.push(value);
	}
}

function topple() {

	if (mouseclicks.length > 0) {
		for (var i = 0; i < mouseclicks.length; i++) {
			let index = mouseclicks[i];
			let y = Math.floor(index/width);
			let x = index % width;
			sandpiles[x][y] = clickAmountSlider.value();
			tops.push(index);
		}
		mouseclicks =  [];
	}

	tempTops = tops;
	tops = new Array();

	for (var i = 0; i < tempTops.length; i++) {

		index = tempTops[i];
		let y = Math.floor(index/width);
		let x = index % width;

		sandpiles[x][y] -= 4;
		if (sandpiles[x][y] > 3) {
			addIfNotExists(tops, x + y * width);
		} else {
			let where = tops.indexOf(x + y * width);
			if (where !== -1) {
			  tops.splice(where, 1);
			}
		}

		if (x-1 >= 0) {
			sandpiles[x-1][y]++;
			if (sandpiles[x-1][y] == 4) {
				addIfNotExists(tops, x-1 + y * width);
			}
		}

		if (x+1 < width) {
			sandpiles[x+1][y]++;
			if (sandpiles[x+1][y] == 4) {
				addIfNotExists(tops, x+1 + y * width);
			}
		}

		if (y-1 >= 0) {
			sandpiles[x][y-1]++;
			if (sandpiles[x][y-1] == 4) {
				addIfNotExists(tops, x + (y-1) * width);
			}
		}

		if (y+1 < height) {
			sandpiles[x][y+1]++;
			if (sandpiles[x][y+1] == 4) {
				addIfNotExists(tops, x + (y+1) * width);
			}
		}

	} //for loop

}

let mouseclicks = [];
function mouseClicked() {
	mouseclicks.push(mouseY*width + mouseX);
}

function getColor (num) {
	switch (num) {
		case 0: return color(6, 65, );
		case 1: return color(127, 189, 0);
		case 2: return color(255, 222, 1);
		case 3: return color(103, 9, 2);
		default: return color(103, 1, 2);
	}
}

function setPixelColor (index, col) {
	pixels[index+0] = red(col);
	pixels[index+1] = green(col);
	pixels[index+2] = blue(col);
	pixels[index+3] = 256;
}

function draw() {

  loadPixels();
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let index = (x + y * width)*4;
			let col = getColor(sandpiles[x][y]);
			setPixelColor(index, col);
    }
  }
  updatePixels();
	for (var i = 0; i < speedSlider.value(); i++) {
		topple();
	}


}
