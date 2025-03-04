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
    scene: [Menu]
}

let game = new Phaser.Game(config)