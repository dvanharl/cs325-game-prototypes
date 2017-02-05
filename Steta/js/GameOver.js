
BasicGame.GameOver = function (game) {
	
	this.music = null;
	this.retryButton = null;
	this.score = null;
	this.gameOverBack = null;
};

BasicGame.GameOver.prototype = {
	
	create: function() {
		this.gameOverBack = this.game.add.sprite(0,0,'gameOver');
		this.retryButton = this.add.button( 303, 300, 'playButton', this.retryGame, this, 'over', 'out', 'down');
	},
	
	update: function() {
	},
	
	retryGame: function() {
		this.state.start('MainMenu');
	}
};