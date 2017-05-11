var corporate = angular.module("corporateSolutionModule",[]);

corporate.controller("corporateSolutionController",function($scope,$rootScope,solutions){

    $scope.dilemmas = [];
    $scope.reason = "";
    $scope.next = "";
    $scope.previous = "";

    $scope.getDilemas = function () {
        solutions.getDilemasByState('user',{state:"waitingForAnswer"})
            .success(function (r) {
                $scope.dilemmas = r.results;
                $scope.next = r.next;
                $scope.previous = r.previous;
            })
            .error(function (e) {
                console.clear();
            })
    }

    $scope.seeDilemma = function (dilemma) {
        $scope.currentDilemma = dilemma;

        var date = new Date($scope.currentDilemma.date);
        //date = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay();
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
                $("#seeDilemma").modal('hide');
            })
            .error(function (e) {
                console.clear();
            })
    }

    $scope.refuseDilemma = function () {
        $("#seeDilemma").modal('hide');
        
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

                    $("#changeDilemma").modal('hide');
                })
                .error(function (e) {
                    console.clear();
                })
        }
        else
            alert("Escribe el motivo por favor");
    }
    
    $scope.nextPage = function () {
        solutions.nextOrPreviousDilemmas($scope.next,{state:"waitingForAnswer"})
            .success(function (r) {
                $scope.dilemmas = r.results;
                $scope.next = r.next;
                $scope.previous = r.previous;
            })
            .error(function (e) {
                console.clear();
            })
    }
    
    $scope.previousPage = function () {
        solutions.nextOrPreviousDilemmas($scope.previous,{state:"waitingForAnswer"})
            .success(function (r) {
                $scope.dilemmas = r.results;
                $scope.next = r.next;
                $scope.previous = r.previous;
            })
            .error(function (e) {
                console.clear();
            })
    }

    $rootScope.verifyLogin();
    $scope.getDilemas();

});
