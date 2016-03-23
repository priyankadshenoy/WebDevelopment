(function() {
    "use strict";
    angular.module("ProjectApp")
        .controller("LoginController",LoginController);

    function LoginController($scope, UserService,$location) {
        var vm = this;
        vm.login = login;

        function init(){

        }init();

        function login(user) {
            if(!user){
                $scope.message = "Enter Login";
                return $scope.message;
            }

            UserService.findUserByCredentials
                ({username:user.username,
                    password:user.password})
                .then(function(response){
                    if(response.data){
                        UserService.setCurrentUser(response.data);
                        $location.url("/home");
                    }else{
                        $scope.message = "Username or password doesnot match";
                    }
                });
        }
    }
})();