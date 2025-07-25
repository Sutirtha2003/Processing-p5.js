let fireworks, gravity, cbox

function setup() {
  createCanvas(windowWidth, windowHeight-10)
  fireworks = []
  gravity = createVector(0, 0.1)
  cbox = select('#cbox')
  colorMode(HSL)
}

setInterval(() => {
  fireworks.push(new Firework())
}, 2000);

function draw() {
  background(0, 0, 0, 0.1)
  fireworks.forEach(f => f.update())
  fireworks = fireworks.filter(f => !f.isDead())
}
