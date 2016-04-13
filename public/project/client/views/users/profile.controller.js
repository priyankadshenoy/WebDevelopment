(function() {
    "use strict";
    angular.module("ProjectApp")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService,$rootScope) {
        var vm = this;
        vm.update = update;
        var loggedUser = $rootScope.currentUser;
        vm.username= loggedUser.username;
        vm.password= loggedUser.password;
        vm.firstName = loggedUser.firstName;
        vm.lastName = loggedUser.lastName;
        vm.emails = loggedUser.emails.join(",");

        function init(){

        }init();

        function update(username,password,firstName,lastName,emails) {
            vm.message = null;
            var id = loggedUser._id;
            var userDetails ={
                "username":username,
                "password":password,
                "firstName":firstName,
                "lastName":lastName,
                "role":loggedUser.role,
                "emails":emails.split(",")
            };

            UserService.updateUser(id,userDetails)
                .then(function(user){
                        $rootScope.currentUser = user.data;
                        vm.message = "Profile Updated";
                    },
                    function(err){
                        vm.message = "Invalid Data";
                    }
                );
        }
    }
})();