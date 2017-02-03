window.onload = function() {  
    "use strict";
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    function preload() {
        // Load an image and call it 'logo'.
		game.load.image('cursor','assets/Fire.png');
    }
    
    var crshr;
	
    function create() {
        // Create a sprite at the center of the screen using the 'logo' image.
		crshr = game.add.sprite(game.world.centerX, game.world.centerY, 'cursor');
        // Anchor the sprite at its center, as opposed to its top-left corner.
        // so it will be truly centered.
        crshr.anchor.setTo( 0.5, 0.5 );
        
        
        // Add some text using a CSS style.
        // Center it in X, and position its top 15 pixels from the top of the world.
        var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
        var text = game.add.text( game.world.centerX, 15, "Build something amazing.", style );
        text.anchor.setTo( 0.5, 0.0 );
    }
	
    function update() {
		//Maintain cursor position on mouse
		crshr.x = game.input.mousePointer.x;
		crshr.y = game.input.mousePointer.y
		if(game.input.activePointer.leftButton.isDown){
			crshr.animations.play('cursor'),30,false
		}
    }
};
