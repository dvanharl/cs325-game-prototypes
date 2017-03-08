window.addEventListener("keydown", function(e){
	if([32,37,38,39,40].indexOf(e.keyCode) > -1) {
		e.preventDefault();
	}
},false);

BasicGame.Game = function (game) {

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
};

BasicGame.Game.prototype = {
    create: function () {
		this.physics.startSystem(Phaser.Physics.P2JS);
		
		//Set up map
		this.map = this.add.tilemap('stage1');
		this.map.addTilesetImage('floortile', 'tiles');
		this.floor = this.map.createLayer('Floor');
		this.wall = this.map.createLayer('Walls');
		this.map.setCollisionBetween(1, 300, true, 'Walls');
		this.map.setCollisionBetween(1, 200, false, 'Floor');
		this.physics.p2.convertTilemap(this.map, this.wall);
		
		
		//Set up Player
		this.player = this.add.sprite(400, 300, 'player');
		this.player.anchor.setTo(.5,.5);
		this.physics.p2.enable(this.player);
		
		this.camera.follow(this.player);
		
		this.pHealth = 3;
		
		//Set up Enemies
		
    },

    update: function () {
		//MOVEMENT
        this.updateMove();
    },
	
	render: function() {
		//this.debug.text('Lives: ' + this.pHealth);
	},
	
	updateMove: function () {
		//Left
		if(this.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
			this.player.x += -2;
		//Right
		}else if(this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
			this.player.x += 2;
		//Up
		}
		if(this.input.keyboard.isDown(Phaser.Keyboard.UP)){
			this.player.y += -2;
		//Down
		}else if(this.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
			this.player.y += 2;
		}
	}
};
