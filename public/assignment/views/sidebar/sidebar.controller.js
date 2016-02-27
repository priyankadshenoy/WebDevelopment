(function(){
    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("SidebarController", SidebarController);

    function SidebarController($scope, UserService){
        UserService.setCurrentUser(null);
        $scope.admin = admin;
        $scope.forms = forms;
        $scope.home = home;
        $scope.profile = profile;
        function admin() {
            if (UserService.getCurrentUser() != null) {
                for(var i = 0; i < UserService.getCurrentUser().roles.length; i++) {
                    if (UserService.getCurrentUser().roles[i] == "admin") {
                        return true;
                    }
                }
            }
        }
        function forms() {
            return UserService.getCurrentUser()!=null;
        }
        function home() {
            return true;
        }
        function profile() {
            return UserService.getCurrentUser()!=null;
        }
    }
})();