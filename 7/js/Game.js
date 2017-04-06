
BasicGame.Game = function (game) {

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
	this.score = 0;
	this.hiding = false;
	
	this.noteriety = null;
	this.police = null;
	
	this.background = null;
	this.timeE = 0;
	this.spawning = false;
};

BasicGame.Game.prototype = {

    create: function () {
		//Audio
		this.siren = this.add.audio('siren');
		this.clunk = this.add.audio('clunk');
		
		//Spawn Background
		this.background = this.add.sprite(400,300,'background');
		this.background.anchor.setTo(.5,.5);
		
		//Make cop and make invisible
		this.police = this.add.sprite(1200,400,'police');
		this.police.anchor.setTo(.5,.5);
		this.police.kill();
		this.timeE = 0;
		this.spawning = false;
		
		//Spawn Player and basic player mechs
		this.player = this.add.sprite(400,400,'player');
		this.player.anchor.setTo(.5,.5);
		this.score = 0;
		this.hiding = false;
		
		
		//Player Animation Manager
		this.player.animations.add('idle',[0,1], 1.5, true, true);
		this.player.animations.add('hiding',[2],1.5,true, true);
    },

    update: function () {
		//Hiding
		if(this.input.keyboard.isDown(Phaser.Keyboard.Z)){
			if(this.hiding == false){
				this.hiding = true;
				this.clunk.play();
			}
			this.player.animations.play('hiding');
		}else{
			this.hiding = false;
			this.player.animations.play('idle');
			//Increase score
			this.score += 1;
		}
		
		//SPAWN ENEMIES
		if(this.police.alive && !this.spawning){
			this.police.x -= 25;
			if (this.police.x > 200 && this.police.x < 600 && !this.hiding){
				this.resetGame();
			}
			if (this.police.x <= -200){
				this.spawning = false;
				this.police.kill();
				this.siren.stop()
			}
		}else{
			this.spawning = true;
			this.timeE = this.rnd.integerInRange(1000,4000)
			this.time.events.add(this.timeE,function() {
				this.spawnCop()
			},this);
		}
    },
	
	render: function() {
		this.game.debug.text("Brains: " + this.score, 32, 32);
	},
	
	spawnCop: function() {
		this.siren.fadeIn(1500);
		this.police.x = 1200;
		this.police.revive();
	},
	
    resetGame: function () {
		this.score = 0;
		this.police.kill();
		this.siren.stop();
		this.clunk.stop();
        this.state.start('MainMenu');

    }

};
