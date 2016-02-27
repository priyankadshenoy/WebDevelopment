(function(){
    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope,UserService, $location){
        $scope.register = register;
        function register(username,password,verifyPassword, email) {

            if(password == verifyPassword) {
                var nuser = {
                    "_id": (new Date).getTime(),
                    "firstName": null,
                    "lastName": null,
                    "username": username,
                    "password": password,
                    "roles": []
                }
            }

            UserService.createUser(nuser, render);
        }

        function render(nuser) {
            if (nuser != null) {
                UserService.setCurrentUser(nuser);
                $location.path('/profile');
            }

        }
    }

})();