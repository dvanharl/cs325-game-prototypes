
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
	this.meteorHP = 200;
	
	this.shootSound = null
	this.won = false;
	
	this.gameMusic = null;
	
	this.enemy = null;
	this.enemies = null;
	
	this.x = null;
	this.y = null;
};

BasicGame.Game.prototype = {
    create: function () {
		//Audio
		this.gameMusic = this.add.audio('yes');
		this.gameMusic.play();
		this.shootSound = this.add.audio('shootSound');
		this.shootSound.volume = 0.65;
		
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
		
		//Enemy
		this.numEnemy = 0;
		this.maxEnemy = 3;
		//this.enemies = this.add.group();
		for(i=0;i<10;i++){
			this.enemies.add(this.add.sprite(0,0,'cult'));
			this.enemies[i].events.onInputDown.add(enemyKill,this);
			this.enemies[i].kill();
		}
		
		//White Fading Background
		this.whiteScreen = this.add.sprite(0,0,'whiteScreen');
		this.add.tween(this.whiteScreen).to({alpha:0}, 400, Phaser.Easing.Linear.None, true, 0,0,false);
		
		//Create Timers
		this.timer = this.time.events.add(Phaser.Timer.SECOND * 60, this.lose, this);
		this.time.events.loop(Phser.Timer.Second * this.rnd.integerInRange(1,5), spawnEnemy,this);
		
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
		this.game.debug.text("Time Remaining: " + this.timer.tick - this.timer._now,32,80);
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
		this.kill();
		this.score = this.score + 100;
	},
	
	spawnEnemy: function() {
		if(this.numEnemy < this.maxEnemy){
			this.maxEnemy = this.maxEnemy + 1;
			for(i=0;i<10;i++){
				if(!this.enemies[i].alive){
					this.temp = i;
					this.enemies[i].revive();
					this.enemies[i].x = this.rnd.integerInRange(25,775);
					this.enemies[i].y = this.rnd.integerInRange(245,525);
					this.enemies[i].scale.setTo(250/this.enemies[i].y)
				}
			this.time.events.add(Phaser.Timer.Second * 0.5, fire, this);
		}
	},
		
	fire: function() {
		this.time.events.add(Phaser.Timer.Second * 0.5, damage, this);
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
		this.score = this.score + 10000;
		this.won = true;
		this.gameOver();
	},
	
	lose: function(){
		this.won = false;
		this.gameOver();
	},
		
	gameOver: function() {
		this.meteorHP = 200;
		this.health = 3;
		this.lastScore = this.score;
		this.score = 0;
		this.gameMusic.stop();
		this.state.start('GameOver',true,false,this.lastScore,this.won);
	}
};
