
BasicGame.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;

};

BasicGame.Preloader.prototype = {

	preload: function () {

		this.preloadBar = this.add.sprite(300, 400, 'preloaderBar');
		this.load.setPreloadSprite(this.preloadBar);


		this.load.image('titlePage', 'assets/title.jpg');
		this.load.atlas('playButton', 'assets/play_button.png', 'assets/play_button.json');
		//this.load.audio('titleMusic', ['assets/Poppers and Prosecco.mp3']);

        this.load.tilemap('stage1', 'assets/stage1.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.image('tiles', 'floortile.png');
		this.load.spritesheet('player', 'player.png', 25, 25, 1);
	},

	create: function () {

		//	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
		this.preloadBar.cropEnabled = false;

	},

	update: function () {
		if (/*this.cache.isSoundDecoded('titleMusic') && */this.ready == false)
		{
			this.ready = true;
			this.state.start('MainMenu');
		}

	}

};
