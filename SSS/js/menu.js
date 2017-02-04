var menu = function(game){};

menu.prototype = {
	create: function(){
		var text = game.add.text( game.world.centerX, 15, "OPEN THE GAME" , style );
		var play = this.game.add.button(400,300,"Load 'em Up!",this.playGame,this);
		play.anchor.setTo(0.5,0.5);
	},
	playgame: function(){
		this.game.state.start("game");
	}
};