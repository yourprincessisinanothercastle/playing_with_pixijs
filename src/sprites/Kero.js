var PIXI = require('pixi.js');

import c from './constants';
import SpriteBase from './SpriteBase';


export default class Kero extends SpriteBase {
  constructor(pixiStage, id = 'kero', x=0, y=100, vx = 1, vy = 1, defaultState = c.STATES.WALKING, defaultDirection = c.DIRECTIONS.LEFT) {
    super(pixiStage, id, x, y, vx, vy, defaultState, defaultDirection);
    this.states = {
      [c.STATES.WALKING]: {
        [c.DIRECTIONS.LEFT]: {
          images: [22, 23, 24],
          speed: 10
        },
        [c.DIRECTIONS.UP]: {
          images: [42, 43, 44],
          speed: 10
        },
        [c.DIRECTIONS.DOWN]: {
          images: [19, 20, 21],
          speed: 10
        }
      }
    };

    console.log('kero created')

  }
}
