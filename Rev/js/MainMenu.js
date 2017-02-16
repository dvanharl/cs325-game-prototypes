
BasicGame.MainMenu = function (game) {

	this.music = null;
	this.playButton = null;
	this.blackScreen = null;

};

BasicGame.MainMenu.prototype = {

	create: function () {

		this.add.sprite(0, 0, 'titlePage');
		
		this.music = this.add.audio('titleMusic');
		this.music.play();

		this.playButton = this.add.button( 303, 400, 'playButton', this.startGame, this, 'over', 'out', 'down');
		this.blackScreen = this.add.sprite(0,0,'blackScreen');
		this.blackScreen.alpha = 0;

	},

	update: function () {
		//	Do some nice funky main menu effect here

	},

	startGame: function (pointer) {
		this.music.fadeOut(2000);
		this.add.tween(this.blackScreen).to({alpha:1}, 1500, Phaser.Easing.Linear.None, true, 1500,0,false);
		this.music.onFadeComplete.add(function() {
			this.state.start('Game');
		},this);
	}

};
