angular.module('usersModule', []);
angular.module('usersModule').factory("users",function($http,url){
    var users = {
        getUsers: function () {
            return $http.get(url.get() + '/users/');
        },
        getUsersConnections: function (username) {
            return $http.post(url.get() + '/userConnections/'+ username +'/getUsersConnections/');
        },
        getDetailConnections: function (username,data) {
            return $http.post(url.get() + '/userConnections/'+ username +'/getDetailUserConnections/',data);
        }
    };
    return users;
});

