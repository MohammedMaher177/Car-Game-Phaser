class Enemy extends Phaser.GameObjects.Sprite
{ 
	constructor({ scene, x, y }) 
	{ 
		super(scene, x, y); // pass the key of the image or sprite sheet
        this.scene = scene;
        this.x = x;
		this.y = y;
		this.z = 0;
		this.w = (50);
		// this.staticAi = scene.sprites[ENEMY];
        this.scene.add.existing(this); // add the enemy to the scene
		this.aiColliders = []; 


        this.scene.physics.add.existing(this); // enable physics for the enemy 
        // add more properties and methods here
        this.screen = {x:0, y:0, w:0, h:0};
	}

	create() {
		this.add.text(20, 20, "Loading game...");
		this.scene.start("playGame");
	}

    init(){		
		// set the player screen size
		this.screen.w = this.w;
		this.screen.h = this.y;
				
		// set the player screen position
		this.screen.x = SCREEN_CX// - this.screen.w *5;
		this.screen.y = SCREEN_H - this.screen.h/2;
	}

	update(time, delta) 
	{ 
		if (this.aiColliders.length)
		{
			 // we don't need the update function anymore this.update = () => {}; return; 
		} 
		this.staticAi.forEach((aiStrategy) => {
			if (aiStrategy === Enemy) 
			 { // first check if the enemy is on a platform 
				if (this.touchingDownObject?.layer?.tilemapLayer) 
				{ // then calculate the colliders that will make the enemy change direction 
                    const colliders = staticPlatformWalkingBehavior(this, this.touchingDownObject.layer.tilemapLayer); 
					// TODO concat array 
					colliders.forEach((collider) => this.aiColliders.push(collider));
				} 
			} 
		}); 
	}

    restart()
    {
        this.x = 50;
		this.y = 50;
    }
} 

// console.log(this);