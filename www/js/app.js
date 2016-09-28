// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers',"angular-md5",'services','ngOpenFB','tabSlideBox','ngStorage', 'ionic-cache-src','ngCordova.plugins.googleAds','ngCordovaOauth','ionic-cache-src'])

.run(function($ionicPlatform,$rootScope,$ionicPopup, $cordovaDialogs ,ngFB, ConnectivityMonitor) { //admobSvc
  ngFB.init({appId: '647791618729432'});
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    // Check for network connection
    // if(window.Connection) {
    //   if(navigator.connection.type == Connection.NONE) {
    //     $ionicPopup.alert({
    //       title: 'No Internet Connection',
    //       content: 'Sorry, no Internet connectivity detected. Please reconnect and try again.'
    //     })
    //     .then(function(result) {
    //         ionic.Platform.exitApp();
    //     });
        

    //   }else{
    //   }
    // }
    ConnectivityMonitor.startWatching()

    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    ionic.Platform.fullScreen();
  //======admob code start=============
 
      var admobid = {};
        // select the right Ad Id according to platform
        if( /(android)/i.test(navigator.userAgent) ) { 
            admobid = { // for Android
                banner: 'ca-app-pub-7291107843041210/9939517281',
                publisherId : "ca-app-pub-7291107843041210/9939517281",
                interstitial: 'ca-app-pub-7291107843041210/9939517281'
            };
        } else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
            admobid = { // for iOS
                banner: 'ca-app-pub-7291107843041210/9939517281',
                publisherId : "ca-app-pub-7291107843041210/9939517281",
                interstitial: 'ca-app-pub-7291107843041210/9939517281'
            };
        } else {
            admobid = { // for Windows Phone
                banner: 'ca-app-pub-7291107843041210/9939517281',
                publisherId : "ca-app-pub-7291107843041210/9939517281",
                interstitial: 'ca-app-pub-7291107843041210/9939517281'
            };
        }
 
  //=======AdMob Code End=======
        if(window.AdMob) 
          AdMob.createBanner( {
              adId:admobid.banner, 
              position:AdMob.AD_POSITION.BOTTOM_CENTER, 
              autoShow:true
          });
  });

})

.config(function($ionicConfigProvider)   {
   $ionicConfigProvider.tabs.style('standard');
   $ionicConfigProvider.tabs.position('top');
   $ionicConfigProvider.navBar.alignTitle('center');
   $ionicConfigProvider.scrolling.jsScrolling(true);
   $ionicConfigProvider.backButton.previousTitleText(false).text('');
   $ionicConfigProvider.views.maxCache(5);
   $ionicConfigProvider.views.forwardCache(false)
})

.constant('$ionicLoadingConfig', {  
    template: '<ion-spinner class="spinner-calm"></ion-spinner>  Loading...', // กำหนด template   
    noBackdrop:false, // ไม่แสดพื้นหลังทึบ หรือไม่ true ไม่แสดง | false แสดง  
    delay:500,// กำหนดแสดงหลังจากกี่วินาที ตัวเลข milisecond หาร 1000 เท่ากับ 1 วินาที   
    duration:1500  // กำหนดให้ซ่อนอัตโนมัติในกี่วินาที แบบไม่ต้องเรียก method hide() อีก  
})  

