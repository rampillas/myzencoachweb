angular.module('encodeModule',[]);

angular.module('encodeModule').factory("encodeService", function() {
    var encode = {
        encodeUtf8base64: function (data) {
            if (data !== undefined){
                data = btoa(data).trim();
                return unescape(encodeURIComponent(data));
            }
        },
        decodeUtf8base64: function (data) {
            if (data !== undefined){
                data = decodeURIComponent(escape(data));
                return atob(data.trim());
            }
        }
    };
    return encode;
});


