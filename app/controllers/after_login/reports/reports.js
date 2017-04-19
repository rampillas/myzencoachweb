var reports = angular.module("reportsModule",[]);

reports.controller("reportsController",function($scope,$rootScope) {

    $rootScope.verifyLogin();
});