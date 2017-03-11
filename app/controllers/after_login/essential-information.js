var essential = angular.module("essentialInformationModule",[]);

essential.controller("essentialInformationController",function($scope,$location,$rootScope,videos,surveys){

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

    /*ADD SURVEY*/
    $scope.addSurvey = function (video) {
        $scope.currentVideo = video;
        $scope.isFinishQuestion = false;
        $scope.currentAnswers = [];
        $scope.currentQuestions = [];
        jQuery("#addSurvey").modal("show");
    }

    $scope.answerIsRight = false;
    $scope.addQuestion = function () {
        if($scope.nameQuestion != undefined && $scope.nameQuestion != "")
        {
            if($scope.answerQuestion != undefined && $scope.answerQuestion != "")
            {
                $scope.isFinishQuestion = true;
                $scope.currentAnswers.push({description:$scope.answerQuestion,
                                            is_right: $scope.answerIsRight});
                $scope.answerQuestion = "";
                $scope.answerIsRight = false;
            }
            else
                alert("Debe registrar al menos una respuesta para la pregunta");
        }
        else
            alert("Escriba el nombre de la Encuesta");
    }

    $scope.finishAddQuestion = function () {
        $scope.answerIsRight = false;
        $scope.currentQuestions.push({description:$scope.nameQuestion,answers:$scope.currentAnswers});
        $scope.isFinishQuestion = false;
        $scope.currentAnswers = [];
        $scope.nameQuestion = "";
        $scope.answerQuestion = "";
    }
    
    $scope.saveSurvey = function () {
        if($scope.nameSurvey != undefined && $scope.nameSurvey != ""){
            if($scope.currentQuestions.length > 0){
                var data = {
                    description: $scope.nameSurvey,
                    name: $scope.currentVideo.name,
                    score: 0,
                    questions: $scope.currentQuestions
                };
                surveys.registerSurvey(data)
                    .success(function (r) {
                        $scope.getVideosUser();
                        $('#addSurvey').hide();
                        $('.modal-backdrop').hide();
                    })
                    .error(function (e) {
                        console.clear();
                    })
            }
            else
                alert("Debes registrar al menos una pregunta para la encuesta");
        }
        else
            alert("Escribe el nombre de la encuesta");

    }
    

    /*SEE SURVEY*/
    $scope.seeSurvey = function (video) {
        $scope.currentVideo = video;
        jQuery("#seeSurvey").modal("show");
    }

    $rootScope.verifyLogin();
    $scope.getVideosUser();
});