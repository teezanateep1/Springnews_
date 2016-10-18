Shake.Game = function(game) {

};

var bggame = null;

var rewardGroup = null;
var popup,tween;

var spellSound = null,manager = null,emitter1 = null;
var labelScore,score = 5,group_iconPW;
var bag,reward,anim,emitter;
var game = null;
var timeout_ = null;
var xp = ['5','10','20','30'],point = 0;

var effect,pw,ph;
var image;
var mask = new Phaser.Rectangle();

Shake.Game.prototype = {

	create: function (){
        
        game = this;

        bggame = this.game.add.sprite(0,89, 'backgroundGame');
        bggame.width = window.screen.availWidth * window.devicePixelRatio;
        bggame.height = window.screen.availHeight * window.devicePixelRatio -89;

        //Object Shake Bag
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        bag = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY - 300, 'bag');
        bag.anchor.setTo(0.5, 0);
        bag.scale.setTo(1,1);
        bag.y = 400;
        bag.animations.add('bagshake', [0,3,1,0,3,1,0], 7, true);
        this.game.physics.enable(bag, Phaser.Physics.ARCADE);

        //  Here we're passing an array of image keys. It will pick one at random when emitting a new particle.
        emitter = this.game.add.emitter(this.game.world.centerX, this.game.world.centerY - 200, 200);
        emitter.makeParticles(['object1', 'object2', 'object3']);
        emitter.gravity = 100;

        //Sound
        spellSound = this.game.add.audio('spell');

        // //icon
        group_iconPW = game.add.group();
        //  Creates 24 sprites FOR EACH FRAME
        group_iconPW.createMultiple(score, 'icon-power', [0], true);
        //  Align the sprites into rows of 12, by however many we need (the -1 argument)
        //  With 48x48 pixel spacing per sprite
        group_iconPW.align(50, -1, 280, 280);
        group_iconPW.scale.setTo(0.2,0.2);
        group_iconPW.x = 20;
        group_iconPW.y = 140;

        //Reward  You can drag the pop-up window around
        popup = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY-290, 'congrats');
        popup.anchor.set(0.5);
        popup.scale.setTo(-0.5,-3);
        popup.inputEnabled = true;

        //  Position the close button to the top-right of the popup sprite (minus 8px for spacing)
        pw = (popup.width / 2) - 30;
        ph = (popup.height / 2) - 8;
        //  And click the close button to close it down again
        var closeButton = this.game.make.sprite(pw, -ph, 'but-continue');
        closeButton.inputEnabled = true;
        closeButton.input.priorityID = 1;
        closeButton.events.onInputDown.add(this.closeWindow, this);

        //  Add the "close button" to the popup window image
        popup.addChild(closeButton);

        //  Hide it awaiting a click
        popup.scale.set(0);

        //  Pop the window open
        //this.game.input.onDown.add(openWindow, this);

        reward = this.game.add.sprite(pw, -ph, 'reward');
        anim = reward.animations.add('rewardRandom', [0,1,0,1,0,1,0,2], 4,false);
        anim.onComplete.add(this.stopreward, this);
        reward.smoothed = false;
        reward.anchor.setTo(0.13,1);
        reward.scale.setTo(2.2,2.2);
        this.game.physics.enable(reward, Phaser.Physics.ARCADE);
        popup.addChild(reward);

        //window.addEventListener("deviceorientation", this.handleOrientation, true);
         //manager = this.game.plugins.add(Phaser.ParticleStorm);
		
	},
	update: function () {
        this.game.physics.arcade.collide(emitter);   
	},
    stopreward:function(){
        point = xp[Math.floor(Math.random() * xp.length)];
        var textXP = game.add.text(pw, -ph, point+'  XP ');
        textXP.anchor.set(0,6);
        textXP.align = 'center';

        textXP.font = 'Arial Black';
        textXP.fontSize = 75;
        textXP.fontWeight = 'bold';
        textXP.fill = '#ec008c';

        textXP.setShadow(0, 0, 'rgba(0, 0, 0, 0.5)', 0);
        popup.addChild(textXP);
        if (window.navigator && window.navigator.vibrate) {
           navigator.vibrate(500);
        } 
    },
    closeWindow:function() {

        if (tween.isRunning || popup.scale.x === 0)
        {
            return;
        }
        bag.alpha = 1;
        bggame.alpha = 1;
        group_iconPW.removeChild(group_iconPW.children[score-1]);
        score--;
        //  Create a tween that will close the window, but only if it's not already tweening or closed
        tween = game.add.tween(popup.scale).to( { x: 0, y: 0 }, 500, Phaser.Easing.Elastic.In, true);
        alert(point)
    },
    render:function() {

    }
};

    function openWindow() {
        if ((tween && tween.isRunning) || popup.scale.x === 0.6)
        {
            return;
        }
        popup.removeChild(popup.children[2]);
        reward.animations.play('rewardRandom');
        bag.alpha = 0.2;
        bggame.alpha = 0.2;
        //  Create a tween that will pop-open the window, but only if it's not already tweening or open
        tween = game.game.add.tween(popup.scale).to( { x: 0.6, y: 0.6 }, 1500, Phaser.Easing.Elastic.Out, true);
    }


    var onShake = function () {
      // Code fired when a shake is detected
      if(score != 0 ){
           game.game.paused = false;
           bag.animations.play('bagshake');
           emitter.start(true, 3500, null, 15);
           spellSound.play();
           clearTimeout(timeout_) 
           timeout_ = setTimeout(function () {
                   bag.animations.stop(null, true);
                   openWindow()
            }, 3500);
       }else{
         game.game.paused = true;
       }
       
    };

    var onError = function () {
      // Fired when there is an accelerometer error (optional)
        bag.animations.stop(null, true);
        shake.stopWatch();  
    };

    document.addEventListener("deviceready", function () {
        // Start watching for shake gestures and call "onShake"
        shake.startWatch(onShake, 15 , onError );
        document.addEventListener("pause", function() {
           game.game.paused = true;
        }, false);
        document.addEventListener("resume", function() {
           if(score != 0 ){
             game.game.paused = false;
           }else{
             game.game.paused = true;
           }
        }, false);

    }, false);
