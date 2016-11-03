angular.module('services', ['ngCordova'])

.factory('facebookService', function($q) {
    return {
        getMyLastName: function() {
            var deferred = $q.defer();
            FB.api('/me', {
                fields: 'last_name'
            }, function(response) {
                if (!response || response.error) {
                    deferred.reject('Error occured');
                } else {
                    deferred.resolve(response);
                }
            });
            return deferred.promise;
        }
    }
})

.factory('ConnectivityMonitor', function($rootScope, $cordovaNetwork ,$ionicPopup ){
 
  return {
    isOnline: function(){
      if(ionic.Platform.isWebView()){
        return $cordovaNetwork.isOnline();    
      } else {
        return navigator.onLine;
      }
    },
    isOffline: function(){
      if(ionic.Platform.isWebView()){
        return !$cordovaNetwork.isOnline();    
      } else {
        return !navigator.onLine;
      }
    },
    startWatching: function(){
        if(ionic.Platform.isWebView()){
 
          $rootScope.$on('$cordovaNetwork:online', function(event, networkState){
            window.location.reload(true)  
          });
 
          $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
            $ionicPopup.alert({
              title: 'No Internet Connection',
              content: 'Sorry, no Internet connectivity detected. Please reconnect and try again.'
            })
            .then(function(result) {
                if(typeof cordova.plugins.settings.openSetting != undefined){
                    cordova.plugins.settings.openSetting("settings", function(){
                    },
                    function(){  
                    });
                }
            });
          });
 
        }
        else {
 
          window.addEventListener("online", function(e) {
            window.location.reload(true) 
          }, false);    
 
          window.addEventListener("offline", function(e) {
            $ionicPopup.alert({
              title: 'No Internet Connection',
              content: 'Sorry, no Internet connectivity detected. Please reconnect and try again.'
            })
            .then(function(result) {
                if(typeof cordova.plugins.settings.openSetting != undefined){
                    cordova.plugins.settings.openSetting("settings", function(){
                    },
                    function(){
                    });
                }
            });
          }, false);  
        }       
    }
  }
})


.service("_function",["$http","$ionicSlideBoxDelegate","$ionicPopup",function($http,$ionicSlideBoxDelegate,$ionicPopup){  
    this._onError = function(onError){
        $ionicPopup.alert({  
                title: 'คำแนะนำ',  // หัวข้อหลัก  
                template: 'มีปัญหาในการตรวจหาตำแหน่ง'  // template หรือข้อความที่ต้องการแสดง  
        }).then(function(res) { // เมื่อปิด popup   
             
        });  
    }

    this._date = function(d,t){
        var monthNamesThai = ["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน",
        "กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤษจิกายน","ธันวาคม"];
        var d = new Date(d);
        return d.getDate()+" "+monthNamesThai[d.getMonth()]+" "+d.getFullYear()+ " เวลา "+t ;
    }

    this._jwTV = function($scope){ 

        jwplayer('broadcast').setup({
          playlist: [{
                 /*image: "http://www.springnewstv.tv/themes/spring/images/logo-spring-static.png",*/
                 sources: [{
            file: "http://1457077260.cat-cdn.i-iptv.com/T1457077260/ngrp:livestream_all/playlist.m3u8?DVR",
            type: "hls"
           },{
                file: "http://1457077260.cat-cdn.i-iptv.com/T1457077260/ngrp:livestream_mobile/playlist.m3u8",
            type: "html5"
           }]
             }],
                        skin: 'vapor',
          title: 'SPRING NEWS',
                width: '100%',
                aspectratio: '16:9',
                autostart: 'true',
                androidhls: 'true',
          hlslabels:{
                   "3906":"1080p",
                   "1953":"720p",
             "1000":"480p",
             "684":"360p",
             "391":"240p"
             },
                modes: [
           { type: 'html5' },
           { type: 'flash', src: 'http://uat.springnews.co.th/wp-content/themes/mh-magazine-lite/plus/player/jwplayer.flash.swf' },
          ]
        });

        jwplayer().onPlay(function() { 
            jwplayer().setCurrentQuality(3);
        });

    }

    this._jwRadio = function(){ 

        jwplayer('springradio').setup({
          playlist: [{
                 sources: [{
            file: "rtmp://1457072400.cat-cdn.i-iptv.com:1935/1457072400/springradio",
            type: "rtmp"
           },{
            file: "http://1457072400.cat-cdn.i-iptv.com/1457072400/springradio/playlist.m3u8",
            type: "hls"
           }]
           
             }],
                title: 'Spring Radio FM 98.5 MHz',
          skin: 'vapor',
          controls: 'true', 
                width: '100%',
                aspectratio: '9:16',
          enableFullscreen: 'false',
                autostart: 'true',
                androidhls: 'true',
                stretching: 'exactfit',
                modes: [
           { type: 'hls' },
           { type: 'flash', src: 'http://www.springnews.co.th/wp-content/themes/springnews/plus/player/jwplayer.flash.swf' },
          ]
        });
        jwplayer().setVolume(80);
    }


}])  

