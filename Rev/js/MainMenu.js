
BasicGame.MainMenu = function (game) {

	this.music = null;
	this.playButton = null;

};

BasicGame.MainMenu.prototype = {

	create: function () {

		this.add.sprite(0, 0, 'titlePage');
		
		this.music = this.add.audio('titleMusic');
		this.music.play();

		this.playButton = this.add.button( 303, 400, 'playButton', this.startGame, this, 'over', 'out', 'down');
		this.blackscreen = this.add.sprite(0,0,'blackScreen');
		this.blackscreen.alpha = 0;

	},

	update: function () {
		//	Do some nice funky main menu effect here

	},

	startGame: function (pointer) {
		this.music.fadeOut(2000);
		this.add.tween(this.blackscreen).to({alpha:1}, 1400,  Phaser.Easing.Linear.None, true, 0, false, false);
		this.music.onFadeComplete.add(function() {
			this.state.start('Game');
		},this);
	}

};
