angular.module('starter.controllers', ['ngOpenFB'])

.controller('AppCtrl', function($scope,$rootScope, $ionicModal, $timeout, $ionicPopup, $http ,$window, $location, md5,$localStorage,ngFB,$cordovaOauth,$ionicSideMenuDelegate) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
 
 window.addEventListener('native.keyboardhide', keyboardHideHandler);

  function keyboardHideHandler(e){
    ionic.Platform.fullScreen(true,false);
    if (window.StatusBar) {
      StatusBar.hide();
    }
  }
 // -------------- MEnu // SubMEnu ---
 $scope.menu_toggle = true;
 $scope.link = $location.path();
  $scope.cl_link = function (argument) {
    if(argument == "mo" || argument == "tu" || argument == "we" || argument == "th" || argument == "fa" || argument == "sa" || argument == "su"){
      $scope.link = '/app/schedule';
      $scope.sublink_schedule = argument;
      $scope.sublink_aboutUs = false;
      $scope.submenu_aboutUs = false;
      $scope.sublink_activity = false;
      $scope.submenu_activity = false;
    }
    else if(argument == "vision" || argument == "history" || argument == "contact" || argument == "introduce"){
      $scope.link = '/app/contact_';
      $scope.sublink_aboutUs = argument;
      $scope.sublink_schedule = false;
      $scope.submenu_schedule = false;
      $scope.sublink_activity = false;
      $scope.submenu_activity = false;
    }
    else if(argument == "activity" || argument == "shake" || argument == "360" || argument == "quiz"){
      $scope.link = '/app/activity_';
      $scope.sublink_activity = argument;
      $scope.sublink_schedule = false;
      $scope.submenu_schedule = false;
      $scope.sublink_aboutUs = false;
      $scope.submenu_aboutUs = false;
    }else{
      $scope.link = argument;
      $scope.sublink_schedule = argument;
      $scope.submenu_schedule = false;
      $scope.sublink_aboutUs = argument;
      $scope.sublink_aboutUs = false;
    }
  
  }

  // -------------- MEnu // SubMEnu ---
  $scope.menu_toggle = true;
  $scope.submenu_schedule = false;
  $scope.toggleSchedule = function (x) {
    if(x == true){
      $scope.menu_toggle = false;
      $scope.submenu_schedule = true;
      $scope.menu_toggle_ = true;
    }else{
      $scope.menu_toggle = true;
      $scope.submenu_schedule = false;
    }
  }
  $scope.menu_toggle_ = true;
  $scope.submenu_aboutUs = false;
  $scope.toggleAboutUs = function (x) {
    if(x == true){
      $scope.menu_toggle_ = false;
      $scope.submenu_aboutUs = true;
      $scope.menu_toggle = true;
    }else{
      $scope.menu_toggle_ = true;
      $scope.submenu_aboutUs = false;
    }
  }
  $scope.menu_toggle_act = true;
  $scope.submenu_activity = false;
  $scope.toggleActivity = function (x) {
    if(x == true){
      $scope.menu_toggle_act = false;
      $scope.submenu_activity = true;
      $scope.menu_toggle = true;
    }else{
      $scope.menu_toggle_act = true;
      $scope.submenu_activity = false;
    }
  }

  //---------------- Search ----------
  var timeoutID=null;  
  $scope.showMydict = function(keyword,event){  
    if(keyword.length>2 && event.keyCode!=8){ 
        timeoutID=$timeout(function(){ 
           $window.location.href = ('#/app/search/'+keyword);
            if ($ionicSideMenuDelegate.isOpen()) {
              $ionicSideMenuDelegate.toggleLeft(false); // close
            }
        },1500); // เริ่มทำงานน 2 วินาที // 1000 เท่ากับ 1 วินาที  
    }  
  };  
  $scope.setkeyword = function(){  
      $timeout.cancel(timeoutID);
  };  

  // Form data for the login modal
  // $rootScope.loginData = {};
  // $rootScope.user  = {};
  $rootScope.icon = "right";

  // alert("localStorage.logined AppCtrl "+$localStorage.logined);
  if($localStorage.logined){
     $localStorage.img = "./img/default_user.png";
     $scope.user.img = $localStorage.img;
     $scope.profile = true;
     $scope.login_ = false;
     $scope.logout_ = true;
  }else{
     // $scope.profile = true;
     $scope.profile = false;
     $scope.login_ = true;
     $scope.logout_ = false;
  }

  //Open the logout 
  $scope.logout = function() {

    var query = "UPDATE User SET login_stat = 0 WHERE id = 1";
    $cordovaSQLite.execute(db, query,[]).then(function(res) {
        console.log("UPDATE ID -> " + JSON.stringify(res));
    }, function (err) {
        console.error(err);
    });

    $localStorage.logined = false;
    $scope.profile = false;
    $scope.login_ = true;
    $scope.logout_ = false;

  }

  
})

// --------------------- HOME ------------------------
.controller('HomeCtrl', function($scope, $stateParams, SpringNews, $ionicSlideBoxDelegate,_function, $ionicModal,$ionicLoading,$cordovaSocialSharing,$ionicScrollDelegate, $ionicNavBarDelegate, $timeout, ConnectivityMonitor) { //admobSvc

 
  $ionicLoading.show();
  $scope.adver = [];

  $scope.news = [];  
  $scope.newsupdate = []; //title & date
  $scope.loading_newsupdate = true;

  $scope.hots = [];
  $scope.newshot = [];
  $scope.loading_newshot = true;

  $scope.clips = [];
  $scope.loading_clip = true;

  $scope.newsCategory = [];
  $scope.loading_catnews = true;

  $scope.tabs = [];
  $scope.oils = [];
  $scope.parts = [];
  $scope.thaigolds = [];

 // $timeout(function(){
    SpringNews._advertise($scope,'14');
    SpringNews._newsupdate($scope,'ข่าวเด่น'); 
    SpringNews._newshot($scope,'ประเด็นร้อน');
    SpringNews._clips($scope,'30','4'); 
    SpringNews._category($scope,'889');
    SpringNews._oil($scope);
    SpringNews._part($scope);
    SpringNews._thaigold($scope);
  // },3000);
  
  //วันที่
  $scope.date = function(d){
    if(d != undefined){
      return _function._date(d.substring(0, 10),d.substring(12, 16));
    }else{ return ""; }
  }
  //rendom
  $scope.random = function() {
    return 0.5 - Math.random();
  }
  //replace
  $scope.replace = function (str) {
    if(str != undefined){
      return str.replace(/(<([^>]+)>)/ig,"");
    }else{ return ""; }
  }
  //substring
  $scope.substring = function(str){
    if(str.length > 50){
      return str.substring(0, 50)+"...";
    }else{
      return str;
    } 
  }
  //refresh
  $scope.refresh = function(){    
    SpringNews._oil($scope);
    SpringNews._part($scope);
    SpringNews._thaigold($scope);
  }
  //Show Silde News
  $scope._slideHasChanged_newsupdate = function($index) {
    $scope.newsupdate.title = $scope.news[$index].post_title;
    $scope.newsupdate.date = _function._date($scope.news[$index].post_date.substring(0, 10),$scope.news[$index].post_date.substring(12, 16));
    $ionicSlideBoxDelegate.update();
    $ionicSlideBoxDelegate.loop(true); 
  }
  $scope._slideHasChanged_HotNews = function ($index) {
    $scope.newshot.title = $scope.hots[$index].post_title;
    $scope.newshot.date = _function._date($scope.hots[$index].post_date.substring(0, 10),$scope.hots[$index].post_date.substring(12, 16));
    $ionicSlideBoxDelegate.update();
    $ionicSlideBoxDelegate.loop(true); 
  }
  //------------\\
  //------------ Silde Tab
  var arr = [];
  $scope.onSlideMove = function(data){
    if(data.index != '0' && data.index != $scope.tabs.length+1 ){ 
      if(arr.indexOf(data.index-1) == "-1"){
        arr.push(data.index-1);
        $scope.loading_catnews = true;
        SpringNews._catNews($scope,$scope.tabs[data.index-1].term_id,0);
      }
    }
  }
  
   //------ Popup Social
  $scope.message = '';
  $scope.img = '';
  $scope.url = '';

  $scope.share = function(title,url){
    $scope.title_ = title
    $scope.url = url
    $cordovaSocialSharing
    .share($scope.title_, null,null, $scope.url) // Share via native share sheet
    .then(function(result) {
      // Success!
    }, function(err) {
      alert("Error");
    });
  };
  //-----------\\ 
  // ------ loadMore Data -----
  $scope.loadMore = function(id,length){  
    $ionicLoading.show();
    SpringNews._catNews($scope,id,length+1);
  };
  // ------------------------
})


