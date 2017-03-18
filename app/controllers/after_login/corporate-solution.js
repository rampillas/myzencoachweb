var corporate = angular.module("corporateSolutionModule",[]);

corporate.controller("corporateSolutionController",function($scope,solutions){

    $scope.dilema = {}
    $scope.dilemas = [];

    $scope.addDilema = function () {
        $scope.dilemas.push({
            dilema: $scope.dilema.ingresar,
            usuario: $scope.dilema.usuario
        })
    }

});
