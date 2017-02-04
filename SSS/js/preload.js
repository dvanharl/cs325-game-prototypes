/*var preload = function(game){};

preload.prototype = {
	preload: function(){
		var loadBar = this.add.sprite(400,300,"cursor");
		loadBar.anchor.setTo(0.5,0.5);
		this.load.setPreloadSprite(loadBar);
		this.game.load.spritesheet('cursor','assets/Fire.png', 25, 25, 9);
	},
	create:function(){
		this.game.state.start("menu");
	}
};*/

var preload = {
	preload: function(){
		this.game.load.spritesheet('cursor','assets/Fire.png', 25, 25, 9);
		var loadBar = this.add.sprite(400,300,"cursor");
		loadBar.anchor.setTo(0.5,0.5);
		this.load.setPreloadSprite(loadBar);
	},
	create:function(){
		this.game.state.start("menu");
	}
};