// --------------------- HOMETEST ------------------------
.controller('HometestCtrl', function($scope, $stateParams, SpringNews, $ionicSlideBoxDelegate,_function, $ionicModal,$ionicLoading,$cordovaSocialSharing,$ionicScrollDelegate, $ionicNavBarDelegate, $timeout, ConnectivityMonitor) { //admobSvc

 
  $ionicLoading.show();
  $scope.adver = [];

  $scope.news = [];  
  $scope.newsupdate = []; //title & date
  $scope.loading_newsupdate = true;

  $scope.hots = [];
  $scope.newshot = [];
  $scope.loading_newshot = true;

  $scope.clips = [];
  $scope.loading_clip = true;

  $scope.newsCategory = [];
  $scope.loading_catnews = true;

  $scope.tabs = [];
  $scope.oils = [];
  $scope.parts = [];
  $scope.thaigolds = [];

 // $timeout(function(){
    SpringNews._advertise($scope,'14');
    SpringNews._newsupdate($scope,'ข่าวเด่น'); 
    SpringNews._newshot($scope,'ประเด็นร้อน');
    SpringNews._clips($scope,'30','4'); 
    SpringNews._category($scope,'889');
    SpringNews._oil($scope);
    SpringNews._part($scope);
    SpringNews._thaigold($scope);
  // },3000);
  
  //วันที่
  $scope.date = function(d){
    if(d != undefined){
      return _function._date(d.substring(0, 10),d.substring(12, 16));
    }else{ return ""; }
  }
  //rendom
  $scope.random = function() {
    return 0.5 - Math.random();
  }
  //replace
  $scope.replace = function (str) {
    if(str != undefined){
      return str.replace(/(<([^>]+)>)/ig,"");
    }else{ return ""; }
  }
  //substring
  $scope.substring = function(str){
    if(str.length > 50){
      return str.substring(0, 50)+"...";
    }else{
      return str;
    } 
  }
  //refresh
  $scope.refresh = function(){    
    SpringNews._oil($scope);
    SpringNews._part($scope);
    SpringNews._thaigold($scope);
  }
  //Show Silde News
  $scope._slideHasChanged_newsupdate = function($index) {
    $scope.newsupdate.title = $scope.news[$index].post_title;
    $scope.newsupdate.date = _function._date($scope.news[$index].post_date.substring(0, 10),$scope.news[$index].post_date.substring(12, 16));
    $ionicSlideBoxDelegate.update();
    $ionicSlideBoxDelegate.loop(true); 
  }
  $scope._slideHasChanged_HotNews = function ($index) {
    $scope.newshot.title = $scope.hots[$index].post_title;
    $scope.newshot.date = _function._date($scope.hots[$index].post_date.substring(0, 10),$scope.hots[$index].post_date.substring(12, 16));
    $ionicSlideBoxDelegate.update();
    $ionicSlideBoxDelegate.loop(true); 
  }
  //------------\\
  //------------ Silde Tab
  var arr = [];
  $scope.onSlideMove = function(data){
    if(data.index != '0' && data.index != $scope.tabs.length+1 ){ 
      if(arr.indexOf(data.index-1) == "-1"){
        arr.push(data.index-1);
        $scope.loading_catnews = true;
        SpringNews._catNews($scope,$scope.tabs[data.index-1].term_id,0);
      }
    }
  }
  
   //------ Popup Social
  $scope.message = '';
  $scope.img = '';
  $scope.url = '';

  $scope.share = function(title,url){
    $scope.title_ = title
    $scope.url = url
    $cordovaSocialSharing
    .share($scope.title_, null,null, $scope.url) // Share via native share sheet
    .then(function(result) {
      // Success!
    }, function(err) {
      alert("Error");
    });
  };
  //-----------\\ 
  // ------ loadMore Data -----
  $scope.loadMore = function(id,length){  
    $ionicLoading.show();
    SpringNews._catNews($scope,id,length+1);
  };
  // ------------------------
})

// --------------------- HISTORY ------------------------
.controller('HistoryCtrl', function($scope,_function,SpringNews) {
    $scope.history = []; 
    $scope.adver = [];
    SpringNews._pages_history($scope); 
})

// --------------------- VISION ------------------------
.controller('VisionCtrl', function($scope,SpringNews) {
    $scope.vision = []; 
    $scope.adver = [];
    SpringNews._pages_vision($scope); 
})