.service("SpringNews",["$http","$ionicSlideBoxDelegate","_function","$ionicLoading","$cordovaLocalNotification",function($http,$ionicSlideBoxDelegate,_function,$ionicLoading,$cordovaLocalNotification){
    // --------- หมวดหมู่
    this._category = function($scope,id){ 
        var url=path+"wp/Categories/parent?api-key="+key+"&id="+id; 
        $http.get(url).success(function(result){ 
            $scope.tabs = result;
            $ionicSlideBoxDelegate.update();
            // console.log(result)
        })  
        .error(function(){  
            $ionicSlideBoxDelegate.update();
        });
    } 
    // --------- ข่าว คอมลัม
    this._catNews = function($scope,id,offset){
        var url_=path+"wp/Posts/categoryID?api-key="+key+"&cat_id="+id+"&offset="+offset+"&limit=10&order=post_date&by=DESC"; 
        $http.get(url_).success(function(result_){ 
            if(result_ != ""){
                for (var i = 0 ;i < result_.length ; i++) {
                   $scope.newsCategory.push(result_[i]);
                }
            }
            $scope.loading_catnews = false;
        })  
        .error(function(){  
            $scope.loading_catnews = false;
        });
    }

    // --------- ข่าว ทั้งหมด ใน หมวด
    this._catallNews = function($scope,id){
        var url_=path+"wp/Posts/categoryAll?api-key="+key+"&cat_id="+id+"&order=post_date&by=DESC"; 
        $http.get(url_).success(function(result_){ 
            if(result_ != ""){
                   $scope.allnewsCategory = result_ ;
            }
            $scope.loading_catnews = false;
        })  
        .error(function(){  
            $scope.loading_catnews = false;
        });
    }
    // --------- หมวดหมู่รายการ
    this._categoryProgram = function($scope,id){ 
        var url=path+"wp/Categories/parent?api-key="+key+"&id="+id; 
        $http.get(url).success(function(result){ 
            $scope.tabs = result;
            var url_=path+"wp/Posts/categoryID?api-key="+key+"&cat_id="+$scope.tabs[0].term_id+"&order=post_date&by=DESC"; 
            $http.get(url_).success(function(result_){ 
                if(result_ != ""){
                    for (var i = 0 ;i < result_.length ; i++) {
                       $scope.newsCategory.push(result_[i]);
                    }
                }
                $scope.loading_catnews = false;
            })  
            .error(function(){  
                $scope.loading_catnews = false;
            });
            $ionicSlideBoxDelegate.update();
        })  
        .error(function(){  
            $ionicSlideBoxDelegate.update();
        });
    } 
    // --------- รายการข่าว
    this._programNews = function($scope,id){
        var url_=path+"wp/Posts/categoryID?api-key="+key+"&cat_id="+id+"&order=post_date&by=DESC"; 
        $http.get(url_).success(function(result_){ 
            if(result_ != ""){
                for (var i = 0 ;i < result_.length ; i++) {
                   $scope.newsCategory.push(result_[i]);
                }
            }
            $scope.loading_catnews = false;
        })  
        .error(function(){  
            $scope.loading_catnews = false;
        });
    }
    // --------- โฆษาณา
    this._advertise = function($scope,id){
        var url=path+"wp/Advertise/id?api-key="+key+"&adv_id="+id; 
        $http.get(url).success(function(result){ 
            $scope.adver = result;
            $ionicSlideBoxDelegate.update();
        })  
        .error(function(){  
 
        });
    }
    // --------- ทันเหตุการณ์
    this._newsupdate = function($scope,name){ 
        // var url=path+"wp/Posts/categoryID?api-key="+key+"&cat_id="+id+"&limit=5&order=post_date&by=DESC"; 
        var url=path+"wp/Hots/name?api-key="+key+"&tag_name="+name+"&limit=5"; 
        $http.get(url).success(function(result){ 
            if(result != ""){
                $scope.news = result; 
                $scope.newsupdate.title = $scope.news[0].post_title;
                $scope.newsupdate.date = _function._date($scope.news[0].post_date.substring(0, 10),$scope.news[0].post_date.substring(12, 16));
                $scope.loading_newsupdate = false;   
            }else{
                $scope.loading_newsupdate = false;
            }
            $scope.$broadcast("scroll.refreshComplete"); 
        })  
        .error(function(){  
           $scope.loading_newsupdate = false;
        });  
        
    }  
    // --------- ประเด็นร้อน
    this._newshot = function($scope,name){ 
        var url=path+"wp/Hots/name?api-key="+key+"&tag_name="+name+"&limit=5"; 
        $http.get(url).success(function(result){ 
            if(result != ""){
                $scope.hots = result; 
                $scope.newshot.title = $scope.hots[0].post_title;
                $scope.newshot.date = _function._date($scope.hots[0].post_date.substring(0, 10),$scope.hots[0].post_date.substring(12, 16));
                $scope.loading_newshot = false;
            }else{
                $scope.loading_newshot = false;
            }
            $scope.$broadcast("scroll.refreshComplete"); 
            $ionicSlideBoxDelegate.update();
        })  
        .error(function(){  
            $scope.loading_newshot = false;
        });  
    }  
    // --------- คลิปรายการ
    this._clips = function($scope,id,limit){ 
        var strLimit = '';
        if(limit != ''){
            strLimit = "&limit="+limit;
        }else{
            strLimit = '';
        }
        var url=path+"wp/Posts/categoryID?api-key="+key+"&cat_id="+id+strLimit+"&order=post_date&by=DESC"; 
        $http.get(url).success(function(result){ 
            if(result != ""){
                $scope.clips = result; 
                $scope.clips_loop = result.splice(1,$scope.clips.length);

                $scope.loading_clip = false;
            }else{
                $scope.loading_clip = false;
            }
            $scope.$broadcast("scroll.refreshComplete"); 
        })  
        .error(function(){  
            $scope.loading_clip = false;
        });  
    }  
    //---------- รายละเอียดข่าว
    this._newsdetail = function($scope,id){ 
        var url=path+"wp/Posts/postID?api-key="+key+"&post_id="+id;
        var regex = /http[^]+/g;
        var video_id = []; 
        $http.get(url).success(function(result){ 
            if(result != ""){
                $scope.newsDetail = result; 
                video_id = regex.exec(result[0].post_content);         
                if(video_id != null){
                    $scope.video = "https://www.youtube.com/embed/"+video_id[0].replace("[/embed]","").split('/')[3];
                }
                $scope.date = _function._date($scope.newsDetail[0].post_date.substring(0, 10),$scope.newsDetail[0].post_date.substring(12, 16));

                $scope.loading_newsdetail = false;
            }else{
                $scope.loading_newsdetail = false;
            }

        })  
        .error(function(){  
            $scope.loading_newsdetail = false;
        });  
    } 
    //---------- รายละเอียดข่าว ที่เกี่ยวข้อง
    this._newsconnected = function($scope,id,catId){ 
        var url=path+"wp/Posts/categoryID?api-key="+key+"&cat_id="+catId+"&limit=2&order=RAND()"; 
        $http.get(url).success(function(result){ 
            if(result != ""){
                $scope.newsConnected = result; 
            }
        })  
        .error(function(){  
        });  
    } 
    //---------- รายละเอียด เนื้อหารายการ
    this._videosdetail = function($scope,id){ 
        var url=path+"wp/Posts/postID?api-key="+key+"&post_id="+id;
        var regex = /id="([^"]+)"/g; 
        var video_id = [];
        $http.get(url).success(function(result){ 
            if(result != ""){
                $scope.videosDetail = result; 
                $scope.date = _function._date($scope.videosDetail[0].post_date.substring(0, 10),$scope.videosDetail[0].post_date.substring(12, 16));
                video_id = regex.exec(result[0].post_content);
                if(video_id != null){
                    var url_=path+"wp/Pages/videoID?api-key="+key+"&video_id="+video_id[1]; 
                    $http.get(url_).success(function(result){ 
                        if(result != ""){
                            $scope.video = JSON.parse(result[0].data); 
                        }else{

                        }
                    })  
                    .error(function(){  
                    });  
                }
                $scope.loading_videosdetail = false;
            }else{
                $scope.loading_videosdetail = false;
            }

        })  
        .error(function(){  
            $scope.loading_videosdetail = false;
        });  
    } 
    
    // --------- ผังรายการ
    this._schedules = function($scope,scheID){ 
        if(scheID == 0){
           var url=path+"wp/Schedules/schedulesID?api-key="+key+"&weekday='"+scheID+"'"; 
        }else{
           var url=path+"wp/Schedules/schedulesID?api-key="+key+"&weekday="+scheID+""; 
        }
        $http.get(url).success(function(result){ 
            if(result != ""){
                $scope.schedules = result;
            }
            $scope.loading_schedule = false;
        })  
        .error(function(){  
            $scope.loading_schedule = false;
        });  
    } 
    // --------- ผังรายการปัจจุบัน
    this._schedulesNow = function($scope,scheID){ 
        var url=path+"wp/Schedules/?api-key="+key+""; 
        $http.get(url).success(function(result){ 
            if(result != ""){
                $scope.schedules = result;
            }
            $scope.loading_schedule = false;
        })  
        .error(function(){  
            $scope.loading_schedule = false;
        });  
    } 
    // --------- ประวัติ
    this._pages_history = function($scope){ 
        var url=path+"wp/Pages/pagesID?api-key="+key+"&page_id=433"; 
        $ionicLoading.show();  
        $http.get(url).success(function(result){ 
            $scope.history = result[0].post_content; 
            $ionicLoading.hide();       
        })  
        .error(function(){  
            $ionicLoading.hide();   
        });  
    } 
    // --------- วิสัยทัศ์ / ภารกิจ
    this._pages_vision = function($scope){ 
        var url=path+"wp/Pages/pagesID?api-key="+key+"&page_id=481"; 
        $ionicLoading.show();  
        $http.get(url).success(function(result){
            $scope.vision = result[0].post_content;
            $ionicLoading.hide();            
        })  
        .error(function(){  
            $ionicLoading.hide();  
        });  
    } 
    // --------- ติดต่อเรา
    this._pages_contact = function($scope){ 
        var url=path+"wp/Pages/pagesID?api-key="+key+"&page_id=493"; 
        $ionicLoading.show();   
        $http.get(url).success(function(result){ 
            $scope.contactImg = result[0].guid;
            $scope.contact = result[0].post_content;
            $ionicLoading.hide();            
        })  
        .error(function(){  
            $ionicLoading.hide();  
        });  
    } 
     // --------- กิจกรรม
    this._pages_activity = function($scope){ 
        var url=path+"wp/Pages/pagesID?api-key="+key+"&page_id=4138"; 
        $ionicLoading.show();   
        $http.get(url).success(function(result){ 
            $scope.activity = result[0].post_content;
            $ionicLoading.hide();      
        })  
        .error(function(){  
            $ionicLoading.hide();  
        });  
    } 
    // ----------- Feed น้ำมัน
    this._oil = function($scope){ 
        var url=path+"wp/Feeds/ptt?api-key="+key; 
        $http.get(url).success(function(result){
            $scope.oils = result;
            $scope.$broadcast("scroll.refreshComplete"); 
        })  
        .error(function(){  
            $scope.$broadcast("scroll.refreshComplete"); 
        });  
    } 
    // ----------- Feed ทอง
    this._thaigold = function($scope){ 
        var url=path+"wp/Feeds/thaigold?api-key="+key; 
        $http.get(url).success(function(result){
           $scope.thaigolds = result;
           $scope.$broadcast("scroll.refreshComplete"); 
        })  
        .error(function(){  
           $scope.$broadcast("scroll.refreshComplete"); 
        });  
    } 
    // ----------- Feed หุ้น
    this._part = function($scope){ 
        var url=path+"wp/Feeds/setshare?api-key="+key; 
        $http.get(url).success(function(result){
           $scope.parts = result;
           $scope.$broadcast("scroll.refreshComplete"); 
        })  
        .error(function(){  
           $scope.$broadcast("scroll.refreshComplete"); 
        });  
    } 
    // ------------ Search ค้นหา
    this._search = function($scope,keyword){
        var url=path+"wp/Posts/postSearch?api-key="+key+"&keyword="+keyword; 
        $scope.showloading=true; 
        $http.get(url).success(function(result){ 
            if(result != ""){
               $scope.dict_result=result; 
            }
            $scope.showloading=false; 
        })  
        .error(function(){  
            $scope.showloading=false; 
        });
    }
    // ------------ Email ค้นหา
    this._email = function(value){
        var url=path+"wp/Email/send"; 
        $http({
            method  : 'POST',
            url     :  url,
            data    :  value,  // pass in data as strings
            headers : {'api-key': key}  // set the headers so angular passing info as form data (not request payload)
        })
        .success(function(data) {
            alert(data)
        });
    }
    //-------------- get XP 
    this._getxp = function(value,id){
        var url=path+"be/Levels/getUserLV"; 
        $http({
            method  : 'GET',
            url     :  url,
            data    :  value,  // pass in data as strings
            headers : {'api-key': key}  // set the headers so angular passing info as form data (not request payload)
        })
        .success(function(data) {
            alert(data)
        });
    }
    //-------------- int XP 
    this._intxp = function(id_,value_){
        var url=path+"be/Levels/insertuserLV"; 
        $http({
            method  : 'POST',
            url     :  url,
            data    :  {id:id_,xp:value_},  // pass in data as strings
            headers : {'api-key': key}  // set the headers so angular passing info as form data (not request payload)
        })
        .success(function(data) {

        });
    }
      
    
}])


