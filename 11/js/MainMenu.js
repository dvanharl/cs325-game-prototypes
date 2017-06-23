
BasicGame.MainMenu = function (game) {

	this.music = null;
	this.playButton = null;

};

BasicGame.MainMenu.prototype = {

	create: function () {

		this.music = this.add.audio('menu');
		this.music.play();

		this.add.sprite(0, 0, 'titlePage');

		this.playButton = this.add.button( 303, 400, 'playButton', this.startGame, this, 'over', 'out', 'down');

	},

	update: function () {


	},

	startGame: function (pointer) {
		this.music.stop();
		this.state.start('Game');
	}

};
