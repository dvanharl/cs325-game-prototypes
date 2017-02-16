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
	this.canMove = true;
	
	this.bullet = null;
	this.bullSpeed = 0;
	this.bullX = 0;
	this.bullY = 0;
	this.shootAnim = null;
	this.enemies = null;
	this.invincible = false;
	this.numEnemy = 0;
	this.maxEnemy = 3;
	this.HP = 5;
	this.kills = 0;
	this.score = 0;
	
	this.music = null;
	this.hit = null;
	this.shoot = null;
	this.die = null;
	this.jump = null;
	this.loadd = null;
	
	this.fog1 = null;
	this.fog2 = null;
	this.fog3 = null;
	this.fog4 = null;
	this.fog5 = null;
	this.fog6 = null;
	
	this.back = null;
	this.sun = null;
	this.back2 = null;
	this.back1 = null;
	
	this.blackScreen = null;
};

BasicGame.Game.prototype = {
//CREATE
    create: function () {
		//AUDIO
		this.music = this.add.audio('game');
		this.music.play();
		this.hit = this.add.audio('hit');
		this.shoot = this.add.audio('shoot');
		this.die = this.add.audio('die');
		this.jump = this.add.audio('jump');
		this.loadd = this.add.audio('load');
		
		//Background
		this.back = this.add.sprite(0,0,'back');
		this.sun = this.add.sprite(0,0,'sun');
		this.back2 = this.add.sprite(1280,300,'bg2');
		this.back2.anchor.setTo(.5,.5);
		this.back1 = this.add.sprite(1280,300,'bg1');
		this.back1.anchor.setTo(.5,.5);
		
		
		this.worldMap = this.add.sprite(0,0,"worldMap");
		this.world.setBounds(0,0,2560,600);
		
		this.player = this.add.sprite(1000,420, "player");
		this.player.anchor.setTo(.5,.5);
		this.player.scale.setTo(2);
		this.camera.follow(this.player);
		
		//Player Parameters
		this.HP = 5;
		
		//Player Animation Manager
		this.player.animations.add('idle',[0,1,2,3,4,5], 9, true, true);
		this.player.animations.add('walk',[5,6,7,8,9,10,11,12],18,true, true);
		this.shootAnim = this.player.animations.add('shoot',[13,14,15,16,17,18,19],22,false,true);
		
		this.bullet = this.add.sprite(this.player.x, this.player.y,'bullet');
		this.bullet.animations.add('go');
		this.bullet.anchor.setTo(.5,.5);
		this.bullet.kill();
		
		//Enemies
		this.enemies = this.add.group();
		this.maxEnemy = 3;
		
		this.time.events.add(90000, function() {
			this.HP = 5;
			this.music.stop();
			this.score = this.kills;
			this.kills = 0;
			this.maxEnemy = 3;
			this.numEnemy = 0;
			this.invincible = false;
			this.canShoot = true;
			this.canJump = true;
			this.canMove = true;
			this.state.start('GameOver',true, false,this.score,true);
		},this);
		this.time.events.add(30000, function() {
			this.maxEnemy = 5;
			this.back.tint = 0xff9999;
		},this);
		this.time.events.add(60000, function() {
			this.maxEnemy = 8;
			this.back.tint = 0xffff66;
			this.back2.tint = 0xff9999;
		},this);
		this.time.events.add(80000, function() {
			this.maxEnemy = 13;
			this.back.tint = 0xccffff;
			this.back2.tint = 0xffff66;
			this.back1.tint = 0xff9999;
		},this);
		
		//Front Stuff
		this.fog1 = this.add.sprite(0,0,'fog1');
		this.fog2 = this.add.sprite(0,0,'fog2');
		this.fog3 = this.add.sprite(0,0,'fog3');
		this.fog4 = this.add.sprite(0,0,'fog4');
		this.fog5 = this.add.sprite(0,0,'fog5');
		this.fog6 = this.add.sprite(0,0,'fog6');
		
		this.blackScreen = this.add.sprite(0,0,'blackScreen');
		this.add.tween(this.blackScreen).to({alpha:0}, 2000, Phaser.Easing.Linear.None, true, 0,0,false);
    },
	
//UPDATE
    update: function () {
		//Background
		this.fog1.x += 1;
		if(this.fog1.x == 640){
			this.fog1.x = -2560;
		}
		this.fog2.x += .75;
		if(this.fog2.x == 860){
			this.fog2.x = -2300;
		}
		this.fog3.x += .5;
		if(this.fog3.x == 1400){
			this.fog3.x = -2260;
		}
		this.fog4.x += 1.2;
		if(this.fog4.x == 1500){
			this.fog4.x = -1660;
		}
		this.fog5.x += .5;
		if(this.fog5.x == 2560){
			this.fog5.x = -700;
		}
		this.fog6.x += 1;
		if(this.fog6.x == 2560){
			this.fog6.x = -600;
		}
		
		this.sun.y -= .22;
		this.back2.x += this.xspeed/4;
		this.back1.x += this.xspeed/2;
		
		//MOVEMENT
        if(this.input.keyboard.isDown(Phaser.Keyboard.LEFT)){//Move Left
			if(this.player.scale.x < 0){
				this.player.scale.x *= -1;
			}
			if(this.canMove){
				this.player.animations.play('walk');
				if(this.xspeed > -8){
					this.xspeed -= .8;
				}else{
					this.xspeed = -8;
				}
			}else if(!this.canMove && this.player.y >= 420){
				this.xspeed = this.xspeed/1.5;
			}
		}else if(this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){//Move Right
			if(this.player.scale.x > 0){
				this.player.scale.x *= -1;
			}
			if(this.canMove){
				this.player.animations.play('walk');
				if(this.xspeed < 8){
					this.xspeed += .8;
				}else{
					this.xspeed = 8;
				}
			}else if(!this.canMove && this.player.y >= 420){
				this.xspeed = this.xspeed/1.5;
			}
		}else{ //Idle
			if(this.canMove){
				this.player.animations.play('idle');
			}
			this.xspeed = this.xspeed/1.5;
		}
		//SHOOTING
		if(this.input.keyboard.isDown(Phaser.Keyboard.X) && this.canShoot){
			this.loadd.play();
			this.canMove = false;
			this.canShoot = false;
			this.shootAnim.play('shoot');
			this.shootAnim.onComplete.add(function() {
				this.shoot.play();
				this.bullSpeed = this.player.scale.x / -2;
				this.bullY = this.player.y + 40;
				this.bullX = this.player.x;
				this.canMove = true, 
				this.bullet.x = this.bullX, 
				this.bullet.y = this.bullY,
				this.bullet.revive()}
			,this);
			
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
		
		//JUMPING
		if(this.input.keyboard.isDown(Phaser.Keyboard.Z) && this.canJump){
			this.jump.play();
			this.yspeed = -20;
			this.canJump = false;
		}
		//FALLING
		if(this.player.y < 420){//Falling
			this.yspeed += 1;
		}
		if(this.player.y >=420){
			this.player.y = 420;
			this.canJump = true;
		}
		//SPAWN ENEMIES
		if(this.numEnemy < this.maxEnemy){
			this.numEnemy += 1;
			this.time.events.add(this.rnd.integerInRange(2000,4000),function() {
				this.spawnEnemy()
			},this);
		}
		//UPDATE ENEMIES
		for(var i = this.enemies.children.length - 1; i >= 0 ; i--){
			//Movement
			if(this.enemies.children[i].x < this.player.x){
				this.enemies.children[i].x += 2.5;
				if(this.enemies.children[i].scale.x > 0){
					this.enemies.children[i].scale.x *= -1;
				}
			}else{
				this.enemies.children[i].x += -2.5;
				if(this.enemies.children[i].scale.x < 0){
					this.enemies.children[i].scale.x *= -1;
				}
			}
			
			//Player Collision
			if((this.enemies.children[i].x > this.player.x - 50 && this.enemies.children[i].x < this.player.x + 50) && (this.enemies.children[i].y > this.player.y - 100 && this.enemies.children[i].y < this.player.y + 50) && !this.invincible){
				this.hit.play();
				this.HP -= 1;
				if(this.HP == 0){
					this.HP = 5;
					this.music.stop();
					this.score = this.kills;
					this.kills = 0;
					this.maxEnemy = 3;
					this.numEnemy = 0;
					this.invincible = false;
					this.canShoot = true;
					this.canJump = true;
					this.canMove = true;
					this.state.start('GameOver',true,false,this.score,false);
				}
				//Invincibility Frames
				this.invincible = true;
				this.player.tint = 0xff0000;
				this.time.events.add(1250,function(){
					this.invincible = false;
					this.player.tint = 0xffffff;
				},this);
			}
			//Bullet Collision
			if((this.bullet.x < this.enemies.children[i].x + 30 && this.bullet.x > this.enemies.children[i].x - 30) && (this.bullet.y < this.enemies.children[i].y + 60 && this.bullet.y > this.enemies.children[i].y - 60) && this.bullet.alive){
				this.die.play();
				this.add.tween(this.enemies.children[i]).to({alpha:.1}, 100, Phaser.Easing.Linear.None, true, 0,0,false);
				this.dead = this.enemies.remove(this.enemies.children[i], true);
				this.bullet.kill();
				this.canShoot = true;
				this.kills += 1;
				this.numEnemy -= 1;
			}
		}
		
		//Update Position
		
		this.player.x += this.xspeed;
		if(this.player.x < 0){
			this.player.x = 0;
		}else if(this.player.x > 2560){
			this.player.x = 2560;
		}
		this.player.y += this.yspeed;
		
    },

//SPAWN ENEMY
	spawnEnemy: function() {
		this.enemies.create((this.player.x + (462.5 * this.rnd.sign())),450 + (this.rnd.integerInRange(-125,10)),'enemy');
		this.enemies.children[(this.enemies.children.length - 1)].anchor.setTo(.5,.5);
		this.enemies.children[(this.enemies.children.length - 1)].scale.setTo(3);
		this.enemies.children[(this.enemies.children.length - 1)].animations.add('walk');
		this.enemies.children[(this.enemies.children.length - 1)].animations.play('walk',22,true,false);
	},
	
	render: function(){
		this.game.debug.text("Health: " + this.HP, 32, 32);
		this.game.debug.text("Kills: " + this.kills,32,64);
	},
};