// --------------------- CONTACT ------------------------
.controller('ContentCtrl', function($scope,$cordovaFileTransfer,$ionicLoading,SpringNews) { 
    $scope.contact = []; 
    $scope.contactImg = [];
    $scope.adver = [];
    $scope.link = [];
    SpringNews._pages_contact($scope); 
    // SpringNews._advertise($scope,'14');
    $scope.location = function(){
      if (ionic.Platform.isIOS()) {
          window.open(
           'http://maps.apple.com/?daddr=Spring+News&dirflg=d&t=n',
            '_system' // <- This is what makes it open in a new window.
          );
      } 
      else{
          window.open(
            'google.navigation:q=SpringNews+Corporation+Co.,+Ltd.+Vibhavadi+Rangsit+Rd,+Lat+Yao,+Khet+Chatuchak,+Krung+Thep+Maha+Nakhon+10900&avoid=tf',
            '_system' // <- This is what makes it open in a new window.
          );
      };

    }

    $scope.dowloadMap = function(str){

      var url = str.split(/src="?"/g)[1].replace(/<\/p><\/center>/g,'').substr(0,70);
      var uri = encodeURI(url);
      var trustHosts = true;
      var options = {};

      if (ionic.Platform.isIOS()) {

        window.open(
           url,
            '_system' // <- This is what makes it open in a new window.
          );

      } 
      else{
        
        var targetPath = cordova.file.externalRootDirectory + "Download/"+url.substr(url.lastIndexOf('/') + 1);

        $ionicLoading.show({
            template: 'Loading...'
        });
        $cordovaFileTransfer.download(uri, targetPath, options, trustHosts)
          .then(function(result) {
             $ionicLoading.hide();
               alert("Success");
          }, function(err) {
             $ionicLoading.hide();
               alert("Error");
          }, function (progress) {
            //$cordovaProgress.showDeterminate(false, (progress.loaded / progress.total) * 100)
            // $timeout(function () {
            //   $scope.downloadProgress = (progress.loaded / progress.total) * 100;
            // });
        });
      };
        
    }
     

})

// --------------------- INTRODUCE ------------------------
.controller('IntroduceCtrl', function($scope,SpringNews) {
    $scope.submitForm = function(){
       SpringNews._email(this.intro); 
       this.intro = null;
    }
    $scope.submitForm2 = function(){
       SpringNews._email(this.user); 
       this.user = null;
    }  
})

// --------------------- LIVE TV ------------------------
.controller('LivetvCtrl', function($scope,_function,SpringNews,$cordovaSocialSharing, $ionicPopup) { //admobSvc

  $scope.schedules = []; 
  $scope.sharingPlugin = '';
  $scope.loading_schedule = true;
  SpringNews._schedulesNow($scope); 
  _function._jwTV();
  $scope.$on('$ionicView.afterLeave', function(){
    screen.lockOrientation('portrait');
  });
  $scope.$on('$ionicParentView.beforeEnter', function(){
    screen.unlockOrientation();
  });
  
  $scope.sharing = function(){

    $cordovaSocialSharing
    .share("Live TV",null,"http://www.springnews.co.th/live") // Share via native share sheet
    .then(function(result) {
      // Success!
    }, function(err) {
        $ionicPopup.alert({
           title: 'An error occurred.'
        });
    });
  }
  $scope.date = function(d){
    if(d != undefined){
      return _function._date(d.substring(0, 10),'');
    }else{ return ""; }
  }
  $scope.tagTable = function (str) {
    return str.replace(/(<([^>]+)>)/ig,"");
  }
  $scope.tagTable_img = function (str) {
    return str.split(/(<img.*?>)/)[1];
  }

})

// --------------------- LIVE RADIO ------------------------
.controller('LiveradioCtrl', function($scope,_function,SpringNews,$cordovaSocialSharing,$ionicPopup,$timeout) {
    
    _function._jwRadio();
    SpringNews._advertise($scope,'14'); 
    $scope.play = true;
    $scope.stop = false;
    $scope.range = false;
    $scope.data= {
      min: 0,
      max: 100,
      value: 80
    };

    $scope.myChange = function(val){
       jwplayer().setVolume(val)
    }
    $scope.Range = function(){
    
      if($scope.range == false){
        $scope.range = true;
      }else{
        $scope.range = false;
      }
      $timeout(function() {
        jwplayer().setVolume($scope.data.value)
      }, 1);
    }
    $scope.toggleCustom = function(){
      if($scope.play == true){
        $scope.play = false;
        $scope.stop = true;
      }else{
        $scope.play = true;
        $scope.stop = false;
      }
    }
    $scope.share = function (){
      $cordovaSocialSharing
      .share("Live Radio",null,null,"http://www.springnews.co.th/radio")
      .then(function(result) {
        // Success!
      }, function(err) {
        // An error occurred. Show a message to the user
        $ionicPopup.alert({
           title: 'An error occurred.'
         });
      });
    }
})

// --------------------- CLIP ------------------------
.controller('ClipCtrl', function($scope,_function,SpringNews,_function,$stateParams,$cordovaSocialSharing,$timeout,$ionicLoading) {
  $scope.clips = [];
  $scope.clips_loop = [];
  $scope.title = $stateParams.title;
  $ionicLoading.show();

    SpringNews._advertise($scope,'14'); 
    SpringNews._clips($scope,'30',''); 
  //วันที่
  $scope.date = function(d){
    if(d != undefined){
      return _function._date(d.substring(0, 10),d.substring(12, 16));
    }else{ return ""; }
  }
  //substring
  $scope.substring = function(str){
    if(str.length > 65){
      return str.substring(0, 65)+"...";
    }else{
      return str;
    } 
  }

  $scope.share = function (title,url){
      $scope.title_ = title
      $scope.url = url
      $cordovaSocialSharing
      .share($scope.title_,null,null,$scope.url)
      .then(function(result) {
        // Success!
      }, function(err) {
        // An error occurred. Show a message to the user
        $ionicPopup.alert({
           title: 'An error occurred.'
         });
      });
  }

})

// --------------------- PROGRAM ------------------------
.controller('ProgramCtrl', function($scope,_function,SpringNews,$ionicSlideBoxDelegate,$ionicLoading,$cordovaSocialSharing) {
  
  $scope.tabs = [];
  $scope.newsCategory = [];
  $scope.loading_catnews = true;
  $ionicLoading.show();
  SpringNews._categoryProgram($scope,'30');

  //------------ Silde Tab
  var arr = [0];
  //SpringNews._catNews($scope,$scope.tabs[0].term_id,0);
  $scope.onSlideMove = function(data){  
    if(arr.indexOf(data.index) == "-1"){
      arr.push(data.index);
      $scope.loading_catnews = true;
      SpringNews._programNews($scope,$scope.tabs[data.index].term_id,0);
    }
  }

  //substring
  $scope.substring = function(str){
    if(str.length > 65){
      return str.substring(0, 65)+"...";
    }else{
      return str;
    } 
  }

  $scope.$on('$ionicView.beforeEnter', function() {
    $ionicSlideBoxDelegate.update();
  });

})

