class Load extends Phaser.Scene {
    constructor() {
        super('loadScene')
    }

    preload() {
        //sprites
        this.load.path = './assets/';
        this.load.image('starfield', 'starfield.png')
        this.load.image('ship', 'ship.png')
        this.load.image('missile', 'missile.png')
        this.load.image('asteroid', 'asteroid.png')
        this.load.image('alien', 'alien.png')
        this.load.image('big_alien', 'bigalien.png')
        this.load.image('lives', 'lives.png')
        this.load.atlas('spaceship_atlas', 'spaceship.png', 'spaceship.json' )
        this.load.atlas('asteroid_atlas', 'broken.png', 'asteroid.json')

        //audio
        this.load.audio('laser', 'laser.wav')
        this.load.audio('explosion', 'explosion.wav')
        this.load.audio('fly', 'fly.wav')

    }

    create() {

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNames('spaceship_atlas', {
                prefix: 'spaceship',
                suffix: '.png',
                start: 0,
                end: 0,
            }),
            frameRate: 30,
            repeat: -1
        })

        this.anims.create({
            key: 'woosh',
            frames: this.anims.generateFrameNames('spaceship_atlas', {
                prefix: 'spaceship',
                suffix: '.png',
                start: 1,
                end: 4,
            }),
            frameRate: 30,
            repeat: -1
        })

        //asteroid anims
        this.anims.create({
            key: 'broken',
            frames: this.anims.generateFrameNames('asteroid_atlas', {
                prefix: 'asteroid',
                suffix: '.png',
                start: 0,
                end: 5,
            }),
            frameRate: 30,
            repeat: 0
        })

        this.scene.start('menuScene')


    }
}
