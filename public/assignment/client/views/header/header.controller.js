(function(){

    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);
    function HeaderController($scope, UserService) {
        UserService.setCurrentUser(null);
        $scope.logout = logout;
        $scope.admin = admin;
        $scope.slogout = slogout;
        $scope.nlogin = nlogin;
        $scope.sname = sname;
        $scope.nregister = nregister;
        function logout() {
            UserService.setCurrentUser(null);
        }
        function admin() {

            if (UserService.getCurrentUser() != null) {
                for (var i = 0; i < UserService.getCurrentUser().roles.length; i++) {
                    if(UserService.getCurrentUser().roles[i] == "admin")
                    {return true;}
                }
            }
        }

        function nlogin() {
            return UserService.getCurrentUser() == null;
        }

        function slogout() {
            return UserService.getCurrentUser() != null;
        }

        function sname() {
            if (UserService.getCurrentUser() != null) {
                $scope.username = UserService.getCurrentUser().username;
                return true;
            }
        }
        function nregister() {
            return (UserService.getCurrentUser() == null);
        }
    }
})();