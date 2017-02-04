var gameOver = function(game){}

gameOver.prototype = {
	init: function(score){},
	create: function(){
		
		var play = this.game.add.button(160,320,"Get back on the saddle!",this.playGame,this);
		play.anchor.setTo(0.5,0.5);
	},
	playGame: function(){
		this.game.state.start("Game")
	};