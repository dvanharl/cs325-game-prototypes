/*var boot = {};

boot.prototype = {
	preload: function(){
		this.game.load.image("backgroudn","assets/background.jpg");
	},
	create: function(){
		//this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		//this.scale.pageAlignHorizontally = true;
		//this.scale.setScreenSize();
		this.game.state.start("preload");
	}
};*/

var boot = {
	preload: function(){
		this.game.load.image("backgroudn","assets/background.jpg");
	},
	create: function(){
		//this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		//this.scale.pageAlignHorizontally = true;
		//this.scale.setScreenSize();
		this.game.state.start("preload");
	}
};