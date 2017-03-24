var corporate = angular.module("corporateSolutionModule",[]);

corporate.controller("corporateSolutionController",function($scope,solutions){

    $scope.dilema = {}
    $scope.dilemas = [];

    $scope.addDilema = function () {
        $scope.dilemas.push({
            Quien: $scope.dilema.usuario,
            Titulo: $scope.dilema.titulo,
            Descripcion: $scope.dilema.descripcion
        })
        $('#newDilema').hide();
        $('.modal-backdrop').hide();
    }
});
