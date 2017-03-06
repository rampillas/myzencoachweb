angular.module('storageModule',[]);

angular.module('storageModule').factory("sessionStorage", function() {
    var storage = window.sessionStorage;
    var options = {
        getItem: function(key) {
            return storage.getItem(key);
        },
        setItem: function(key, value) {
          storage.setItem(key,value);
        },
        removeItem: function(key) {
            storage.removeItem(key);
        },
        clear: function() {
            storage.clear();
        }
    };
    return options;
});
