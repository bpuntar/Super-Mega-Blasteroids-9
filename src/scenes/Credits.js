class Credits extends Phaser.Scene {
    constructor() {
        super('creditsScene');
    }

    create() {
        // scrolling background
        this.starfield = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'starfield').setOrigin(0)

        //credits text
        this.add.bitmapText(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'p2p', 'Inspired by: Fosters Home for Imaginary Friends', 16).setOrigin(0.5)
        this.add.bitmapText(game.config.width/2, game.config.height/2, 'p2p', 'All assets created by Brandon Apuntar in Piskel and jsfxr ', 16).setOrigin(0.5)
        this.add.bitmapText(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'p2p', 'Left arrow: Start game', 25).setOrigin(0.5)
        this.add.bitmapText(game.config.width/2, game.config.height/2 + borderUISize + borderPadding + 40, 'p2p', 'Right arrow: Menu', 25).setOrigin(0.5)
        
        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
    }


    update() {
        // scrolling background speed
        this.starfield.tilePositionY -=1

        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start('playScene')
            
        }

        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            this.scene.start('menuScene')

        }
    }


    
}