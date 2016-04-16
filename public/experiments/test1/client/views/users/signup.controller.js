(function(){
    "use strict";
     angular.module("PageEditorApp")
            .controller("SignUpController", SignUpController);

    function SignUpController($location,UserService) {
        var vm = this;
        vm.signUp = signUp;


        function init(){

        }init();

        function signUp(user) {
            vm.message = null;

            if(user == null) {
                  vm.message = "Please fill in the required details";
                  return;
              }

              if(!user.username) {
                  vm.message = "Please provide a username";
                  return;
              }

              if (!user.password || !user.password2) {
                  vm.message = "Please provide a password";
                  return;
              }

              if (user.password !== user.password2) {
                  vm.message = "Passwords must match";
                  return;
              }

              if(!user.email) {
                  vm.message = "Please provide an email";
                  return;
              }

            UserService.findUserByUsername(user.username)
                .then(function(response){
                    if(response.data){
                        vm.message = "Username already taken!!!";
                    }else{
                        registerUser();
                    }
                });

            function registerUser() {
                UserService.createUser(user)
                    .then(function (response) {
                        if (response.data) {
                            UserService.setCurrentUser(response.data);
                            $location.url("/profile");
                        } else {
                            vm.message = "Please try again"
                        }
                    });
            }
          }
    }
})();