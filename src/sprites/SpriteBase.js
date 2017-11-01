var PIXI = require('pixi.js');

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
    this.textureNeedsUpdate = false;
    this.onStage = null;
  }

  init() {
    this.onStage = this.stage.addChild(this.texture);
  }

  update(up = false, down = false, left = false, right = false) {
    this._xLast = this._x;
    this._yLast = this._y;

    if (up) this._x += this._vx;
    if (down) this._x -= this._vx;
    if (left) this._y -= this._vy;
    if (right) this._y += this._vy;
    /*if (direction) {
      if (this.direction != this.directionLast) {
        textureNeedsUpdate = true;
      }
    }*/
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
    console.log(this.states)
    console.log(this.state)
    console.log(this.direction)
    let spriteindex = this.states[this.state][this.direction]['images'][0];
    let spriteId = this.prefix + '-' + spriteindex + '.png';
    let texture = this.textures[spriteId];
    if (!this.spriteCache[spriteindex]) {
      console.log('new thing in spritecache!')
      this.spriteCache[spriteindex] = new PIXI.Sprite(texture);
      console.log(this.spriteCache[spriteindex]);
    }
    return this.spriteCache[spriteindex];
  }

}