// --------------------- Schedule ------------------------
.controller('ScheduleCtrl', function($scope,SpringNews,$stateParams,$cordovaLocalNotification,$timeout,$ionicLoading) {
  $scope.schedules = []; 
  $scope.schedulesActive = [];
  $scope.loading_schedule = true;
  SpringNews._schedules($scope,$stateParams.scheId); 
  $scope.schedulesActive = window.localStorage.getItem('Notification');
  $ionicLoading.show();
  
  $scope.LocalNotification = function(id,title,hour,min,event){
    var days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    var today = new Date();
    var today_day = today.getDay();
    var day = days[$stateParams.scheId];
    day = day.toLowerCase();
    for (var i = 7; i--;) {
        if (day === days[i]) {
            day = (i <= today_day) ? (i + 7) : i;
            break;
        }
    }
    var daysUntilNext = day - today_day;
    var alarmTime = new Date();
    // alarmTime.setMinutes(alarmTime.getMinutes() + 1);
    if($stateParams.scheId == today_day && hour == today.getHours()){
      if( (min-today.getMinutes()) >= 0){
        alarmTime.setHours(hour, min, 0);
      }else{
        alarmTime.setDate(today.getDate() + daysUntilNext);
        alarmTime.setHours(hour, min, 0);
      }
    }else if($stateParams.scheId == today_day && hour > today.getHours()){
      alarmTime.setHours(hour, min, 0);
    }
    else{
      alarmTime.setDate(today.getDate() + daysUntilNext);
      alarmTime.setHours(hour, min, 0);
    }

    
    if(angular.element(event.target).hasClass('active')){
      angular.element(event.target).removeClass('active');
      $cordovaLocalNotification.cancel(id, function() {});
      $timeout(function(){ 
        $cordovaLocalNotification.getAllIds().then(function(result){
          window.localStorage.setItem('Notification', JSON.stringify(result))
        });
      },1000); 
    }else{
      angular.element(event.target).addClass('active');
       $cordovaLocalNotification.add({
          id: id,
          at: alarmTime,
          message: "แตะเพื่อดูข้อมูล",
          title: title,
          autoCancel: true
        }).then(function () {
          console.log("The notification has been set");
        });
        $cordovaLocalNotification.getAllIds().then(function(result){
          window.localStorage.setItem( 'Notification', JSON.stringify(result))
        });
    }

  }
  $scope.tagTable = function (str) {
    if(str != undefined){
      return str.replace(/(<([^>]+)>)/ig,"");
    }else{
      return "";
    }
  }
  $scope.tagTable_img = function (str) {
    if(str != undefined){
     return str.split(/(<img.*?>)/)[1];
    }else{
      return "";
    }
  }

})

// --------------------- Activity ------------------------
.controller('ActivityCtrl', function($scope,_function,SpringNews,$cordovaSQLite) {
  $scope.activity = [];
  SpringNews._pages_activity($scope); 

})
//==== shake
.controller('ShakeCtrl', function($scope) {
  var game = new Phaser.Game(window.screen.availWidth * window.devicePixelRatio, window.screen.availHeight * window.devicePixelRatio, Phaser.AUTO, 'game');
      game.state.add('Boot', Shake.Boot);
      game.state.add('Preloader', Shake.Preloader);
      game.state.add('Menu',Shake.Menu);
      game.state.add('Game', Shake.Game);
      game.state.start('Boot');
})
//==== 360
.controller('PanoGMCtrl', function($scope,$timeout,$window,$interval,SpringNews) {

      var seconds=60, num_gm = 0, play = false,myTimeOut, mouse;
      var camera, scene, renderer, mesh, controls ;
      var particles, materials_obj, i, h, color, sprite, imgX, imgY, loader;
      var parameters_obj, raycaster, objects = [], glitchPass, composer;
      var isUserInteracting = false,
      onMouseDownMouseX = 0, onMouseDownMouseY = 0,
      lon = 0, onMouseDownLon = 0,
      lat = 0, onMouseDownLat = 0,
      phi = 0, theta = 0;
      $scope.countdown = seconds;
      $scope.gm_power = window.localStorage.getItem("gm_power");
      $scope.gm_xp = '../img/game/5xp.png';

      var blocker = document.getElementById( 'blocker' );
      var container = document.getElementById( 'container' );
      var instructions = document.getElementById( 'instructions' );
      var start = document.getElementById( 'start' );
      var start_ = document.getElementById( 'start_' );

      document.getElementById("obj_gm").style.visibility = "hidden";
      document.getElementById("countdown").style.visibility = "hidden";
      document.getElementById("game_over").style.visibility = "hidden";
      document.getElementById("game_compl").style.visibility = "hidden";

      instructions.addEventListener( 'click', function ( event ) {
         object()
          document.getElementById("obj_gm").style.visibility = "visible";
          document.getElementById("countdown").style.visibility = "visible";
          myTimeOut = $timeout($scope.onTimeout,1000);
          instructions.style.display = 'none';
          blocker.className = '';
          play = true;
      }, false );

      start.addEventListener( 'click', function ( event ) {
          $scope.gm_power--;
          $scope.gm_power = window.localStorage.setItem("gm_power", $scope.gm_power);
          $window.location.reload(true)
      }, false );

      start_.addEventListener( 'click', function ( event ) {
          $window.location.reload(true)
      }, false );

      init();
      animate();

      function init() {

        camera = new THREE.PerspectiveCamera( 85, window.innerWidth / window.innerHeight, 1, 1000 );
        camera.target = new THREE.Vector3( 0, 0, 0 );
        controls = new THREE.DeviceOrientationControls( camera );

        scene = new THREE.Scene();
        scene.fog = new THREE.Fog( 0x050505, 2000, 3500 );

        var geometry = new THREE.SphereGeometry( 500, 60, 40 );
        geometry.scale( - 1, 1, 1 );

        var loader_bg = new THREE.TextureLoader();

          loader_bg.load(
              // resource URL
              path_gm+'panoGM/360_game_'+Math.round(Math.random() * 3)+'.png',
              // Function when resource is loaded
              function ( texture ) {
                // do something with the texture
                var material = new THREE.MeshBasicMaterial( {
                  map: texture 
                } );

                mesh = new THREE.Mesh( geometry, material );
                scene.add( mesh );
              },
              // Function called when download progresses
              function ( xhr ) {
                if((xhr.loaded / xhr.total * 100) == 100){
                 document.getElementById("loading").style.visibility = "hidden";
                }
              },
              // Function called when download errors
              function ( xhr ) {
                console.log( 'An error happened' );
              }
            );
        
        renderer = new THREE.WebGLRenderer();
        renderer.setClearColor( scene.fog.color );
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        container.appendChild( renderer.domElement );
        // ========================
        raycaster = new THREE.Raycaster();
        mouse = new THREE.Vector2();
        // ========================
        // postprocessing
        composer = new THREE.EffectComposer( renderer );
        composer.addPass( new THREE.RenderPass( scene, camera ) );

        glitchPass = new THREE.GlitchPass();
        glitchPass.renderToScreen = true;
        composer.addPass( glitchPass );
    
        document.addEventListener( 'mousedown', onDocumentMouseDown, false );
        window.addEventListener( 'resize', onWindowResize, false );
      }

      function object(){
        loader = new THREE.TextureLoader();
        var sprite1 = path_gm+'panoGM/object1.png';
        var sprite2 = path_gm+'panoGM/object2.png';
        var sprite3 = path_gm+'panoGM/object3.png';
        var sprite4 = path_gm+'panoGM/object4.png';
        var sprite5 = path_gm+'panoGM/object5.png';

          parameters_obj = [
              [sprite1 ],
              [sprite2 ],
              [sprite3 ],
              [sprite4 ],
              [sprite5 ]
          ];

          for ( i = 0; i < 8; i ++ ) {
            sprite = parameters_obj[Math.round(Math.random() * 4)][0];
            loader.load(
              // resource URL
              sprite,
              // Function when resource is loaded
              function ( texture ) {
                // do something with the texture
                materials_obj = new THREE.MeshBasicMaterial({ //CHANGED to MeshBasicMaterial
                    map:texture,
                    depthTest: false,
                    transparent : true
                  });
                materials_obj.map.minFilter = THREE.LinearFilter;

                particles = new THREE.Mesh( new THREE.CubeGeometry(50,50,0), materials_obj );
                particles.position.x = (Math.random() - 0.5) * 500;
                particles.position.y = (Math.random() - 0.5) * 500;
                particles.position.z = (Math.random() - 0.5) * 500;
                particles.name = 'item_'+i;

                scene.add( particles );
                objects.push( particles );
                document.getElementById( 'obj_gm' ).innerHTML = num_gm+"/5"
              },
              // Function called when download progresses
              function ( xhr ) {
                console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
              },
              // Function called when download errors
              function ( xhr ) {
                console.log( 'An error happened' );
              }
            );
          }
      }

      function onWindowResize() {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );
        composer.setSize( window.innerWidth, window.innerHeight );

      }

      function onDocumentMouseDown( event ) {
     
        event.preventDefault();

         var mouse3D = new THREE.Vector3( ( event.clientX / window.innerWidth ) * 2 - 1,   //x
                                        -( event.clientY / window.innerHeight ) * 2 + 1,  //y
                                        0.5);      

        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
        raycaster.setFromCamera( mouse, camera );
        raycaster.setFromCamera( mouse3D.clone(), camera );
         
        $scope.object_gm = obj_gm;
        var intersects = raycaster.intersectObjects( objects ); 

        if ( intersects.length > 0 && seconds !=0 ){
            num_gm++;
            scene.remove(intersects[0].object);
            objects.pop()
            document.getElementById( 'obj_gm' ).innerHTML = num_gm+"/5"
            if (window.navigator && window.navigator.vibrate) {
               // Check Supported!
               navigator.vibrate(500);
            } 
        }
      }

      function animate() {
        controls.update();  
        requestAnimationFrame( animate );
        render_();
      }

      function render_() {

        var time = Date.now() * 0.00005;
        if ( isUserInteracting === false ) {lon += 0.1;}

        lat = Math.max( - 85, Math.min( 85, lat ) );
        phi = THREE.Math.degToRad( 90 - lat );
        theta = THREE.Math.degToRad( lon );

        if (num_gm == 5) { 
          $timeout.cancel(myTimeOut); 
          document.getElementById("obj_gm").style.visibility = "hidden";
          document.getElementById("countdown").style.visibility = "hidden";
          document.getElementById("game_over").style.visibility = "hidden";
          document.getElementById("game_compl").style.visibility = "visible";
          blocker.className = 'bg-color';
          play = false;
        }

        if(play == false){
          camera.target.x = 500 * Math.sin( phi ) * Math.cos( theta );
          camera.target.y = 500 * Math.cos( phi );
          camera.target.z = 500 * Math.sin( phi ) * Math.sin( theta );

          camera.lookAt( camera.target );
        }

        if ($scope.countdown==0) {
          composer.render()
          var width = window.innerWidth || 1;
          var height = window.innerHeight || 1;
        }else{renderer.render( scene, camera );} 

      }

      $scope.onTimeout = function(){ //function ใช้ในการ นับถอยหลัง
        seconds--;
        $scope.countdown =seconds; 
        if (seconds==0) {
          document.getElementById("obj_gm").style.visibility = "hidden";
          document.getElementById("countdown").style.visibility = "hidden";
          document.getElementById("game_compl").style.visibility = "hidden";
          document.getElementById("game_over").style.visibility = "visible";
          document.getElementById("xp").innerHTML = num_gm+" XP";
          SpringNews._intxp(1,num_gm);
          blocker.className = 'bg-color';
          play = false;
        }
        if (seconds>0) { myTimeOut = $timeout($scope.onTimeout,1000);}
      }
})

