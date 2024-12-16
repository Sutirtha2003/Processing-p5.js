class Cells {
    constructor(i, j) {
        this.i = i;
        this.j = j;
        this.walls = [true, true, true, true]; //checks if there should be a wall or not
        this.visited = false; //boolean for keeping track of whether a cell has been visited or not
        
    }

    show() {
        let x = this.i * w;
        let y = this.j * w;
        let alpha = this.a;

        noFill();
        strokeWeight(0.15);
        stroke(255);

        if (this.walls[0]) {
            line(x, y, x + w, y); //top line of cell
        }
        if (this.walls[1]) {
            line(x + w, y, x + w, y + w); //line on the right of cell
        }
        if (this.walls[2]) {
            line(x + w, y + w, x, y + w); //bottom line of cell
        }
        if (this.walls[3]) {
            line(x, y + w, x, y); //line on the left of cell
        }
        if (this.visited) { //colors the current visited cell
            noStroke();
            fill(255, 0, 255, alpha);
            rect(x, y, w, w);
            fill(255);
            text(alpha, x + (w / 2), y + (w / 2));
        }
    }

    showText() {
        let x = this.i * w;
        let y = this.j * w;
        stroke(0);
        fill(0);
        textAlign(CENTER, CENTER);
        textSize(w / 2);
        text(alpha, x + (w / 2), y + (w / 2));
    }

    highlight() {
        let x = this.i * w;
        let y = this.j * w;
        stroke(255);
        fill(0, 255, 0);
        rect(x, y, w, w);
    }

    showStuck() {
        let x = this.i * w;
        let y = this.j * w;
        stroke(255);
        fill(255, 0, 0);
        rect(x, y, w, w);
    }

    checkNeighbors() {
        let neighbors = [];

        let top = grid[index(this.i, this.j - 1)];
        let right = grid[index(this.i + 1, this.j)];
        let bottom = grid[index(this.i, this.j + 1)];
        let left = grid[index(this.i - 1, this.j)];

        if (top && !top.visited) {
            neighbors.push(top);
        }
        if (right && !right.visited) {
            neighbors.push(right);
        }
        if (bottom && !bottom.visited) {
            neighbors.push(bottom);
        }
        if (left && !left.visited) {
            neighbors.push(left);
        }
        if (neighbors.length > 0) {
            var r = floor(random(0, neighbors.length));
            return neighbors[r];
        } else {
            return undefined;
        }
    }
}