.factory('SQLite_return', function($http) {
    var user_res,user_get_res,user_get_login;
    var Data_User = {
        _Register: function($scope,user_info){ 
            if(!user_res){
                var url=path+"be/Users/insert"; 
                user_res = $http({
                    method  : 'POST',
                    url     :  url,
                    data    :  user_info,  // pass in data as strings
                    headers : {'api-key': key}  // set the headers so angular passing info as form data (not request payload)
                }).then(function(response) {
                    return response.data;
                });
            }
            console.log(user_res);
            return user_res;
        },

        _get_info: function($scope,d){
            if(!user_get_res){
                console.log(d);
                var url=path+"be/Users/getID?api-key="+key+"&id="+d.ID; 
                user_get_res = $http.get(url).then(function(result){

                  alert("_get_infooooooo"+JSON.stringify(result.data));
                  return result.data;
                });
            }
            return user_get_res;
        },

        _login: function($scope,login_data){
            alert("_loginnnnnnnnnn_before_if   "+JSON.stringify(login_data));
            if(!user_get_login){
                alert("_loginnnnnnnnnn      "+JSON.stringify(login_data));
                var url=path+"be/Users/logInUser"; 
                user_get_login =$http({
                    method  : 'POST',
                    url     :  url,
                    data    :  login_data,  // pass in data as strings
                    headers : {'api-key': key}  // set the headers so angular passing info as form data (not request payload)
                }).then(function(response) {
                    return response.data;
                });
            }
            return user_get_login;
        }

    };
    return Data_User;
})

