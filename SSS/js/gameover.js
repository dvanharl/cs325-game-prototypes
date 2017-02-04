var gameOver = function(game){}

gameOver.prototype = {
	init: function(score){},
	create: function(){
		var str = "Score: " + score;
		var text = game.add.text( game.world.centerX, 15, str , style );
        text.anchor.setTo( 0.5, 0.0 );
		var play = this.game.add.button(160,320,"Get back on the saddle!",this.playGame,this);
		play.anchor.setTo(0.5,0.5);
	},
	playGame: function(){
		this.game.state.start("game")
	};