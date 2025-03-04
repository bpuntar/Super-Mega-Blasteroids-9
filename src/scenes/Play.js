class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    init() {

    }

    create() {

        // scrolling background
        this.starfield = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'starfield').setOrigin(0)

    }

    update() {
        // scrolling background speed
        this.starfield.tilePositionY -=3
    }

}