
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

    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.
    
    // Create your own variables.
	this.background = null;
	this.whiteScreen = null;
	this.hurt = null;
	
	this.crshr = null;
	this.meteor = null;
	this.enemy = null;
	
	this.canFire = true;
	
	this.timer = null;
	
	this.score = 0;
	this.lastScore = 0;
	this.health = 3;
	this.meteorHP = 100;
	
	this.shootSound = null
	this.won = false;
	
	this.music = null;
};

BasicGame.Game.prototype = {
    create: function () {
		//Audio
		this.music = this.add.audio('game');
		this.music.play();
		this.shootSound = this.add.audio('shootSound');
		
		//Background
		this.background = this.add.sprite(0,0,'map');
		
		this.hurt = this.add.sprite(0,0,'hurt');
		this.hurt.alpha = 0;
		
		//Add Meteor
		this.meteor = this.add.sprite(400,100,'meteor');
		this.meteor.anchor.setTo(0.5,0.5);
		this.meteor.inputEnabled = true;
		this.meteor.events.onInputDown.add(this.meteorHit,this);
		
		// Create cursor sprite, anchor to center position, then add animation
		this.crshr = this.add.sprite(400, 300, 'cursor');
        this.crshr.anchor.setTo( 0.5, 0.5 );
        this.crshr.animations.add('fire');
		
		//White Fading Background
		this.whiteScreen = this.add.sprite(0,0,'whiteScreen');
		this.add.tween(this.whiteScreen).to({alpha:0}, 400, Phaser.Easing.Linear.None, true, 0,0,false);
		
        
		
		//Create Timer
		this.timer = this.time.events.add(Phaser.Timer.SECOND * 60, this.lose, this);
		
    },

    update: function () {
		//Maintain cursor position on mouse
		this.crshr.x = this.input.mousePointer.x;
		this.crshr.y = this.input.mousePointer.y;
		//If mouse is clicked, play cursor animation to display firing
		if(this.input.mousePointer.isDown && this.canFire){
			this.shootSound.play();
			this.canFire = false;
			this.crshr.animations.play('fire', 90, false);
		}else if(this.input.mousePointer.isUp){
			this.canFire = true;
		}
    },
	
	render: function(){
		this.game.debug.text("Health: " + this.health, 32, 32);
		this.game.debug.text("Score: " + this.score, 32, 48);
		this.game.debug.text("Time Remaining: " + this.time.events.duration,32,80);
		this.game.debug.text("Meteor HP: " + this.meteorHP,32,96);
	},
	
	meteorHit: function(){
		this.meteorHP = this.meteorHP - 1;
		this.score = this.score + 500;
		if(this.meteorHP == 0){
			this.win();
		}
	},
	
	enemyKill: function() {
	},
		
	damage: function() {
		this.hurt.alpha = 0.7;
		this.health = this.health - 1;
		if(this.health == 0){
			this.lose();
		}
		this.add.tween(this.hurt).to({alpha:0}, 500, Phaser.Easing.Linear.None, true, 0,0,false);
	},
	
	win: function() {
		this.won = true;
		this.gameOver();
	},
	
	lose: function(){
		this.won = false;
		this.gameOver();
	},
		
	gameOver: function() {
		this.meteorHP = 100;
		this.health = 3;
		this.lastScore = this.score;
		this.score = 0;
		this.music.stop();
		this.state.start('GameOver',true,false,this.lastScore,this.won);
	}
};
