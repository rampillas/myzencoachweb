angular.module('eventsModule', []);
angular.module('eventsModule').factory("events",function($http,url){
    var events = {
        getEvents: function (username) {
            return $http.post(url.get() + '/freetime/events/'+ username +'/getEvents/');
        },
        registerEvent: function (data) {
            return $http.post(url.get() + '/freetime/events/',data);
        },
        registerLikeToEvent: function (username,data) {
            return $http.post(url.get() + '/freetime/events/'+ username +'/addLikeToEvent/', data);
        },
        quitLikeToEvent: function (username,data) {
            return $http.post(url.get() + '/freetime/events/'+ username +'/quitLikeToEvent/', data);
        },
        getInterestsFromUser: function (username) {
            return $http.post(url.get() + '/freetime/events/'+ username +'/getInterestsUser/');
        },
        addInterestsFromUser: function (username, data) {
            return $http.post(url.get() + '/freetime/events/'+ username +'/addInterestsUser/',data);
        }
    };
    return events;
});

