var PIXI = require('pixi.js');
import GameLoop from './loop'


let resolution = [500, 300];
let ratio = resolution[0] / resolution[1];
let canvas = document.getElementById("pixiStuff");

//Create the renderer
let renderer = PIXI.autoDetectRenderer(resolution[0], resolution[1], {
  view: canvas,
  antialias: false,
  transparent: false,
  resolution: 1
});

let resources = [{
  name: "kero",
  url: "static/kero.json"
}];

PIXI.loader
  .add(resources)
  .load(setup);

function setup() {
  console.log('resources', PIXI.loader.resources)
  //Add the canvas to the HTML document
  document.body.appendChild(renderer.view);

  //This code will run when the loader has finished loading the image
  //Create a container object called the `stage`
  
  resize();

  window.onresize = function (event) {
    resize();
  };

  let gloop = new GameLoop(renderer);

  // :P
  gloop.update();
  gloop.update();
  gloop.update();
  gloop.update();
  gloop.update();
  gloop.draw();
  gloop.update();
  gloop.draw();
  gloop.update();
  gloop.draw();
  gloop.update();
  gloop.draw();
  gloop.update();
  gloop.draw();
  gloop.update();
  gloop.draw();
}



function resize() {
  if (window.innerWidth / window.innerHeight >= ratio) {
    var w = window.innerHeight * ratio;
    var h = window.innerHeight;
  } else {
    var w = window.innerWidth;
    var h = window.innerWidth / ratio;
  }
  renderer.view.style.width = w + 'px';
  renderer.view.style.height = h + 'px';
}