// --------------------- Search ------------------------
.controller('SearchCtrl', function($scope,$http,$timeout,$stateParams,$ionicSideMenuDelegate,_function,SpringNews) {
   var timeoutID=null;  
    $scope.dict_result=[]; 
    $scope.showloading=false;  
    $scope.keyword = $stateParams.key;
    SpringNews._search($scope,$stateParams.key);
    if ($ionicSideMenuDelegate.isOpen()) {
      $ionicSideMenuDelegate.toggleLeft(false); // close
    }
    $scope.showMydict = function(keyword,event){  
      if(keyword.length>2 && event.keyCode!=8){ 
        timeoutID=$timeout(function(){ 
            $scope.showloading=true;  
            $scope.dict_result=[]; 
            SpringNews._search($scope,keyword);
        },1500); // เริ่มทำงานน 2 วินาที // 1000 เท่ากับ 1 วินาที  
      }  
    };  
    $scope.setkeyword = function(){  
        $timeout.cancel(timeoutID);
    };  
    //วันที่
  $scope.date = function(d){
    if(d != undefined){
      return _function._date(d.substring(0, 10),d.substring(12, 16));
    }else{ return ""; }
  }
  //substring
  $scope.substring = function(str){
    if(str.length > 65){
      return str.substring(0, 65)+"...";
    }else{
      return str;
    } 
  }
  window.addEventListener('native.keyboardhide', keyboardHideHandler);

  function keyboardHideHandler(e){
    ionic.Platform.fullScreen(true,false);
    if (window.StatusBar) {
      StatusBar.hide();
    }
  }


})

