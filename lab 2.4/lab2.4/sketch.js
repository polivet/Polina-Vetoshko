let countCanyons = 2;
let countPlatforms = 2;
let platforms = [];
let canyons = [];
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
            strokeWeight(1),
            fill(this.color);
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
            strokeWeight(1)
            fill("#ffb100");
            rect(this.x, this.y, this.width, this.height);
            fill("#000000");
            textSize(40);
            textAlign(CENTER, CENTER);
            text(this.value, this.x + this.width / 2, this.y + this.height / 2);
        }
    };

    cloud = {
        x: 500,
        y: 100,

        draw: function () {
            noStroke();
            fill(250);
            circle(this.x, this.y, 100);
            circle(this.x + 50, this.y - 10, 60);
            ellipse(this.x + 20, this.y + 20, 175, 80);
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
    
    tree1 = {
        x: -100,
        y: height - 200,

        draw: function () {
            noStroke();
            fill("#674c0a");
            triangle(this.x, this.y, this.x + 50, this.y, this.x + 25, this.y - 100);
            fill("#86c343");
            ellipse(this.x + 25, this.y - 100, 100, 150);
        }
    };
    
    tree2 = {
        x: 1500,
        y: height - 200,

        draw: function () {
            noStroke();
            fill("#674c0a");
            triangle(this.x, this.y, this.x + 50, this.y, this.x + 25, this.y - 100);
            fill("#86c343");
            ellipse(this.x + 25, this.y - 100, 100, 150);
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
        canyons.push({
            x: 250 + i * 400,
            y: height - floor.height,
            width: 100,
            drawCanyon: function () {
                noStroke();
                fill(100);
                rect(this.x, this.y, this.width, floor.height);
            }
        });
    }

    for (let i = 0; i < countPlatforms; i++) {
        platforms.push({
            x: random(width),
            name: "platform",
            y: 250,
            width: 80 + random(30),
            height: 20,
            color: color(100, 200, 100),
            draw: function () {
                fill(this.color);
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
    for (let i = 0; i < platforms.length; i++) {
        if (!direction) platforms[i].x += character.speed;
        else platforms[i].x -= character.speed;
    }

    if (!direction) {
        character.x += character.speed;
        enemy.borderLeft += character.speed;
        enemy.borderRight += character.speed;
        enemy.x += character.speed;
        mountain.x += character.speed;
        tree1.x += character.speed;
        tree2.x += character.speed;
        }
    else {
        character.x -= character.speed;
        enemy.borderLeft -= character.speed;
        enemy.borderLeft -= character.speed;
        enemy.x -= character.speed;
        mountain.x -= character.speed;
        tree1.x -= character.speed;
        tree2.x -= character.speed;
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
    cloud.draw();
    tree1.draw();
    tree2.draw();

    floor.drawFloor();

    enemy.draw();
    enemy.movement();

    for (let i = 0; i < canyons.length; i++) canyons[i].drawCanyon();
    for (let i = 0; i < platforms.length; i++) platforms[i].draw();
    if (character.x > width - 2 * offsetMovingScreen) movingScreen(true);
    else if (character.x < offsetMovingScreen) movingScreen(false);
    character.checkPlatform();
    character.checkCanyon();
    character.checkEnemy();
    character.draw();
    character.movement();
    character.gravity(floor);
    score.draw();
    backMus.play();
    image(res, 50, height - 100, 32, 32);
}