.directive('headerHome', function($document,$timeout,$rootScope) {
  var fadeAmt;
  var shrink = function(header, content, amt, max) {
    amt = Math.min(54, amt);
    fadeAmt = 1 - amt / 54;
    ionic.requestAnimationFrame(function() {
      header.style[ionic.CSS.TRANSFORM] = 'translate3d(0, -' + amt + 'px, 0)';
      for(var i = 0, j = header.children.length; i < j; i++) {
        header.children[i].style.opacity = fadeAmt;
      }
    });
  };
  var tab = function(header, content, amt, max) {
    amt = Math.min(54, amt);
    fadeAmt = 1 - amt / 54;
    ionic.requestAnimationFrame(function() {
      header.style[ionic.CSS.TRANSFORM] = 'translate3d(0, -' + amt + 'px, 0)';
      header.style.marginTop = '56px';
    });
  };
  var slider = function(header, content, amt, max) {
    amt = Math.min(53, amt);
    fadeAmt = 1 - amt / 53;
    ionic.requestAnimationFrame(function() {
      header.style[ionic.CSS.TRANSFORM] = 'translate3d(0, -' + amt + 'px, 0)';
    });
  };

  return {
    restrict: 'A',
    link: function($scope, $element, $attr) {
      $timeout(function(){  
        var starty = orgStarty = $scope.$eval($attr.headerHome) || 40;
        var shrinkAmt,timeoutID=null;
        
        var header = $document[0].body.querySelector('[nav-bar="active"]');
        var chil = header.querySelector('.bar-header');
        var header1 = $document[0].body.querySelector('[nav-bar="cached"]');
        var chil1 = header1.querySelector('.bar-header');

        var header2 = $document[0].body.querySelector('.tsb-home');

        var header3 = $document[0].body.querySelector('.slider');

        var headerHeight = chil.offsetHeight;

        $element.bind('scroll', function(e) { 
            shrinkAmt = headerHeight - (headerHeight - (e.detail.scrollTop - starty));
            if (shrinkAmt >= headerHeight){
              //header is totaly hidden - start moving startY downward so that when scrolling up the header starts showing
              // starty = (e.detail.scrollTop - headerHeight);
              // shrinkAmt = headerHeight;
              //if(window.AdMob) AdMob.hideBanner();  
              //$timeout.cancel(timeoutID);
              //timeoutID=$timeout(function(){ if(window.AdMob) AdMob.showBanner(AdMob.AD_POSITION.BOTTOM_CENTER);  },4000); 
            } else if (shrinkAmt < 0){
              //header is totaly displayed - start moving startY upwards so that when scrolling down the header starts shrinking
              starty = Math.max(orgStarty, e.detail.scrollTop);
              shrinkAmt = 0;
              //if(window.AdMob) AdMob.hideBanner(); 
              //$timeout.cancel(timeoutID);
              //timeoutID=$timeout(function(){ if(window.AdMob) AdMob.showBanner(AdMob.AD_POSITION.BOTTOM_CENTER);  },4000); 
            } 
            shrink(chil, $element[0], shrinkAmt, headerHeight); //do the shrinking   
            shrink(chil1, $element[0], shrinkAmt, headerHeight); //do the shrinking   
            tab(header2, $element[0], shrinkAmt, headerHeight); //do the shrinking   
            slider(header3, $element[0], shrinkAmt, headerHeight); //do the shrinking   
          
        });
      },2000);
    }
  }
})

// .directive('headerProgram', function($document,$timeout) {
//   var fadeAmt;

//   var shrink = function(header, content, amt, max) {
//     amt = Math.min(54, amt);
//     fadeAmt = 1 - amt / 54;
//     ionic.requestAnimationFrame(function() {
//       header.style[ionic.CSS.TRANSFORM] = 'translate3d(0, -' + amt + 'px, 0)';
//       for(var i = 0, j = header.children.length; i < j; i++) {
//         header.children[i].style.opacity = fadeAmt;
//       }
//     });
//   };
//   var header_ = function(header, content, amt, max) {
//     amt = Math.min(54, amt);
//     fadeAmt = 1 - amt / 54;
//     ionic.requestAnimationFrame(function() {
//       header.style[ionic.CSS.TRANSFORM] = 'translate3d(0, -' + amt + 'px, 0)';
//       //header.style.marginTop = '70px';
//     });
//   };
//   var tab = function(header, content, amt, max) {
//     amt = Math.min(54, amt);
//     fadeAmt = 1 - amt / 54;
//     ionic.requestAnimationFrame(function() {
//       header.style[ionic.CSS.TRANSFORM] = 'translate3d(0, -' + amt + 'px, 0)';
//     });
//   };
//   var slider_ = function(header, content, amt, max) {
//     amt = Math.min(53, amt);
//     fadeAmt = 1 - amt / 53;
//     ionic.requestAnimationFrame(function() {
//       header.style[ionic.CSS.TRANSFORM] = 'translate3d(0, -' + amt + 'px, 0)';
//       header.style.marginTop = '-'+amt+'px';
//       header.style.top = '-'+amt+'px';
//     });
//   };

