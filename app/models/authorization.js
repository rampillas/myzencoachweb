angular.module('authorizationModule', []);
angular.module('authorizationModule').factory("authorization",function($http,url,CONSTANTS){
    var auth = {
        login: function(data) {
            var jsonData = {
                client_id: CONSTANTS.clientId,
                client_secret: CONSTANTS.clientSecret,
                username: data.username,
                password: data.password,
                grant_type: "password",
                scope: "read+write"
            };
            return $http.post(url.get() + '/login/',jsonData);
        },
        logout: function(accessToken) {
            return $http.post(url.get() + '/oauth/revoke_token/?client_id='+CONSTANTS.clientId+
                '&client_secret='+CONSTANTS.clientSecret+'&token='+accessToken);

        },
        signup: function(data) {
            return $http.post(url.get() + '/users/', data);
        },
        setAuthHeaders: function(accessToken) {
            this.headersSet = true;
            $http.defaults.headers.common.Authorization = "Bearer " + accessToken;
        },
        changePassword: function(user) {
            return $http.put(url.get() + '/users/' + user.username + '/password/',user.data);
        }
    };
    return auth;
});

