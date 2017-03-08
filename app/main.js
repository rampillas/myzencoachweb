var main = angular.module("mainModule",["ngRoute","homeModule","essentialInformationModule","minfulnessModule",
    "authorizationModule","storageModule","encodeModule","videosModule","surveysModule"]);

//Set base url
main.provider('url', function urlProvider() {
    var base;
    this.setBaseUrl = function(newUrl) {
        base = newUrl;
    };
    this.$get = function() {
        return {
            get: function() {
                return base;
            }
        };
    };
});

//Set constants
main.constant('CONSTANTS', {
    //Backend information
    url_server: 'http://192.168.0.3:8000',
    clientId: 'clientweb2231',
    clientSecret: 'secretweb2231'
});

//Set config
main.config(['$routeProvider','urlProvider','CONSTANTS', function($routeProvider,urlProvider,CONSTANTS) {
        //Set url server
        urlProvider.setBaseUrl(CONSTANTS.url_server);

        //Route config
        $routeProvider
        //Home
        .when('/', {
                templateUrl: './templates/home.html?v='+(new Date()).valueOf(),
                controller: 'homeController'
        })
        //My Zean Coach
        .when('/about', {
            templateUrl: './templates/about.html?v='+(new Date()).valueOf(),
            controller: 'homeController'
        })
        //Login
        .when('/login', {
            templateUrl: './templates/login.html?v='+(new Date()).valueOf(),
            controller: 'homeController'
        })
        //SignUp
        .when('/signup', {
            templateUrl: './templates/signup.html?v='+(new Date()).valueOf(),
            controller: 'homeController'
        })
        //Essential Information
        .when('/essential', {
            templateUrl: './templates/after_login/essential-information.html?v='+(new Date()).valueOf(),
            controller: 'essentialInformationController'
        })
        //Bienestar-Minfulness
        .when('/minfulness', {
            templateUrl: './templates/after_login/minfulness.html?v='+(new Date()).valueOf(),
            controller: 'minfulnessController'
        })

}]);

main.controller("mainController",function($scope,$rootScope,$location,authorization,sessionStorage,encodeService){

    $rootScope.isLoged = false;

    $scope.logout = function () {
        authorization.logout(encodeService.decodeUtf8base64(sessionStorage.getItem('tfm:access_token')))
            .success(function (r) {
                sessionStorage.clear();
                $rootScope.isLoged = false;
                $location.path('/');
            })
            .error(function (e) {
                console.clear();
            })
    }

    $rootScope.verifyLogin = function () {
        if(!$rootScope.isLoged){
            $location.path('/');
        }
    }

});

