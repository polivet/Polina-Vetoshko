let countCanyons = 2;
let canyons = [];
let floor;
let character;

function setup() {
    createCanvas(1000, 600);

    character = {
        x: 100,
        y: 400,
        height: 10,
        width: 20,
        speed: 5,
        color: "#ffffff",
        speedGravity: -5,
        fallSpeed: 2,
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
            }
        },

        jump: function () {
            this.speedGravity = 15;
            this.y -= this.speedGravity;
            this.isGrounded = false;
        },

        deadAnimation: function () {
            if (this.isDead) {
                this.fallSpeed += 4.2;
                this.y += this.fallSpeed;
            }
        },

        checkEnemy: function () {
            if (this.x - this.width / 2 >= enemy.x && this.x + this.width / 2 <= enemy.x + enemy.width) {
                if (this.y + 10 <= enemy.y && this.y + 10 >= enemy.y - enemy.height / 2) this.isDead = true;
                if (this.y + 10 <= enemy.y - enemy.height / 2 && this.y + 10 >= enemy.y - enemy.height) enemy.isDead = true;
            }

            if (this.isDead) this.deadAnimation();
            if (enemy.isDead) enemy.deadAnimation();
        }
    };

    enemy = {
        x: 300,
        y: 400,
        width: 30,
        height: 30,
        borderLeft: 200,
        borderRight: 500,
        speed: 3,
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
            }
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
}

function draw() {
    background(133, 157, 255);
    floor.drawFloor();

    enemy.draw();
    enemy.movement();

    character.checkEnemy();
    character.draw();
    character.movement();
    character.gravity(floor);
}
