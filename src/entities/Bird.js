const Bird = function (x, y, ctx) {
    this.X = x;
    this.Y = y;
    this.ctx = ctx;
    this.velY = 0;
    this.width = 90;
    this.height = 64;
    this.ticks = 0;
    this.spriteIndex = 0;
    this.dead = false;
    this.sprites = [
        document.getElementById('bird1'),
        document.getElementById('bird2'),
        document.getElementById('bird3')
    ];

    var self = this;

    window.addEventListener('keydown', function(e) {
        if (e.keyCode === 32) {
          self.velY = -16;  
        }
    });
};

Bird.prototype.update = function () {
    this.ticks++;
    if (this.ticks % 15 === 0) this.spriteIndex = (this.spriteIndex+1) % this.sprites.length;

    this.Y += this.velY;
    this.velY += 1;
};

Bird.prototype.render = function () {
  let renderX = this.X - this.width/2;
  let renderY = this.Y - this.height/2;
 
  this.ctx.drawImage(this.sprites[this.spriteIndex], renderX, renderY);
};

export default Bird;