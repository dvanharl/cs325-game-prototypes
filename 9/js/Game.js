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

    //Setting
	this.backrpg = null;
	this.backaction = null;
	
	//Players
	this.player = null;
	this.enemy = null;
	
	//Parameters
	this.px = null;
	this.py = null;
	this.ex = null;
	this.ey = null;
	
	this.php = null;
	this.ehp = null;
	
	this.pspeed = null;
	this.espeed = null;
	
	this.genre = null;
	
	//UI
	this.rpgmenu = null;
	this.attack = null;
	this.defend = null;
	//this.items = null;
	
	this.canAttack = null;
	this.canDefend = null;
	
	this.canMove = null;
	this.cursor = null;
	this.sel = null;
	this.canSwitch = null;
	
	this.whiteScreen = null;
	this.attacking = null;
	this.defending = null;
	
	this.rpgmusic = null;
	this.actionmusic = null;
	
	this.musPos = null;
};

BasicGame.Game.prototype = {

    create: function () {
		//Audio
		this.punch = this.add.audio('punch');
		this.hit = this.add.audio('hit');
		this.rpgmusic = this.add.audio('rpgmusic');
		this.actionmusic = this.add.audio('actionmusic');
		
		//Setting
		this.backrpg = this.add.sprite(400,300, 'backrpg');
		this.backrpg.anchor.setTo(.5,.5);
		this.backaction = this.add.sprite(400,300, 'backaction');
		this.backaction.anchor.setTo(.5,.5);
		
		this.backrpg.kill();
		
		//Players
		this.player = this.add.sprite(200, 200, 'player');
		this.player.animations.add('idle',[0], 3, true, true);
		this.player.animations.add('walk',[0,1], 8, true, true);
		this.player.animations.add('defend',[2], 3, true, true);
		this.player.animations.add('attack',[3], 3, true, true);
		this.player.animations.add('damage',[4], 3, true, true);
		this.player.anchor.setTo(.5,.5);
		this.player.scale.x = 4;
		this.player.scale.y = 4;
		this.player.play('idle');
		
		/*this.enemy = this.add.sprite(0, 0, 'enemy');
		this.enemy.animations.add('idle',[0], 3, true, true);
		this.enemy.animations.add('walk',[0,1], 3, true, true);
		this.enemy.animations.add('guard',[2], 3, true, true);
		this.enemy.animations.add('attack',[3], 3, true, true);
		this.enemy.animations.add('damage',[4], 3, true, true);
		this.enemy.anchor.setTo(.5,.5);
		this.enemy.play('idle');
		*/
		//Parameters
		this.php = 200;
		this.ehp = 200;
		
		this.pspeed = 6;
		this.espeed = 6;
		
		this.genre = true;
		this.canMove = true;
		this.canAttack = true;
		this.canDefend = true;
		this.canSwitch = true;
		
		this.sel = -1;
		
		//Menu add
		this.rpgmenu = this.add.sprite(0, 0, 'rpgmenu');
		this.attack = this.add.sprite(100, 375, 'attackcommand');
		this.defend = this.add.sprite(100, 491, 'defendcommand');
		//this.items = this.add.sprite(50, 515, 'itemscommand');
		this.rpgmenu.kill();
		this.attack.kill();
		this.defend.kill();
		
		this.cursor = this.add.sprite(150, 400, 'cursor');
		this.cursor.animations.add('idle',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21], 30, true, true);
		this.cursor.animations.add('select',[22], 1, true, true);
		this.cursor.play('idle');
		this.cursor.kill();
		
		this.whiteScreen = this.add.sprite(0,0,'whiteScreen');
		this.whiteScreen.alpha = 0;
		
		this.attacking = false;
		this.defending = false;
		
		//Music play
		this.actionmusic.play('',0,.4,true,true);
		this.rpgmusic.play('',0,.4,true,true);
		this.rpgmusic.volume = 0;
		this.musPos = 0;
    },

    update: function () {
		if(this.genre){ //Action
			//MOVEMENT
			if(this.canMove){
				if(this.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
					this.moving = true;
					if(this.player.scale.x < 0){
						this.player.scale.x *= -1;
					}
					this.player.play('walk');
					this.player.x -= (this.pspeed * 1);
					if(this.player.x < 0){
						this.player.x = 0;
					}
				}else if(this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
					this.moving = true;
					if(this.player.scale.x > 0){
						this.player.scale.x *= -1;
					}
					this.player.play('walk');
					this.player.x += (this.pspeed * 1);
					if(this.player.x > 800){
						this.player.x = 800;
					}
				}
				if(this.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
					this.moving = true;
					this.player.play('walk');
					this.player.y += (this.pspeed/2);
					if(this.player.y > 600){
						this.player.y = 600;
					}
				}else if(this.input.keyboard.isDown(Phaser.Keyboard.UP)){
					this.moving = true;
					this.player.play('walk');
					this.player.y -= (this.pspeed/2);
					if(this.player.y < 200){
						this.player.y = 200;
					}
				}
				
				if(!this.input.keyboard.isDown(Phaser.Keyboard.LEFT) && !this.input.keyboard.isDown(Phaser.Keyboard.UP) && !this.input.keyboard.isDown(Phaser.Keyboard.RIGHT) && !this.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
					this.moving = false;
				}
			}
			
			//ACTIONS
			//Attack
			if(this.canAttack && this.input.keyboard.isDown(Phaser.Keyboard.Z)){
				if(!this.attacking){
					this.punch.play();
				}
				this.pspeed = 0;
				this.player.play('attack');
				this.attacking = true;
				this.canMove = false;
				this.canDefend = false;
				//Check for damage
			}else{
				this.pspeed = 6;
				this.canMove = true;
				this.canDefend = true;
				this.attacking = false;
			}
			
			if(!this.attacking && !this.defending && !this.moving){
				this.player.play('idle');
			}
			
			//Defend
			if(this.canDefend&& this.input.keyboard.isDown(Phaser.Keyboard.X)){
				this.player.play('defend');
				this.canMove = false;
				this.canAttack = false;
				this.defending = true;
				this.defense = 2;
			}else{
				this.canMove = true;
				this.canAttack = true;
				this.defending = false;
				this.defense = 1;
			}
			
			//Switch genre
			if(this.canSwitch && this.input.keyboard.isDown(Phaser.Keyboard.C)){
				this.switchGenre();
			}
		}else{ //RPG
			if(this.canMove){
				if(!this.attacking && !this.defending){
					this.player.play('walk');
				}
				if(this.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
					this.moving = true;
					this.sel = this.sel * -1;
					this.canMove = false;
					this.time.events.add(250, function() {
						this.canMove = true;
					},this);
				}else if(this.input.keyboard.isDown(Phaser.Keyboard.UP)){
					this.moving = true;
					this.sel = this.sel * -1;
					this.canMove = false;
					this.time.events.add(250, function() {
						this.canMove = true;
					},this);
				}
				
				if(this.sel < 0){
					this.moving = true;
					this.attack.alpha = 1;
					this.defend.alpha = .5;
				}else if(this.sel > 0){
					this.moving = true;
					this.defend.alpha = 1;
					this.attack.alpha = .5
				}
			
				this.cursor.y = 440 + (40 * this.sel);
				
				//Actions
				if(this.canMove && this.input.keyboard.isDown(Phaser.Keyboard.Z)){
					this.canMove = false;
					this.attack.alpha = .2;
					this.defend.alpha = .2;
					this.cursor.play('select');
					if(this.sel == -1){
						if(!this.attacking){
							this.punch.play();
						}
						this.attacking = true;
						this.player.play('attack');
						this.punch.play();
						this.time.events.add(1000, function() {
							this.player.play('idle');
							this.attacking = false;
						},this);
						this.time.events.add(2000, function() {
							this.canMove = true;
							this.attack.alpha = 1;
							this.defend.alpha = .5;
						},this);
					}else{
						this.player.play('defend');
						this.time.events.add(2000, function() {
							this.canMove = true;
							this.attack.alpha = .5;
							this.defend.alpha = 1;
							this.player.play('idle');
						},this);
					}
				}else if(this.canSwitch && this.input.keyboard.isDown(Phaser.Keyboard.C)){
					this.switchGenre();
				}
				this.cursor.y = 400 + (20 * this.sel);
			}else{
				this.player.play('idle');
			}
		}
		
		//Check parameters
		if(this.php == 0){
			//lose
		}
		
		if(this.ehp == 0){
			//win
		}
	},
	
	render: function(){
		this.game.debug.text("Health: " + this.php, 32, 32);
		this.game.debug.text("Enemy Health: " + this.ehp,32,64);
	},
		
	
	switchGenre: function (){
		this.canMove = false;
		this.canAttack = false;
		this.canDefend = false;
		this.canSwitch = false;
		this.time.events.add(1000, function() {
			this.canMove = true;
			this.canAttack = true;
			this.canDefend = true;
			this.canSwitch = true;
		},this);
		this.genre = !this.genre;
		this.add.tween(this.whiteScreen).to({alpha:1}, 500, Phaser.Easing.Linear.None, true, 0,0,false);
		this.time.events.add(500, function() {
			if(!this.genre){//Switch to RPG
				//Music switch
				this.add.tween(this.actionmusic).to({volume:0}, 1000, Phaser.Easing.Linear.None, true, 0,0,false);
				this.add.tween(this.rpgmusic).to({volume:.4}, 1000, Phaser.Easing.Linear.None, true, 0,0,false);
				//this.actionmusic.volume = 0;
				//this.rpgmusic.volume = .4;
				
				this.backaction.kill();
				this.backrpg.revive();
				
				//Remember
				this.player.scale.x = -4;
				this.px = this.player.x;
				this.py = this.player.y;
				
				//this.ex = this.enemy.x;
				//this.ey = this.enemy.y;
				
				//Replace enemies
				this.player.x = 200;
				this.player.y = 300;
				//this.enemy.x = 600;
				//this.enemy.y = 300;
				
				//Add menu
				this.rpgmenu.revive();
				this.attack.revive();
				this.defend.revive();
			}else{ //Switch to action
				//Music
				this.add.tween(this.actionmusic).to({volume:.4}, 1000, Phaser.Easing.Linear.None, true, 0,0,false);
				this.add.tween(this.rpgmusic).to({volume:0}, 1000, Phaser.Easing.Linear.None, true, 0,0,false);
				//this.actionmusic.volume = .4;
				//this.rpgmusic.volume = 0;
			
				this.backaction.revive();
				this.backrpg.kill();
				
				//Return to previous positions
				this.player.x = this.px;
				this.player.y = this.py;
				
				//Remove menu
				this.rpgmenu.kill();
				this.attack.kill();
				this.defend.kill();
			}
			this.add.tween(this.whiteScreen).to({alpha:0}, 500, Phaser.Easing.Linear.None, true, 0,0,false);
		},this);
	}
	
	
};
