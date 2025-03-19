class Win extends Phaser.Scene {
    constructor() {
        super('winScene')
    }

    init(data) {
        this.score = data.score; 
    }

    create() {

        this.cameras.main.setBackgroundColor('#000000');


        const winText = this.add.bitmapText(game.config.width / 2, game.config.height / 4, 'p2p', 'YOU WIN!', 30).setOrigin(0.5).setScale(2);
        winText.setTint(0xFF0000) 

        const scoreText = this.add.bitmapText(game.config.width / 2, game.config.height / 2, 'p2p', `Score: ${this.score}`, 20).setOrigin(0.5).setScale(2);
        scoreText.setTint(0xFFFFFF) 

        const restartText = this.add.bitmapText(game.config.width / 2, game.config.height * 0.75, 'p2p', 'Press R to Restart', 20).setOrigin(0.5).setScale(2);
        restartText.setTint(0xFFFFFF) 


        this.input.keyboard.on('keydown-R', () => {
            this.scene.start('playScene');
        });
    }
}

