(function(){
    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $location, UserService){
        var vm = this;
        vm.update = update;
        var currentUser = $rootScope.currentUser;

        function init(){

        }init();

        function update(user) {
            $scope.message = null;
            var id = currentUser._id;
            UserService.updateUser(id,user)
                .then(function(response){
                    if(response.data)
                    {
                        UserService.setCurrentUser(response.data);
                        $scope.message = "Profile updated";
                    }else{
                        $scope.message = "Re-enter details";
                    }
                });
        }
    }
})();