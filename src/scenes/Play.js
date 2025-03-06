class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    init() {

        // define variables
        this.ANG_VELOCITY = 400    // degrees/second
        this.MAX_VELOCITY = 2200    // pixels/second
        this.ACCELERATION = 200
        this.DRAG = 0.02
        this.MISSILE_SPEED = 1000
        this.DAMP = 0.1

        // asteroid speed frequency settings
        this.asteroidSpeed = 150;   
        this.asteroidFrequency = 100;  
        this.physics.world.gravity.y = 0
    }

    create() {
        
        // scrolling background
        this.starfield = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'starfield').setOrigin(0)

        // world bounds
        this.physics.world.setBounds(0, 0, game.config.width, game.config.height)

        // set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys()

        //create player ship
        this.ship = this.physics.add.sprite(game.config.width/2, game.config.height/2, 'ship').setOrigin(0.5)

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

        // asteroid creation
        this.asteroids = this.physics.add.group({
            defaultKey: 'asteroid',
        });

        this.createAsteroid()

        //collision
        this.physics.add.collider(this.missiles, this.asteroids, this.hitAsteroid, null, this);

        // asteroid interval
        this.time.addEvent({
            delay: this.asteroidFrequency,
            callback: this.createAsteroid,
            callbackScope: this,
            loop: true  
        });

    }

    createAsteroid() {
        //asteroid spawn location at top of screen
        let x = Phaser.Math.Between(0, game.config.width);
        let y = -50; 
    
        let asteroid = this.asteroids.get(x, y);
    
        if (asteroid) {
            //asteroid settings
            asteroid.setActive(true).setVisible(true)
            asteroid.setPosition(x, y)
            asteroid.body.setGravityY(0)
            asteroid.setVelocityY(this.asteroidSpeed)
            asteroid.setCollideWorldBounds(false) 
        }
    
    }
    

    hitAsteroid(missile, asteroid) {
        missile.setActive(false);
        missile.setVisible(false);
        missile.body.reset(0, 0);

        asteroid.setActive(false);
        asteroid.setVisible(false);
        asteroid.body.reset(0, 0);
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
        this.starfield.tilePositionY -=3

        // movement for player ship
        if(cursors.up.isDown) {
            this.physics.velocityFromRotation(this.ship.rotation-Math.PI/2, 400, this.ship.body.acceleration)
        } else {
            this.ship.setAcceleration(0)
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
            this.fireMissile();
        }

        // asteroid velocity update
        this.asteroids.getChildren().forEach((asteroid) => {
            if (asteroid.active) {
                asteroid.setVelocityY(this.asteroidSpeed);
                
            }
        });


    }

}