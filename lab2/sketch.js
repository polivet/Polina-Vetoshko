let gameChar_x;
let gameChar_y;
let state;

function setup() {
    createCanvas(400, 400);
    gameChar_x = width / 2;
    gameChar_y = height - 50;
    
}

function draw() {
    background(220);
    switch (state){
      case 'drawJumping':
        drawJumping();
        break;
      case 'drawWalkingLeft':
        drawWalkingLeft();
        break;
      case 'drawWalkingRight':
        drawWalkingRight();
        break;
      case 'drawJumpingLeft':
        drawJumpingLeft();
        break;
      case 'drawJumpingRight':
        drawJumpingRight();
        break;
      default:
        drawStanding();
        break;
    }
}

function drawStanding() {
    // Тело
    rect(gameChar_x - 10, gameChar_y - 40, 20, 40);
    // Голова
    ellipse(gameChar_x, gameChar_y - 50, 20, 20);
    // Ноги
    line(gameChar_x - 5, gameChar_y, gameChar_x - 5, gameChar_y + 10);
    line(gameChar_x + 5, gameChar_y, gameChar_x + 5, gameChar_y + 10);
    // Руки
    line(gameChar_x - 10, gameChar_y - 30, gameChar_x - 20, gameChar_y - 20);
    line(gameChar_x + 10, gameChar_y - 30, gameChar_x + 20, gameChar_y - 20);
}

function drawJumping() {
    // Тело
    rect(gameChar_x - 10, gameChar_y - 60, 20, 40);
    // Голова
    ellipse(gameChar_x, gameChar_y - 70, 20, 20);
    // Ноги
    line(gameChar_x - 5, gameChar_y - 20, gameChar_x - 10, gameChar_y - 10);
    line(gameChar_x + 5, gameChar_y - 20, gameChar_x + 10, gameChar_y - 10);
    // Руки
    line(gameChar_x - 10, gameChar_y - 50, gameChar_x - 20, gameChar_y - 40);
    line(gameChar_x + 10, gameChar_y - 50, gameChar_x + 20, gameChar_y - 40);
}

function drawWalkingLeft() {
    // Тело
    rect(gameChar_x - 10, gameChar_y - 40, 20, 40);
    // Голова
    ellipse(gameChar_x, gameChar_y - 50, 20, 20);
    // Ноги
    line(gameChar_x - 5, gameChar_y, gameChar_x - 10, gameChar_y + 10);
    line(gameChar_x + 5, gameChar_y, gameChar_x + 5, gameChar_y + 10);
    // Руки
    line(gameChar_x - 10, gameChar_y - 30, gameChar_x - 20, gameChar_y - 20);
    line(gameChar_x + 10, gameChar_y - 30, gameChar_x + 10, gameChar_y - 20);
}

function drawWalkingRight() {
    // Тело
    rect(gameChar_x - 10, gameChar_y - 40, 20, 40);
    // Голова
    ellipse(gameChar_x, gameChar_y - 50, 20, 20);
    // Ноги
    line(gameChar_x - 5, gameChar_y, gameChar_x - 5, gameChar_y + 10);
    line(gameChar_x + 5, gameChar_y, gameChar_x + 10, gameChar_y + 10);
    // Руки
    line(gameChar_x - 10, gameChar_y - 30, gameChar_x - 10, gameChar_y - 20);
    line(gameChar_x + 10, gameChar_y - 30, gameChar_x + 20, gameChar_y - 20);
}

function drawJumpingLeft() {
    // Тело
    rect(gameChar_x - 10, gameChar_y - 60, 20, 40);
    // Голова
    ellipse(gameChar_x, gameChar_y - 70, 20, 20);
    // Ноги
    line(gameChar_x - 5, gameChar_y - 20, gameChar_x - 10, gameChar_y - 10);
    line(gameChar_x + 5, gameChar_y - 20, gameChar_x + 5, gameChar_y - 10);
    // Руки
    line(gameChar_x - 10, gameChar_y - 50, gameChar_x - 20, gameChar_y - 40);
    line(gameChar_x + 10, gameChar_y - 50, gameChar_x + 10, gameChar_y - 40);
}

function drawJumpingRight() {
    // Тело
    rect(gameChar_x - 10, gameChar_y - 60, 20, 40);
    // Голова
    ellipse(gameChar_x, gameChar_y - 70, 20, 20);
    // Ноги
    line(gameChar_x - 5, gameChar_y - 20, gameChar_x - 5, gameChar_y - 10);
    line(gameChar_x + 5, gameChar_y - 20, gameChar_x + 10, gameChar_y - 10);
    // Руки
    line(gameChar_x - 10, gameChar_y - 50, gameChar_x - 10, gameChar_y - 40);
    line(gameChar_x + 10, gameChar_y - 50, gameChar_x + 20, gameChar_y - 40);
}
function keyPressed() {
  if (key === 'h') {
    state = 'drawStanding';
  } else if (key === 'y') {
    state = 'drawJumping';
  } else if (key === 'g') {
    state = 'drawWalkingLeft';
  } else if (key === 'j') {
    state = 'drawWalkingRight';
  } else if (key === 't') {
    state = 'drawJumpingLeft'; 
  } else if (key === 'u') {
    state = 'drawJumpingRight'; // 
  }
} 