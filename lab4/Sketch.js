let gameObjects = {
    ball: {
        x: 300,
        y: 300,
        BorderLeft: 100,
        BorderRight: 500,
        turn: 1,
        random: 0,
    }
};

function setup() {
    createCanvas(600, 600);
}

function draw() {
    background(133, 157, 255);
    const ball = gameObjects.ball;
    ball.random = Math.floor(Math.random() * (15 - 5)) + 5;
    renderBall();
    Move();
}

function renderBall() {
    const ball = gameObjects.ball;
    fill("#e8d21e");
    stroke("#ff9400");
    strokeWeight(10);
    circle(ball.x, ball.y, 75);
}

function Move() {
    const ball = gameObjects.ball;
    ball.x += ball.random * ball.turn;
    if (ball.x <= ball.BorderLeft) {
        ball.x += ball.BorderLeft - ball.x;
        ball.turn *= -1;
    } else if (ball.x >= ball.BorderRight) {
        ball.x -= ball.x - ball.BorderRight;
        ball.turn *= -1;
    }
}