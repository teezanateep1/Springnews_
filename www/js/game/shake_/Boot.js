var Shake = {};

Shake.Boot = function(game) {};

Shake.Boot.prototype = {


    preload: function() {

        this.load.image('preloader','./img/game/preloader.gif');
       
    },

    create: function() {

        this.input.maxPointers = 1;
        this.stage.disbleVisibilityChange = false;
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.minWidth = 320;
        this.scale.minHeight = 480;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.stage.forcePortrait = true;

        this.input.addPointer();
        this.stage.backgroundColor = '#000'; //#d3d3d3 //#e1e1e1

        //add flappy bird 2
        this.state.start('Preloader');

    }

}