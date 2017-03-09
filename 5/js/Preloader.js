
BasicGame.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;

};

BasicGame.Preloader.prototype = {

	preload: function () {

		this.preloadBar = this.add.sprite(300, 400, 'preloaderBar');
		this.load.setPreloadSprite(this.preloadBar);


		this.load.image('titlePage', 'assets/title.png');
		this.load.atlas('playButton', 'assets/play_button.png', 'assets/play_button.json');
		this.load.audio('titleMusic', ['assets/snake.mp3']);
		this.load.audio('stage1',['assets/sneak1.mp3']);
		this.load.audio('stage2',['assets/sneak2.mp3']);

        this.load.tilemap('stage1', 'assets/stage1.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('stage2', 'assets/stage2.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.image('tiles', 'assets/floortile.png');
		
		this.load.spritesheet('player', 'assets/player.png', 25, 25, 1);
		
		this.load.spritesheet('renemy', 'assets/renemy.png', 38, 38, 12);
		this.load.spritesheet('benemy', 'assets/benemy.png', 38, 38, 12);
		this.load.spritesheet('yenemy', 'assets/yenemy.png', 38, 38, 12);
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
