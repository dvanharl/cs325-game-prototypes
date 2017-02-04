var menu = function(game){}

menu.prototype{
	create: function(){
		var play = this.game.add.button(160,320,"Load 'em Up!",this.playGame,this);
		play.anchor.setTo(0.5,0.5);
	},
	playgame: function(){
		this.game.state.start("Game");
	}
}