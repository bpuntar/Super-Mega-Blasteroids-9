class GameOver extends Phaser.Scene {
    constructor() {
        super('gameoverScene');
    }

    init(data) {
        this.score = data.score; 
    }

    create() {

        this.cameras.main.setBackgroundColor('#000000'); 


        const gameOverText = this.add.text(game.config.width / 2, game.config.height / 4, 'GAME OVER', {
            fontSize: '128px',
            font: 'Optima',
            fill: '#FF0000'
        }).setOrigin(0.5, 0.5).setScale(3)


        const scoreText = this.add.text(game.config.width / 2, game.config.height / 2, `Score: ${this.score}`, {
            fontSize: '32px',
            font: 'Optima',
            fill: '#FFFFFF'
        }).setOrigin(0.5, 0.5).setScale(3)


        const restartText = this.add.text(game.config.width / 2, game.config.height * 0.75, 'Press R to Restart', {
            fontSize: '32px',
            font: 'Optima',
            fill: '#FFFFFF'
        }).setOrigin(0.5, 0.5).setScale(3)


        this.input.keyboard.on('keydown-R', () => {
            this.scene.start('playScene');  
        });
    }
}
