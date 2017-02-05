
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
	this.crshr = null;
	this.canFire = true;
	this.background = null;
	this.timer = null;
	this.timeOver = null;
	this.score = 0;
	this.health = 3;
	this.meteorHP = 350;
	this.whiteScreen = null;
	this.shootSound = null;
};

BasicGame.Game.prototype = {

    create: function () {
		//Audio
		this.add.audio('shootSound');
		
		//Background
		this.background = this.add.sprite(0,0,'map');
		this.hurt = this.add.sprite(0,0,'hurt');
		
		this.hurt.alpha = 0;
		// Create cursor sprite
		this.crshr = this.add.sprite(400, 300, 'cursor');
		
		//White Fading Background
		this.whiteScreen = this.add.sprite(0,0,'whiteScreen');
		this.add.tween(this.whiteScreen).to({alpha:0}, 400, Phaser.Easing.Linear.None, true, 0,0,false);
		
        // Anchor cursor to centor
        this.crshr.anchor.setTo( 0.5, 0.5 );
        this.crshr.animations.add('fire');
		
    },

    update: function () {
		//Maintain cursor position on mouse
		this.crshr.x = this.input.mousePointer.x;
		this.crshr.y = this.input.mousePointer.y;
		//If mouse is clicked, play cursor animation to display firing
		if(this.input.mousePointer.isDown && this.canFire){
			this.shootSound.play();
			//this.damage();
			this.canFire = false;
			this.crshr.animations.play('fire', 90, false);
		}else if(this.input.mousePointer.isUp){
			this.canFire = true;
		}
    },
	
	render: function(){
		this.game.debug.text("Health: " + this.health, 32, 32);
		this.game.debug.text("Score: " + this.score, 32, 64);
	},
		
    quitGame: function (pointer) {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        this.state.start('MainMenu');
    },
	
	meteorHit: function(){
		this.meteorHealth = this.meteorHealth - 1;
		if(this.meteorHealth == 0){
			this.meteorHealth = 350;
			this.health = 3;
		}
	},
		
	
	enemyKill: function() {
	},
		
	damage: function() {
		this.hurt.alpha = 0.7;
		this.health = this.health - 1;
		if(this.health == 0){
			this.meteorHealth = 350;
			this.health = 3;
			this.state.start('GameOver');
		}
		this.add.tween(this.hurt).to({alpha:0}, 500, Phaser.Easing.Linear.None, true, 0,0,false);
	}
};
