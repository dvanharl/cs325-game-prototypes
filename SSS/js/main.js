window.onload = function() {  
    "use strict";
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    function preload() {
        // Load an image and call it 'logo'.
		game.load.spritesheet('cursor','assets/Fire.png', 25, 25, 9);
    }
    
	var crshr;
	var canFire = true;
	
    function create() {
        // Create a sprite at the center of the screen using the 'logo' image.
		crshr = game.add.sprite(400, 300, 'cursor');
        // Anchor the sprite at its center, as opposed to its top-left corner.
        // so it will be truly centered.
        crshr.anchor.setTo( 0.5, 0.5 );
        crshr.animations.add('fire');
        
        // Add some text using a CSS style.
        // Center it in X, and position its top 15 pixels from the top of the world.
        var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
        var text = game.add.text( game.world.centerX, 15, "Build something amazing5.", style );
        text.anchor.setTo( 0.5, 0.0 );
    }
	
    function update() {
		//Maintain cursor position on mouse
		crshr.x = game.input.mousePointer.x;
		crshr.y = game.input.mousePointer.y
		//If mouse is clicked, play cursor animation to display firing
		if(game.input.mousePointer.isDown/* && !crashr.animations('fire').isPlaying()*/ && canFire){
			canFire = false;
			crshr.animations.play('fire', 30, false);
		}
		if(game.input.mousePointer.isUp){
			canFire = true;
		}
    }
};
