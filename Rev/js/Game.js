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
	this.score = null;
	this.xspeed = 0;
	this.yspeed = 0;
	this.canJump = true;
	this.canShoot = true;
	this.bullet = null;
	this.bullSped = 0;
	this.bullX = 0;
	this.bullY = 0;
};

BasicGame.Game.prototype = {

    create: function () {
		this.worldMap = this.add.sprite(0,0,"worldMap");
		this.world.setBounds(0,0,2560,600);
		
		this.player = this.add.sprite(1000,420, "player");
		this.player.anchor.setTo(.5,.5);
		this.player.scale.setTo(2);
		this.camera.follow(this.player);
		
		//Player Parameters
		this.player.health = 5;
		
		//Player Animation Manager
		this.player.animations.add('idle',[0,1,2,3,4,5], 9, true, true);
		this.player.animations.add('walk',[5,6,7,8,9,10,11,12],18,true, true);
		this.player.animations.add('shoot',[13,14,15,16,17,18,19],30,false,true);
		
		this.bullet = this.add.sprite(this.player.x, this.player.y,'bullet');
		this.bullet.animations.add('go');
		this.bullet.anchor.setTo(.5,.5);
		this.bullet.kill();
    },

    update: function () {
		//Movement
        if(this.input.keyboard.isDown(Phaser.Keyboard.LEFT)){//Move Left
			this.player.animations.play('walk');
			if(this.player.scale.x < 0){
				this.player.scale.x *= -1;
			}
			if(this.xspeed > -8){
				this.xspeed -= .8;
			}else{
				this.xspeed = -8;
			}
		}else if(this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){//Move Right
			this.player.animations.play('walk');
			if(this.player.scale.x > 0){
				this.player.scale.x *= -1;
			}
			if(this.xspeed < 8){
				this.xspeed += .8;
			}else{
				this.xspeed = 8;
			}
		}else{ //Idle
			//if(this.player.animations('shoot').isFinished){
			//	this.player.animations.play('idle');
			//}
			this.xspeed = this.xspeed/1.5;
		}
		
		if(this.input.keyboard.isDown(Phaser.Keyboard.DOWN) && this.canShoot){//Shooting
			this.canShoot = false;
			this.bullSpeed = this.player.scale.x / -2;
			this.bullY = this.player.y;
			this.bullX = this.player.x;
			this.player.animations.play('shoot');
			this.bullet.x = this.bullX;
			this.bullet.y = this.bullY
			this.bullet.revive();
		}
		if(this.bullet.alive){//Bullet Movement
			this.bullet.animations.play('go',22,true);
			this.bullet.x += (20 * this.bullSpeed);
			this.bullet.scale.x = -1 * this.bullSpeed;
			if(this.bullet.x < (this.player.x - 435) || this.bullet.x >(this.player.x + 435) || this.bullet.x < 0 || this.bullet.x > 2560){
				this.bullet.kill();
				this.canShoot = true;
			}
		}
		
		if(this.input.keyboard.isDown(Phaser.Keyboard.UP) && this.canJump){//Jumping
			this.yspeed = -15;
			this.canJump = false;
		}
		
		if(this.player.y < 420){//Falling
			this.yspeed += 1;
		}
		if(this.player.y >=420){
			this.player.y = 420;
			this.canJump = true;
		}
		
		//Update Position
		this.player.x += this.xspeed;
		this.player.y += this.yspeed;
		
    },

};