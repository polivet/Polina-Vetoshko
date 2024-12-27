let countCanyons = 2;
let canyons = [];
let floor;
let character;
let death = new Audio("death.mp3");
let jump = new Audio("jump.mp3");

function setup() {
    createCanvas(1000, 600);

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
        isJump: false,
        state: "front",

        draw: function () {
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
                this.fallSpeed += 4.2;
                this.y += this.fallSpeed;
                death.play();
                if (this.y >= height + 1200) {
                    death.pause();
                    death.currentTime = 0;
                }
            }
        },

        checkEnemy: function () {
            if (this.x >= enemy.x && this.x <= enemy.x + enemy.width) {
                if (this.y + 10 <= enemy.y && this.y + 10 >= enemy.y - enemy.height / 2) this.isDead = true;
                if (this.y + 10 <= enemy.y - enemy.height / 2 && this.y + 10 >= enemy.y - enemy.height)
                    enemy.isDead = true;
            }

            if (this.isDead) this.deadAnimation();
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
        }
    };

    enemy = {
        x: 500,
        y: 400,
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

    floor = {
        height: 200,
        color: color("#1ad613"),
        drawFloor: function () {
            noStroke();
            fill(this.color);
            rect(0, height - this.height, width, this.height);
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
}

function draw() {
    background(133, 157, 255);
    sun.draw();
    mountain.draw();
    cloud.draw();

    floor.drawFloor();
    score.draw();

    enemy.draw();
    enemy.movement();

    for (let i = 0; i < canyons.length; i++) canyons[i].drawCanyon();
    character.checkCanyon();
    character.checkEnemy();
    character.draw();
    character.movement();
    character.gravity(floor);
}
