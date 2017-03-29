angular.module('solutionModule', []);
angular.module('solutionModule').factory("solutions",function($http,url){

    var dilemas = {
        getDilemasByState: function (username,data) {
            return $http.post(url.get() + '/solutions/dilemmas/'+ username +'/getDilemmas/',data);
        },
        updateDilemma: function (username,data) {
            return $http.post(url.get() + '/solutions/dilemmas/'+ username + '/updateDilemma/',data);
        },
        changeDilemma: function (username,data) {
            return $http.post(url.get() + '/solutions/dilemmas/'+ username +'/changeDilemma/',data);
        }
    };
    return dilemas;
});
