angular.module('starter.controllers', ['ngOpenFB'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicPopup, $http ,$window, $location, md5,$localStorage,ngFB,$cordovaOauth,$ionicSideMenuDelegate) {

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
  $scope.loginData = {};
  $scope.user  = {};
  $scope.icon = "right";

  if($localStorage.name != undefined){
     $scope.user.img = $localStorage.img;
     $scope.user.name = $localStorage.name;
     $scope.user.email = $localStorage.email;
     $scope.profile = true;
     $scope.login_ = false;
     $scope.logout_ = true;
  }else{
     // $scope.profile = true;
     $scope.profile = false;
     $scope.login_ = true;
     $scope.logout_ = false;
  }

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
    $localStorage.img = undefined;
    $localStorage.name = undefined;
    $localStorage.email = undefined;
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
    ngFB.login({scope: 'email,publish_actions,user_friends'}).then(
        function (response) {
            if (response.status === 'connected') {
                console.log(response)
                console.log('Facebook login succeeded');
                $scope.closeLogin();
                ngFB.api({
                    path: '/me',
                    params: {fields: 'id,name'}
                }).then(
                    function (user) {
                        $scope.user = user;
                        $localStorage.img = "https://graph.facebook.com/"+$scope.user.id+"/picture?width=400&height=400";
                        $localStorage.name = $scope.user.name;
                        // $localStorage.email = authData.facebook.email; 

                        $scope.user.name = $localStorage.name
                        $scope.user.email = $localStorage.email 
                        $scope.user.img = $localStorage.img

                        $scope.profile = true;
                        $scope.login_ = false;
                        $scope.logout_ = true;
                        console.log(user)
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
            $scope.closeLogin();
            if(result2 != ""){
                $scope.user = result2;
                $localStorage.img = result2.picture;
                $localStorage.name = result2.name;
                $localStorage.email = result2.email;

                $scope.user.name = $localStorage.name
                $scope.user.email = $localStorage.email 
                $scope.user.img = $localStorage.img

                $scope.profile = true;
                $scope.login_ = false;
                $scope.logout_ = true;
            }
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

// --------------------- HOME ------------------------
.controller('HomeCtrl', function($scope, $stateParams, SpringNews, $ionicSlideBoxDelegate,_function, $ionicModal,$ionicLoading,$cordovaSocialSharing,$ionicScrollDelegate, $ionicNavBarDelegate, $timeout) { //admobSvc

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

 $timeout(function(){
    SpringNews._advertise($scope,'14');
    SpringNews._newsupdate($scope,'ข่าวเด่น'); 
    SpringNews._newshot($scope,'ประเด็นร้อน');
    SpringNews._clips($scope,'30','4'); 
    SpringNews._category($scope,'889');
    SpringNews._oil($scope);
    SpringNews._part($scope);
    SpringNews._thaigold($scope);
  },3000);
  
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

        //   var targetPath = cordova.file.documentsDirectory + "Download/"+url.substr(url.lastIndexOf('/') + 1);

        //   window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, fileSystemSuccess, fileSystemFail);
          
        //   function fileSystemSuccess(fileSystem) {

        //     var Folder_Name = 'SpringNews';
        //     ext = uri.substr(uri.lastIndexOf('.') + 1); //Get extension of URL
        //     var directoryEntry = fileSystem.root; // For root path of directory
        //     directoryEntry.getDirectory(Folder_Name, { create: true, exclusive: false }, onDirectorySuccess, onDirectoryFail); // creating folder in sdcard
        //     var rootdir = fileSystem.root;
        //     var fp = rootdir.fullPath; // Gives Fullpath of local directory
        //     fp = fp + "/" + Folder_Name + "/" + "Map_.jpg" + "." + ext; // fullpath and name of the file which we want to give
        //     // Function call to download
        //     filetransfer(uri, fp);

        //   }
        //   function onDirectorySuccess(parent) {
        //     // Directory successfuly created 
        //     alert("created new directory: " + parent.code);
        //   }
        //   function onDirectoryFail(error) {
        //       // On error
        //       alert("Unable to create new directory: " + error.code);
        //   }
        //     function fileSystemFail(evt) {
        //       //Unable to access file system
        //       alert(evt.target.error.code);
        //   }

        //   function filetransfer(uri, fp) {
        //     var fileTransfer = new FileTransfer();
        //     // Local path and File download function with URL
        //     fileTransfer.download(uri, fp,
        //       function (entry) {
        //           alert("download complete: " + entry.fullPath);
        //       },
        //       function (error) {
        //          // Failed errors
        //          alert("download error source " + error.source);
        //       }
        //     );
        // }

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
  
  $timeout(function(){
    SpringNews._advertise($scope,'14'); 
    SpringNews._clips($scope,'30',''); 
  },1000);
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

  $scope.share = function (){
      $cordovaSocialSharing
      .share("Live Radio",null,null,"http://artbeat.mfec.co.th/SpringNew/?page_id=1131&lang=th")
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

  $scope.test = function(){
    $cordovaLocalNotification.getAllIds().then(function(result_){
      alert('Get all ids: ' + result_) //Returned 2nd: 'Get all ids: 1,0,4,5,3,2'
    });
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
          message: "แต่เพื่อดูข้อมูล",
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
.controller('ActivityCtrl', function($scope,_function,SpringNews) {
  $scope.activity = [];
  SpringNews._pages_activity($scope); 

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
.controller('NewsCtrl', function($scope, $stateParams , SpringNews, $ionicLoading, $timeout,_function, $sce, $cordovaSocialSharing, $timeout) {
  
  $scope.newsDetail = [];
  $scope.newsConnected = [];
  $scope.date = [];
  $scope.video = [];
  $scope.loading_newsdetail = true;
  $scope.adver = [];
  $scope.newsShow = true;
  $ionicLoading.show();
  
  $timeout(function(){
    SpringNews._advertise($scope,'14');
    SpringNews._newsdetail($scope,$stateParams.newsId);
    SpringNews._newsconnected($scope,$stateParams.newsId,$stateParams.catId);
    $scope.newsShow = false
  },2500);

  $scope.message = '';
  $scope.url = '';

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

  $timeout(function(){
    SpringNews._advertise($scope,'14');
    SpringNews._videosdetail($scope,$stateParams.videosId);
    SpringNews._newsconnected($scope,$stateParams.videosId,$stateParams.catId);
  },1000);
  
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
        sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
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


  $scope.upload = function() {
        var date = new Date().getTime();
        var filename = "image_upload"+date+".png";
        $ionicLoading.show({template: 'กำลังอัพโหลดไฟล์...'});
        var fileURL = $scope.picData;
        var options = {
            fileKey: "file",
            fileName: filename,
            chunkedMode: false,
            mimeType: "image/jpg",
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
