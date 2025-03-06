class Load extends Phaser.Scene {
    constructor() {
        super('loadScene')
    }

    preload() {
        this.load.path = './assets/';
        this.load.image('starfield', 'starfield.png')
        this.load.image('ship', 'ship.png')
        this.load.image('missile', 'missile.png')
        this.load.image('asteroid', 'asteroid.png')
    }

    create() {
        this.scene.start('menuScene')
    }
}
