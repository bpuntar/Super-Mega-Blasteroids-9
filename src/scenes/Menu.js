class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }

    preload() {
        
    }

    create() {

        // make music
        this.music = this.sound.add('menu', {
            loop: true, 
            volume: 0.5
        })
        
        this.music.play()
        console.log("Is the music looping?", this.music.loop); // should return true

        // scrolling background
        this.starfield = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'starfield').setOrigin(0)

        // menu text
        this.add.bitmapText(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'p2p', 'Super Mega Blasteroids 9', 32).setOrigin(0.5)
        this.add.bitmapText(game.config.width/2, game.config.height/2, 'p2p', 'By Brandon Apuntar', 32).setOrigin(0.5)
        //menuConfig.backgroundColor = '#37a7ff'
        //menuConfig.color = '#3355ff'
        this.add.bitmapText(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'p2p', 'Left arrow: Start game', 25).setOrigin(0.5)
        this.add.bitmapText(game.config.width/2, game.config.height/2 + borderUISize + borderPadding + 40, 'p2p', 'Right arrow: Credits', 25).setOrigin(0.5)
        console.log("Checking if font exists:", this.cache.bitmapFont.exists('p2p'))


        
        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)

    }

    update() {

        // scrolling background speed
        this.starfield.tilePositionY -=0.3

        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            //this.music.stop()
            this.scene.start('playScene')
            
        }

        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            this.scene.start('creditsScene')

        }

    }
}