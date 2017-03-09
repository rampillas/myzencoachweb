var home = angular.module("homeModule",[]);

home.controller("homeController",function($scope,$location,$rootScope,authorization,sessionStorage,encodeService){

    //Login
    $scope.username = "";
    $scope.password = "";

    //SignUp
    $scope.usernameSignup = "";
    $scope.email = "";
    $scope.firstName = "";
    $scope.lastName = "";
    $scope.passwordSignup = "";
    $scope.nickname = "";
    $scope.birthday = "";

    $scope.genders = [
        {value : "M", name : "Masculino"},
        {value : "F", name : "Femenino"}
    ];

    $scope.countries = [
        {value : "ES", name : "Espana"},
        {value : "EC", name : "Ecuador"},
        {value : "MX", name : "Mexico"},
        {value : "CO", name : "Colombia"}
    ];

    $scope.cities = [
        {value : "MAD", name : "Madrid"},
        {value : "UIO", name : "Quito"},
        {value : "DF", name : "Mexico DF"},
        {value : "BOG", name : "Bogota"}
    ];

    $scope.types = [
        {value : "empleado", name : "Empleado"},
        {value : "administrador", name : "Administrador"},
        {value : "coach", name : "Coach"}
    ];

    $scope.goSignUp =  function () {
        $location.path('signup');
    }

    $scope.signup = function () {
        if($scope.usernameSignup != "" && $scope.email != "" && $scope.firstName != "" && $scope.lastName != ""
            && $scope.passwordSignup != "" && $scope.nickname != "" && $scope.birthday != ""
            && $scope.selectedGender != undefined && $scope.selectedCountry != undefined
            && $scope.selectedCity != undefined && $scope.selectedType != undefined)
        {

            var date = $scope.birthday.getFullYear() + '-' + $scope.birthday.getMonth() + '-' + $scope.birthday.getDay();
            var data = {
                username: $scope.usernameSignup,
                email: $scope.email,
                first_name: $scope.firstName,
                last_name: $scope.lastName,
                password: $scope.passwordSignup,
                nick: $scope.nickname,
                birthday: date,
                gender: $scope.selectedGender,
                country: $scope.selectedCountry,
                city: $scope.selectedCity,
                description: $scope.selectedType
            }
            authorization.signup(data)
                .success(function (r) {
                    $scope.username = $scope.usernameSignup;
                    $scope.password = $scope.passwordSignup;
                    $scope.login();
                })
                .error(function (e) {
                    console.clear();
                })
        }
        else
            alert("Todos los campos son obligatorios");

    }

    $scope.login = function () {
        if($scope.username != "" && $scope.password != ""){
            authorization.login({
                username: $scope.username,
                password: $scope.password
            })
                .success(function (r) {
                    sessionStorage.setItem('tfm:access_token',encodeService.encodeUtf8base64(r.access_token));
                    authorization.setAuthHeaders(r.access_token);
                    $rootScope.isLoged = true;
                    $location.path('essential');
                })
                .error(function (e) {
                    console.clear();
                    alert("Usuario/password incorrectos, intenta nuevamente");
                })
        }
        else
            alert("Usuario y password son obligatorios");
    }
});


home.controller('forgotPasswordController',function ($scope,authorization,$routeParams,$location)
{
    var token = $routeParams.token;
    $scope.token = [];
    $scope.password = "";

    try{
        $scope.token = ymencode.decodeUtf8base64(token).split(' ');
    }
    catch(err) {
        alert("Error en el acceso, vuelve a entrar en la opcion Olvide Password para que recibas otro email");
        $location.path('/');
    }

    //change user password
    $scope.doChange = function () {
        if($scope.password==""){
            alert("Password es necesario");
            return;
        }

        if($scope.token.length > 1){
            authorization.changePassword({
                username: $scope.token[2],
                data: {password: $scope.password, token: $scope.token[0], uid:$scope.token[1]}
            })
                .success(function(r){
                    if(r.detail){
                        alert("El password fue cambiado con exito");
                        $location.path('/');
                    }
                    else if(r.error == 'token used'){
                        alert('El acceso ya ha sido utilizado');
                    }
                    else if(r.error == 'token expired'){
                        alert('El acceso ha expirado');
                    }
                    else{
                        alert('Hubo un error inesperado, intenta nuevamente');
                    }

                })
                .error(function(e){
                    console.clear();
                });
        }
        else
            alert("El acceso no es el correcto");

    }
});