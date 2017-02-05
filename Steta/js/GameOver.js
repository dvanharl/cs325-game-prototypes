
BasicGame.GameOver = function (game) {
	
	this.music = null;
	this.retryButton = null;
	this.score = null;
	
};

BasicGame.GameOver.prototype = {
	
	create: function() {
		this.retryButton = this.add.button( 303, 300, 'playButton', this.retryGame, this, 'over', 'out', 'down');
	},
	
	update: function() {
	},
	
	retryGame: function() {
		this.state.start('MainMenu');
	}
};