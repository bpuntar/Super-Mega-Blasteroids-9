class Load extends Phaser.Scene {
    constructor() {
        super('loadScene')
    }

    preload() {
        this.load.path = './assets/';
        this.load.image('starfield', 'starfield.png')
    }

    create() {
        this.scene.start('menuScene')
    }
}
