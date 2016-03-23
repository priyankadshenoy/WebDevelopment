(function() {
    "use strict";
    angular.module("ProjectApp")
        .controller("ArithmeticController",ArithmeticController);

    function ArithmeticController($scope,$location,UserService,$rootScope) {
        var vm = this;
        vm.arithanswer = arithanswer;
        var currentUser = $rootScope.currentUser;
//        vm.operator1= currentUser.operator1;
  //      vm.operator2= currentUser.operator2;
    //    vm.operator= currentUser.operator;

        function init(){

        }init();

        function arithanswer(data){
            console.log("in controller"+ data);
            var findData={
                operator1:data.operator1,
                operator2:data.operator2,
                operator:data.operator
            };

            UserService.find(findData)
                .then(function(response){
                    if(response.data){
                        console.log(response.data);
                    }
                    else
                        console.log("No data available");
        });
    }

    }})();