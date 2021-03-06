window.addEventListener("keydown", function(e){
	if([32,37,38,39,40].indexOf(e.keyCode) > -1) {
		e.preventDefault();
	}
},false);

BasicGame.Stage2 = function (game) {

    //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;      //  a reference to the currently running game (Phaser.Game)
    this.add;       //  used to add sprites, text, groups, etc (Phaser.GameObjectFactory)
    this.camera;    //  a reference to the game camera (Phaser.Camera)
    this.cache;     //  the game cache (Phaser.Cache)
    this.input;     //  the global input manager. You can access this.input.keyboard, this.input.mouse, as well from it. (Phaser.Input)
    this.load;      //  for preloading assets (Phaser.Loader)
    this.math;      //  lots of useful common math operations (Phaser.Math)
    this.sound;     //  the sound manager - add a sound, play one, set-up markers, etc (Phaser.SoundManager)
    this.stage;     //  the game stage (Phaser.Stage)
    this.time;      //  the clock (Phaser.Time)
    this.tweens;    //  the tween manager (Phaser.TweenManager)
    this.state;     //  the state manager (Phaser.StateManager)
    this.world;     //  the game world (Phaser.World)
    this.particles; //  the particle manager (Phaser.Particles)
    this.physics;   //  the physics manager (Phaser.Physics)
    this.rnd;       //  the repeatable random number generator (Phaser.RandomDataGenerator)

	this.player = null;
	this.xSpeed = 0;
	this.ySpeed = 0;
	this.pHealth = 0;
	this.canMove = true;
	
	this.map = null;
	this.floor = null;
	this.wall = null;
	this.pit = null;
	this.finish = null;
	
	this.arrows = null;
	this.color = 0;
	this.canColor = true;
	
	this.music = null;
	this.change = null;
};

BasicGame.Stage2.prototype = {
    create: function () {
		this.music = this.add.audio('stage2');
		this.music.play();
		
		this.change = this.add.audio('changecolor');
		
		this.physics.startSystem(Phaser.Physics.P2JS);
		this.physics.p2.defaultRestitution = 0.0;
		
		//Set up map
		this.map = this.add.tilemap('stage2');
		this.map.addTilesetImage('floortile', 'tiles');
		this.floor = this.map.createLayer('Floor');
		this.wall = this.map.createLayer('Walls');
		this.pit = this.map.createLayer('Pit');
		this.finish = this.map.createLayer('Finish');
		this.map.setCollisionBetween(1, 300, true, 'Walls');
		this.map.setCollisionBetween(1, 200, false, 'Floor');
		this.physics.p2.convertTilemap(this.map, this.wall);
		
		
		//Set up Player
		this.player = this.add.sprite(60, 300, 'player');
		this.player.anchor.setTo(.5,.5);
		this.physics.p2.enable(this.player);
		this.player.body.setZeroDamping();
		this.player.body.fixedRotation = true;
		
		this.camera.follow(this.player);
		
		this.pHealth = 3;
		
		this.arrows = this.input.keyboard.createCursorKeys();
		
		this.map.replace(3,5,0,0,20,15,'Floor');
		
    },

    update: function () {
		//MOVEMENT
		this.player.body.setZeroVelocity();
        this.updateMove();
		this.tileCheck();
		this.updateColor();
    },
	
	render: function() {
		this.game.debug.text('Lives: ' + this.pHealth, 32, 32);
	},
	
	updateMove: function () {
		//Left/Right
		if(this.arrows.left.isDown){
			this.player.body.moveLeft(200);
		}else if(this.arrows.right.isDown){
			this.player.body.moveRight(200);
		}
		//Up/Down
		if(this.arrows.up.isDown){
			this.player.body.moveUp(200);
		}else if(this.arrows.down.isDown){
			this.player.body.moveDown(200);
		}
	},
	
	updateColor: function () {
		if(this.input.keyboard.isDown(Phaser.Keyboard.Z) && this.canColor){
			this.change.play();
			this.canColor = false;
			this.color += 1;
			if(this.color % 3 == 0){//Yellow to Red
				this.map.replace(5,2,0,0,20,15,'Floor');
				this.map.replace(3,5,0,0,20,15,'Floor');
			}else if(this.color % 3 == 1){//Red to Blue
				this.map.replace(5,3,0,0,20,15,'Floor');
				this.map.replace(1,5,0,0,20,15,'Floor');
			}else{//Blue to Yellow
				this.map.replace(5,1,0,0,20,15,'Floor');
				this.map.replace(2,5,0,0,20,15,'Floor');
			}
			this.time.events.add(1000,function() {
				this.canColor = true;
			},this);
		}
	},
	
	tileCheck: function () {
		//Finsh Check
		if(this.player.x - 12 > 720 && this.player.x + 12 < 760 && this.player.y - 12 > 480 && this.player.y + 12 < 520){
			this.nextStage();
		}
		//If in pit, restart and subtract life
		this.tileType = this.map.getTileWorldXY(this.player.x,this.player.y, 40,40, 'Pit', true).index;
		if(this.tileType == 5){
			this.pHealth -= 1;
			this.respawn();
		}
	},
	
	respawn: function () {
		this.player.destroy();
		this.player = this.add.sprite(60, 300, 'player');
		this.player.anchor.setTo(.5,.5);
		this.physics.p2.enable(this.player);
		this.player.body.setZeroDamping();
		this.player.body.fixedRotation = true;
	},
	
	nextStage: function(){
		this.music.stop();
		this.pHealth = 3;
		this.state.start('MainMenu');
	}
};
