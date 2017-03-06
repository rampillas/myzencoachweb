angular.module('videosModule', []);
angular.module('videosModule').factory("videos",function($http,url){
    var videos = {
        getVideos: function() {
            return $http.get(url.get() + '/essential_information/videos/');
        },
        registerVideo: function (data) {
            return $http.post(url.get() + '/essential_information/videos/',data);
        }
    };
    return videos;
});

