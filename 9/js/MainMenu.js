window.addEventListener("keydown", function(e){
	if([32,37,38,39,40].indexOf(e.keyCode) > -1) {
		e.preventDefault();
	}
},false);

BasicGame.MainMenu = function (game) {

	this.music = null;
	this.playB = null;
	this.controls = null;
	this.contP = null;
	this.sel = null;
	this.cursor = null;
	this.opCon = null;
	this.canMove = null;

};

BasicGame.MainMenu.prototype = {

	create: function () {
		this.music = this.add.audio('titleMusic');
		this.music.play();

		this.add.sprite(0, 0, 'titlePage');

		this.playB = this.add.sprite(325, 400, 'play');
		this.playB.animations.add('idle',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29], 30, true, true);
		this.playB.animations.add('select',[30,31], 30, true, true);
		this.playB.play('idle');
		
		this.controls = this.add.sprite(325, 480, 'controls');
		this.controls.animations.add('idle',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28], 30, true, true);
		this.controls.play('idle');
		
		this.cursor = this.add.sprite(225, 400, 'cursor');
		this.cursor.animations.add('idle',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21], 30, true, true);
		this.cursor.animations.add('select',[22], 1, true, true);
		this.cursor.play('idle');
		
		this.sel = -1;
		this.playB.play('idle');
		this.opCon = false;
		
		this.contP = this.add.sprite(100, 100, 'controlPanel');
		this.contP.kill();
		
		this.whiteScreen = this.add.sprite(0,0,'whiteScreen');
		this.add.tween(this.whiteScreen).to({alpha:0}, 2000, Phaser.Easing.Linear.None, true, 0,0,false);
		
		this.canMove = true;
		this.music.volume = .25;
	},

	update: function () {
		if(!this.opCon && this.canMove){
			if(this.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
				this.sel = this.sel * -1;
				this.canMove = false;
				this.time.events.add(250, function() {
					this.canMove = true;
				},this);
			}else if(this.input.keyboard.isDown(Phaser.Keyboard.UP)){
				this.sel = this.sel * -1;
				this.canMove = false;
				this.time.events.add(250, function() {
					this.canMove = true;
				},this);
			}
			
			if(this.sel < 0){
				this.playB.play('idle');
				this.controls.animations.frame = 0;
				this.controls.animations.stop(true, false);
			}else if(this.sel > 0){
				this.controls.play('idle');
				this.playB.animations.frame = 0;
				this.playB.animations.stop(true, false);
			}
			
			this.cursor.y = 440 + (40 * this.sel);

			if(this.input.keyboard.isDown(Phaser.Keyboard.Z)){
				this.cursor.play('select');
				if(this.sel == -1){
					this.playB.play('select');
					this.startGame();
				}else{
					this.openControls();
				}
			}
		}else{
			if(this.input.keyboard.isDown(Phaser.Keyboard.X)){
				this.cursor.play('idle');
				this.controls.play('idle');
				this.contP.kill();
				this.opCon = false;
			}
		}
		
		
	},

	startGame: function (pointer) {
		this.canMove = false;
		this.add.tween(this.whiteScreen).to({alpha:1}, 1500, Phaser.Easing.Linear.None, true, 0,0,false);
		this.music.fadeOut(2000);
		this.music.onFadeComplete.add(function() {
			this.canMove = true;
			this.state.start('Game');
		},this);
	},
	
	openControls: function (){
		this.contP.revive();
		this.opCon = true;
	}
};
