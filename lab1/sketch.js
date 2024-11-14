function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(133, 157, 255);
  fill("yellow");
  stroke("orange");
  strokeWeight(10);
  circle(550, 50, 100);
  
  fill("green");
  noStroke(1);
  rect(0, 450, 600, 150);
  
  fill("grey");
  noStroke(1);
  strokeWeight(45);
  triangle(175, 450, 275, 450, 250, 350);
  
  fill("black");
  noStroke(1);
  triangle(500, 450, 300, 450, 400, 500);
  
  textSize(30);
  text("🐨", 100, 450);
  
}