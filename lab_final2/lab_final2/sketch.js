let countCanyons = 50;
let currentXcanyon = 300;
let countCoins = 20;
let countTrees = innerWidth / 200;
let countClouds = innerWidth / 300;
let countPlatforms = 3;
let platforms = [];
let canyons = [];
let coins = [];
let clouds = [];
let trees = [];
let floor;
let character;
let backMus;
let death;
let jump;
let res;
let imgX;
let imgY;
let imgSizeX;
let imgSizeY;
let basefloor = 200;
let musicSlider;
let soundSlider;
let offsetMovingScreen = 100;

function preload() {
    backMus = new Audio("backMus.mp3");
    death = new Audio("death.mp3");
    jump = new Audio("jump.mp3");
    res = loadImage("res.png");
}

function restart() {
    platforms = [];
    canyons = [];
    clouds = [];
    coins = [];
    trees = []
    character = {
        x: 100,
        y: 400,
        height: 10,
        width: 20,
        speed: 5,
        color: "#ffffff",
        speedGravity: 0,
        fallSpeed: 0,
        isGrounded: false,
        isDead: false,
        isDeadE: false,
        isJump: false,
        state: "front",

        draw: function () {
            if (this.isDeadE) return;
            strokeWeight(1), fill(this.color);
            stroke(0);
            switch (this.state) {
                case "right":
                    this.drawBody();
                    this.drawRight();
                    break;
                case "left":
                    this.drawBody();
                    this.drawLeft();
                    break;
                case "jump":
                    this.drawBody();
                    this.drawJump();
                    break;
                case "jumpRight":
                    this.drawBody();
                    this.drawJRight();
                    break;
                case "jumpLeft":
                    this.drawBody();
                    this.drawJLeft();
                    break;
                default:
                    this.drawBody();
                    this.drawFront();
                    break;
            }
        },

        drawBody: function () {
            rect(this.x - 10, this.y - 40, 20, 40);
            ellipse(this.x, this.y - 50, 20, 20);
        },

        drawFront: function () {
            line(this.x - 5, this.y, this.x - 5, this.y + 10);
            line(this.x + 5, this.y, this.x + 5, this.y + 10);
            line(this.x - 10, this.y - 30, this.x - 20, this.y - 20);
            line(this.x + 10, this.y - 30, this.x + 20, this.y - 20);
        },

        drawLeft: function () {
            line(this.x - 5, this.y, this.x - 10, this.y + 10);
            line(this.x + 5, this.y, this.x + 5, this.y + 10);
            line(this.x - 10, this.y - 30, this.x - 20, this.y - 20);
            line(this.x + 10, this.y - 30, this.x + 10, this.y - 20);
        },

        drawRight: function () {
            line(this.x - 5, this.y, this.x - 5, this.y + 10);
            line(this.x + 5, this.y, this.x + 10, this.y + 10);
            line(this.x - 10, this.y - 30, this.x - 10, this.y - 20);
            line(this.x + 10, this.y - 30, this.x + 20, this.y - 20);
        },

        drawJump: function () {
            line(this.x - 5, this.y, this.x - 10, this.y + 10);
            line(this.x + 5, this.y, this.x + 10, this.y + 10);
            line(this.x - 10, this.y - 30, this.x - 20, this.y - 20);
            line(this.x + 10, this.y - 30, this.x + 20, this.y - 20);
        },

        drawJLeft: function () {
            line(this.x - 5, this.y, this.x - 10, this.y + 10);
            line(this.x + 5, this.y, this.x + 10, this.y + 10);
            line(this.x - 10, this.y - 30, this.x - 20, this.y - 20);
            line(this.x + 10, this.y - 30, this.x + 10, this.y - 20);
        },

        drawJRight: function () {
            line(this.x - 5, this.y, this.x - 10, this.y + 10);
            line(this.x + 5, this.y, this.x + 10, this.y + 10);
            line(this.x - 10, this.y - 30, this.x - 10, this.y - 20);
            line(this.x + 10, this.y - 30, this.x + 20, this.y - 20);
        },

        movement: function () {
            if (!this.isDead) {
                if (this.isGrounded && keyIsDown(87)) {
                    this.jump();
                    this.state = "jump";
                }

                if (keyIsDown(68)) {
                    this.x += this.speed;
                    this.state = this.isGrounded ? "right" : "jumpRight";
                } else if (keyIsDown(65)) {
                    this.x -= this.speed;
                    this.state = this.isGrounded ? "left" : "jumpLeft";
                } else if (this.isGrounded) {
                    this.state = "front";
                }
            }
        },

        gravity: function (floor) {
            if (this.speedGravity > -5) this.speedGravity--;
            if (this.y + this.height < height - floor.height) {
                this.y -= this.speedGravity;
                this.isGrounded = false;
            } else {
                this.y = height - floor.height - this.height;
                this.isGrounded = true;
                jump.pause();
                jump.currentTime = 0;
            }
        },

        jump: function () {
            this.speedGravity = 15;
            this.y -= this.speedGravity;
            this.isGrounded = false;
            jump.play();
        },

        deadAnimation: function () {
            if (this.isDead) {
                if (!this.isDeadE) {
                    this.fallSpeed += 4.2;
                    this.y += this.fallSpeed;
                    death.play();
                    if (this.y >= height + 1200) {
                        death.pause();
                        death.currentTime = 0;
                    }
                }
                dead();
            }
        },

        checkEnemy: function () {
            if (this.x >= enemy.x && this.x <= enemy.x + enemy.width) {
                if (this.y + 10 <= enemy.y && this.y + 10 >= enemy.y - enemy.height / 2) {
                    this.isDead = true;
                    this.isDeadE = true;
                }
                if (this.y + 10 <= enemy.y - enemy.height / 2 && this.y + 10 >= enemy.y - enemy.height)
                    enemy.isDead = true;
            }

            if (enemy.isDead) enemy.deadAnimation();
        },

        checkCanyon: function () {
            for (let i = 0; i < canyons.length; i++) {
                let characterLeft = this.x - 10;
                let characterRight = this.x + 10;
                let canyonLeft = canyons[i].x;
                let canyonRight = canyons[i].x + canyons[i].width;

                if (characterLeft > canyonLeft && characterRight < canyonRight) {
                    if (this.y + this.height >= height - floor.height) {
                        this.isGrounded = false;
                        this.isDead = true;
                    }
                }
            }
            if (this.isDead) {
                this.deadAnimation();
            }
        },

        checkCoin: function () {
            for (let i = 0; i < coins.length; i++) {
            const coin = coins[i];
            if (dist(character.x, character.y, coin.x, coin.y) <= 25&&!coin.collected)  {
                score.value += 5;
                coin.collected = true;
            }
            
            }
        },
        
        checkPlatform: function () {
            let onPlatform = false;
            for (let i = 0; i < platforms.length; i++) {
                const platform = platforms[i];
                const platformY = height - platform.height - platform.y;

                if (this.x + this.width >= platform.x && this.x <= platform.x + platform.width) {
                    if (this.y + this.height >= platformY && this.y <= platformY + platform.height) {
                        if (this.speedGravity < 0) {
                            this.y = platformY - this.height;
                            this.speedGravity = 0;
                            this.isGrounded = true;
                            onPlatform = true;
                            break;
                        }
                    }
                }
            }
            this.isGrounded = onPlatform;
            if (!onPlatform && this.y + this.height >= height - basefloor) {
                this.isGrounded = true;
                this.y = height - basefloor - this.height;
            }
        }
    };

    enemy = {
        x: 500,
        y: height - 200,
        width: 30,
        height: 30,
        points: 5,
        borderLeft: 400,
        borderRight: 600,
        speed: 2,
        fallSpeed: 2,
        direction: 1,
        isDead: false,

        draw: function () {
            stroke("#000000");
            strokeWeight(1);
            fill("#f98a1a");
            triangle(this.x, this.y, this.x + this.width, this.y, this.x + this.width * 0.5, this.y - this.height);
        },

        movement: function () {
            this.x += this.speed * this.direction;
            if (this.x <= this.borderLeft) {
                this.x += this.borderLeft - this.x;
                this.direction *= -1;
            } else if (this.x >= this.borderRight) {
                this.x -= this.x - this.borderRight;
                this.direction *= -1;
            }
        },

        deadAnimation: function () {
            if (this.isDead) {
                this.fallSpeed += 4.2;
                this.y += this.fallSpeed;
                if (this.y >= height + 15) {
                    this.isDead = false;
                    score.value += enemy.points;
                }
            }
        }
    };

    score = {
        x: 10,
        y: height - 50,
        width: 100,
        height: 40,
        value: 0,

        draw: function () {
            strokeWeight(1);
            fill("#ffb100");
            rect(this.x, this.y, this.width, this.height);
            fill("#000000");
            textSize(40);
            textAlign(CENTER, CENTER);
            text(this.value, this.x + this.width / 2, this.y + this.height / 2);
        }
    };

    sun = {
        x: 0,
        y: 0,
        color1: "yellow",
        color2: "orange",

        draw: function () {
            fill(this.color1);
            stroke(this.color2);
            strokeWeight(10);
            circle(this.x, this.y, 100);
        }
    };

    mountain = {
        x: 400,
        y: height - 200,

        draw: function () {
            noStroke();
            fill("#343434");
            triangle(this.x, this.y, this.x + 200, this.y, this.x + 90, this.y - 200);
            fill("#212121");
            triangle(this.x, this.y, this.x + 200, this.y, this.x + 100, this.y - 140);
        }
    };

    floor = {
        height: 200,
        color: color("#1ad613"),
        drawFloor: function () {
            noStroke();
            fill(this.color);
            rect(0, height - 200, width, 200);
        }
    };

   for (let i = 0; i < countCanyons; i++) {
  let rand1 = 300;
  let rand2 = 600;

  if (currentXcanyon >= 6000) {
    rand1 /= 5;
    rand2 /= 5;
  } else if (currentXcanyon >= 4500) {
    rand1 /= 4;
    rand2 /= 4;
  } else if (currentXcanyon >= 3000) {
    rand1 /= 3;
    rand2 /= 3;
  } else if (currentXcanyon >= 1500) {
    rand1 /= 2;
    rand2 /= 2;
  }

  const w      = random(100, 200);
  const offset = random(rand1, rand2);

  const canyon = {
    x: currentXcanyon + offset,
    y: height - floor.height,
    width: w,
    drawCanyon() {
      noStroke();
      fill(100);
      rect(this.x, this.y, this.width, floor.height);
    }
  };

  canyons.push(canyon);

  currentXcanyon = canyon.x + canyon.width;
}
    
     for (let i = 0; i < countCoins; i++) {
        coins.push({
            x: random (150, 5000),
            y: height - floor.height - 90 + random(-50,80),
            collected: false,
            size: 30,
            drawCoins: function () {
                if (this.collected) return;
                stroke("#c26b13");
                strokeWeight(5);
                fill("#f7b740");
                circle(this.x, this.y, this.size);
            }
        });
    }


    for (let i = 0; i < countClouds; i++) {
        clouds.push({
            x: i * 300,
            y: 140 + random(-100,100),
            speed: 1,
            type: Math.floor(random(1,4)),

            draw: function () {
            switch (this.type){
                case 1:   
                    this.type1();
                    break;
                case 2:   
                    this.type2();
                    break;
                case 3:   
                    this.type3();
                    break;
                default:
                    break;
            }
            },
            
             type1: function () {
                noStroke();
                fill(250);
                circle(this.x, this.y, 100);
                circle(this.x + 50, this.y - 10, 60);
                ellipse(this.x + 20, this.y + 20, 175, 80);
            },
             type2: function () {
                noStroke();
                fill(190);
                circle(this.x, this.y, 100);
                circle(this.x + 50, this.y - 10, 50);
                ellipse(this.x + 15, this.y + 15, 200, 70);
            },
             type3: function () {
                noStroke();
                fill(235);
                circle(this.x, this.y, 75);
                circle(this.x + 50, this.y - 10, 50 );
                ellipse(this.x + 15, this.y + 15, 175, 60);
            },
            move: function () {
                this.x += this.speed;
                if (this.x > width + 100) this.x = -100;
            },
            update: function () {
                this.draw();
                this.move();
            }
        });
        
    }

    for (let i = 0; i < countTrees; i++) {
        trees.push({
            x: i * 200 + random(100,175),
            y: height - 200,
            type: Math.floor(random(1,5)),

            draw: function () {
            switch (this.type){
                case 1:   
                    this.type1();
                    break;
                case 2:   
                    this.type2();
                    break;
                case 3:   
                    this.type3();
                    break;
                case 4:   
                    this.type4();
                    break;
                default:
                    break;
            }
            },
             move: function () {
                if (this.x > width + 50) this.x = -50;
                if (this.x < -50) this.x = width + 50;
            },
            update: function () {
               this.draw();
               this.move();
            },
            type1: function () {
                noStroke();
                fill("#674c0a");
                triangle(this.x, this.y, this.x + 50, this.y, this.x + 25, this.y - 100);
                fill("#86c343");
                ellipse(this.x + 25, this.y - 100, 100, 150);
            },
             type2: function () {
                noStroke();
                fill("#ab7c0a");
                triangle(this.x, this.y, this.x + 50, this.y, this.x + 25, this.y - 100);
                fill("#7edb18");
                ellipse(this.x + 25, this.y - 125, 100, 150);
            },
            type3: function () {
                noStroke();
                fill("#533d08");
                triangle(this.x, this.y, this.x + 95, this.y, this.x + 55, this.y - 175);
                fill("#549909");
                ellipse(this.x + 50, this.y - 175, 100, 175);
            },
            type4: function () {
                noStroke();
                fill("#946c0b");
                triangle(this.x, this.y, this.x + 50, this.y, this.x + 25, this.y - 100);
                fill("#59a308");
                ellipse(this.x + 25, this.y - 125, 100, 175);
            }
        });
        
    }

    for (let i = 0; i < countPlatforms; i++) {
        platforms.push({
            x: canyons[i].x + 25,
            name: "platform",
            y: 250,
            width: 80 + random(30),
            height: 20,
            draw: function () {
                fill("#4213f6");
                noStroke();
                rect(this.x, height - this.height - this.y, this.width, this.height);
            }
        });
    }
}
function movingScreen(direction) {
    for (let i = 0; i < canyons.length; i++) {
        if (!direction) canyons[i].x += character.speed;
        else canyons[i].x -= character.speed;
    }
    for (let i = 0; i < coins.length; i++) {
        if (!direction) coins[i].x += character.speed;
        else coins[i].x -= character.speed;
    }
    for (let i = 0; i < platforms.length; i++) {
        if (!direction) platforms[i].x += character.speed;
        else platforms[i].x -= character.speed;
    }
    
for (let i = 0; i < trees.length; i++) {
        if (!direction) trees[i].x += character.speed;
        else trees[i].x -= character.speed;
    }


    if (!direction) {
        character.x += character.speed;
        enemy.borderLeft += character.speed;
        enemy.borderRight += character.speed;
        enemy.x += character.speed;
        mountain.x += character.speed;
    } else {
        character.x -= character.speed;
        enemy.borderLeft -= character.speed;
        enemy.borderLeft -= character.speed;
        enemy.x -= character.speed;
        mountain.x -= character.speed;
    }
}
function dead() {
    fill("#ff0000");
    textSize(100);
    stroke("#000000");
    strokeWeight(5);
    text("GAME OVER", width / 2, height / 2);
}