// ---------------------- NEWS DETAIL ---------------------
.controller('NewsCtrl', function($scope, $stateParams ,Actions,SQLite_return,$cordovaSQLite, SpringNews, $ionicLoading, $timeout,_function, $sce, $cordovaSocialSharing, $timeout) {
  
  $scope.newsDetail = [];
  $scope.newsConnected = [];
  $scope.date = [];
  $scope.video = [];
  $scope.loading_newsdetail = true;
  $scope.adver = [];
  $scope.newsShow = true;
  $scope.like = "ถูกใจ"
  $scope.like_btn = false;
  $ionicLoading.show();
  var new_info = {}

  
  $timeout(function(){ 
    SpringNews._advertise($scope,'14');
    SpringNews._newsdetail($scope,$stateParams.newsId);
    SpringNews._newsconnected($scope,$stateParams.newsId,$stateParams.catId);
    $timeout(function(){ 
     $scope.newsShow = false
    },100);
  },2000);

  $scope.message = '';
  $scope.url = '';

  // var u_id = 0;
  // var users_in_db = [];
  // var q_select = "SELECT * FROM User";
  // $cordovaSQLite.execute(db, q_select).then(function(result) {
  //     for (var i = 0; i < result.rows.length; i++) {
  //       users_in_db.push(result.rows.item(i));
  //     }
  //     if (users_in_db.length > 0) {
  //       u_id = users_in_db[0].user_id;
  //       $scope.like_btn = true;
  //       new_info = { 
  //           _postID: $stateParams.newsId,
  //           _userID: u_id
  //       }
  //     }
  // });
  // var like_in_db =[];
  // var q_select = "SELECT * FROM Action where news_id ="+$stateParams.newsId+"";
  // $cordovaSQLite.execute(db, q_select).then(function(result) {
  //   // console.log(result);
  //   for (var i = 0; i < result.rows.length; i++) {
  //     like_in_db.push(result.rows.item(i));
  //     $scope.like = "ถูกใจแล้ว";
  //   }
  // });

  Actions._read($scope,new_info);

  $scope.share = function (title,url){
    $scope.title_ = title
    $scope.url = url
    $cordovaSocialSharing
    .share($scope.title_,null,null,$scope.url)
    .then(function(result) {
      // Success!
      Actions._share($scope,new_info);
    }, function(err) {
      // An error occurred. Show a message to the user
      $ionicPopup.alert({
         title: 'An error occurred.'
       });
    });
  }

  $scope.kodlike =function(){
    console.log(u_id);
    if($scope.like == "ถูกใจ" && u_id != 0){

      Actions._like($scope,new_info);
      console.log(new_info._userID);
      var query = "INSERT INTO Action (user_id,news_id) VALUES (?,?)";
      $cordovaSQLite.execute(db, query, [u_id,$stateParams.newsId]).then(function(res) {
          console.log("INSERT ID -> " + res.insertId);
          // alert("เพิ่มข้อมูลถูกใจแล้ว");
      }, function (err) {
          console.error(err);
      });
      $scope.like = "ถูกใจแล้ว";
    }
    
  }

  //substring
  $scope.substring = function(str){
    if(str.length > 50){
      return str.substring(0, 50)+"...";
    }else{
      return str;
    } 
  }

  $scope.trustSrc = function(src) {
    if(src != ""){
      return $sce.trustAsResourceUrl(src);
    }else{
      return "";
    }
  }

  $scope.replace = function (str) {
    if(str != undefined){
      return str.replace(/[embed][^]+/g,"").replace('[',"");
    }else{
      return "";
    }
  }
  //วันที่
  $scope.date_ = function(d){
    return _function._date(d.substring(0, 10),d.substring(12, 16));
  }

  // console.log($stateParams)
})

// ---------------------- VIDEOS DETAIL ---------------------
.controller('VideosCtrl', function($scope, $stateParams , SpringNews,$ionicLoading,$timeout,_function, $sce,$ionicModal,$ionicLoading,$cordovaSocialSharing) { //admobSvc
  
  $scope.videosDetail = [];
  $scope.newsConnected = [];
  $scope.date = [];
  $scope.video = [];
  $scope.loading_videosdetail = true;
  $scope.title = $stateParams.title;
  $ionicLoading.show();

    SpringNews._advertise($scope,'14');
    SpringNews._videosdetail($scope,$stateParams.videosId);
    SpringNews._newsconnected($scope,$stateParams.videosId,$stateParams.catId);

  
  $scope.title_ = '';
  $scope.url = '';

  $scope.share = function(title,url){
    $scope.title_ = title
    $scope.url = url
    $cordovaSocialSharing
    .share($scope.title_, null,null, $scope.url) // Share via native share sheet
    .then(function(result) {
      // Success!
    }, function(err) {
      alert("Error");
    });
  };
  $scope.playVideo = function() {
    $scope.showModal('templates/modal/video-popover.html');
  }
  $scope.showModal = function(templateUrl) {
    $ionicModal.fromTemplateUrl(templateUrl, {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
      $scope.modal.show();
     // admobSvc.destroyBannerView();
      $ionicLoading.show();
    });
  }
 
  // Close the modal
  $scope.closeModal = function() {
    $scope.modal.hide();
    $scope.modal.remove()
    //admobSvc.createBannerView();
  }

  $scope.trustSrc = function(src) {
    if(src != undefined){
      return $sce.trustAsResourceUrl(src);
    }else{
      return "";
    }
  }
  $scope.replace = function (str) {
    if(str != undefined){
      return str.replace(/wonderplugin_gallery id="([^"]+)"/g,"").replace('[]',"");
    }else{
      return "";
    }
  }
  //วันที่
  $scope.date_ = function(d){
    return _function._date(d.substring(0, 10),d.substring(12, 16));
  }

})

