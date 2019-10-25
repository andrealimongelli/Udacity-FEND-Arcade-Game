  // Enemies our player must avoid
  var passi = 0 ;


  var Enemy = function(x,y, veloc) {
      // Variables applied to each of our instances go here,
      // we've provided one for you to get started

      // The image/sprite for our enemies, this uses
      // a helper we've provided to easily load images
      this.x = x ;
      this.y = y ;
      this.veloc = veloc ;
      this.sprite = 'images/enemy-bug.png';
  };

  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  Enemy.prototype.update = function(dt) {
      // You should multiply any movement by the dt parameter
      // which will ensure the game runs at the same speed for
      // all computers.
      this.x = this.x+this.veloc*dt;
      if (this.x>505) {
          this.x=0;
          this.veloc = 50 * Math.round(Math.random() * 5 + 5);


      }




  };

  // Draw the enemy on the screen, required method for game
  Enemy.prototype.render = function() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };

  // Now write your own player class
  var Player = function(x,y) {
      // Variables applied to each of our instances go here,
      // we've provided one for you to get started

      // The image/sprite for our player, this uses
      // a helper we've provided to easily load images
      this.x = x ;
      this.y = y ;


      this.sprite = 'images/char-cat-girl.png';
  };
  // This class requires an update(), render() and
  // a handleInput() method.
  Player.prototype.reset = function() {
      this.x=200;
      this.y=370;
      passi = 0;
      document.getElementById("steps").innerHTML = passi;

  };
  Player.prototype.render = function() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };
  Player.prototype.update = function() {
  for (let enemy of allEnemies) {
          if (enemy.x < this.x + 60 &&
        enemy.x + 37 > this.x &&
        enemy.y < this.y + 25 &&
        30 + enemy.y > this.y) {

              swal({
                  text: `You loose Total steps ${passi}`,
                  icon: "error",
                  button: {
                      text: "Play Again?"
                  }
              })

              this.reset();



          }
          if (player.y < 0) {
              swal({
                  text: `You win Total steps ${passi}`,
                  icon: "success",
                  button: {
                      text: "Play Again?"
                  }
              })
              this.reset();
          }
      }
  };
  Player.prototype.handleInput = function(chiave) {
      // You should multiply any movement by the dt parameter
      // which will ensure the game runs at the same speed for
      // all computers.

      if ((chiave=='left') && (this.x !==0)) {
          document.getElementById("steps").innerHTML = ++passi;

          this.x=this.x-100
      }
      else if ((chiave=='right') && (this.x !==400)) {
          document.getElementById("steps").innerHTML = ++passi;
          this.x=this.x+100
      }
      else if ((chiave=='up') && (this.y !==0)) {
          document.getElementById("steps").innerHTML = ++passi;
          this.y=this.y-80;


      }
      else if ((chiave=='down') && (this.y < 350 )) {
          document.getElementById("steps").innerHTML = ++passi;


          this.y=this.y+80;
      }
      else if (chiave=='enter') {
          Welcome();
      }




  };
  var Welcome = function() {


  swal({
      text: `Move with the arrow keys and 
             reach the other side to win.
             Each step will be counted.   

             ↑	Upwards Arrow	
             ↓	Downwards Arrow	
             →	Rightwards Arrow	
             ←	Leftwards Arrow`,
      icon: "info",
      button: {
          text: "Click to play"
      }
  })
  }

  var Nemico1 = new Enemy(0,50,Math.floor(Math.random() * 5 + 3) * 79);

  var Nemico2 = new Enemy(0,130,Math.floor(Math.random() * 6 + 1) * 56);

  var Nemico3 = new Enemy(0,210,Math.floor(Math.random() * 4 + 2) * 60);


  var Giocatore1 = new Player(200,370);




  var allEnemies = [Nemico1, Nemico2, Nemico3];
  var player = Giocatore1;



  // Now instantiate your objects.
  // Place all enemy objects in an array called allEnemies
  // Place the player object in a variable called player



  // This listens for key presses and sends the keys to your
  // Player.handleInput() method. You don't need to modify this.
  document.addEventListener('keyup', function(e) {


      var allowedKeys = {
          13: 'enter',
          37: 'left',
          38: 'up',
          39: 'right',
          40: 'down'
      };

      player.handleInput(allowedKeys[e.keyCode]);


  });