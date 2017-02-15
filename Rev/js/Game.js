
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
	this.score = null;
	this.xspeed = 0;
	this.yspeed = 0;
};

BasicGame.Game.prototype = {

    create: function () {
		this.worldMap = this.add.sprite(0,0,"worldMap");
		this.world.setBounds(0,0,2000,600);
		
		this.player = this.add.sprite(1000,220, "player");
		this.player.anchor.setTo(.5,.5);
		this.camera.follow(this.player);
		
		
    },

    update: function () {
		//Movement
        if(this.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
			this.player.scale.setTo(-1);
			if(this.xspeed > -6){
				this.xspeed -= .5;
			}else{
				this.xspeed = -6;
			}
		}else if(this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
			this.player.scale.setTo(1);
			if(this.xspeed < 6){
				this.xspeed += .5;
			}else{
				this.xspeed = 6;
			}
		}else{
			this.xspeed = 0;
		}
		
		//Shooting
		if(this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			
		}
		this.player.x += this.xspeed;
    },

};
