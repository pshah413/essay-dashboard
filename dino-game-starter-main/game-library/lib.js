// game class
class Game {
  constructor(gameLoopCb, bgColor, musicToPlay) {
    // start game only on first jump
    this.started = false;

    // background color for the game
    this.bgColor = bgColor;

    // play music
    this.musicToPlay = musicToPlay;

    // keep track of current score
    this.curScore = 0;
    this.highScore = 0;

    // init delta time
    this.dt = 0;

    // gravity
    this.gravity = 0.001;

    // keep track of width and height of game
    this.width = GAME_WIDTH;
    this.height = GAME_HEIGHT;

    // register callback function
    this.gameLoopCb = gameLoopCb;

    // keep track of last updated time
    this.lastUpdatedTime = 0;

    // get the html canvas
    this.initCanvas();

    this.keyListeners = {};

    const keyPressListener = (e) => {
      const fun = this.keyListeners[e.code];

      if(fun !== undefined) {
        fun();
      }
    }

    // create functions to start the game loop
    const init = () => {
      document.addEventListener('keypress', keyPressListener);
      this.canvas.focus();
      window.requestAnimationFrame(gameLoop);
    }

    const gameLoop = (timeStamp) => {
      // get time elapsed between frames
      this.timeStamp = timeStamp;
      let dt = timeStamp - this.lastUpdatedTime;

      this.dt = dt;

      // prevent large frame drops from messing up physics
      if(dt > 17) {
        dt = 17;
      }

      // clear the screen before drawing over it again
      this.ctx.clearRect(0, 0, canvas.width, canvas.height);

      // draw background color
      this.ctx.fillStyle = this.bgColor;
      this.ctx.fillRect(0, 0, canvas.width, canvas.height);
      this.ctx.fillStyle = 'black';

      // call the game loop callback
      this.gameLoopCb(this);

      // update the last updated time
      this.lastUpdatedTime = timeStamp;

      // keep requesting new frames
      window.requestAnimationFrame(gameLoop);
    }

    this.init = init;
    this.gameLoop = gameLoop;
  }

  // method to retrieve the html canvas
  initCanvas() {
    // get the html5 canvas and its context
    this.canvas = document.getElementById('canvas');

    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.ctx = canvas.getContext('2d');
  }

  drawImage(image, x, y, width, height) {
    if(image) {
      this.ctx.drawImage(image, x, y, width, height);
    }
  }

  drawAnimatedSprite(frameArr, x, y, width, height, animDuration = 300) {
    const numFrames = frameArr.length;

    const curAnimTime = Math.round(this.timeStamp % animDuration);
    const timePerFrame = animDuration / numFrames;

    const curFrame = Math.floor(curAnimTime / timePerFrame);

    this.drawImage(frameArr[curFrame], x, y , width, height);
  }

  drawRectangle(x, y, width, height) {
    this.ctx.beginPath();
    this.ctx.rect(x, y, width, height);
    this.ctx.stroke();
  }

  applyGravity(sprite) {
    if(sprite.position.y + sprite.size.height >= this.height) {
      sprite.position.y = this.height - sprite.size.height;
      sprite.grounded = true;
      sprite.velocity.y = 0;
    }
    else {
      sprite.grounded = false;
    }

    if(!sprite.grounded) {
      sprite.velocity.y += this.gravity * this.dt;
    }
  }

  keyPressed(key, fun) {
    this.keyListeners[key] = fun;
  }

  drawText(text, x, y) {
    const fontSize = 30;
    this.ctx.font = `${fontSize}px Arial`;
    this.ctx.fillText(text, x, y + fontSize);
  }

  playMusic() {
    if(this.musicToPlay) {
      const audio = new Audio(this.musicToPlay);
      audio.play();
      this.musicToPlay = undefined;
    }
  }
}

export const box2dCollision = (sprite1, sprite2) => {
  return (sprite1.position.x < sprite2.position.x + sprite2.size.width &&
   sprite1.position.x + sprite1.size.width > sprite2.position.x &&
   sprite1.position.y < sprite2.position.y + sprite2.size.height &&
   sprite1.position.y + sprite1.size.height > sprite2.position.y);
}

export const GAME_WIDTH = window.innerWidth;
export const GAME_HEIGHT = 300;

export default Game;
