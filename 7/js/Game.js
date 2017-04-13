
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
	
	this.noteriety = 0;
	this.police = null;
	this.crowdL = null;
	this.crowdR = null;
	
	this.background = null;
	this.timeE = 0;
	this.spawning = false;
	this.mult = 0;
	this.guy = null;
};

BasicGame.Game.prototype = {

    create: function () {
		//Audio
		this.siren = this.add.audio('siren');
		this.clunk = this.add.audio('clunk');
		
		//Spawn Background
		this.background = this.add.sprite(400,300,'background');
		this.background.anchor.setTo(.5,.5);
		
		//Spawn Player and basic player mechs
		this.player = this.add.sprite(400,400,'player');
		this.player.anchor.setTo(.5,.5);
		this.score = 0;
		this.hiding = false;
		this.noteriety = 0;
		this.mult = 1
		//this.notBar = this.add.sprite(20,20,'bar);
		//this.notBar.cropEnabled = true;
		//this.notBar.width = (this.noteriety/1000) * this.notBar.width;
		
		//Player Animation Manager
		this.player.animations.add('idle',[2], 1.5, true, true);
		this.player.animations.add('grabbing',[0,1],1.5,true, true);
		
		//Make cop group
		this.police = this.add.group();
		
		this.time.events.loop(17000,function() {
			this.police.create(1400,400,'police');
			this.siren.fadeIn(1500);
		},this);
		
		//Make crowd group
		this.crowdL = this.add.group();
		this.crowdR = this.add.group();
		
		this.time.events.loop(this.rnd.integerInRange(1000,5500),function() {
			if(this.rnd.integerInRange(0,1) == 0){
				this.guy = this.crowdL.create(1000,525,'crowd');
				this.guy.anchor.setTo(.5,.5);
				
			}else{
				this.guy = this.crowdR.create(-200,525,'crowd');
				this.guy.anchor.setTo(.5,.5);
			}
		},this);
    },

    update: function () {
		//Grabbing
		if(this.input.keyboard.isDown(Phaser.Keyboard.Z)){
			this.hiding = false;
			this.mult = 1;
			this.player.animations.play('grabbing');
			this.score += 1;
			if(this.score >= 10000){
				this.resetGame();
			}
		}else if(this.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
			this.mult = .25;
			this.hiding = false;
			this.player.x -= 4;
		}else if(this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
			this.mult = .25;
			this.hiding = false;
			this.player.x += 4;
		}else{
			this.mult = 0;
			if(this.hiding == false){
				this.hiding = true;
				this.clunk.play();
			}
			this.player.animations.play('idle');
		}
		
		//Move any police
		for(var i = this.police.children.length - 1; i >= 0 ; i--){
			this.police.children[i].x -= 10;
			if((this.police.children[i].x > this.player.x - 50) && (this.police.children[i].x < this.player.x + 50) && (!this.hiding)){
				this.resetGame();
			}
			if(this.police.children[i].x <= -400){
				this.siren.fadeOut(1500);
				this.police.remove(this.police.children[i], true);
			}
		}
		
		//Update Crowds
		for(var i = this.crowdL.children.length - 1; i >= 0 ; i--){
			this.crowdL.children[i].x -= 4;
			if((this.crowdL.children[i].x > this.player.x - 50) && (this.crowdL.children[i].x < this.player.x + 50) && (!this.hiding)){
				this.noteriety += (20 * this.mult);
				if (this.noteriety >= 1000){
					this.resetGame();
				}
				this.crowdL.remove(this.crowdL.children[i], true);
			}
			if(this.crowdL.children[i].x <= -400){
				this.crowdL.remove(this.crowdL.children[i], true);
			}
		}
		
		for(var i = this.crowdR.children.length - 1; i >= 0 ; i--){
			this.crowdR.children[i].x += 4;
			if((this.crowdR.children[i].x > this.player.x - 50) && (this.crowdR.children[i].x < this.player.x + 50) && (!this.hiding)){
				this.noteriety += (20 * this.mult);
				if (this.noteriety >= 1000){
					this.resetGame();
				}
				this.crowdR.remove(this.crowdR.children[i], true);
			}
			if(this.crowdR.children[i].x <= -400){
				this.crowdR.remove(this.crowdR.children[i], true);
			}
		}
		
		if(this.noteriety > 0){
			this.noteriety -= 1;
		}
    },
	
	render: function() {
		this.game.debug.text("Brains Needed: " + (10000 - this.score), 32, 32);
		this.game.debug.text("Noteriety: " + this.noteriety + "/1000",32,64);
	},
	
	
	
    resetGame: function () {
		this.score = 0;
		this.noteriety = 0;
		this.siren.stop();
		this.clunk.stop();
        this.state.start('MainMenu');
    }

};
