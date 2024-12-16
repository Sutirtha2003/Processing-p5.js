let cols;
let rows;
let w = 12
; //gridsize
let grid = [];
let current; //this will hold the current(active) cell
let stack = [];
let preAlpha = 25;
let alpha;


function setup() {
  createCanvas(windowWidth, windowHeight);
  cols = floor(width / w);
  rows = floor(height / w);

  frameRate(30);

  //creates the cell objects and pushes them into the grid array
  for (j = 0; j < rows; j++) { 
    for (i = 0; i < cols; i++) {
      let cell = new Cells(i, j);
      grid.push(cell);
    }
  }
  //initiation of the first, active cell  
  current = random(grid);
  current.a = preAlpha;

}

function draw() {
  background(0);


  //loops through all the objects (each cell) and call the .show function on each cell in the grid array
  for (i = 0; i < grid.length; i++) {
    grid[i].show();
  }

  current.visited = true;
  current.highlight();
  current.showText();

  var next = current.checkNeighbors();

  if (next) {
    next.visited = true;
    preAlpha++;
    alpha = floor(map(preAlpha, 25, cols * rows, 25, 225));
    next.a = alpha;

    stack.push(current);
    removeWalls(current, next);
    current = next;

  } else if (stack.length > 0) {
    current.showStuck();
    current = stack.pop();
  }

}

function index(i, j) {
  //fancy way to fudge a two dimensional array without one
  //the if statement is checking to see if any neighbors to the current cell are invalid
  //(an edge case..meaning outside of the grid)
  if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
    return -1;
  }
  return i + j * cols;
}

function removeWalls(a, b) {
  let x = a.i - b.i;
  if (x === 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  } else if (x === -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }
  let y = a.j - b.j;
  if (y === 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  } else if (y === -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
}

