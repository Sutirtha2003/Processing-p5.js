function Shapes() {
  
  
    var radius = 100;
    var total = 200;
      var increment = TWO_PI / total;
    
    function supershape(theta) {
  
    var part1 = (1 / a) * cos(theta * m / 4);
    part1 = abs(part1);
    part1 = pow(part1, n2);
  
    var part2 = (1 / b) * sin(theta * m / 4);
    part2 = abs(part2);
    part2 = pow(part2, n3);
  
    var part3 = pow(part1 + part2, 1 / n1);
  
    if (part3 === 0) {
      return 0;
    }
  
    return (1 / part3);
      }
    
    this.display = function(x, y) {
      push();
      translate(x, y);
      beginShape();
        for (var angle = 0; angle < PI * timesPI; angle += increment) {
        var r = supershape(angle);
        var x = radius * r * cos(angle);
        var y = radius * r * sin(angle);
      vertex(x, y);
    }
          endShape(CLOSE);
      pop();
    }
    
    
    
  }