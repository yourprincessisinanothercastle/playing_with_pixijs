var PIXI = require('pixi.js');
import c from './constants';


export default class SpriteBase {
  constructor(pixiStage, id, x, y, vx, vy, defaultState, defaultDirection) {
    this.stage = pixiStage;
    this.id = id;
    this.prefix = this.id; // prefix for states
    this.spriteCache = {};

    this.state = defaultState; // c.WALKING
    this.direction = defaultDirection; // c.DOWN

    this.stateLast = defaultState;
    this.directionLast = defaultDirection;

    this._xLast = x;
    this._yLast = y;

    this._x = x;
    this._y = y;

    this._vx = vx;
    this._vy = vy;
    this.interpolationPercentage = 1;
    this.onStage = null;
    this.animationTime = 0;

  }

  init() {
    this.onStage = this.stage.addChild(new PIXI.Sprite(this.texture));
    this.onStage.anchor.x = 0.5;
  }

  /**
   * handle movement the character wants to doI
   * this should turn the sprite in the correct directions
   * 
   * @param {*} up 
   * @param {*} down 
   * @param {*} left 
   * @param {*} right 
   */
  movement(up, down, left, right) {
    let isMoving = 0;
    if (up && !down) {
      this._y -= this._vy;
      this.direction = c.DIRECTIONS.UP;
      isMoving = 1;
    }
    if (down && !up) {
      this._y += this._vy;
      this.direction = c.DIRECTIONS.DOWN;
      isMoving = 1;
    }
    if (left && !right) {
      this._x -= this._vx;
      this.direction = c.DIRECTIONS.LEFT;
      isMoving = 1;
    }
    if (right && !left) {
      this._x += this._vx;
      this.direction = c.DIRECTIONS.RIGHT;
      isMoving = 1;
    }

    this.animationTime += isMoving; // add to animationtime if moving
    this.animationTime *= isMoving; // set to zero if not moving
  }

  updateSprite() {
    this.onStage.texture = this.texture;
  }

  update(up, down, left, right) {
    this._xLast = this._x;
    this._yLast = this._y;
    this.directionLast = this.direction;

    // todo: collisions separate from movement
    this.movement(up, down, left, right);
    this.updateSprite();
  }

  draw(interpolationPercentage = 1) {
    this.interpolationPercentage = interpolationPercentage;

    let x = this.drawnPosition[0];
    let y = this.drawnPosition[1];

    this.onStage.x = parseInt(x)
    this.onStage.y = parseInt(y)
  }

  get drawnPosition() {
    let x = this._xLast + (this._x - this._xLast) * this.interpolationPercentage;
    let y = this._yLast + (this._y - this._yLast) * this.interpolationPercentage;
    return [x, y];
  }

  get state() {
    return this._state;
  }

  get direction() {
    return this._direction;
  }

  set state(value) {
    this._state = value;
  }

  set direction(value) {
    this._direction = value;
  }

  get textures() {
    return PIXI.loader.resources[this.id].textures;
  }

  get texture() {
    let animationLength = this.states[this.state][this.direction]['images'].length;
    let speed = this.states[this.state][this.direction]['speed'];
    let frame = parseInt((animationLength / speed) * (this.animationTime % speed));
    let spriteindex = this.states[this.state][this.direction]['images'][frame];
    let spriteId = this.prefix + '-' + spriteindex + '.png';
    // todo: we need onStage to set the initial scale
    try {
      if (this.states[this.state][this.direction]['flipped']) {
        this.onStage.scale.x = -1;
      } else {
        this.onStage.scale.x = 1;
      }
    } catch (e) {
      // this.onStage is null when we run this the first time
      // we ask for forgiveness in that case, instead of if-ing everytime
    }
    return this.textures[spriteId];
  }
}
