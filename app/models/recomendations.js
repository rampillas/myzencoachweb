angular.module('recomendationsModule', []);
angular.module('recomendationsModule').factory("recomendations",function($http,url){
    var recomendations = {
        getRecomendations: function (username) {
            return $http.post(url.get() + '/personalization/followup/'+username+'/getAllRecomendations/');
        },
        registerRecomendation: function (data) {
            return $http.post(url.get() + '/personalization/followup/',data);
        },
        removeRecomendation: function (data) {
            $http.defaults.headers.delete = "";
            return $http.delete(url.get() + '/personalization/followup/',
                {
                    data: data,
                    headers: {'Content-Type': 'application/json'}
                });
        }
    };
    return recomendations;
});

