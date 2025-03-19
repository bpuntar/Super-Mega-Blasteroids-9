class GameOver extends Phaser.Scene {
    constructor() {
        super('gameoverScene');
    }

    init(data) {
        this.score = data.score; 
    }

    create() {

        this.cameras.main.setBackgroundColor('#000000'); 

        // game over
        const gameOverText = this.add.bitmapText(game.config.width / 2, game.config.height / 4, 'p2p', 'GAME OVER', 25)
            .setOrigin(0.5, 0.5)
            .setScale(1)
            .setTint(0xFF0000); 

        // score
        const scoreText = this.add.bitmapText(game.config.width / 2, game.config.height / 2, 'p2p', `Score: ${this.score}`, 20)
            .setOrigin(0.5, 0.5)
            .setScale(1)
            .setTint(0xFFFFFF);  

        // restart
        const restartText = this.add.bitmapText(game.config.width / 2, game.config.height * 0.75, 'p2p', 'Press R to Restart', 20)
            .setOrigin(0.5, 0.5)
            .setScale(1)
            .setTint(0xFFFFFF); 

        this.input.keyboard.on('keydown-R', () => {
            this.scene.start('playScene');  
        });
    }
}
