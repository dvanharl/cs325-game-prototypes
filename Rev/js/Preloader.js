
BasicGame.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;

};

BasicGame.Preloader.prototype = {

	preload: function () {

		//	These are the assets we loaded in Boot.js
		//	A nice sparkly background and a loading progress bar
		this.background = this.add.sprite(0, 0, 'preloaderBackground');
		this.preloadBar = this.add.sprite(300, 400, 'preloaderBar');

		//	This sets the preloadBar sprite as a loader sprite.
		//	What that does is automatically crop the sprite from 0 to full-width
		//	as the files below are loaded in.
		this.load.setPreloadSprite(this.preloadBar);

		//	Here we load the rest of the assets our game needs.
		//	As this is just a Project Template I've not provided these assets, swap them for your own.
		this.load.image('titlePage', 'assets/title.jpg');
		this.load.atlas('playButton', 'assets/play_button.png', 'assets/play_button.json');
		this.load.audio('titleMusic', ['assets/title.mp3']);
		this.load.audio('shoot',['assets/shoot.mp3']);
		this.load.audio('hit',['assets/hit.mp3']);
		this.load.audio('die',['assets/die.mp3']);
		this.load.audio('jump',['assets/jump.mp3']);
		this.load.audio('load',['assets/load.mp3']);
		this.load.audio('game',['assets/game.mp3']);
		this.load.audio('win',['assets/win.mp3']);
		this.load.audio('gameover',['assets/gameover.mp3']);
		//	+ lots of other required assets here
        this.load.image( 'logo', 'assets/phaser.png' );
		this.load.image('worldMap','assets/forestmap.png');
		this.load.image('blackScreen','assets/blackscreen.png');
		this.load.image('whiteScreen','assets/whitescreen.png');
		this.load.image('gameOver','assets/gameover.png');
		this.load.image('win','assets/win.png');
		this.load.image('fog1','assets/fog1.png');
		this.load.image('fog2','assets/fog2.png');
		this.load.image('fog3','assets/fog3.png');
		this.load.image('fog4','assets/fog4.png');
		this.load.image('fog5','assets/fog5.png');
		this.load.image('fog6','assets/fog6.png');
		this.load.image('bg1','assets/movingback1.png');
		this.load.image('bg2','assets/movingback2.png');
		this.load.image('back','assets/back.png');
		this.load.image('sun','assets/sun.png');
		this.load.spritesheet('player','assets/player.png', 100, 100, 19);
		this.load.spritesheet('bullet','assets/bullet.png', 70, 30, 9);
		this.load.spritesheet('enemy','assets/enemy.png',40,40,8);
	},

	create: function () {

		//	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
		this.preloadBar.cropEnabled = false;

	},

	update: function () {

		//	You don't actually need to do this, but I find it gives a much smoother game experience.
		//	Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
		//	You can jump right into the menu if you want and still play the music, but you'll have a few
		//	seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
		//	it's best to wait for it to decode here first, then carry on.
		
		//	If you don't have any music in your game then put the game.state.start line into the create function and delete
		//	the update function completely.
		
		if (this.cache.isSoundDecoded('titleMusic') && this.ready == false)
		{
			this.ready = true;
			this.state.start('MainMenu');
		}

	}

};
