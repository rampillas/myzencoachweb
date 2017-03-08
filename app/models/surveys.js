angular.module('surveysModule', []);
angular.module('surveysModule').factory("surveys",function($http,url){
    var surveys = {
        registerSurvey: function (data) {
            return $http.post(url.get() + '/essential_information/survey/',data);
        }
    };
    return surveys;
});

