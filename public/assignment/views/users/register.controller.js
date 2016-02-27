(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope,UserService, $location){
        $scope.register = register;

        function register(username,password,password1, email){

            if(password == password1){
                var newUser = {
                    "_id": (new Date).getTime(),
                    "firstName": null,
                    "lastName": null,
                    "username": username,
                    "password": password,
                    "roles": []
                }
            }
            UserService.createUser(newUser, render)
        }
        function render(newUser){
            if(newUser!=null){
                $rootScope = newUser;
                $location.path('/profile');
            }

        }
    }

})();