#!/bin/bash

BASEFOLDER="../static/sprites/"

rm -r $BASEFOLDER

for folder in enemy_dummy kero skele turtle
do
  mkdir -p $BASEFOLDER/$folder
  spritesheet-js -f pixi.js --name $folder --path $BASEFOLDER/$folder/ $folder/*.png
done
