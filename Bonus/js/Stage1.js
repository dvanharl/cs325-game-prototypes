window.addEventListener("keydown", function(e){
	if([32,37,38,39,40].indexOf(e.keyCode) > -1) {
		e.preventDefault();
	}
},false);

BasicGame.Stage1 = function (game) {

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

	this.canMove = null;
	this.whiteScreen = null;
	this.whiteTween = null;
	this.arrows = null;
	this.map = null;
	this.floor = null;
	this.wall = null;
	this.caught = null;
	
	this.bro1 = null;
	this.bro2 = null;
};

BasicGame.Stage1.prototype = {

    create: function () {
		this.canMove = true;
		
		this.music = this.add.audio('stage1');
		this.music.play();
		
		this.caught = this.add.audio('caught');
		
		this.physics.startSystem(Phaser.Physics.P2JS);
		this.physics.p2.defaultRestitution = 0.0;
		
		//MAP
		this.map = this.add.tilemap('stage1');
		this.map.addTilesetImage('tilemap', 'tiles');
		this.floor = this.map.createLayer('Floor');
		this.wall = this.map.createLayer('Buildings');
		this.map.setCollisionBetween(1, 300, true, 'Buildings');
		this.map.setCollisionBetween(1, 200, false, 'Floor');
		this.physics.p2.convertTilemap(this.map, this.wall);
		
		//BRO1
		this.bro1 = this.add.sprite(420, 540, 'bro1');
		this.bro1.anchor.setTo(.5,.5);
		this.physics.p2.enable(this.bro1);
		this.bro1.body.setZeroDamping();
		this.bro1.body.fixedRotation = true;
		
		this.whiteScreen = this.add.sprite(0,0,'whiteScreen');
		this.arrows = this.input.keyboard.createCursorKeys();
    },

    update: function () {
		if(this.canMove){
			this.updateMove();
		}
    },
	
	//HELPER FUNCTIONS
	cutscene: function () {
		this.canMove = false;
	},
	
	updateMove: function() {
		//Left/Right
		if(this.arrows.left.isDown){
			this.bro1.body.moveLeft(200);
		}else if(this.arrows.right.isDown){
			this.bro1.body.moveRight(200);
		}
		//Up/Down
		if(this.arrows.up.isDown){
			this.bro1.body.moveUp(200);
		}else if(this.arrows.down.isDown){
			this.bro1.body.moveDown(200);
		}
	},
	
	retry: function () {
		this.lives = 3;
		this.resetField();
	},
	
	resetField: function () {
		this.canMove = false;
		
		//Replace Actors
		
		//Fade in return
		this.whiteScreen.alpha = 1;
		this.whiteTween = this.add.tween(this.whiteScreen).to({alpha:0}, 1000, Phaser.Easing.Linear.None, true, 0,0,false);
		this.time.events.add(1000, function() {
			this.canMove = true;
		},this);
	}

};
