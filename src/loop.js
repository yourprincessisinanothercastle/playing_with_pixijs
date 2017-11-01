import MainLoop from 'mainloop.js';
import Kero from './sprites/Kero';


export default class GameLoop {
  constructor(renderer) {
    console.log('init gameloop')

    this.stage = new PIXI.Container();
    this.renderer = renderer;
    
    this.kero = new Kero(this.stage);
    this.kero.init();


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

  update(delta) {
    this.kero.update(true, false, false, false);
  }

  draw(interpolationPercentage=1) {
    this.kero.draw(interpolationPercentage);  // update positions for all objects
    console.log('rendering')
    this.renderer.render(this.stage);
  }
}
