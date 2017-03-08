
BasicGame.GameOver = function (game) {
	
	this.music = null;
	this.retryButton = null;
	this.score = null;
	this.gameOverBack = null;
	this.whiteScreen = null;
	this.didI = false;
	this.music = null;
	this.style = null;
	this.titleStyle = null;
	this.message = null;
};

BasicGame.GameOver.prototype = {
	
	init: function (level, win) {
		this.didI = win;
	},
	
	create: function() {
		this.titleStyle =  { font: "50px Georgia", fill: "0xff0000", align: "center" };
		if (this.didI){
			//Game Over - Win Screen
			this.gameOverBack = this.game.add.sprite(0,0,'win');
			this.retryButton = this.add.button( 303, 400, 'playButton', this.retryGame, this, 'over', 'out', 'down');
			this.music = this.add.audio('win');
			this.message = this.add.text(400,25, "CONGRATULATIONS", this.titleStyle);
		}else{
			//Game Over - Lose Screen
			this.gameOverBack = this.game.add.sprite(0,0,'gameOver');
			this.retryButton = this.add.button( 303, 400, 'playButton', this.retryGame, this, 'over', 'out', 'down');
			this.music = this.add.audio('gameover');
			this.message = this.add.text(400,25, "GAME OVER", this.titleStyle);
		}
		this.message.anchor.setTo(0.5,0.5);
		this.music.play();
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