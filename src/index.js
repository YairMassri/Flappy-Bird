import {Bird, Pipe, Environment} from "./entities";

window.onload = function () {
    const c = document.getElementById('canvas');
    c.width = window.innerWidth;
    c.height = 600;

    const ctx = c.getContext('2d');

    const environment = new Environment(c, ctx);
    const bird = new Bird(250, 300, ctx);
    const pipes = [];

    setInterval(function(){
      let pipeSet = generateRandomPipes(ctx, c.width, c.height);
      pipes.push(pipeSet.top, pipeSet.bottom);
    }, 2000);
    
    gameLoop();


    ctx.fillStyle = "#ffffff";

    /*
     MAIN GAME LOOP
    */
    function gameLoop() {
        ctx.fillRect(0,0,c.width,c.height);
        environment.update();
        environment.render();
        pipes.forEach(function (pipe, index) {
            if(pipe.xpos+pipe.width < 0){
                pipes.splice(index,1)
            };
            pipe.update();
            pipe.render();
        });
        bird.update();
        bird.render();
        
        console.log("pipes ", pipes);

        if (detectCollisions(bird, pipes, c)) {
            alert("you lose!");
            bird.dead = true;
            window.location = '/';
        }

        if (!bird.dead){
            window.requestAnimationFrame(gameLoop);
        }
        
    }
};

function generateRandomPipes(ctx, canvasWidth, canvasHeight){
    let lengthTop = Math.round(Math.random()*200+50);

    let lengthBottom = canvasHeight - 300 - lengthTop;

    let returnVal = { };
    returnVal.top = new Pipe(canvasWidth, -5, lengthTop, 4, ctx);
    returnVal.bottom = new Pipe(canvasWidth, canvasHeight+5-lengthBottom, lengthBottom, 4, ctx);
    return returnVal;
  }

function detectCollisions(bird, pipes, c) {
    
    if(bird.Y > c.height){
       return true;
    }

    for (var i = 0; i < pipes.length; i++) {
        let e = pipes[i];
        let highPipe = e.ypos <= 0;
        let x0 = e.xpos, x1 = e.xpos + e.width;

        if (highPipe) {
            let y0 = e.ypos + e.length;
            let alpha = bird.X;
            let beta = bird.Y - bird.height / 2;
            if (alpha > x0 && alpha < x1 && beta < y0) {
                return true;
            }
        }
        else {
            let y2 = e.ypos;
            let a = bird.X;
            let b = bird.Y + bird.height / 2;
            if (a > x0 && a < x1 && b > y2) return true;
        }
    }
    return false;
}
