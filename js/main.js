/***********************************************************************************
* Pseudo-3D Racing game prototype
*
* @author		Srdjan Susnic 
* @copyright	2020 Ask For Game Task
* @website		http://www.askforgametask.com
*
/***********************************************************************************/


// ---------------------------------------------------------------------------------
// Global Constants
// ---------------------------------------------------------------------------------



// screen size
const SCREEN_W = 1477;
const SCREEN_H = 937;
let vv = 0
// coordinates of the screen center
const SCREEN_CX = SCREEN_W/2;
const SCREEN_CY = SCREEN_H/2;

// game states
const STATE_INIT = 1;
const STATE_RESTART = 2;
const STATE_PLAY = 3;
const STATE_GAMEOVER = 4;

// sprites
const PLAYER = 0;
const ENEMY = 0;

// ---------------------------------------------------------------------------------
// Global Variables
// ---------------------------------------------------------------------------------

// current state
var state = STATE_INIT;

// ---------------------------------------------------------------------------------
// Main Scene
// ---------------------------------------------------------------------------------

let isLeft = false
// const game = new Phaser.Game(config);
class MainScene extends Phaser.Scene
{
    constructor(){
		super({key: 'SceneMain'});
		this.scale44 = .1;
		this.gvx1 = 20
	}
	
	/**
	* Loads all assets.
	*/
	preload(){
		this.load.image('imgBack', 'assets/Untitled-2.jpg');
		this.load.image('imgPlayer', 'assets/car.png');
		this.load.spritesheet({
			key: 'cow',
			url: '../assets/E0.png',
			normalMap: '../assets/E0.png',
			frameConfig: {
				frameWidth: 389,
				frameHeight: 278
			}
		});
		this.load.spritesheet({
			key: 'lion',
			url: '../assets/E3.png',
			normalMap: '../assets/E3.png',
			frameConfig: {
				frameWidth: 389,
				frameHeight: 278
			}
		});	
		this.load.spritesheet({
			key: 'elephant',
			url: '../assets/E4.png',
			normalMap: '../assets/E4.png',
			frameConfig: {
				frameWidth: 389,
				frameHeight: 278
			}
		});
	}
	
