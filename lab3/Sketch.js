var PositX = 300;
var PositY = 300;
var BorderLeft = 100;
var BorderRight = 500;
let Turn = 1;
var Random;

function setup() {
    createCanvas(600, 600);
}

function draw() {
    background(133, 157, 255);
    Random = Math.floor(Math.random() * (15 - 5)) + 5;
    ball();
    Move();
}

function ball() {
    fill("#e8d21e");
    stroke("#ff9400");
    strokeWeight(10);
    circle(PositX, PositY, 75);
}

function Move() {
    PositX += Random * Turn;
    if (PositX <= BorderLeft) {
        PositX += BorderLeft - PositX;
        Turn *= -1;
    } else if (PositX >= BorderRight) {
        PositX -= PositX - BorderRight;
        Turn *= -1;
    }
}
