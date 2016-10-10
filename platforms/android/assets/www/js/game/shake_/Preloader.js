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
		this.load.image('backgroundGame','http://artbeat.mfec.co.th/SpringNews_mb/static/game/shake/Background/bg_game.jpg');
		this.load.image('backgroundMain','http://artbeat.mfec.co.th/SpringNews_mb/static/game/shake/Background/bg_main.png');
		this.load.image('logo','http://artbeat.mfec.co.th/SpringNews_mb/static/game/shake/GUI/logo.png');
		this.load.image('buttonplay','http://artbeat.mfec.co.th/SpringNews_mb/static/game/shake/GUI/play.png');
		this.load.image('congrats','http://artbeat.mfec.co.th/SpringNews_mb/static/game/shake/Background/congrats.png');
		this.load.image('but-continue','http://artbeat.mfec.co.th/SpringNews_mb/static/game/shake/Background/button-continue.png');
		this.load.image('icon-power','http://artbeat.mfec.co.th/SpringNews_mb/static/game/shake/GUI/power.png');

		//Object Shake /Reward
		this.load.spritesheet('bag', 'http://artbeat.mfec.co.th/SpringNews_mb/static/game/shake/Player/bagspringnews.png',386, 350);
		this.load.spritesheet('shake', 'http://artbeat.mfec.co.th/SpringNews_mb/static/game/shake/Background/shake.png',350, 250);
		this.load.spritesheet('reward', 'http://artbeat.mfec.co.th/SpringNews_mb/static/game/shake/Player/treasure.png',350, 250);

		//Random
		this.load.image('object1', 'http://artbeat.mfec.co.th/SpringNews_mb/static/game/shake/Background/flare-white-blue-star.png');
	    this.load.image('object2', 'http://artbeat.mfec.co.th/SpringNews_mb/static/game/shake/Background/scene_01_pandulum.png');
	    this.load.image('object3', 'http://artbeat.mfec.co.th/SpringNews_mb/static/game/shake/GUI/bubble.png');
	    this.load.image('object4', 'http://artbeat.mfec.co.th/SpringNews_mb/static/game/shake/Background/star.png');

	    //Sounds
		this.load.audio('spell', 'http://artbeat.mfec.co.th/SpringNews_mb/static/game/shake/Sounds/spell4.wav');


		// this.load.image('buttonplay','images/GUI/button_play.png');
		// this.load.image('title','images/GUI/title.png');
		// this.load.atlasJSONHash('bird', 'images/Player/bird_sprite.png', 'images/Player/bird_sprite.json');
		// this.load.image('pipe','images/Background/scene_01_blockDown.png');
		// this.load.audio('Score','Sounds/Score.mp3');
		// this.load.audio('Hit','Sounds/Hit.mp3');

	},

	create:function() {

		this.asset.cropEnabled = false;

	},
	update:function() {

		this.ready = true;
		this.game.state.start('Menu');
	}

};