#!/bin/bash

rm -r kero/
mkdir -p kero
convert HarvestMoon-Kero.png -crop 30x29 kero/kero.png
spritesheet-js -f pixi.js --name kero kero/*.png