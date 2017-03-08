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

	this.player = null;
	this.xSpeed = 0;
	this.ySpeed = 0;
	this.pHealth = 0;
	this.canMove = true;
	
	this.map = null;
	this.floor = null;
	this.wall = null;
	this.finish = null;
	
	this.arrows = null;
	
	this.enemy1 = null;
	this.enemy2 = null;
	
	this.turn1 = 0;
	this.turn2 = 0;
	
	this.canTurn1 = true;
	this.canTurn2 = true;
};

BasicGame.Stage1.prototype = {
    create: function () {
		this.physics.startSystem(Phaser.Physics.P2JS);
		this.physics.p2.defaultRestitution = 0.0;
		
		//Set up map
		this.map = this.add.tilemap('stage1');
		this.map.addTilesetImage('floortile', 'tiles');
		this.floor = this.map.createLayer('Floor');
		this.wall = this.map.createLayer('Walls');
		this.finish = this.map.createLayer('Finish');
		this.map.setCollisionBetween(1, 300, true, 'Walls');
		this.map.setCollisionBetween(1, 200, false, 'Floor');
		this.physics.p2.convertTilemap(this.map, this.wall);
		
		
		//Set up Player
		this.player = this.add.sprite(420, 540, 'player');
		this.player.anchor.setTo(.5,.5);
		this.physics.p2.enable(this.player);
		this.player.body.setZeroDamping();
		this.player.body.fixedRotation = true;
		
		this.camera.follow(this.player);
		
		this.pHealth = 3;
		
		this.arrows = this.input.keyboard.createCursorKeys();
		
		//Set up Enemies
		this.enemy1 = this.add.sprite(340,380, 'benemy');
		this.enemy1.anchor.setTo(.5,.5);
		this.enemy1.animations.add('side',[0,1,2,3], 1.7, true, true);
		this.enemy1.animations.add('up',[4,5,6,7], 1.7, true, true);
		this.enemy1.animations.add('down',[8,9,10,11], 1.7, true, true);
		this.enemy1.animations.play('up');
		
		this.enemy2 = this.add.sprite(460,220, 'yenemy');
		this.enemy2.anchor.setTo(.5,.5);
		this.enemy2.animations.add('side',[0,1,2,3], 2.1, true, true);
		this.enemy2.animations.add('up',[4,5,6,7], 2.1, true, true);
		this.enemy2.animations.add('down',[8,9,10,11], 2.1, true, true);
		this.enemy2.animations.play('side');
    },

    update: function () {
		//MOVEMENT
		this.player.body.setZeroVelocity();
        this.updateMove();
		
		//Check tile
		this.checkTile();
		//Enemy Movement
		this.updateEnemy();
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
	
	updateEnemy: function () {
		if(this.canTurn1){
			this.canTurn1 = false;
			this.time.events.add(1600,function() {
				this.turn1 = (this.turn1 + 1) % 4;
				if(this.turn1 == 0){
					this.enemy1.scale.x = 1;
					this.enemy1.animations.play('side');
				}else if(this.turn1 == 1){
					this.enemy1.animations.play('up');
				}else if(this.turn1 == 2){
					this.enemy1.animations.play('side');
					this.enemy1.scale.x = -1;
				}else{
					this.enemy1.animations.play('down');
				}
				this.canTurn1 = true;
			},this);
		}
		
		if(this.canTurn2){
			this.canTurn2 = false;
			this.time.events.add(1100,function() {
				this.turn2 = (this.turn2 + 1) % 4;
				if(this.turn2 == 0){
					this.enemy2.animations.play('up');
				}else if(this.turn2 == 1){
					this.enemy2.animations.play('side');
				}else if(this.turn2 == 2){
					this.enemy2.animations.play('down');
				}else{
					this.enemy2.animations.play('side');
				}
				this.canTurn2 = true;
			},this);
		}
	},
	
	checkTile: function() {
		//If at finish, move to next stage
		if(this.player.x - 12 > 360 && this.player.x + 12 < 400 && this.player.y - 12 > 40 && this.player.y + 12 < 80){
			this.nextStage();
		}
		//If caught, damage and reset
	},
	
	nextStage: function(){
		this.pHealth = 3;
		this.state.start('Stage2');
	}
};
