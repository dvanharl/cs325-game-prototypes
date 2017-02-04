var GameOver = function(game){}

gameOver.prototype = {
	init: function(score){},
	create: function(){},
	playGame: function(){
	this.game.state.start("Main")
	};