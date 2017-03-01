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
	this.pHealth = 0;
	this.pMagic = 0;
	this.casting = false;
	this.numSpell = 0;
	this.intensity = 0;
};

BasicGame.Game.prototype = {
    create: function () {
    },

    update: function () {
		//MOVEMENT
        if(this.input.keyboard.isDown(Phaser.Keyboard.LEFT)){//Move Left
			this.player.x += -3;
		}else if(this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){//Move Right
			this.player.x += 3;
		}
		
		if(this.input.keyboard.isDown(Phaser.Keyboard.UP)){//Move Up
			this.player.y += -3;
		}else if(this.input.keyboard.isDown(Phaser.Keyboard.DOWN)){//Move Down
			this.player.y += 3;
		}
		
    },
	
	render: function() {
	},
	
	moveCamera: function() {
	},
	
	loadSpell: function() {
		if(this.input.keyboard.isDown(Phaser.Keyboard.Z)){
			this.intensity =+ 1;
		}else if(this.input.keyboard.isDown(Phaser.Keyboard.X)){
			this.intensity =+ 2;
		}
		
		this.numSpell += 1;
		//Check numSpell
		if(this.numSpell == 2){
			this.castSpell();
		}else{
		}
	},
	
	castSpell: function() {
		if(this.numSpell == 1){ //1 Spell
			if(this.intensity == 1){//Z
			}else if(this.intensity == 2){//X
			}
		}else if(this.numSpell == 2){ //2 Spells
			if(this.intensity == 2){//ZZ
			}else if(this.intensity == 3){//ZX
			}else if(this.intensity == 4){//XX
			}
		}
		
		//Revert Spell stuff
		this.casting = false;
		this.numSpell = 0;
		this.intensity = 0;
	},
	
	bomb: function(){
	},
	
	enemySpawn: function() {
	},
	
	enemyAttack: function() {
	},

};
