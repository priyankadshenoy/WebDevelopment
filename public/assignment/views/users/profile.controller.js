(function(){
    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $location, UserService){
        $scope.update = update;
        var strc;
        strc = UserService.getCurrentUser();
        $scope.username = strc.username;
        $scope.password = strc.password;
        $scope.firstName = strc.firstName;
        $scope.lastName = strc.lastName;
        $scope.email = strc.email;

        function update(username,password,firstName,lastName, email) {

            var updateUser = {
                "_id": UserService.getCurrentUser()._id,
                "firstName": firstName,
                "lastName": lastName,
                "username": UserService.getCurrentUser().username,
                "password": password,
                "roles": UserService.getCurrentUser().roles
            }

            UserService.updateUser(UserService.getCurrentUser()._id, updateUser, render)
        }

        function render(updateUser) {
            if (updateUser != null) {
                UserService.setCurrentUser(updateUser);
                $location.path('/profile');
            }

        }
    }

})();