angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicPopup, $http, $location, md5) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

 
  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

 // -------------- MEnu // SubMEnu ---
 $scope.menu_toggle = true;
 $scope.link = $location.path();
  $scope.cl_link = function (argument) {
    if(argument == "mo" || argument == "tu" || argument == "we" || argument == "th" || argument == "fa" || argument == "sa" || argument == "su"){
      $scope.link = '/app/schedule';
      $scope.sublink_schedule = argument;
      $scope.sublink_aboutUs = false;
      $scope.submenu_aboutUs = false;
    }
    else if(argument == "vision" || argument == "history" || argument == "contact" || argument == "introduce"){
      $scope.link = '/app/contact_';
      $scope.sublink_aboutUs = argument;
      $scope.submenu_schedule = false;
      $scope.submenu_schedule = false;
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

  // Form data for the login modal
  $scope.loginData = {};
  $scope.user  = {};
  $scope.icon = "right";

  // if($localStorage.name != undefined){
  //    $scope.user.img = $localStorage.img;
  //    $scope.user.name = $localStorage.name;
  //    $scope.user.email = $localStorage.email;
  //    // $scope.profile = true;
  //    // $scope.login_ = false;
  //    // $scope.logout_ = true;
  // }else{
  //    $scope.profile = true;
  //    // $scope.profile = false;
  //    // $scope.login_ = true;
  //    // $scope.logout_ = false;
  // }

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  //Open the logout 
  $scope.logout = function() {
    // $localStorage.img = undefined;
    // $localStorage.name = undefined;
    // $localStorage.email = undefined;
    $scope.profile = false;
    $scope.login_ = true;
    $scope.logout_ = false;
  }

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
    console.log('Doing login', $scope.loginData);

    var request = $http({
                        method: "post",
                        url: "http://daydev.com/demo/login.php",
                        data: {
                            username: $scope.loginData.username,
                            password: $scope.loginData.password
                        },
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                  });

        request.success(function (data) {
          $scope.message = "Console : "+data;
            if(data=="false"){
              $scope.showAlertFail(); 
            }else{
              $scope.showAlertSuccess();
              $scope.profile = true;
              $scope.login_ = false;
              $scope.logout_ = true;
            }
        });
    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    // $timeout(function() {
    //   $scope.closeLogin();
    // }, 1000);
  };

  //Login Facebook 
  $scope.doLoginFacebook = function () { 

    // _auth.authWithOAuthPopup("facebook", function(error, authData) {
    //   if (error) {
    //     var alertPopup = $ionicPopup.alert({
    //             title: 'Login failed!',
    //             template: 'Please check your credentials!'
    //     });

    //   } else {
    //     // the access token will allow us to make Open Graph API calls
    //     $localStorage.img = "https://graph.facebook.com/"+authData.facebook.id+"/picture?width=400&height=400";
    //     $localStorage.name = authData.facebook.displayName;
    //     $localStorage.email = authData.facebook.email;
    //     $scope.user.img = "https://graph.facebook.com/"+authData.facebook.id+"/picture?width=400&height=400";
    //     $scope.user.name = authData.facebook.displayName;
    //     $scope.user.email = authData.facebook.email;
    //     $scope.closeLogin();
    //     $scope.profile = true;
    //     $scope.login_ = false;
    //     $scope.logout_ = true;
    //   }
    // }, {
    //   remember: "none",
    //   scope: "email,user_likes" // the permissions requested
    // })

  };

  //Login Google
  $scope.doLoginGoogle = function () {

    // _auth.authWithOAuthPopup("google", function(error, authData) {
    //   if (error) {
    //     var alertPopup = $ionicPopup.alert({
    //             title: 'Login failed!',
    //             template: 'Please check your credentials!'
    //     });
    //   } else {
    //     $localStorage.img = authData.google.profileImageURL;
    //     $localStorage.name = authData.google.displayName;
    //     $localStorage.email = authData.google.email;
    //     $scope.user.img = authData.google.profileImageURL;
    //     $scope.user.name = authData.google.displayName;
    //     $scope.user.email = authData.google.email;
    //     $scope.closeLogin();
    //     $scope.profile = true;
    //     $scope.login_ = false;
    //     $scope.logout_ = true;
    //   }
    // }, {
    //   remember: "none",
    //   scope: "email" // the permissions requested
    // })
  };
})

