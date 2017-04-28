var corporate = angular.module("freeTimeModule",["checklist-model"]);

corporate.controller("freeTimeController",function($scope,$rootScope,events){

    $scope.categoryId = "";
    $scope.event = "";
    $scope.title = "";
    $scope.categories = [];
    $scope.events = [];

    $scope.getAllEvents = function () {
        events.getEvents('user')
            .success(function (r) {
                $scope.events = r.results;
            })
            .error(function (e) {
                console.clear();
            })
    }

    $scope.splitUser = function (user) {
        if(user != undefined) {
            var param = user.split('/users/');
            if (param.length > 0) {
                user = param[1].replace('/', '');
            }
        }
        return user;
    }

    $scope.clear = function () {
        $scope.categoryId = "";
        $scope.event = "";
        $scope.title = "";
    }

    $scope.publishEvent = function () {
        if($scope.event != "" && $scope.title != "" && $scope.categoryId != ""){
            var date = new Date();
            date = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay();

            events.registerEvent({
                    date: date,
                    title: $scope.title,
                    description: $scope.event,
                    category: $scope.categoryId
                })
                .success(function (r) {
                    $scope.clear();
                    $scope.getAllEvents();
                })
                .error(function (e) {
                    console.clear();
                })
        }
        else
            alert("Todos los campos son obligatorios");
    }

    $scope.publishComment = function (currentEvent) {
        if(currentEvent.eventComment != "")
        {
            var date = new Date();
            date = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay();

            events.registerEventComment('user',{
                user_owner: $scope.splitUser(currentEvent.user),
                title: currentEvent.title,
                date: date,
                description: currentEvent.eventComment
            })
                .success(function (r) {
                    event.eventComment = "";
                    $scope.getAllEvents();
                })
                .error(function (e) {
                    console.clear();
                })
        }
        else
            alert("Escribe el comentario por favor");
    }

    $scope.addLike = function (currentEvent) {
        events.registerLikeToEvent('user',{
            user_owner: $scope.splitUser(currentEvent.user),
            title: currentEvent.title
        })
            .success(function (r) {
                $scope.getAllEvents();
            })
            .error(function (e) {
                console.clear();
            })
    }

    $scope.quitLike = function (currentEvent) {
        events.quitLikeToEvent('user',{
            user_owner: $scope.splitUser(currentEvent.user),
            title: currentEvent.title
        })
            .success(function (r) {
                $scope.getAllEvents();
            })
            .error(function (e) {
                console.clear();
            })
    }

    $scope.seeInterests = function () {
        $scope.interestsUser = [];
        $scope.user = {
            interests: []
        };

        events.getInterestsFromUser('user')
            .success(function (r) {
                $scope.interests = r.results;

                angular.forEach($scope.categories,function (key,value) {
                    var checked = false;
                    angular.forEach($scope.interests,function (k,v) {
                       if(k.name == key.name) checked = true;
                    });
                    $scope.interestsUser.push({name: key.name});

                    if(checked)
                        $scope.user.interests.push({name: key.name});
                });

                jQuery("#seeInterests").modal("show");
            })
            .error(function (e) {
                console.clear();
            })
    }

    $scope.saveInterests = function () {
        events.addInterestsFromUser('user',{
            interests: $scope.user.interests
        })
            .success(function (r) {
                $scope.getAllEvents();
                $('#seeInterests').hide();
                $('.modal-backdrop').hide();
            })
            .error(function (e) {
                console.clear();
            })
    }

    function initialize() {
        $scope.categories.push({value:"viajes",name:"viajes"});
        $scope.categories.push({value:"tecnologia",name:"tecnologia"});
        $scope.categories.push({value:"naturaleza",name:"naturaleza"});
        $scope.categories.push({value:"deportes",name:"deportes"});
        $scope.categories.push({value:"salud",name:"salud"});
        $scope.categories.push({value:"naval",name:"naval"});
        $scope.categories.push({value:"trabajo",name:"trabajo"});
    }

    initialize();
    $rootScope.verifyLogin();
    $scope.getAllEvents();
});