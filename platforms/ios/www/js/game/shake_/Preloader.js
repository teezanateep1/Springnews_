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
		this.load.image('backgroundGame',path_gm+'shake/bg_game.png');
		this.load.image('backgroundMain',path_gm+'shake/bg_main.png');

		this.load.image('buttonplay','./img/game/shake/play.png');
		this.load.image('congrats','./img/game/shake/cong.png');
		this.load.image('but-continue','./img/game/shake/but-conti.png');
		this.load.image('icon-power','./img/game/power.png');

		//Object Shake /Reward
		this.load.spritesheet('bag', path_gm+'shake/shake.png',386, 350);
		this.load.spritesheet('shake', './img/game/shake/shake.png',350, 250);
		this.load.spritesheet('reward', './img/game/shake/treasure.png',350, 250);

		//Random
		this.load.image('object1', path_gm+'shake/object1.png');
	    this.load.image('object2', path_gm+'shake/object2.png');
	    this.load.image('object3', path_gm+'shake/object3.png');

	    //Sounds
		this.load.audio('spell','./img/game/shake/spell4.wav');

	},

	create:function() {

		this.asset.cropEnabled = false;

	},
	update:function() {

		this.ready = true;
		this.game.state.start('Menu');
	}

};