// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    this.xBoundary = [-150, 550];

    this.spawn();
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks




Enemy.prototype.spawn = function(dt) {
    this.ySpawn = [40, 130, 220, 310];
    this.speedOptions = [300, 350, 400];
    
    this.x = -200;
    this.y = this.Randomizer(this.ySpawn);
    this.speed = this.Randomizer(this.speedOptions);
    
}
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += (dt * this.speed);

    if(this.x > this.xBoundary[1]){
        this.spawn();
    }


}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

//Taken from http://stackoverflow.com/questions/3419928/how-can-i-return-a-random-value-from-an-array
Enemy.prototype.Randomizer = function(inputArray) {
    return inputArray[Math.floor(Math.random() * inputArray.length)];
}



// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


var Player = function(){

    this.sprite = 'images/char-boy.png';

    // Starting coordinates of the player
    this.x = 200;
    this.y = 400;
    
}


Player.prototype.handleInput = function(key){

    //Move x or y by change variables
    this.yChange = 90;
    this.xChange = 100;


    //Change x or y depending upon key as long as in defined boundary 
    if(key === 'up' && this.y > 100)
            this.y = this.y - this.yChange;
    if(key === 'down' && this.y < 360)
            this.y = this.y + this.yChange;
    if(key === 'left' && this.x > 50)
            this.x = this.x - this.xChange;
    if(key === 'right' && this.x < 350)
            this.x = this.x + this.xChange;

}


Player.prototype.update = function(){
    this.checkCollision();
}

Player.prototype.checkCollision = function(){
    var self = this;
    // loop through each bug and determine if there is a collision
    allEnemies.forEach(function(enemy) {
        if (enemy.y == self.y) {
            if (enemy.x >= player.x - 25 && enemy.x <= player.x + 25) {
                self.restart();
            }
        }
    });
}

Player.prototype.restart = function(){
    // Starting coordinates of the player
    this.x = 200;
    this.y = 400;
}

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

}



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var enemy1 = new Enemy();
var enemy2 = new Enemy();
var enemy3 = new Enemy();
var enemy4 = new Enemy();
var enemy5 = new Enemy();
var enemy6 = new Enemy();
var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6];
var player = new Player();



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
