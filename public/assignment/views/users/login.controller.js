(function(){
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);
    function LoginController($scope, UserService, $location,$rootScope) {
        $scope.login = login;
        function login(username,password) {
            var user;
            user = UserService.findUserByCredentials(username, password,render);
        }
        function render(user) {
            if (user != null) {
                UserService.setCurrentUser(user);
                $location.path('/profile');
            }
        }
    }
})();