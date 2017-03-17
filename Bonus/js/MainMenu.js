window.addEventListener("keydown", function(e){
	if([32,37,38,39,40].indexOf(e.keyCode) > -1) {
		e.preventDefault();
	}
},false);

BasicGame.MainMenu = function (game) {

	this.music = null;
	this.playB = null;
	this.controls = null;
	this.sel = null;
	this.cursor = null;
	this.opCon = null;

};

BasicGame.MainMenu.prototype = {

	create: function () {

		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
		//	Here all we're doing is playing some music and adding a picture and button
		//	Naturally I expect you to do something significantly better :)

		this.music = this.add.audio('titleMusic');
		this.music.play();

		this.add.sprite(0, 0, 'titlePage');

		this.playB = this.add.sprite(325, 400, 'play');
		this.playB.animations.add('idle',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29], 30, true, true);
		this.playB.play('idle');
		
		this.controls = this.add.sprite(325, 480, 'controls');
		this.controls.animations.add('idle',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28], 30, true, true);
		this.controls.play('idle');
		
		this.cursor = this.add.sprite(225, 400, 'cursor');
		this.cursor.animations.add('idle',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21], 30, true, true);
		this.cursor.play('idle');
		
		this.sel = -1;
		this.opCon = false;
		this.controls.kill();
		
		this.whiteScreen = this.add.sprite(0,0,'whiteScreen');
		this.add.tween(this.whiteScreen).to({alpha:0}, 2000, Phaser.Easing.Linear.None, true, 0,0,false);
	},

	update: function () {
		if(!this.opCon){
			if(this.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
				this.sel = this.sel * -1;
			}else if(this.input.keyboard.isDown(Phaser.Keyboard.UP)){
				this.sel = this.sel * -1;
			}
			
			this.cursor.y = 440 + (40 * this.sel);

			if(this.input.keyboard.isDown(Phaser.Keyboard.Z)){
				if(this.sel == -1){
					this.startGame();
				}else{
					this.openControls();
				}
			}
		}else{
			if(this.input.keyboard.isDown(Phaser.Keyboard.X)){
				this.controls.kill();
				this.opCon = false;
			}
		}
		
		if(sel < 0){
			this.playB.play('idle');
			this.controls.stop(true, false);
		}(sel > 0){
			this.controls.play('idle');
			this.playB.stop(true, false);
		}
	},

	startGame: function (pointer) {
		this.add.tween(this.whiteScreen).to({alpha:1}, 1500, Phaser.Easing.Linear.None, true, 0,0,false);
		this.music.fadeOut(2000);
		this.music.onFadeComplete.add(function() {
			this.state.start('Stage1');
		},this);
	},
	
	openControls: function (){
		this.controls.revive();
		this.opCon = true;
	}
};
