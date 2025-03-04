// Brandon Apuntar
// Super Mega Blasteroids 9

'use strict'

let config = {
    type: Phaser.AUTO,
    height: 640,
    width: 960,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [Load, Menu, Play]
}

let game = new Phaser.Game(config)