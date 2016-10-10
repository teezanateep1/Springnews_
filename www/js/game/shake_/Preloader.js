Shake.Preloader = function(game) {
	this.asset = null;
	this.ready = false;

};

Shake.Preloader.prototype = {

	preload: function() {

		this.asset = this.add.sprite(this.game.world.centerX,this.game.world.centerY,'preloader');
		this.asset.anchor.setTo(0.5, 0.5);
		this.game.forceSingleUpdate = true;

		//Background/Logo/Button
		this.load.image('backgroundGame',path_gm+'shake/Background/bg_game.jpg');
		this.load.image('backgroundMain',path_gm+'shake/Background/bg_main.png');
		this.load.image('logo',path_gm+'shake/GUI/logo.png');
		this.load.image('buttonplay',path_gm+'shake/GUI/play.png');
		this.load.image('congrats',path_gm+'shake/Background/congrats.png');
		this.load.image('but-continue',path_gm+'shake/Background/button-continue.png');
		this.load.image('icon-power',path_gm+'shake/GUI/power.png');

		//Object Shake /Reward
		this.load.spritesheet('bag', path_gm+'shake/Player/bagspringnews.png',386, 350);
		this.load.spritesheet('shake', path_gm+'shake/Background/shake.png',350, 250);
		this.load.spritesheet('reward', path_gm+'shake/Player/treasure.png',350, 250);

		//Random
		this.load.image('object1', path_gm+'shake/Background/flare-white-blue-star.png');
	    this.load.image('object2', path_gm+'shake/Background/scene_01_pandulum.png');
	    this.load.image('object3', path_gm+'shake/GUI/bubble.png');
	    this.load.image('object4', path_gm+'shake/Background/star.png');

	    //Sounds
		this.load.audio('spell', path_gm+'shake/Sounds/spell4.wav');

	},

	create:function() {

		this.asset.cropEnabled = false;

	},
	update:function() {

		this.ready = true;
		this.game.state.start('Menu');
	}

};