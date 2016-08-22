angular.module('services', [])

.factory("_auth", function($firebaseAuth) {
  var usersRef = new Firebase("https//facebook-login-natsu.firebaseio.com/users");
  return usersRef;
})

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
            file: "http://1457077260.cat-cdn.i-iptv.com/1457077260/smil:livestream.smil/playlist.m3u8?DVR",
            type: "hls"
           },{
                file: "http://1457077260.cat-cdn.i-iptv.com/1457077260/smil:mobile.smil/playlist.m3u8",
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
            width: '0%',
            aspectratio: '9:16',
            enableFullscreen: 'false',
            autostart: 'false',
            androidhls: 'true',
            stretching: 'exactfit',
            modes: [
                { type: 'hls' },
                { type: 'flash', src: '../lib/jwplayer-mirror/jwplayer.flash.swf' },
            ]
        });
        jwplayer().setVolume(80);
    }


}])  

.service("SpringNews",["$http","$ionicSlideBoxDelegate","_function","$ionicLoading","$cordovaLocalNotification",function($http,$ionicSlideBoxDelegate,_function,$ionicLoading,$cordovaLocalNotification){
    var path = "http://artbeat.mfec.co.th/SpringNews_mb/api/wp/";
    var key = "EAACEdEose0cBAP3LZAULs0sfBDrAFiY0xzMTJHPdzlxArcn4kw";

    // --------- หมวดหมู่
    this._category = function($scope,id){ 
        var url=path+"Categories/parent?api-key="+key+"&id="+id; 
        $http.get(url).success(function(result){ 
            $scope.tabs = result;
            $ionicSlideBoxDelegate.update();
        })  
        .error(function(){  
            $ionicSlideBoxDelegate.update();
        });
    } 
    // --------- ข่าว คอมลัม
    this._catNews = function($scope,id,offset){
        var url_=path+"Posts/categoryID?api-key="+key+"&cat_id="+id+"&offset="+offset+"&limit=10&order=post_date&by=DESC"; 
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
    // --------- หมวดหมู่รายการ
    this._categoryProgram = function($scope,id){ 
        var url=path+"Categories/parent?api-key="+key+"&id="+id; 
        $http.get(url).success(function(result){ 
            $scope.tabs = result;
            var url_=path+"Posts/categoryID?api-key="+key+"&cat_id="+$scope.tabs[0].term_id+"&order=post_date&by=DESC"; 
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
        var url_=path+"Posts/categoryID?api-key="+key+"&cat_id="+id+"&order=post_date&by=DESC"; 
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
        var url=path+"Advertise/id?api-key="+key+"&adv_id="+id; 
        $http.get(url).success(function(result){ 
            $scope.adver = result;
            $ionicSlideBoxDelegate.update();
        })  
        .error(function(){  
 
        });
    }
    // --------- ทันเหตุการณ์
    this._newsupdate = function($scope,id){ 
        var url=path+"Posts/categoryID?api-key="+key+"&cat_id="+id+"&limit=5&order=post_date&by=DESC"; 
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
        var url=path+"Hots/name?api-key="+key+"&tag_name="+name+"&limit=5"; 
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
        var url=path+"Posts/categoryID?api-key="+key+"&cat_id="+id+strLimit+"&order=post_date&by=DESC"; 
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
        var url=path+"Posts/postID?api-key="+key+"&post_id="+id;
        var regex = /http[^]+/g;
        var video_id = []; 
        $http.get(url).success(function(result){ 
            if(result != ""){
                $scope.newsDetail = result; 
                video_id = regex.exec(result[0].post_content);         
                if(video_id != null){
                    $scope.video = video_id[0].replace("[/embed]","").split('/')[3];
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
        var url=path+"Posts/categoryID?api-key="+key+"&cat_id="+catId+"&limit=2&order=RAND()"; 
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
        var url=path+"Posts/postID?api-key="+key+"&post_id="+id;
        var regex = /id="([^"]+)"/g; 
        var video_id = [];
        $http.get(url).success(function(result){ 
            if(result != ""){
                $scope.videosDetail = result; 
                $scope.date = _function._date($scope.videosDetail[0].post_date.substring(0, 10),$scope.videosDetail[0].post_date.substring(12, 16));
                video_id = regex.exec(result[0].post_content);
                if(video_id != null){
                    var url_=path+"Pages/videoID?api-key="+key+"&video_id="+video_id[1]; 
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
           var url=path+"Schedules/schedulesID?api-key="+key+"&weekday='"+scheID+"'"; 
        }else{
           var url=path+"Schedules/schedulesID?api-key="+key+"&weekday="+scheID+""; 
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
        var url=path+"Schedules/?api-key="+key+""; 
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
        var url=path+"Pages/pagesID?api-key="+key+"&page_id=433"; 
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
        var url=path+"Pages/pagesID?api-key="+key+"&page_id=481"; 
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
        var url=path+"Pages/pagesID?api-key="+key+"&page_id=493"; 
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
        var url=path+"Pages/pagesID?api-key="+key+"&page_id=4138"; 
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
        var url=path+"Feeds/ptt?api-key="+key; 
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
        var url=path+"Feeds/thaigold?api-key="+key; 
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
        var url=path+"Feeds/setshare?api-key="+key; 
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
        var url=path+"Posts/postSearch?api-key="+key+"&keyword="+keyword; 
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
        var url=path+"Email/send"; 
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
    
   

}])  