class Walker {
    constructor(x, y) {
      this.pos = createVector(x, y);
      this.vel = createVector();
    }
    dir(x, y) {
      this.vel = createVector(x * 5, y * 5);
    }
    update() {
      this.pos.add(this.vel);
    }
    show() {
      stroke(random(255), random(255), random(255), random(255));
      strokeWeight(random(2, 6));
      point(this.pos.x, this.pos.y);
    }
  }