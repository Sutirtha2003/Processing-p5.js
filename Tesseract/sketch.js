let points = [];
let projected = [];
const X = 0,
  Y = 1,
  Z = 2,
  W = 3,
  scl = 75;
let speed, theta = 0;
let permutations = [];
let order;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  
  
  
  points[0] = create4dVector(-1, -1, -1, 1);
  points[1] = create4dVector(1, -1, -1, 1);
  points[2] = create4dVector(1, 1, -1, 1);
  points[3] = create4dVector(-1, 1, -1, 1);
  points[4] = create4dVector(-1, -1, 1, 1);
  points[5] = create4dVector(1, -1, 1, 1);
  points[6] = create4dVector(1, 1, 1, 1);
  points[7] = create4dVector(-1, 1, 1, 1);
  points[8] = create4dVector(-1, -1, -1, -1);
  points[9] = create4dVector(1, -1, -1, -1);
  points[10] = create4dVector(1, 1, -1, -1);
  points[11] = create4dVector(-1, 1, -1, -1);
  points[12] = create4dVector(-1, -1, 1, -1);
  points[13] = create4dVector(1, -1, 1, -1);
  points[14] = create4dVector(1, 1, 1, -1);
  points[15] = create4dVector(-1, 1, 1, -1);
  speed = radians(1);

  //possible rotation combination, change which rotations are used in the order array
  permutations = [
    [X, Y],
    [X, Z],
    [X, W],
    [Y, Z],
    [Y, W],
    [Z, W]
  ];
  order = [1, 4]
}

function create4dVector(x, y, z, w) {
  let temp = createVector(x, y, z)
  temp.w = w;
  return temp
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  noStroke();

  ambientLight(60, 60, 60);
  pointLight(253, 22, 20, 0, 0, 100);
  for (let i = 0; i < points.length; i++) {
    let p = points[i];
    let pt = Matrix.fromVec(p)


    for (let j = 0; j < order.length; j++) {
      pt = Matrix.multiply(Matrix.rotation(permutations[order[j]][0], permutations[order[j]][1], 4, theta), pt)
    }


    pt = Matrix.multiply(Matrix.perspective(4, 2, pt.toVec.w), pt)

    pt = pt.toVec.mult(scl);

    projected[i] = (pt);

    push();
    translate(pt.x, pt.y, pt.z);
    ambientMaterial(250);
    sphere(5);
    pop()
  }
  theta += speed;
  fill(250, 0, 0);
    
  for (let i = 0; i < 4; i++) {
    connect(0, i, (i + 1) % 4, projected);
    connect(0, i + 4, ((i + 1) % 4) + 4, projected);
    connect(0, i, i + 4, projected);
  }
  
  for (let i = 0; i < 4; i++) {
    connect(8, i, (i + 1) % 4, projected);
    connect(8, i + 4, ((i + 1) % 4) + 4, projected);
    connect(8, i, i + 4, projected);
  }

  for (let i = 0; i < 8; i++) {
    connect(0, i, i + 8, projected);
  }
}

function connect(offset, i, j, points) {
  strokeWeight(1);
  stroke(255);
  const a = points[i + offset];
  const b = points[j + offset];
  line(a.x, a.y, a.z, b.x, b.y, b.z);
}