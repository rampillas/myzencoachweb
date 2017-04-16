angular.module('remindersModule', []);
angular.module('remindersModule').factory("reminders",function($http,url){
    var reminders = {
        getReminders: function (username) {
            return $http.post(url.get() + '/personalization/reminders/'+username+'/getAllReminders/');
        },
        registerReminder: function (data) {
            return $http.post(url.get() + '/personalization/reminders/',data);
        },
        removeReminder: function (data) {
            $http.defaults.headers.delete = "";
            return $http.delete(url.get() + '/personalization/reminders/',
                {
                    data: data,
                    headers: {'Content-Type': 'application/json'}
                });
        },
        nextOrPreviousReminders: function (page) {
            return $http.post(page);
        }
    };
    return reminders;
});

