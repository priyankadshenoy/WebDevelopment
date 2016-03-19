(function(){

    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope,UserService) {

        $scope.logout = logout;
        function init(){
        }
        init();
        function logout() {
            UserService.setCurrentUser(null);

        }
    }
})();