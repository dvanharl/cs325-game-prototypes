window.addEventListener("keydown", function(e){
	if([32,37,38,39,40].indexOf(e.keyCode) > -1) {
		e.preventDefault();
	}
},false);

BasicGame.MainMenu = function (game) {

	this.music = null;
	this.playButton = null;

};

BasicGame.MainMenu.prototype = {

	create: function () {
		//this.music = this.add.audio('titleMusic');
		//this.music.play();

		this.add.sprite(0, 0, 'titlePage');

		this.playButton = this.add.button( 303, 400, 'playButton', this.startGame, this, 'over', 'out', 'down');

	},

	update: function () {

		//	Do some nice funky main menu effect here

	},

	startGame: function (pointer) {

		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
		//this.music.stop();

		//	And start the actual game
		this.state.start('Stage1');

	}

};
