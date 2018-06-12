// Enemies our player must avoid
const Enemy = function(x, y, speed) {
    this.sprite = 'images/enemy-bug.png';
    // How fast the object can move across the board
    this.speed = speed;
    // Where the object is located on the canvas
    this.x = x;
    this.y = y;
};

// Define some min and max speeds we use for moving enemies
Enemy.minSpeed = 20;
Enemy.maxSpeed = 200;

// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // if the object is no longer visible, move it back
    // to the left side of the canvas
    if (this.x > 500) {
        this.x = -100;
        // Randomly choose a new row as well
        const row = getRandomStoneRow();
        this.y = row * 81 - 25;
    } else {
        // otherwise, move it right based on speed
        this.x += this.speed * dt;
    }
};

// Draw the enemies on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

const Character = function (x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
    this.score = 0;
};

Character.prototype.update = function (dt) {
    player.score += 1;
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
// loop to create 5 enemies
for (let i = 0; i < 5; i++) {
    // We want the enemies to spawn on one of the three
    // stone rows
    const block = getRandomStoneBlock();
    // Get a random speed for the enemy
    const speed = Math.random() * Enemy.maxSpeed + Enemy.minSpeed;
    // Create enemy object and add to array of enemy objects
    const enemy = new Enemy(block.x, block.y, speed);
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

// Start the game timer once the player starts moving
document.addEventListener("keyup", setupTimer, {once: true});

// Get a random row but add one since we don't want
// a water block which would be row 0
function getRandomStoneRow() {
    return Math.floor(Math.random() * Math.floor(3)) + 1;
}

// Return coordinates to one of the stone blocks
// Coordinate range is from (0, 56) to (400, 218)
function getRandomStoneBlock() {
    const row = getRandomStoneRow();
    const col = Math.floor(Math.random() * Math.floor(5));
    return {x: col * 100, y: row * 81 - 25};
}

let startTime, updateTimer, elapsed, minutes, seconds;  // Define variables that will hold timer info when game is started
function setupTimer() {
    startTime = new Date().getTime();
    updateTimer = setInterval(function () {
        const now = new Date().getTime();
        elapsed = now - startTime;

        minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
        seconds = Math.floor((elapsed % (1000 * 60)) / 1000);
    }, 1000);
}