//   return {
//     restrict: 'A',
//     link: function($scope, $element, $attr) {
//       $timeout(function(){  
//         var starty = orgStarty = $scope.$eval($attr.headerProgram) || 40;
//         var shrinkAmt,timeoutID=null;
        
//         var header = $document[0].body.querySelector('[nav-bar="active"]');
//         var chil = header.querySelector('.bar-header');
//         var header1 = $document[0].body.querySelector('[nav-bar="cached"]');
//         var chil1 = header1.querySelector('.bar-header');

//         // var header2 = $document[0].body.querySelector('.hd-pro');
//         // var header3 = $document[0].body.querySelector('.tsb-program');

//         // var header4 = $document[0].body.querySelector('.slider');

//         var headerHeight = chil.offsetHeight;

//         $element.bind('scroll', function(e) { 
//             shrinkAmt = headerHeight - (headerHeight - (e.detail.scrollTop - starty));

//             if (shrinkAmt >= headerHeight){
//               //header is totaly hidden - start moving startY downward so that when scrolling up the header starts showing
//               starty = (e.detail.scrollTop - headerHeight);
//               shrinkAmt = headerHeight;
//               if(window.AdMob) AdMob.hideBanner(); 
//               $timeout.cancel(timeoutID);
//               timeoutID=$timeout(function(){ if(window.AdMob) AdMob.showBanner(AdMob.AD_POSITION.BOTTOM_CENTER);  },3000); 
//             } else if (shrinkAmt < 0){
//               //header is totaly displayed - start moving startY upwards so that when scrolling down the header starts shrinking
//               starty = Math.max(orgStarty, e.detail.scrollTop);
//               shrinkAmt = 0;
//               if(window.AdMob) AdMob.hideBanner(); 
//               $timeout.cancel(timeoutID);
//               timeoutID=$timeout(function(){ if(window.AdMob) AdMob.showBanner(AdMob.AD_POSITION.BOTTOM_CENTER);  },3000); 
//             } 
//             // shrink(chil, $element[0], shrinkAmt, headerHeight); //do the shrinking   
//             // shrink(chil1, $element[0], shrinkAmt, headerHeight); //do the shrinking   
//             // header_(header2, $element[0], shrinkAmt, headerHeight); //do the shrinking   
//             // tab(header3, $element[0], shrinkAmt, headerHeight); //do the shrinking   
//             // slider_(header4, $element[0], shrinkAmt, headerHeight); //do the shrinking   
          
//         });
//       },3000);
//     }
//   }
// })

.config(function($stateProvider, $urlRouterProvider) {  //admobSvcProvider

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

  // HOMETEST
  .state('app.hometest', {
    url: '/hometest',
    views: {
      'menuContent': {
        templateUrl: 'templates/hometest.html',
        controller: 'HometestCtrl'
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
  })

  // Uploadfile
  .state('app.uploadfile', {
    url: '/uploadfile',
    views: {
      'menuContent': {
        templateUrl: 'templates/uploadfile.html',
        controller: 'uploadfileCtrl'
      }
    }
  })

  // allnews
  .state('app.allnews', {
    url: '/allnews/:key/:catname',
    views: {
      'menuContent': {
        templateUrl: 'templates/allnews.html',
        controller: 'allnewsCtrl'
      }
    }
  })

   // Login
  .state('app.login', {
    url: '/login',
    views: {
      'menuContent': {
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
      }
    }
  })

  // Register
  .state('app.register', {
    url: '/register',
    views: {
      'menuContent': {
        templateUrl: 'templates/register.html',
        controller: 'registerCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/hometest'); 
  //$urlRouterProvider.otherwise('/app/program');
});
