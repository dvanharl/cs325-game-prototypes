
BasicGame.GameOver = function (game) {
	
	this.music = null;
	this.retryButton = null;
	this.score = null;
	this.gameOverBack = null;
	this.whiteScreen = null;
	this.didI = false;
	this.music = null;
};

BasicGame.GameOver.prototype = {
	
	init: function (score, win) {
		this.endScore = score;
		this.didI = win;
	},
	
	create: function() {
		if (this.didI){
			//Game Over - Win Screen
			this.retryButton = this.add.button( 303, 400, 'playButton', this.retryGame, this, 'over', 'out', 'down');
			this.music = this.add.audio('win');
		}else{
			//Game Over - Lose Screen
			this.gameOverBack = this.game.add.sprite(0,0,'gameOver');
			this.retryButton = this.add.button( 303, 400, 'playButton', this.retryGame, this, 'over', 'out', 'down');
			this.music = this.add.audio('gameover');
		}
		this.music.play();
		this.add.text (100,300, "Final score: " + this.endScore,)
		this.whiteScreen = this.game.add.sprite(0,0,'whiteScreen');
		this.add.tween(this.whiteScreen).to({alpha:0}, 1500, Phaser.Easing.Linear.None, true, 1500,0,false);
	},
	
	update: function() {
	},
	
	retryGame: function() {
		this.music.stop();
		this.state.start('MainMenu');
	}
};