(function() {
    "use strict";
    angular.module("ProjectApp")
           .controller("LoginController",LoginController);

    function LoginController(UserService,$rootScope,$location) {
        var vm = this;
        vm.message = null;
        vm.login = login;

        function init(){

        }init();

        function login(user) {
            if(!user){
                vm.message = "Please enter login details";
                return;
            }
            UserService.login(user)
                .then(function(response){
                        $rootScope.currentUser = response.data;
                        $location.url("/profile");
                    },
                    function(err){
                        console.log("hello");
                        vm.message = "Username or password incorrect";
                    }
                );
        }
    }
})();