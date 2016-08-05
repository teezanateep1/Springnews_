// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers',"angular-md5",'services','tabSlideBox','ngStorage', 'ionic-cache-src'])

.run(function($ionicPlatform,$rootScope,$ionicPopup, $cordovaDialogs) { //admobSvc
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    // Check for network connection
    if(window.Connection) {
      if(navigator.connection.type == Connection.NONE) {
        $ionicPopup.alert({
          title: 'No Internet Connection',
          content: 'Sorry, no Internet connectivity detected. Please reconnect and try again.'
        })
        .then(function(result) {
            ionic.Platform.exitApp();
        });

      }else{
       // admobSvc.createBannerView();
      }
    }

    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

 
  });

})

.config(function($ionicConfigProvider)   {
   $ionicConfigProvider.tabs.style('standard');
   $ionicConfigProvider.tabs.position('top');
   $ionicConfigProvider.navBar.alignTitle('center');
   $ionicConfigProvider.scrolling.jsScrolling(true);
   $ionicConfigProvider.backButton.previousTitleText(false).text('');
   $ionicConfigProvider.views.maxCache(5);
})

.constant('$ionicLoadingConfig', {  
    template: '<ion-spinner class="spinner-calm"></ion-spinner>  Loading...', // กำหนด template   
    noBackdrop:false, // ไม่แสดพื้นหลังทึบ หรือไม่ true ไม่แสดง | false แสดง  
    delay:500,// กำหนดแสดงหลังจากกี่วินาที ตัวเลข milisecond หาร 1000 เท่ากับ 1 วินาที   
    duration:1500  // กำหนดให้ซ่อนอัตโนมัติในกี่วินาที แบบไม่ต้องเรียก method hide() อีก  
})  

.config(function($stateProvider, $urlRouterProvider) {  //admobSvcProvider

  // admobSvcProvider.setOptions({
  //   publisherId :         "ca-app-pub-7291107843041210/9939517281" , 
  //   interstitialAdId :    "ca-app-pub-7291107843041210/9939517281" , 
  //   tappxIdiOs:           "",        // Optional
  //   tappxIdAndroid:       "",        // Optional
  //   tappxShare:           0.5        // Optional                                 
  // });

  // // Optionally configure the events prefix (by default set to 'admob:')
  // admobSvcProvider.setPrefix('myTag~');

  $stateProvider
    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

// HOME
  .state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl'
      }
    }
  })
  // LIVE TV
  .state('app.livetv', {
    url: '/livetv',
    views: {
      'menuContent': {
        templateUrl: 'templates/livetv.html',
        controller: 'LivetvCtrl'
      }
    }
  })
  // LIVE RADIO
  .state('app.liveradio', {
    url: '/liveradio',
    views: {
      'menuContent': {
        templateUrl: 'templates/liveradio.html',
        controller: 'LiveradioCtrl'
      }
    }
  })
  //CLIP
  .state('app.clips', {
    url: '/clips/:title',
    views: {
      'menuContent': {
        templateUrl: 'templates/clips.html',
        controller: 'ClipCtrl'
      }
    }
  })
  //PROGRAM
  .state('app.program', {
    url: '/program',
    views: {
      'menuContent': {
        templateUrl: 'templates/program.html',
        controller: 'ProgramCtrl'
      }
    }
  })
  // schedule
  .state('app.schedule', {
    url: '/schedule/:scheId',
    views: {
      'menuContent': {
        templateUrl: 'templates/schedule.html',
        controller: 'ScheduleCtrl'
      }
    }
  })
  // pr
  .state('app.pr', {
    url: '/pr',
    views: {
      'menuContent': {
        templateUrl: 'templates/pr.html'
      }
    }
  })
  // activity
  .state('app.activity', {
    url: '/activity',
    views: {
      'menuContent': {
        templateUrl: 'templates/activity.html',
        controller: 'ActivityCtrl'
      }
    }
  })
  //------------- เกี่ยวกับเรา
  // contact
  .state('app.contact', {
    url: '/contact',
    views: {
      'menuContent': {
        templateUrl: 'templates/contact.html',
        controller: 'ContentCtrl'
      }
    }
  })
  // history
  .state('app.history', {
    url: '/history',
    views: {
      'menuContent': {
        templateUrl: 'templates/history.html',
        controller: 'HistoryCtrl'
      }
    }
  })
  // vision
  .state('app.vision', {
    url: '/vision',
    views: {
      'menuContent': {
        templateUrl: 'templates/vision.html',
        controller: 'VisionCtrl'
      }
    }
  })
  // introduce
  .state('app.introduce', {
    url: '/introduce',
    views: {
      'menuContent': {
        templateUrl: 'templates/introduce.html',
        controller: 'IntroduceCtrl'
      }
    }
  })
  //--------------
  //news detail
  .state('app.news', {
    url: '/news/:newsId/:catId',
    views: {
      'menuContent': {
        templateUrl: 'templates/news.html',
        controller: 'NewsCtrl'
      }
    }
  })
  //videos detail
  .state('app.videos', {
    url: '/videos/:videosId/:catId/:title',
    views: {
      'menuContent': {
        templateUrl: 'templates/video.html',
        controller: 'VideosCtrl'
      }
    }
  })
  // search
  .state('app.search', {
    url: '/search/:key',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html',
        controller: 'SearchCtrl'
      }
    }
  })
  // setting
  .state('app.setting', {
    url: '/setting',
    views: {
      'menuContent': {
        templateUrl: 'templates/setting.html'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home'); 
  //$urlRouterProvider.otherwise('/app/program');
});