// --------------------- HOME ------------------------
.controller('HomeCtrl', function($scope, $stateParams, SpringNews, $ionicSlideBoxDelegate, _function, $ionicModal,$ionicLoading) { //admobSvc

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

  SpringNews._advertise($scope,'14'); 
  SpringNews._newsupdate($scope,'908'); 
  SpringNews._newshot($scope,'ประเด็นร้อน');
  SpringNews._clips($scope,'30','4'); 
  // SpringNews._category($scope,'889');
  SpringNews._oil($scope);
  SpringNews._part($scope);
  SpringNews._thaigold($scope);

  //วันที่
  $scope.date = function(d){
    if(d != undefined){
      return _function._date(d.substring(0, 10),d.substring(12, 16));
    }else{ return ""; }
  }
  //โฆษาณา Random 
  $scope.advertise = function(){
    SpringNews._advertise($scope,'14'); 
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
    if(str.length > 65){
      return str.substring(0, 65)+"...";
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
  
  // $ionicModal.fromTemplateUrl('templates/modal/social.html', {
  //   scope: $scope,
  //   animation: 'slide-in-up'
  // }).then(function(modal) {
  //   $scope.modal_social = modal;
  // });
  // Cleanup the modal when we're done with it!
  // $scope.$on('$destroy', function() {
  //   $scope.modal_social.remove();
  // });
  // $scope.closeModal = function() {
  //   $scope.modal_social.hide();
  // };
  $scope.message = '';
  $scope.img = '';
  $scope.url = '';
  $scope.show_social = function(message,img,url){
    $scope.message = message
    $scope.img = img
    $scope.url = url
    //$scope.modal_social.show();
    $cordovaSocialSharing
    .share($scope.message,"Test", $scope.img, $scope.url) // Share via native share sheet
    .then(function(result) {
      // Success!
    }, function(err) {
      // An error occured. Show a message to the user
      alert("111");
    });
  };
  //-----------\\ 
  // ------ loadMore Data -----
  $scope.loadMore = function(id,length){  
    SpringNews._catNews($scope,id,length+1);
  };
  // ------------------------
})

// --------------------- HISTORY ------------------------
.controller('HistoryCtrl', function($scope,_function,SpringNews) {
    $scope.history = []; 
    $scope.adver = [];
    SpringNews._pages_history($scope); 
    // SpringNews._advertise($scope,'14'); 
    (adsbygoogle = window.adsbygoogle || []).push({});
})

// --------------------- VISION ------------------------
.controller('VisionCtrl', function($scope,SpringNews) {
    $scope.vision = []; 
    $scope.adver = [];
    SpringNews._pages_vision($scope); 
    // SpringNews._advertise($scope,'14'); 
    (adsbygoogle = window.adsbygoogle || []).push({});
})

// --------------------- CONTACT ------------------------
.controller('ContentCtrl', function($scope,$cordovaFileTransfer,$ionicLoading,_geolocation,SpringNews) { 
    $scope.contact = []; 
    $scope.contactImg = [];
    $scope.adver = [];
    $scope.link = [];
    SpringNews._pages_contact($scope); 
    // SpringNews._advertise($scope,'14'); 
    //_geolocation._navigator($scope);
    
    $scope.location = function(){
      if (ionic.Platform.isIOS()) {
          window.open(
            // 'google.navigation:q=SpringNews+Corporation+Co.,+Ltd.+Vibhavadi+Rangsit+Rd,+Lat+Yao,+Khet+Chatuchak,+Krung+Thep+Maha+Nakhon+10900&avoid=tf',
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
        var targetPath = cordova.file.externalRootDirectory + "Map_.jpg";
        var trustHosts = true;
        var options = {};

       alert(targetPath);
        $ionicLoading.show({
            template: 'Loading...'
        });
        $cordovaFileTransfer.download(uri, targetPath, options, trustHosts)
          .then(function(result) {
             $ionicLoading.hide();
               alert(JSON.stringify(result));
          }, function(err) {
             $ionicLoading.hide();
               alert(JSON.stringify(err));
          }, function (progress) {
            alert(JSON.stringify(progress));
            //$cordovaProgress.showDeterminate(false, (progress.loaded / progress.total) * 100)
            // $timeout(function () {
            //   $scope.downloadProgress = (progress.loaded / progress.total) * 100;
            // });
        });
    }
     

})

// --------------------- INTRODUCE ------------------------
.controller('IntroduceCtrl', function($scope,SpringNews) {
    // $scope.introduce = [];
    // $scope.appeal = [];
    // SpringNews._pages_introduce($scope); 
    SpringNews._advertise($scope,'14'); 
    // (adsbygoogle = window.adsbygoogle || []).push({});
})

// --------------------- LIVE TV ------------------------
.controller('LivetvCtrl', function($scope,_function,SpringNews,$cordovaSocialSharing, $ionicPopup) { //admobSvc

  $scope.schedules = []; 
  $scope.sharingPlugin = '';
  $scope.loading_schedule = true;
  SpringNews._schedulesNow($scope); 
  _function._jwTV();
  // admobSvc.destroyBannerView();
  // $scope.$on('$ionicView.afterLeave', function(){
  //   admobSvc.createBannerView();
  // })
  
  $scope.sharing = function(){
    $cordovaSocialSharing
    .share("Live TV","Live TV","http://www.springnews.co.th/live") // Share via native share sheet
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
        console.log($scope.data.value)
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
      .share("Live Radio","Live TV","http://www.springnews.co.th/radio")
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
.controller('ClipCtrl', function($scope,_function,SpringNews,_function,$stateParams) {
  $scope.clips = [];
  $scope.clips_loop = [];
  $scope.title = $stateParams.title;

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

})

// --------------------- PROGRAM ------------------------
.controller('ProgramCtrl', function($scope,_function,SpringNews,$ionicSlideBoxDelegate,$ionicLoading) {
  
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
.controller('ScheduleCtrl', function($scope,SpringNews,$stateParams,$cordovaLocalNotification) {
  $scope.schedules = []; 
  //$scope.schedulesActive = [];
  $scope.loading_schedule = true;
  SpringNews._schedules($scope,$stateParams.scheId); 
  

  $scope.test = function(){
    $cordovaLocalNotification.getAllIds().then(function(result_){
      alert('Get all ids: ' + result_) //Returned 2nd: 'Get all ids: 1,0,4,5,3,2'
       for (var i = 0 ;i < result_.length ; i++) {
          $scope.schedulesActive.push(result_[i]);
       }
    });
  }

  $scope.test2 = function (ids,event) {
    //console.log(angular.element(ids).addClass('active'))
    //angular.element(event.target).addClass('active');
    // $cordovaLocalNotification.isScheduled(ids).then(function(isScheduled) {
    //   if(isScheduled){
    //     angular.element(event.target).addClass('active');
    //   }
    // });
  }

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
    alarmTime.setDate(today.getDate() + daysUntilNext);
    alarmTime.setHours(hour, min, 0);

    if(angular.element(event.target).hasClass('active')){
      angular.element(event.target).removeClass('active');
      $cordovaLocalNotification.cancel(id, function() {});
    }else{
      angular.element(event.target).addClass('active');
       $cordovaLocalNotification.schedule({
          id: id,
          at: alarmTime,
          message: "แต่เพื่อดูข้อมูล",
          title: title,
          autoCancel: false,
          every: "day",
          sound: null,
          icon: "../img/icon/icon_pr_blue.png"
        }).then(function () {
          console.log("The notification has been set");
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
.controller('ActivityCtrl', function($scope,_function,SpringNews) {
  $scope.activity = [];
  SpringNews._pages_activity($scope); 

})

// ---------------------- NEWS DETAIL ---------------------
.controller('NewsCtrl', function($scope, $stateParams , SpringNews,$ionicLoading,$timeout,_function, $sce) {
  
  $scope.newsDetail = [];
  $scope.newsConnected = [];
  $scope.date = [];
  $scope.video = [];
  $scope.loading_newsdetail = true;
  

  SpringNews._advertise($scope,'14');
  SpringNews._newsdetail($scope,$stateParams.newsId);
  SpringNews._newsconnected($scope,$stateParams.newsId,$stateParams.catId);

  $scope.message = '';
  $scope.img = '';
  $scope.url = '';
  $scope.show_social = function(message,img,url){
    $scope.message = message
    $scope.img = img
    $scope.url = url
    console.log($scope.message)
    console.log($scope.img)
    console.log($scope.url)
    //$scope.modal_social.show();
  };

  $scope.trustSrc = function(src) {
    if(src != ""){
      return $sce.trustAsResourceUrl(src);
    }else{
      return "";
    }
  }
  $scope.replace = function (str) {
    return str.replace(/(<([^>]+)>)/ig,"");
  }
  //วันที่
  $scope.date_ = function(d){
    return _function._date(d.substring(0, 10),d.substring(12, 16));
  }

  // console.log($stateParams)
})

// ---------------------- VIDEOS DETAIL ---------------------
.controller('VideosCtrl', function($scope, $stateParams , SpringNews,$ionicLoading,$timeout,_function, $sce,$ionicModal,$ionicLoading) { //admobSvc
  
  $scope.videosDetail = [];
  $scope.newsConnected = [];
  $scope.date = [];
  $scope.video = [];
  $scope.loading_videosdetail = true;
  $scope.title = $stateParams.title;

  SpringNews._advertise($scope,'14');
  SpringNews._videosdetail($scope,$stateParams.videosId);
  SpringNews._newsconnected($scope,$stateParams.videosId,$stateParams.catId);

  $scope.message = '';
  $scope.img = '';
  $scope.url = '';
  $scope.show_social = function(message,img,url){
    $scope.message = message
    $scope.img = img
    $scope.url = url
    console.log($scope.message)
    console.log($scope.img)
    console.log($scope.url)
    //$scope.modal_social.show();
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
