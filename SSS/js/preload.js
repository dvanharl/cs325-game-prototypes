var preload = function(game){}

preload.prototype = {
	preload: function(){
		this.game.load.spritesheet('cursor','assets/Fire.png', 25, 25, 9);
	},
	create:function(){
		this.game.state.start("Menu");
	}
}