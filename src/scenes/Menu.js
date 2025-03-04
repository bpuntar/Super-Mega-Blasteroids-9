class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }

    preload() {
        
    }

    create() {

        let menuConfig = {
            fontFamily: 'Optima',
            fontSize: '40px',
            backgroundColor: '#37a7ff',
            color: '#3355ff',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 0
        }
        
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'Super Mega Blasteroids 9', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2, 'By Brandon Apuntar', menuConfig).setOrigin(0.5)
        menuConfig.backgroundColor = '#37a7ff'
        menuConfig.color = '#3355ff'
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press < to start', menuConfig).setOrigin(0.5)
        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)

    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start('playScene')
            
        }

    }

}