.service("Actions",["$http","$ionicSlideBoxDelegate","_function","$ionicLoading","$cordovaLocalNotification","$cordovaSQLite",function($http,$ionicSlideBoxDelegate,_function,$rootScope,$ionicLoading,$cordovaLocalNotification,$cordovaSQLite){ 
    // ---------  อ่านข่าว
    this._read = function($scope,new_info){
        var url=path+"be/Socials/views"; 
        $http({
            method  : 'POST',
            url     :  url,
            data    :  new_info,  // pass in data as strings
            headers : {'api-key': key}  // set the headers so angular passing info as form data (not request payload)
        })
        .success(function(data) {
            console.log("countread_success");
        }).error(function(){  
            console.log("countread_error");
        });
    }

     // ---------  แชร์ข่าว
    this._share = function($scope,new_info){
        var url=path+"be/Socials/shares"; 
        $http({
            method  : 'POST',
            url     :  url,
            data    :  new_info,  // pass in data as strings
            headers : {'api-key': key}  // set the headers so angular passing info as form data (not request payload)
        })
        .success(function(data) {
            console.log("countshare_success");
        }).error(function(){  
            console.log("countshare_error");
        });
    }

    // ---------  ชอบข่าว
    this._like = function($scope,new_info){
        var url=path+"be/Socials/likes"; 
        $http({
            method  : 'POST',
            url     :  url,
            data    :  new_info,  // pass in data as strings
            headers : {'api-key': key}  // set the headers so angular passing info as form data (not request payload)
        })
        .success(function(data) {
            console.log("countlike_success");
        }).error(function(err){  
            console.log("countlike_error"+err);
        });
    }

    // ---------  เพิ่ม xp
    this._upxp = function($scope,user_xp){
        
        var url=path+"be/Levels/insertuserLV"; 
        $http({
            method  : 'POST',
            url     :  url,
            data    :  user_xp,  // pass in data as strings
            headers : {'api-key': key}  // set the headers so angular passing info as form data (not request payload)
        })
        .success(function(data) {
            console.log("upxp_success");
        }).error(function(err){  
            console.log("upxp_error"+err);
        });
    }

}]) 