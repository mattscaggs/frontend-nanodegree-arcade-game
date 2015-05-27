// sublime text 2 for code, checked with http://jshint.com/
// references noted in separate txt file

// Enemy class
var Enemy = function() {
    this.enemyRunway = [-150, 600];
    this.enemyRow = [63, 146, 228];
    this.enemySpeed = [60, 120, 180, 240, 300, 360];

    this.sprite = 'images/enemy-bug.png';

    this.reset();
};

// Enemy update method
Enemy.prototype.update = function(dt) {
    var endRunway = this.enemyRunway[1];
    this.x += this.speed * dt;

    if (this.x > endRunway) {
        this.reset();
    }

    if (player.x >= this.x - 35 && player.x <= this.x + 35) {
        if (player.y >= this.y - 35 && player.y <= this.y + 35) {
            player.reset();
        }
    }
};

// Enemy reset method
Enemy.prototype.reset = function () {
    var startRunway = this.enemyRunway[0];
    this.x = startRunway;
    this.y = this.randomRow();
    this.speed = this.randomSpeed();
};

// Enemy render method
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Enemy row randomizer
Enemy.prototype.randomRow = function () {
    return this.enemyRow[Math.floor(Math.random() * this.enemyRow.length)];
};

// Enemy speed randomizer
Enemy.prototype.randomSpeed = function () {
    return this.enemySpeed[Math.floor(Math.random() * this.enemySpeed.length)];
};

// Player class
var Player = function () {
    this.sprite = 'images/char-boy.png';
    this.reset();
};

// player update method
Player.prototype.update = function() {
    if (this.y == -20) {
        this.reset();
    }
};

Player.prototype.reset = function() {
    this.x = 200;
    this.y = 380;
};

// player render method
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// player handle input method
Player.prototype.handleInput = function(key) {
    if (key === 'left' && this.x > 0) {
        this.x -= 101;
    } else if (key === 'up') {
        this.y -= 83;
    } else if (key === 'right' && this.x < 400) {
        this.x += 101;
    } else if (key === 'down' && this.y < 380) {
        this.y += 83;
    }
};

// Listens for key presses and sends to Player.handleInput() method
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// Instantiate objects via loop and push
var maxEnemies = 5;
var allEnemies = [];
for (var i = 0; i < maxEnemies; i++) {
    var enemy = new Enemy();
    allEnemies.push(enemy);
}

var player = new Player();