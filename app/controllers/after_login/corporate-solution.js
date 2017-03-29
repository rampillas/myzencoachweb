var corporate = angular.module("corporateSolutionModule",[]);

corporate.controller("corporateSolutionController",function($scope,$rootScope,solutions){

    $scope.dilemmas = [];
    $scope.reason = "";

    $scope.getDilemas = function () {
        solutions.getDilemasByState('user',{state:"waitingForAnswer"})
            .success(function (r) {
                $scope.dilemmas = r.results;
            })
            .error(function (e) {
                console.clear();
            })
    }

    $scope.seeDilemma = function (dilemma) {
        $scope.currentDilemma = dilemma;

        var date = new Date($scope.currentDilemma.date);
        date = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay();
        $scope.currentDilemma.date = date;
        jQuery("#seeDilemma").modal("show");
    }

    $scope.aprobeDilemma = function () {
        solutions.updateDilemma($scope.currentDilemma.nick_user,
            {
                username: $scope.currentDilemma.nick_user,
                title: $scope.currentDilemma.title,
                state: "acepted"
            })
            .success(function (r) {
                $scope.getDilemas();
                $('#seeDilemma').hide();
                $('.modal-backdrop').hide();
            })
            .error(function (e) {
                console.clear();
            })
    }

    $scope.refuseDilemma = function () {
        $('#seeDilemma').hide();
        $('.modal-backdrop').hide();
        
        jQuery("#changeDilemma").modal("show");
    }

    $scope.refuse = function () {
        if($scope.reason != ""){
            var date = new Date();
            date = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay();

            solutions.changeDilemma($scope.currentDilemma.nick_user,{
                username: $scope.currentDilemma.nick_user,
                title: $scope.currentDilemma.title,
                state: "refused",
                coach:{
                    date: date,
                    description: $scope.reason
                }
            })
                .success(function (r) {
                    $scope.reason = "";
                    $scope.getDilemas();

                    $('#changeDilemma').hide();
                    $('.modal-backdrop').hide();
                })
                .error(function (e) {
                    console.clear();
                })
        }
        else
            alert("Escribe el motivo por favor");
    }

    $rootScope.verifyLogin();
    $scope.getDilemas();

});