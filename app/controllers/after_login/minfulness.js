var minfulness = angular.module("minfulnessModule",[]);

essential.controller("minfulnessController",function($scope,$location,$rootScope){

    $scope.title = "";
    $scope.description = "";
    $scope.survey = [];
    $scope.questions = [];

    $scope.clean = function () {
        $scope.title = "";
        $scope.description = "";
    }
    $scope.addQuestion = function () {
        $scope.questions.push({title:$scope.title,description:$scope.description});
        $('#newQuestion').hide();
        $('.modal-backdrop').hide();
        $scope.clean();
    }
    $rootScope.verifyLogin();

});