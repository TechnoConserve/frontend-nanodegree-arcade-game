// Enemies our player must avoid
const Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const Character = function (x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
};

Character.prototype.update = function (dt) {

};

Character.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Update the character coordinates based on keyboard input
// Checks are made to ensure coordinates are not updated
// beyond the game canvas
Character.prototype.handleInput = function (keyPress) {
    if (keyPress === "left" && this.x > 0) {
        this.x -= 100;
    } else if (keyPress === "up" && this.y > -25) {
        this.y -= 81;
    } else if (keyPress === "right" && this.x < 400) {
        this.x += 100;
    } else if (keyPress === "down" && this.y < 380) {
        this.y += 81;
    }
};

// allEnemies stores our enemy objects
let allEnemies = [];
// loop to create multiple enemies
for (let i = 0; i < 5; i++) {
    // We want the enemies to spawn on one of the three
    // stone rows
    const block = getRandomStoneBlock();
    const enemy = new Enemy(block.x, block.y);
    allEnemies.push(enemy);
}

// Create a player object that will be located on the bottom
// row, middle column
const player = new Character(200, 380);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


// Return coordinates to one of the stone blocks
// Coordinate range is from (0, 56) to (400, 218)
function getRandomStoneBlock() {
    // Get a random row but add one since we don't want
    // a water block which would be row 0
    const row = Math.floor(Math.random() * Math.floor(3)) + 1;
    const col = Math.floor(Math.random() * Math.floor(5));
    return {x: col * 100, y: row * 81 - 25};
}
