let backgroundSprite1;

function preLoad() {
    backgroundSprite1 = loadImage('/sprites/background/origbig.png');
}

function setup() {
  createCanvas(innerWidth, innerHeight);
}

function draw() {
    background('#2388d3');
    
    image(backgroundSprite1, 0, 0);
}