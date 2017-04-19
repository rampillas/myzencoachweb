var reports = angular.module("usersFrecuencyModule",[]);

reports.controller("usersFrecuencyController",function($scope,$rootScope,users,CONSTANTS,sessionStorage,
                                                       encodeService)
{

    $scope.connections = [];

    $scope.userConnections = [];

    $scope.getAllConnections = function () {
        users.getUsersConnections(encodeService.decodeUtf8base64(sessionStorage.getItem("tfm:username")))
            .success(function (r) {
                $scope.connections = r.results;
            })
            .error(function (e) {
                console.clear();
            })
    }

    $scope.getDetailConnectionsFromUser = function (username) {
        users.getDetailConnections(encodeService.decodeUtf8base64(sessionStorage.getItem("tfm:username")),
            {
            "number_connections": CONSTANTS.numberConnectionsUser,
            "username": username
            })
            .success(function (r) {
                $scope.userConnections = r.results;
                jQuery("#detailUserConnections").modal("show");
            })
            .error(function (e) {
                console.clear();
            })
    }

    $scope.seeDetailsUserConnections = function (user) {
        $scope.currentUser = user;
        $scope.getDetailConnectionsFromUser(user.username);
    }



    $rootScope.verifyLogin();
    $scope.getAllConnections();
});