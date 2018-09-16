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
  }

  getRandomEnemyYPosition() {
    const yPositions = [60, 140, 225];
    return yPositions[RandNumUtil.getRandomInt(3)];
  }
}
/****************** PLAYER CLASS *************************/
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
  constructor() {
    this.sprite = "images/char-horn-girl.png";
    this.x = 205;
    this.y = 400;
  }
  // Draw the player on the screen, required method for game
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  // Update the player's position, required method for game
  update() {}
  handleInput() {}
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