.controller('uploadfileCtrl', function($scope, $cordovaCamera, $ionicLoading,$localStorage,$cordovaFileTransfer) {
   
    $scope.data = { "ImageURI" :  "Select Image" };

    $scope.takePicture = function() {
    var options = {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URL,
        sourceType: Camera.PictureSourceType.CAMERA
      };
    $cordovaCamera.getPicture(options).then(
    function(imageData) {
      $scope.picData = imageData;
      $scope.ftLoad = true;
      $localstorage.set('fotoUp', imageData);
      $ionicLoading.show({template: 'Foto acquisita...', duration:500});
    },
    function(err){
      $ionicLoading.show({template: 'Errore di caricamento...', duration:500});
      })
    }

    $scope.selectPicture = function() { 
    alert("11111");
    var options = {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        targetWidth: 300,
        targetHeight: 300
    };
     alert("aaaaaa");
    $cordovaCamera.getPicture(options).then(
    function(imageURI) {
      window.resolveLocalFileSystemURI(imageURI, function(fileEntry) {
        alert("bbbbb");
        $scope.picData = fileEntry.nativeURL;
        $scope.ftLoad = true;
        var image = document.getElementById('myImage');
        image.src = fileEntry.nativeURL;
        });
      $ionicLoading.show({template: 'Foto acquisita...', duration:500});
    },
    function(err){
      $ionicLoading.show({template: 'Errore di caricamento...', duration:500});
    })
  };

  $scope.captureVideo = function() {
    alert("aaaaaaa")
    var options = {   quality: 50,
                      destinationType: Camera.DestinationType.FILE_URL,
                      sourceType: Camera.PictureSourceType.CAMERA
                      };
    
    $cordovaCapture.captureVideo(options).then(function(videoData) {
    alert("bbbbbb")
    $scope.clip = videoData[0].fullPath;
    $scope.file=videoData[0].name;
    var first=$scope.clip.substr(0,$scope.clip.lastIndexOf('/')+1);

    $cordovaFile.readAsDataURL(first,$scope.file)
    .then(function (success) {
      alert("cccccccc")

      var bucket = new AWS.S3({params: { Bucket: 'jbf-dev-bucket' }});

      var params = {
        Key: videoData[0].name, 
        ContentEncoding: 'base64', 
        ContentType: 'video/mp4', 
        Body: success
      };

      bucket.upload(params).on("http://artbeat.mfec.co.th/mail/upload.php" , function(evt) {
        alert("ddddddd")
        $scope.uploading = true;
        $scope.progress = parseInt((evt.loaded * 100) / evt.total)+'%';
        console.log("Uploaded :: " + $scope.progress );         
        $scope.$apply();
      }).send(function(err, data) {
        alert("eeeeeee")
        $scope.uploading = false;
        /*$scope.images.push(data.Location);*/

        /*console.log(data.Location);*/
        $scope.$apply();
      });
    
      $scope.i++;

      }, function (error) { 
        console.log("==========error==========");
        console.log(error);
      })
    })
        
      
  }


  $scope.upload = function() {

        var date = new Date().getTime();
        var filename = "img_upload"+date+".png";
        $ionicLoading.show({template: 'กำลังอัพโหลดไฟล์...'});
        var fileURL = videodata;
        var fileURL = $scope.picData;

        var options = {
            fileKey: "file",
            fileName: filename,
            chunkedMode: false,
            mimeType: "video/mp4",
            params : {'directory':'photo', 'fileName': filename}
        };
        $cordovaFileTransfer.upload("http://artbeat.mfec.co.th/mail/upload.php", fileURL, options).then(function(result) {
            console.log("SUCCESS: " + JSON.stringify(result.response));
            alert(("SUCCESS: " + JSON.stringify(result.response)));
        }, function(err) {
            console.log("ERROR: " + JSON.stringify(err));
            alert("ERROR: " + JSON.stringify(err));
        }, function (progress) {
            // constant progress updates
        });
        $ionicLoading.hide();
  }

    // $scope.uploadPicture = function() {
    // $ionicLoading.show({template: 'Sto inviando la foto...'});
    // var fileURL = $scope.picData;
    // var options = new FileUploadOptions();
    // options.fileKey = "file";
    // options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
    // options.mimeType = "image/jpeg";
    // options.chunkedMode = true;

    // var params = {};
    // params.value1 = "someparams";
    // params.value2 = "otherparams";

    // options.params = params;

    // var ft = new FileTransfer();
    // ft.upload(fileURL, encodeURI("http://artbeat.mfec.co.th/mail/upload.php"), viewUploadedPictures, function(error) {
    //   $ionicLoading.show({template: 'Errore di connessione...'});
    // $ionicLoading.hide();}, options);

  var viewUploadedPictures = function() {
    $ionicLoading.show({template: 'Sto cercando le tue foto...'});
        server = "http://artbeat.mfec.co.th/mail/upload.php";
        if (server) {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange=function(){
            if(xmlhttp.readyState === 4){
                    if (xmlhttp.status === 200) {          
                document.getElementById('server_images').innerHTML = xmlhttp.responseText;
                    }
                    else { $ionicLoading.show({template: 'Errore durante il caricamento...', duration: 1000});
          return false;
                    }
                }
            };
            xmlhttp.open("GET", server , true);
            xmlhttp.send()} ;
    $ionicLoading.hide();
    }

  $scope.viewPictures = function() {
    $ionicLoading.show({template: 'Sto cercando le tue foto...'});
        server = "http://artbeat.mfec.co.th/mail/upload.php";
        if (server) {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange=function(){
            if(xmlhttp.readyState === 4){
                    if (xmlhttp.status === 200) {          
                document.getElementById('server_images').innerHTML = xmlhttp.responseText;
                    }
                    else { $ionicLoading.show({template: 'Errore durante il caricamento...', duration: 1000});
          return false;
                    }
                }
            };
            xmlhttp.open("GET", server , true);
            xmlhttp.send()} ;
    $ionicLoading.hide();
    }
})

// --------------------- AllNews ------------------------
.controller('allnewsCtrl', function($scope,$stateParams,_function,SpringNews) {
  $scope.name = $stateParams.catname;
  $scope.allnewsCategory = [];
  $scope.loading_catnews = true;
  SpringNews._advertise($scope,'14');
  SpringNews._catallNews($scope,$stateParams.key);
  // $ionicLoading.show(); 
    //วันที่
  $scope.date = function(d){
    if(d != undefined){
      return _function._date(d.substring(0, 10),d.substring(12, 16));
    }else{ return ""; }
  }
  //substring
  $scope.substring = function(str){
    if(str.length > 65){
      return str.substring(0, 65)+"...";
    }else{
      return str;
    } 
  }
})


// --------------------- Register ------------------------
.controller('registerCtrl', function($scope,$stateParams,_function,$cordovaSQLite,SQLite_return) {

  // /////////// Check User In SQLite ///////////
  var users_in_db = [];
  var q_select = "SELECT * FROM User";
  $cordovaSQLite.execute(db, q_select).then(function(result) {
    console.log(result);
    for (var i = 0; i < result.rows.length; i++) {
      users_in_db.push(result.rows.item(i));
    }
    console.log(JSON.stringify(users_in_db));
  });

  $scope.submitForm = function(){
    console.log(this.regis);

    var user_info = { 
      _email: this.regis.email ,
      _pass: this.regis.pass ,
      _name: this.regis.fname ,
      _lastname: this.regis.lname ,
      _display: this.regis.fname,
      _address: this.regis.address ,
      _phone: this.regis.tel ,
      _invite: this.regis.invite,
      _type: "user"
    }
    ///////////////////// Register User ////////////////////////
    SQLite_return._Register($scope,user_info).then(function(d) {
      if(d.ID != null){
        SQLite_return._get_info($scope,d).then(function(get_u_info) {

          if(get_u_info[0].ID != null){
            var u_id = get_u_info[0].ID;
            var full_name = get_u_info[0].display;
            var iv_code = get_u_info[0].mycode;
            /////////// Insert or Update User to SQLite ///////////
            if(users_in_db.length > 0 ){
              var query = "UPDATE User SET user_id = "+u_id+",fullname = '"+full_name+"',mycode ='"+iv_code+"',login_stat = 1 WHERE id = 1";
              $cordovaSQLite.execute(db, query,[]).then(function(res) {
                  console.log("UPDATE ID -> " + JSON.stringify(res));
              }, function (err) {
                  console.error(err);
              });
            }
            else{
              var query = "INSERT INTO User (user_id,fullname ,mycode,login_stat) VALUES (?,?,?,?)";
              $cordovaSQLite.execute(db, query, [u_id,full_name,iv_code,1]).then(function(res) {
                  console.log("INSERT ID -> " + res.insertId);
              }, function (err) {
                  console.error(err);
              });
             
            };
          }

        });
      }
        // /////////// Check Status login In SQLite ///////////
        // var users_stat_login = [];
        // var q_select = "SELECT * FROM User";
        // $cordovaSQLite.execute(db, q_select).then(function(result) {
        //   console.log(result);
        //   for (var i = 0; i < result.rows.length; i++) {
        //     users_stat_login.push(result.rows.item(i));
        //   }
        //   console.log("dqwdqwdwqfeagsfse"+JSON.stringify(users_stat_login));
        // });

        // if(users_stat_login[0].login_stat == 1){
        //   $localStorage.img = "./img/default_user.png";
        //   $rootScope.user.img = $localStorage.img;
        //   $rootScope.profile = true;
        //   $rootScope.login_ = false;
        //   $rootScope.logout_ = true;
        // }
      });

  }


})

