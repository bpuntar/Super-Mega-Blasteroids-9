// Brandon Apuntar
// Super Mega Blasteroids 9
// Movement taken from Nathan Altice Movement Studies
// https://github.com/nathanaltice/MovementStudies

'use strict'

//global variables
let cursors

let config = {
    type: Phaser.AUTO,
    height: 640,
    width: 960,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: {
                y: 0
            }
        }
    },
    scene: [Load, Menu, Play]
}

//reserve keyboard bindings
let keyLEFT

let game = new Phaser.Game(config)

//set UI sizes
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3