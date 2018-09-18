/****************** RANDNUMUTIL CLASS *************************/
class RandNumUtil {
  static getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  static getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
}

/****************** ENEMY CLASS *************************/
class Enemy {
  constructor() {
    this.width = 100;
    this.height = 80;
    // The image/sprite for our enemies, this uses
    // a helper to easily load images
    this.sprite = "images/enemy-bug.png";
    this.x = -70;
    this.y = this.getRandomEnemyYPosition();
    this.speed = RandNumUtil.getRandomArbitrary(80, 210);
  }

  // Draw the enemy on the screen, required method for game
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  update(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += dt * this.speed;
    // reset the player position if it collides with the enemy
    if (this.checkCollisions()) {
      player.resetPlayer();
    }
  }

  getRandomEnemyYPosition() {
    const yPositions = [60, 140, 225];
    return yPositions[RandNumUtil.getRandomInt(3)];
  }

  checkCollisions() {
    if (
      !player.isOnGrass() &&
      player.x < this.x + this.width &&
      player.x + player.width > this.x &&
      player.y < this.y + this.height &&
      player.y + player.height > this.y
    ) {
      return true;
    }
  }
}
/****************** PLAYER CLASS *************************/
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
  constructor() {
    this.sprite = "images/char-horn-girl.png";
    this.width = 80;
    this.height = 80;
    this.initialX = 205;
    this.initialY = 380;
    this.x = this.initialX;
    this.y = this.initialY;
    // horizontal and vertical motion
    this.hMotion = 100;
    this.vMotion = 80;
    this.xLeftBound = 5;
    this.xRightBound = 405;
    this.yUpBound = -20;
    this.yDownBound = 380;
  }
  // Draw the player on the screen, required method for game
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  // Update the player's position, required method for game
  update() {}

  handleInput(clickedKey) {
    switch (clickedKey) {
      case "left":
        if (this.x !== this.xLeftBound) {
          this.x -= this.hMotion;
        }
        break;
      case "right":
        if (this.x !== this.xRightBound) {
          this.x += this.hMotion;
        }
        break;
      case "up":
        if (this.y !== this.yUpBound) {
          this.y -= this.vMotion;
        }
        break;
      case "down":
        if (this.y !== this.yDownBound) {
          this.y += this.vMotion;
        }
        break;
    }
  }

  // check if player is on the last line of grass
  isOnGrass() {
    if (this.y === 300) return true;
    return false;
  }

  resetPlayer() {
    this.x = this.initialX;
    this.y = this.initialY;
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];
function createAndPushEnemies() {
  for (let i = 0; i < 3; i += 1) {
    let enemy = new Enemy();
    allEnemies.push(enemy);
  }
}
createAndPushEnemies();

// create new Enemies every 2-4 seconds
const intervalID = window.setInterval(() => {
  createAndPushEnemies();
}, RandNumUtil.getRandomArbitrary(2000, 4000));

let player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keyup", function(e) {
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
