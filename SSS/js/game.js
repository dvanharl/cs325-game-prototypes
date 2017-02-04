var game = function(game){}

game.prototype = {
	create: function(){
		crshr = game.add.sprite(400, 300, 'cursor');
        // Anchor the sprite at its center, as opposed to its top-left corner.
        // so it will be truly centered.
        crshr.anchor.setTo( 0.5, 0.5 );
        crshr.animations.add('fire');
		
		var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
        var text = game.add.text( game.world.centerX, 15, "Build something amazing5.", style );
        text.anchor.setTo( 0.5, 0.0 );
	},
	update: function(){
		//Maintain cursor position on mouse
		crshr.x = game.input.mousePointer.x;
		crshr.y = game.input.mousePointer.y
		//If mouse is clicked, play cursor animation to display firing
		if(game.input.mousePointer.isDown/* && !crashr.animations('fire').isPlaying()*/ && canFire){
			canFire = false;
			crshr.animations.play('fire', 60, false);
		}else if(game.input.mousePointer.isUp){
			canFire = true;
		}
	},
	gameOver: function(){
		this.game.state.start("GameOver");
		
	}