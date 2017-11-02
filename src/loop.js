import MainLoop from 'mainloop.js';
import Kero from './sprites/Kero';

function keyboard(keyCode) {
  var key = {};
  key.code = keyCode;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;

  //The `downHandler`
  key.downHandler = function (event) {
    if (event.keyCode === key.code) {
      if (key.isUp && key.press) key.press();
      key.isDown = true;
      key.isUp = false;
    }
    event.preventDefault();
  };

  //The `upHandler`
  key.upHandler = function (event) {
    if (event.keyCode === key.code) {
      if (key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;
    }
    event.preventDefault();
  };

  //Attach event listeners
  window.addEventListener(
    "keydown", key.downHandler.bind(key), false
  );
  window.addEventListener(
    "keyup", key.upHandler.bind(key), false
  );
  return key;
}

export default class GameLoop {
  constructor(renderer) {
    console.log('init gameloop')

    this.stage = new PIXI.Container();
    this.renderer = renderer;

    this.kero = new Kero(this.stage);
    this.kero.init();

    this.left = false;
    this.up = false;
    this.right = false;
    this.down = false;

    this.registerInput();


    MainLoop.setUpdate(() => {
      this.update();
    });

    MainLoop.setDraw(() => {
      this.draw();
    });


    //this.draw();
    //this.renderer.render(this.stage);
    //MainLoop.start();
  }

  registerInput() {
    //Capture the keyboard arrow keys
    let left = keyboard(37);
    let up = keyboard(38);
    let right = keyboard(39);
    let down = keyboard(40);

    left.press = () => {
      this.left = true;
    };
    left.release = () => {
      this.left = false;
    };

    right.press = () => {
      this.right = true;
    };
    right.release = () => {
      this.right = false;
    };

    up.press = () => {
      this.up = true;
    };
    up.release = () => {
      this.up = false;
    };

    down.press = () => {
      this.down = true;
    };
    down.release = () => {
      this.down = false;
    };
  }

  start() {
    MainLoop.start();
  }
  stop() {
    MainLoop.stop();
  }

  update(delta, keys = false) {
    if (keys.length === 4) {
        console.log(keys)
      this.kero.update(...keys);
    } else {
      this.kero.update(this.up, this.down, this.left, this.right);
    }
  }

  draw(interpolationPercentage = 1) {
    this.kero.draw(interpolationPercentage); // update positions for all objects
    //console.log('rendering')
    this.renderer.render(this.stage);
  }
}