// --------------------- login ------------------------
.controller('loginCtrl', function($scope,$http,$stateParams,$localStorage,ngFB,$cordovaOauth,_function,SpringNews,SQLite_return,$cordovaSQLite) {
  // /////////// Check User In SQLite ///////////
  // var users_in_db = [];
  // var q_select = "SELECT * FROM User";
  // $cordovaSQLite.execute(db, q_select).then(function(result) {
  //   console.log(result);
  //   for (var i = 0; i < result.rows.length; i++) {
  //     users_in_db.push(result.rows.item(i));
  //   }
  //   console.log(JSON.stringify(users_in_db));
  // });

  //Alert Fail Login
  $scope.showAlertFail = function() {
     var alertPopup = $ionicPopup.alert({
     title: 'Login Fail!',
     template: 'Invalid Username and Password '
     });
  };
  
  //Alert Success Login
  $scope.showAlertSuccess = function() {
     var alertPopup = $ionicPopup.alert({
     title: 'Login Success!',
     template: 'Welcome Back: "'+ $scope.loginData.username +'"'
     });
     $scope.modal.hide();
  };

  

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {

    SQLite_return._login($scope).then(function(d) {
      if(d.ID != null){
        SQLite_return._get_info($scope,d).then(function(get_u_info) {

          if(get_u_info[0].ID != null){
            var u_id = get_u_info[0].ID;
            var full_name = get_u_info[0].display;
            var iv_code = get_u_info[0].mycode;
            /////////// Insert or Update User to SQLite ///////////
            if(users_in_db.length > 0 ){
              var query = "UPDATE User SET user_id = "+u_id+",fullname = '"+full_name+"',mycode ='"+iv_code+"',login_stat = 1 WHERE id = 1";
              $cordovaSQLite.execute(db, query,[]).then(function(res) {
                  console.log("UPDATE ID -> " + JSON.stringify(res));
              }, function (err) {
                  console.error(err);
              });
            }
            else{
              var query = "INSERT INTO User (user_id,fullname ,mycode,login_stat) VALUES (?,?,?,?)";
              $cordovaSQLite.execute(db, query, [u_id,full_name,iv_code,1]).then(function(res) {
                  console.log("INSERT ID -> " + res.insertId);
              }, function (err) {
                  console.error(err);
              });
             
            };
          }

        });
      }
    });
    // /////////// Check Status login In SQLite ///////////
    // var users_stat_login = [];
    // var q_select = "SELECT * FROM User";
    // $cordovaSQLite.execute(db, q_select).then(function(result) {
    //   console.log(result);
    //   for (var i = 0; i < result.rows.length; i++) {
    //     users_stat_login.push(result.rows.item(i));
    //   }
    //   console.log(JSON.stringify(users_stat_login));
    // });

    // if(users_stat_login[0].login_stat == 1){
    //   $localStorage.img = "./img/default_user.png";
    //   $rootScope.user.img = $localStorage.img;
    //   $rootScope.profile = true;
    //   $rootScope.login_ = false;
    //   $rootScope.logout_ = true;
    // }

  };

  //Login Facebook 
  $scope.doLoginFacebook = function () { 
    ngFB.login({scope: 'email,publish_actions,user_friends'}).then(
        function (response) {
            if (response.status === 'connected') {
                console.log(response)
                console.log('Facebook login succeeded');
                // $scope.closeLogin();
                ngFB.api({
                    path: '/me',
                    params: {fields: 'id,name,email'}
                }).then(
                    function (user) {

                        $scope.user = user;
                        $localStorage.img = "https://graph.facebook.com/"+$scope.user.id+"/picture?width=400&height=400";


                        // $scope.user.name = $localStorage.name
                        // $scope.user.email = $localStorage.email 
                        $scope.user.img = $localStorage.img
                        $scope.profile = true;
                        $scope.login_ = false;
                        $scope.logout_ = true;
                        console.log(user)

                        var user_info = { 
                          _email: $scope.user.email,
                          _pass: $scope.user.id ,
                          _name: $scope.user.name ,
                          _display: $scope.user.name,
                          _lastname: '' ,
                          _address: '' ,
                          _phone: '' ,
                          _type: "facebook"

                        }
                        SQLite_return._register($scope,user_info).then(function(d) {
                          console.log("_register_facebook "+JSON.stringify(d));
                        });
                        // SQLite_return._register($scope,user_info);
                    },
                    function (error) {
                        alert('Facebook error: ' + error.error_description);
                });
            } else {
                alert('Facebook login failed');
            }

    });

  };

  //Login Google
  $scope.doLoginGoogle = function () {

    $cordovaOauth.google("891740401184-i1ucjk82d2uh6pcs0qt82v7pcqnrb58o.apps.googleusercontent.com", ["email"]).then(function(result) {
        console.log("Response Object -> " + JSON.stringify(result));
        // alert("Response Object -> " + JSON.stringify(result));
        var url="https://www.googleapis.com/oauth2/v1/userinfo?access_token="+result.access_token; 
        $http.get(url).success(function(result2){ 
            if(result2 != ""){

                console.log("aaaaaaaaaaaaaaa"+result2);
                $scope.user = result2;
                console.log("scope_USER"+$scope.user );
                $localStorage.img = result2.picture;
                // $localStorage.name = result2.name;
                // $localStorage.email = result2.email;

                // $scope.user.name = $localStorage.name
                // $scope.user.email = $localStorage.email 
                $scope.user.img = $localStorage.img

                var user_info = { 
                  _email: $scope.user.email,
                  _pass: $scope.user.id ,
                  _name: $scope.user.given_name ,
                  _lastname: $scope.user.family_name ,
                  _address: '' ,
                  _display: $scope.user.name,
                  _phone: '',
                  _type: "google+"

                } 
                SQLite_return._register($scope,user_info).then(function(d) {
                  console.log("_register_google "+JSON.stringify(d));
                });

                $scope.profile = true;
                $scope.login_ = false;
                $scope.logout_ = true;
            }
            $scope.closeLogin();


            $scope.showloading=false; 
        })  
        .error(function(){  
            $scope.showloading=false; 
        });
        

    }, function(error) {
        console.log("Error -> " + error);
        // alert("Error -> " + JSON.stringify(error));
    });
  };


})

// --------------------- Register ------------------------
.controller('quizCtrl', function($scope,$stateParams,_function,quizFactory) {


})