function mousePressed() {
    if (mouseX > 50 && mouseX < 82 && mouseY > imgY && mouseY < imgSizeY) {
        restart();
    }
}

function setup() {
    createCanvas(innerWidth, innerHeight);
    musicSlider = createSlider(0, 100, 50);
    musicSlider.position(10, height - 180);
    musicSlider.style("width", "100px");

    soundSlider = createSlider(0, 100, 50);
    soundSlider.position(10, height - 150);
    soundSlider.style("width", "100px");

    imgX = 10;
    imgY = height - 100;
    imgSizeX = imgX + 32;
    imgSizeY = imgY + 32;

    restart();
}

function draw() {
    background(133, 157, 255);

    backMus.volume = musicSlider.value() / 100;
    jump.volume = death.volume = soundSlider.value() / 100;
    sun.draw();
    mountain.draw();
    for (let i = 0; i < trees.length; i++) trees[i].update();
    floor.drawFloor();

    enemy.draw();
    enemy.movement();

    for (let i = 0; i < clouds.length; i++) clouds[i].update();
    for (let i = 0; i < canyons.length; i++) canyons[i].drawCanyon();
    for (let i = 0; i < coins.length; i++) {
        coins[i].drawCoins();}
    
    for (let i = 0; i < platforms.length; i++) platforms[i].draw();
    if (character.x > width - 2 * offsetMovingScreen) movingScreen(true);
    else if (character.x < offsetMovingScreen) movingScreen(false);
    character.checkPlatform();
    character.checkCanyon();
    character.checkCoin();
    character.checkEnemy();
    character.draw();
    character.movement();
    character.gravity(floor);
    score.draw();
    backMus.play();
    image(res, 50, height - 100, 32, 32);
}
