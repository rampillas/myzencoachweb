angular.module('plansModule', []);
angular.module('plansModule').factory("plans",function($http,url){
    var plans = {
        getPlans: function () {
            return $http.get(url.get() + '/minfulness/plans/');
        },
        registerPlan: function(data) {
            return $http.post(url.get() + '/minfulness/plans/',data);
        },
        removePlan: function (data) {
            $http.defaults.headers.delete = "";
            return $http.delete(url.get() + '/minfulness/plans/',
                {
                    data: data,
                    headers: {'Content-Type': 'application/json'}
                });
        },
        nextOrPreviousPlans: function (page) {
            return $http.get(page);
        }
    };
    return plans;
});

