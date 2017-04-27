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
	
};

BasicGame.Game.prototype = {

    create: function () {
		//Audio
		
		//Setting
		//this.backrpg = this.add.sprite(0,0, 'backrpg');
		//this.backaction = this.add.sprite(0,0, 'backaction');
		
		//Players
		this.player = this.add.sprite(400, 300, 'player');
		this.player.animations.add('idle',[0], 3, true, true);
		this.player.animations.add('walk',[0,1], 3, true, true);
		this.player.animations.add('guard',[2], 3, true, true);
		this.player.animations.add('attack',[3], 3, true, true);
		this.player.animations.add('damage',[4], 3, true, true);
		this.player.anchor.setTo(.5,.5);
		this.player.scale = 4;
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
		
		this.pspeed = 4;
		this.espeed = 4;
		
		this.genre = true;
		this.canMove = true;
		this.canAttack = true;
		this.canDefend = true;
		
		
		
		//Menu add
		this.rpgmenu = this.add.sprite(0, 0, 'rpgmenu');
		this.attack = this.add.sprite(100, 375, 'attackcommand');
		this.defend = this.add.sprite(100, 491, 'defendcommand');
		//this.items = this.add.sprite(50, 515, 'itemscommand');
		this.rpgmenu.kill();
		this.attack.kill();
		this.defend.kill()
		
    },

    update: function () {
		if(this.genre){ //Action
			//MOVEMENT
			if(this.canMove){
				if(this.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
					this.player.play('walk');
					this.player.x -= (this.pspeed * 1);
				}else if(this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
					this.player.play('walk');
					this.player.x += (this.pspeed * 1);
				}
				if(this.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
					this.player.play('walk');
					this.player.y += (this.pspeed/2);
				}else if(this.input.keyboard.isDown(Phaser.Keyboard.UP)){
					this.player.play('walk');
					this.player.y -= (this.pspeed/2);
				}
			}
			
			//ACTIONS
			//Attack
			if(this.canAttack && this.input.keyboard.isDown(Phaser.Keyboard.Z)){
				this.player.play('attack');
				this.canMove = false;
				this.canDefend = false;
				this.ehp -= 20/this.edefense
			}else{
				this.player.play('idle');
				this.canMove = true;
				this.canDefend = true;
			}
			
			//Defend
			if(this.canDefend&& this.input.keyboard.isDown(Phaser.Keyboard.X)){
				this.player.play('defend');
				this.canMove = false;
				this.canAttack = false;
				this.defense = 2;
			}else{
				this.player.play('idle');
				this.canMove = true;
				this.canAttack = true;
				this.defense = 1;
			}
			//Switch genre
			if(this.input.keyboard.isDown(Phaser.Keyboard.C)){
				this.canDefend = false;
				this.canAttack = false;
				this.switchGenre();
			}
		}else{ //RPG
			if(this.canMove){
				if(this.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
					this.sel = (this.sel + 1) % 3;
					this.canMove = false;
					this.time.events.add(250, function() {
						this.canMove = true;
					},this);
				}else if(this.input.keyboard.isDown(Phaser.Keyboard.UP)){
					this.sel = (this.sel - 1) % 3;
					this.canMove = false;
					this.time.events.add(250, function() {
						this.canMove = true;
					},this);
				}
				
				if(this.sel == 0){
					this.attack.play('idle');
					this.defend.animations.frame = 0;
					this.defend.animations.stop(true, false);
					this.items.animations.frame = 0;
					this.items.animations.stop(true, false);
				}else if(this.sel == 1){
					this.defend.play('idle');
					this.attack.animations.frame = 0;
					this.attack.animations.stop(true, false);
					this.items.animations.frame = 0;
					this.items.animations.stop(true, false);
				}else if(this.sel == 2){
					this.items.play('idle');
					this.attack.animations.frame = 0;
					this.attack.animations.stop(true, false);
					this.items.animations.frame = 0;
					this.items.animations.stop(true, false);
				}
				
				this.cursor.y = 400 + (20 * this.sel);

				if(this.input.keyboard.isDown(Phaser.Keyboard.Z)){
					this.cursor.play('select');
					if(this.sel == 0){
					}else if(this.sel == 1){
					}else if(this.sel == 2){
					}
				}else if(this.input.keyboard.isDown(Phaser.Keyboard.C)){
					this.switchGenre();
				}
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
		this.time.events.add(1000, function() {
			this.canMove = true;
		},this);
		this.genre = !this.genre;
		if(this.genre){ //RPG
			//Remember
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
			//this.item.revive();
			
			//Switch music
			
		}else{ //ACTION
			//Return to previous positions
			this.player.x = this.px;
			this.player.y = this.py;
			
			//this.enemy.x = this.ex;
			//this.enemy.y = this.ey;
			
			//Remove menu
			this.rpgmenu.kill();
			this.attack.kill();
			this.defend.kill();
			//this.item.kill();
			//Switch music
		}
	}
	
	
};
