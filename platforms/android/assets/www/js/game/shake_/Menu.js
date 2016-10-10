Shake.Menu = function(game) {
	this.startBG;
	this.startButton;
	this.text;
};

Shake.Menu.prototype = {
	 
	preload:function() {

	},
	create:function() {
		//backgroundMain
		startBG = this.game.add.sprite(0,0,'backgroundMain');
		startBG.width = window.screen.availWidth * window.devicePixelRatio
		startBG.height = window.screen.availHeight * window.devicePixelRatio

		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		
		//Object Shake
		shakeMenu = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY - 300, 'shake');
		shakeMenu.anchor.setTo(0.5, -0.5);
		shakeMenu.scale.setTo(1,1);
		shakeMenu.animations.add('shakeshake', [0,1,2,2,1,0], 6, true);
		this.game.physics.enable(shakeMenu, Phaser.Physics.ARCADE);

		//Text
		text = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "Spring Game");
	    //  Centers the text
	    text.anchor.set(0.5,3.5);
	    text.align = 'center';
	    text.inputEnabled = true;  
	    text.events.onInputDown.add(this.startClick, this);
	    //  Our font + size
	    text.font = 'Arial';
	    text.fontWeight = 'bold';
	    text.fontSize = 85;

	    //  Here we create a linear gradient on the Text context.
	    //  This uses the exact same method of creating a gradient as you do on a normal Canvas context.
	    var grd = text.context.createLinearGradient(0, 0, 0, text.height);

	    //  Add in 2 color stops
	    grd.addColorStop(0, '#ffd42a');   
	    grd.addColorStop(1, '#f79514');

	    //  And apply to the Text
	    text.fill = grd;

	    //Button Start Game
		startButton = this.game.add.button(this.game.world.centerX, this.game.world.centerY + 70, 'buttonplay', this.startClick, this);
		startButton.anchor.setTo(0.5, -0.5);
		startButton.scale.setTo(0.8, 0.8);

		this.game.state.start('Game');
	},
	update:function() {
		shakeMenu.animations.play('shakeshake');
	},
	startClick:function() {
		var go = this;
		this.game.add.tween(startBG).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true).onComplete.add(function (currentTarget, currentTween) {
	    	go.game.state.start('Game');
	    });
	    this.game.add.tween(shakeMenu).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
	    this.game.add.tween(text).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
	    this.game.add.tween(startButton).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
	},
	render:function() {
		// this.game.debug.spriteInfo(shakeMenu, 32, 302);
	 //    this.game.debug.text('angularVelocity: ' + shakeMenu.body.angularVelocity, 32, 200);
	 //    this.game.debug.text('angularAcceleration: ' + shakeMenu.body.angularAcceleration, 32, 232);
	 //    this.game.debug.text('angularDrag: ' + shakeMenu.body.angularDrag, 32, 264);
	 //    this.game.debug.text('deltaZ: ' + shakeMenu.body.deltaZ(), 32, 296);
	}

};