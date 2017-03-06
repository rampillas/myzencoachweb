var essential = angular.module("essentialInformationModule",[]);

essential.controller("essentialInformationController",function($scope,$location,$rootScope,videos){

    $scope.videos = [];
    $scope.nameVideo = "";
    $scope.urlVideo = "";
    $scope.dateVideo = "";
    $scope.photoUrl = "";

    $scope.clean = function () {
        $scope.nameVideo = "";
        $scope.urlVideo = "";
        $scope.dateVideo = "";
        $scope.photoUrl = "";
    }

    $scope.getVideosUser = function () {
        videos.getVideos()
            .success(function (r) {
                $scope.videos = r.results;
            })
            .error(function (e) {
                console.clear();
            })
    }
    
    $scope.saveVideo = function () {
        if($scope.nameVideo != "" && $scope.urlVideo != "" && $scope.dateVideo != "" && $scope.photoUrl != ""){
            var date = $scope.dateVideo.getFullYear() + '-' + $scope.dateVideo.getMonth() + '-' + $scope.dateVideo.getDay();
            videos.registerVideo({
                name: $scope.nameVideo,
                url: $scope.urlVideo,
                new_attr: 1,
                is_watched: false,
                date: date,
                photo_url: $scope.photoUrl
            })
                .success(function (r) {
                    $scope.getVideosUser();
                    $('#newVideo').hide();
                    $('.modal-backdrop').hide();
                    $scope.clean();
                })
                .error(function (e) {
                    console.clear();
                })
        }
        else
            alert("Todos los campos son requeridos");
    }

    $rootScope.verifyLogin();
    $scope.getVideosUser();
});