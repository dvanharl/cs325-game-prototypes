/*var menu = function(game){};

menu.prototype = {
	create: function(){
		var bg = game.add.sprite(0,0,"background");
		var text = game.add.text( game.world.centerX, 15, "OPEN THE GAME" , style );
		var play = this.game.add.button(400,300,"Load 'em Up!",this.playGame,this);
		play.anchor.setTo(0.5,0.5);
	},
	playGame: function(){
		this.game.state.start("game");
	}
};*/
var menu = {
	preload : function() {
		
	create : function() {
		//game.add.sprite(0,0,"background");
		//var text = game.add.text( game.world.centerX, 15, "OPEN THE GAME" , style );
		this.game.add.button(400,300,"background",this.playGame,this);
		play.anchor.setTo(0.5,0.5);
	},
	playGame : function() {
		//this.game.state.start("game");
		var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
		var text = game.add.text( game.world.centerX, 15, "OPEN THE GAME" , style );
	}
};