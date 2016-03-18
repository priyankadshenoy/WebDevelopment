(function(){
    "use strict";
    angular.module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope,$location,UserService,$rootScope) {

        var vm = this;
        vm.register = register;

        function init(){

        }init();


        function register(user) {

            $scope.message = null;

            if(user == null) {
                $scope.message = "Enter all fields";
                return;
            }

            if(!user.username) {
                $scope.message = "Username cannot be empty";
                return;
            }

            if (!user.password || !user.password2) {
                $scope.message = "Password cannot be empty";
                return;
            }

            if (user.password !== user.password2) {
                $scope.message = "Passwords must match";
                return;
            }

            if(!user.email) {
                $scope.message = "Please provide an email";
                return;
            }

            UserService.createUser(user)
                .then(function(response){
                    if(response.data){
                        UserService.setCurrentUser(response.data);
                        $location.url("/profile");
                    }else{
                        $scope.message = "Try again";
                    }
                });
        }
    }
})();