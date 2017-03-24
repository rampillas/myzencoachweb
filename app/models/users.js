angular.module('usersModule', []);
angular.module('usersModule').factory("users",function($http,url){
    var users = {
        getUsers: function () {
            return $http.get(url.get() + '/users/');
        }
    };
    return users;
});

