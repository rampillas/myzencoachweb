angular.module('solutionModule', []);
angular.module('solutionModule').factory("solutions",function($http,url){

    var dilemasing = {
        ingresarDilema: function () {
            return $http.post(url.get());
        }
    };
    return dilemasing;
});
