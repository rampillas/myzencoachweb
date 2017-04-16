angular.module('stressModule', []);
angular.module('stressModule').factory("stress",function($http,url){
    var stress = {
        getQuestions: function () {
            return $http.get(url.get() + '/personalization/stress/');
        },
        registerQuestion: function (data) {
            return $http.post(url.get() + '/personalization/stress/',data);
        },
        removeQuestion: function (data) {
            $http.defaults.headers.delete = "";
            return $http.delete(url.get() + '/personalization/stress/',
                {
                    data: data,
                    headers: {'Content-Type': 'application/json'}
                });
        },
        nextOrPreviousQuestions: function (page) {
            return $http.get(page);
        }
    };
    return stress;
});

