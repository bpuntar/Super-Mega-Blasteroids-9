class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    init() {

        // define variables
        this.ANG_VELOCITY = 300    // degrees/second
        this.MAX_VELOCITY = 1500    // pixels/second
        this.ACCELERATION = 200
        this.DRAG = 0.02
        this.MISSILE_SPEED = 1000
        this.DAMP = 0.1

        // asteroid speed frequency settings
        this.asteroidSpeed = 125;   
        this.asteroidFrequency = 300;  
        this.physics.world.gravity.y = 0

        //score
        this.score = 0

        //ship lives
        this.lives = 3

    }

    create() {
        // scrolling background
        this.starfield = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'starfield').setOrigin(0)

        //score text
        this.scoreText = this.add.text(20, 20, 'score: 0'), {
            fontSize: '32px',
            font: 'arcade',
            fill: '#ffffff'
        }

        //lives sprite
        this.livesGroup = this.add.group({
            defaultKey: 'lives'
        })
        for (let i = 0; i < this.lives; i++) {
            const life = this.livesGroup.create(game.config.width - 40 - (i * 40), 20, 'lives').setOrigin(0.5, 0);
            life.setScale(1); // Adjust size of the life image
        }

        // world bounds
        this.physics.world.setBounds(0, 0, game.config.width, game.config.height)

        // set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys()

        //create player ship
        this.ship = this.physics.add.sprite(game.config.width/2, game.config.height * 0.8, 'spaceship_atlas').setOrigin(0.5)

        // ship settings
        this.ship.setMaxVelocity(this.MAX_VELOCITY)
        this.ship.setDamping(this.DAMP)
        this.ship.setDrag(this.DRAG)
        this.ship.setCollideWorldBounds(true)

        // missiles
        cursors = this.input.keyboard.createCursorKeys();
        this.shootKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        this.missiles = this.physics.add.group({
            defaultKey: 'missile',

        });

        //alien creation
        this.aliens = this.physics.add.group({
            defaultKey: 'alien',
        })

        //big alien
        this.bigAliens = this.physics.add.group({
            defaultKey: 'big_alien',
            maxSize: 1
        }) 

        // asteroid creation
        this.asteroids = this.physics.add.group({
            defaultKey: 'asteroid',
        });

        this.createAsteroid()

        //collision
        this.physics.add.collider(this.missiles, this.asteroids, this.hitAsteroid, null, this)
        this.physics.add.collider(this.ship, this.asteroids, this.hitPlayer, null, this)

        // asteroid interval
        this.time.addEvent({
            delay: this.asteroidFrequency,
            callback: this.createAsteroid,
            callbackScope: this,
            loop: true  
        });

        //sound timers
        this.flySoundTimer = this.time.addEvent({
            delay: 400, 
            callback: () => {
                if (cursors.up.isDown) {
                    this.sound.play('fly', { volume: 0.1 });
                }
            },
            callbackScope: this,
            loop: true 
        });
    }

    createAsteroid() {
        //asteroid spawn location at top of screen
        let x = Phaser.Math.Between(0, game.config.width);
        let y = -50; 
    
        const asteroid = this.asteroids.get(x, y);
    
        if (asteroid) {
            //asteroid settings
            asteroid.setActive(true).setVisible(true)
            asteroid.setScale(1.3)
            asteroid.setPosition(x, y)
            asteroid.body.setGravityY(0)
            asteroid.setVelocityY(this.asteroidSpeed)
            asteroid.setCollideWorldBounds(false) 
        }
    
    }

    createAlien(x, y) {

        const alien = this.aliens.get(x, y)

        if (alien) {
            alien.setActive(true).setVisible(true)
            alien.setPosition(x,y)
            alien.setScale(1)
            

            const fleeAngle = Phaser.Math.Between(0, 360)
            const fleeSpeed = 200
            
            this.physics.velocityFromAngle(fleeAngle, fleeSpeed, alien.body.velocity)
            alien.body.setCollideWorldBounds(false);

            this.time.delayedCall(3000, () => {
                alien.setActive(false).setVisible(false)
                alien.body.reset(-500,-500)
            })
        }


    }

    hitAsteroid(missile, asteroid) {
        missile.setActive(false)
        missile.setVisible(false)
        missile.body.reset(0, 0)

        this.createAlien(asteroid.x, asteroid.y)
        this.sound.play('explosion')

        asteroid.setActive(false)
        asteroid.setVisible(false)


        asteroid.setActive(false)
        asteroid.setVisible(false)
        asteroid.body.reset(-500, -500)

        //increment score
        this.score += 10
        this.scoreText.setText('score: ' + this.score)

    }

    hitPlayer(ship, asteroid) {
        this.sound.play('explosion')
    
        asteroid.setActive(false)
        asteroid.setVisible(false)
        asteroid.body.reset(-500, -500)
    
        ship.setPosition(game.config.width / 2, game.config.height / 2);
        ship.setVelocity(0, 0);
        ship.setAngularVelocity(0);
    
        // lives
        this.lives -= 1

        if (this.livesGroup.getChildren().length > this.lives) {
            const lastLife = this.livesGroup.getChildren()[this.lives];
            if (lastLife) {
                lastLife.setActive(false).setVisible(false);
            }
        }

        if (this.lives <= 0) {
            this.scene.start('gameoverScene', { score: this.score })
        }
    

    }


    fireMissile() {
        let missile = this.missiles.get(this.ship.x, this.ship.y); 

        if (missile) {
            missile.setActive(true).setVisible(true);
            missile.setRotation(this.ship.rotation);
            
            // missile position
            let angle = this.ship.rotation - Math.PI / 2;
            let shipHeightOffset = this.ship.height / 2; 

            missile.setPosition(
                this.ship.x + Math.cos(angle) * shipHeightOffset, 
                this.ship.y + Math.sin(angle) * shipHeightOffset
            )

            // missile velocity
            this.physics.velocityFromRotation(this.ship.rotation - Math.PI / 2, this.MISSILE_SPEED, missile.body.velocity);

            // remove missile at world bounds
            missile.setCollideWorldBounds(true);
            missile.body.onWorldBounds = true;
            missile.body.world.on('worldbounds', (body) => {
                if (body.gameObject === missile) {
                    missile.setActive(false);
                    missile.setVisible(false);
                    missile.body.reset(0, 0);
                }
            });
        }
    }


    update() {
        // scrolling background speed
        this.starfield.tilePositionY -=1

        // movement for player ship
        if(cursors.up.isDown) {
            this.physics.velocityFromRotation(this.ship.rotation-Math.PI/2, 400, this.ship.body.acceleration)
                this.ship.anims.play('woosh', true)
        } else {
            this.ship.setAcceleration(0)
            this.ship.anims.play('idle', true)
        }

        if(cursors.left.isDown) {
            this.ship.setAngularVelocity(-this.ANG_VELOCITY)
        } else if (cursors.right.isDown) {
            this.ship.setAngularVelocity(this.ANG_VELOCITY)
        } else {
            this.ship.setAngularVelocity(0)
        }

        // missile fire
        if (Phaser.Input.Keyboard.JustDown(this.shootKey)) {
            this.fireMissile()
            this.sound.play('laser')
        }

        // asteroid velocity update
        this.asteroids.getChildren().forEach((asteroid) => {
            if (asteroid.active) {
                asteroid.setVelocityY(this.asteroidSpeed);
                
            }
        })

    }   
}