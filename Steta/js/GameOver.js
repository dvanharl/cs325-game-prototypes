
BasicGame.GameOver = function (game) {
	
	this.music = null;
	this.retryButton = null;
	this.score = null;
	this.gameOverBack = null;
	this.whiteScreen = null;
};

BasicGame.GameOver.prototype = {
	
	create: function() {
		this.gameOverBack = this.game.add.sprite(0,0,'gameOver');
		this.retryButton = this.add.button( 303, 400, 'playButton', this.retryGame, this, 'over', 'out', 'down');
		this.whiteScreen = this.game.add.sprite(0,0,'whiteScreen');
		this.add.tween(this.whiteScreen).to({alpha:0}, 1500, Phaser.Easing.Linear.None, true, 1500,0,false);
		//this.whiteScreen.destroy();
	},
	
	update: function() {
	},
	
	retryGame: function() {
		this.state.start('MainMenu');
	}
};