	/**
	* Creates all objects.
	*/
	create(){
		// backgrounds
		this.sprBack = this.add.image(SCREEN_CX, SCREEN_CY-100, 'imgBack');
		this.sprBack.setScale(2.36	,2.21)
		// array of sprites that will be "manually" drawn on a rendering texture 
		// (that's why they must be invisible after creation)

		this.sprites = [
			this.add.image(0, 0, 'imgPlayer').setVisible(false),
		]
		// add more logic here
		console.log(imageData);
		// instances
		this.circuit = new Circuit(this);
		this.player = new Player(this);
		this.camera = new Camera(this);
		this.settings = new Settings(this);
		// listener to pause game
		this.input.on('gameobjectdown', this.destroyShip, this);
		this.physics.world.setBoundsCollision();
		
		this.input.keyboard.on('keydown-P', function(){
			this.settings.txtPause.text = "[P] Resume";
			this.scene.pause();
			this.scene.launch('ScenePause');
		}, this);

		this.input.keyboard.on('keydown', function(e){		
			// console.log(this.enemies);	
			switch(e.key){
				case 'ArrowRight':
				if(this.circuit.scene.player.x == 0){
					this.gvx1 += 100
					this.circuit.scene.player.x += 0.7
				}
				else if(this.circuit.scene.player.x < 0){
					this.gvx1 -= 40
					this.circuit.scene.player.x = 0
				}
					break;
				case 'ArrowLeft':
				if(this.circuit.scene.player.x == 0) this.circuit.scene.player.x -= 0.7
				else if(this.circuit.scene.player.x > 0) {
					this.circuit.scene.player.x = 0
				}
					break;
			}
		}, this);




		/*
		this.input.keyboard.on('keydown', function(e){	

			console.log(this.circuit.scene.player.x);
			switch(e.key){
				case 'ArrowRight':
				if(vv == 0){
					this.sprites[0].setOrigin(-0.9, 0.5)
					this.sprites[0].setRotation(-.75)
					vv += 0.7
				}
				else if(vv < 0){
					vv = 0
					this.sprites[0].setOrigin(0.5, 0.5)
					this.sprites[0].setRotation(0)
				}
					break;
				case 'ArrowLeft':
				if(vv == 0) {
					vv -= 0.7
					this.sprites[0].setOrigin(2, 0.5)
					this.sprites[0].setRotation(.75)
				}
				else if(vv > 0) {
					vv = 0
					this.sprites[0].setOrigin(0.5, 0.5)
					this.sprites[0].setRotation(0)

				}
					break;
			}
		}, this);		
		*/
		
		// this.input.keyboard.on('keydown', function(e){	

		// 	console.log(this.sprites[0]);
		// 	switch(e.key){
		// 		case 'ArrowRight':
		// 		if(vv == 0){
		// 			this.sprites[0].setOrigin(-1.5, 0.5)
		// 			// this.sprites[0].setRotation(0.3)
		// 			// this.sprites[0].setFlip(0, 5)
		// 			vv += 0.7
		// 		}
		// 		else if(vv < 0){
		// 			vv = 0
		// 			this.sprites[0].setOrigin(0.5, 0.5)
		// 			this.sprites[0].setRotation(0)
		// 		}
		// 			break;
		// 		case 'ArrowLeft':
		// 		if(vv == 0) {
		// 			vv -= 0.7
		// 			this.sprites[0].setOrigin(2, 0.5)
		// 			this.sprites[0].setRotation(.75)
		// 		}
		// 		else if(vv > 0) {
		// 			vv = 0
		// 			this.sprites[0].setOrigin(0.5, 0.5)
		// 			this.sprites[0].setRotation(0)

		// 		}
		// 			break;
		// 	}
		// }, this);
		
		// listener on resume event
		this.events.on('resume', function(){
			this.settings.show();
		}, this);

		this.enemies = [
			this.physics.add.sprite(100, 100, "cow"),
			this.physics.add.sprite(100, 100, "lion"),
			this.physics.add.sprite(100, 100, "elephant"),
		]
		// this.enemies[0].setPosition(game.config.width / 2,game.config.height/2,game.config.zoom)
		this.enemies[0].setPosition((game.config.width / 2) - this.gvx1, game.config.height/2,game.config.zoom)
		this.enemies[1].setPosition(game.config.width / 2,game.config.height/2,game.config.zoom)
		this.enemies[2].setPosition((game.config.width / 2) + this.gvx1, game.config.height/2,game.config.zoom)
	}
	



	// let x = 0;

	/**
	* Main Game Loop
	*/
	update(time, delta){

		this.scale44 += .033;
		//mohamed elsayed
		this.enemies[0].setGravityX(-260)
		this.enemies[2].setGravityX(260)

		this.enemies.forEach(element => {
			element.setScale(this.scale44)
		});		

		switch(state){
			case STATE_INIT:
				this.camera.init();
				this.player.init();
				state = STATE_RESTART;
				break;
				
			case STATE_RESTART:
				this.circuit.create();
				this.player.restart();
				state = STATE_PLAY;
				break;
				
			case STATE_PLAY:
				// duration of the time period
				var dt = Math.min(1, delta/1000);
				this.player.update(dt);
				this.camera.update();
				this.circuit.render3D();
				break;
				
			case STATE_GAMEOVER:
				break;
		}	
		
	}
	
	  destroyShip(pointer, gameObject) {
		gameObject.setTexture("explosion");
		gameObject.play("explode");
	  }
}

// ---------------------------------------------------------------------------------
// Pause Scene
// ---------------------------------------------------------------------------------

class PauseScene extends Phaser.Scene
{
    constructor(){
		super({key: 'ScenePause'});
	}
	
	create(){
		// listener to resume game
		this.input.keyboard.on('keydown-P', function(){
			this.scene.resume('SceneMain');
			this.scene.stop();
		}, this);		
	}
}

// ---------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------

// game configuration
var config = {
    type: Phaser.AUTO,
    width: SCREEN_W,
    height: SCREEN_H,
	physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200, }
        },
    },
	scale: {
        mode: Phaser.Scale.ZOOM_4X,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
	
    scene: [MainScene, PauseScene]
};
// game instance
var game = new Phaser.Game(config);
/*====================================================================================================== */
