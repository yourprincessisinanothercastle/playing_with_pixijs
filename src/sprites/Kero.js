var PIXI = require('pixi.js');

import c from './constants';
import SpriteBase from './SpriteBase';


export default class Kero extends SpriteBase {
  constructor(pixiStage, id = 'kero', x = 0, y = 100, vx = 1, vy = 1, defaultState = c.STATES.WALKING, defaultDirection = c.DIRECTIONS.LEFT) {
    super(pixiStage, id, x, y, vx, vy, defaultState, defaultDirection);
    
    this.states = {
      [c.STATES.STILL]: {
        [c.DIRECTIONS.LEFT]: {
          images: [22, 10], // the image
          times: [500, 60] // how many frames to show the image
          // do we even need this kind of animation? we could do the same with repeating images on the speed-based variant
        },
        [c.DIRECTIONS.UP]: {
          images: [42],
        },
        [c.DIRECTIONS.DOWN]: {
          images: [19],
        },
        [c.DIRECTIONS.RIGHT]: {
          images: [22],
          flipped: true
        },
      },
      [c.STATES.WALKING]: {
        [c.DIRECTIONS.LEFT]: {
          images: [23, 24],
          speed: 30
        },
        [c.DIRECTIONS.UP]: {
          images: [43, 44],
          speed: 30
        },
        [c.DIRECTIONS.DOWN]: {
          images: [20, 21],
          speed: 30
        },
        [c.DIRECTIONS.RIGHT]: {
          images: [23, 24],
          speed: 30,
          flipped: true
        },
      }
    };

    console.log('kero created')

  }
}
