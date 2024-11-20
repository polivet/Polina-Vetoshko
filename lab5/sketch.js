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
                if (this.y < height + 200) {
                    this.fallSpeed += 3;
                    this.y += this.fallSpeed;
                } else {
                    this.y = height - floor.height - this.height;
                    this.x = 100;
                    this.isGrounded = true;
                    this.isDead = false;
                    this.fallSpeed = 0;
                }
            }
        },

        checkOutside: function () {
            if (this.x < -10) this.x = width - this.width + 10;
            if (this.x > width + 10) this.x = -10;
        },

        checkCanyon: function () {
            for (let i = 0; i < canyons.length; i++) {
                let characterLeft = this.x - 10;
                let characterRight = this.x + 10;
                let canyonLeft = canyons[i].x;
                let canyonRight = canyons[i].x + canyons[i].width;

                if (characterRight > canyonLeft && characterLeft < canyonRight) {
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
                fill(100);
                rect(this.x, this.y, this.width, floor.height);
            }
        });
    }
}

function draw() {
    background(133, 157, 255);
    floor.drawFloor();
    for (let i = 0; i < canyons.length; i++) canyons[i].drawCanyon();
    character.checkCanyon();
    character.draw();
    character.movement();
    character.gravity(floor);
    character.checkOutside();
}
