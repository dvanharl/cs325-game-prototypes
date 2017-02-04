
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
    this.bouncy = null;
	this.crshr = null;
	this.canFire = true;
	this.background = null;
	this.timer = null;
	this.timeOver = null;
	this.score = 0;
};

BasicGame.Game.prototype = {

    create: function () {
		 // Create cursor sprite
		this.background = this.game.add.sprite(0,0,'titlePage');
		this.crshr = this.game.add.sprite(400, 300, 'cursor');
        // Anchor cursor to centor
        this.crshr.anchor.setTo( 0.5, 0.5 );
        this.crshr.animations.add('fire');
		
		timer = this.time.create(false);
		timeOver = timer.add(Phaser.Timer.MINUTE*2,this.endTimer, this);
		timer.start();
    },

    update: function () {
		//Maintain cursor position on mouse
		this.crshr.x = this.input.mousePointer.x;
		this.crshr.y = this.input.mousePointer.y;
		//If mouse is clicked, play cursor animation to display firing
		if(this.input.mousePointer.isDown && this.canFire){
			this.canFire = false;
			this.crshr.animations.play('fire', 60, false);
		}else if(this.input.mousePointer.isUp){
			this.canFire = true;
		}
        
    },
	
	render: function () {
		this.game.debug.text('Distance to impact: ' + timer.duration.toFixed(0) + 'km', 32, 32);
	},
		
    quitGame: function (pointer) {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        this.state.start('MainMenu');

    }

};
