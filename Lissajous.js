
var radius = 28
var gutter = 6

// auto-computed
var rows, cols
var size
var tx, ty
// Angle to be used in each iteration of draw
var angle
// off-screen canvas to trace points
var back
// Used to determine the color of each lissajous plot
// This stores the maximum possible ratio between the speed at which
// the x and y co-ordinates vary
var maxRatio

function setup() {
  // Take up the whole screen
  createCanvas(windowWidth, windowHeight)
  
  size = 2 * (radius + gutter)

  // Show as many rows and columns as possible
  // -1 to accomodate header row and column
  rows = floor(windowHeight / size) - 1
  cols = floor(windowWidth / size) - 1

  // Translation amounts to show the
  // figure table centred on any screen
  ty = (windowHeight - (rows + 1) * size) / 2
  tx = (windowWidth - (cols + 1) * size) / 2
  angle = 0

  // While entire canvas is made to fit the window,
  // off-screen canvas exactly fits the shape table
  back = createGraphics((cols + 1) * size, (rows + 1) * size)
  // Notice that the off-screen canvas' backgroud is only set
  // in setup. This enables tracing
  back.background(0)
  // Setting the color mode to HSB
  // as the colour will be determined as a hue
  back.colorMode(HSB)
  // maximum possible ratio between the speed at which
  // the x and y co-ordinates vary 
  maxRatio = max(cols, rows)
}

function draw() {
  // Translate using tx,ty calculated in setup
  translate(tx, ty)
  //render off-screen canvas
  image(back, 0, 0);
  for (var i = 0; i <= cols; i++) {
    for (var j = 0; j <= rows; j++) {
      // Each iteration considers a imaginary square,
      // side length 'side'
      // cx and cy computes the centre point of the square
      var cx = size * i + size / 2
      var cy = size * j + size / 2
      // x and y hold the current point for this iteration,
      // w.r.t. cx and cy
      // For the header column and row, this will trace a circle
      // For intersection, it traces the lissajous figure
      var x, y

      // i==0 and j==0 is the first blank space, hence continue
      if (i == 0 && j == 0) continue
      if (i == 0 || j == 0) {
        //since we escaped i==0 AND j==0,
        // this happens for the header row and header column

        // For header row, j=0, thus factor is i
        // For header column, i=0 thus factor is j
        var factor = max(i, j)

        // Now we plot the polar point (radius, factor*angle)
        // the factor co-efficient results in same angle giving
        // different speeds across the row/column
        // Note that global variables of this loop are set
        x = radius * cos(angle * factor - HALF_PI)
        y = radius * sin(angle * factor - HALF_PI)

        // Draw the circle in the main canvas
        strokeWeight(1)
        noFill()
        ellipse(cx, cy, 2 * radius, 2 * radius)

        // Draw the perpendicular lines
        // For header column, these are horizontal lines,
        // For header row, these are vertical lines
        // The start is always the same, cx+x and cy+y.
        // The end point differs for header row and column
        stroke(255, 75)
        // In the case of header column, where j=0,
        // end point has the same y-coordinate as start.
        // x-coordinate is the end of screen,i.e. the width.
        // However, using the entire width causes
        // this web editor to behave weirdly
        //Thus, limiting the end point just shy of the last figure
        var endX = j == 0 ? cx + x : (cols + 0.9) * size
        // In the case of header row, where i=0,
        // end point has the same x-coordinate as start.
        // y-coordinate is the end of screen,i.e. the height.
        // However, using the entire height causes
        // this web editor to behave weirdly
        //Thus, limiting the end point just shy of the last figure
        var endY = i == 0 ? cy + y : (rows + 0.9) * size
        line(cx + x, cy + y, endX, endY)
      } else {

        // This is the case for an intersection
        // Here, we take the x-coordinate from the header row,
        // the y-coordinate from header column, and plot the point
        // Note that global variable for this loop is used
        x = radius * cos(angle * i - HALF_PI)
        y = radius * sin(angle * j - HALF_PI)

        // This point is also plotted in the offscreen canvas,
        // without clearing the previous points. The trace forms
        // the Lissajous figure
        // The colour is determined by the ratio of the "speeds"
        // of the x and y co-ordinated
        ratio = max(i, j) / min(i, j)
        // using "map" to map ratio
        // which may vary between 1 and maxRatio
        // to get a hue between 0 and 255
        h = map(ratio, 1, maxRatio, 0, 255)
        // remember that the color mode of the off-screen
        // canvas is HSB
        back.stroke(h, 255, 255)
        back.strokeWeight(0.65)
        back.point(cx + x, cy + y)
      }

      // Plot the globally computed x and y, w.r.t cx and cy
      strokeWeight(8)
      stroke(255)
      point(cx + x, cy + y)
    }
  }

  // Angle is incremented for the next iteration
  angle += 0.01
}