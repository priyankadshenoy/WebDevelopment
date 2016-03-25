(function() {
    "use strict";
    angular.module("ProjectApp")
        .controller("ArithmeticController",ArithmeticController);

    function ArithmeticController($scope,$location,UserService,$rootScope) {
        var vm = this;
        vm.arithanswer = arithanswer;
        var currentUser = $rootScope.currentUser;


        function init(){

        }init();

        function arithanswer(data){
            vm.result=0;
            console.log("in controller"+ data);
            var findData={
                operator1:data.operator1,
                operator2:data.operator2,
                operator:data.operator
            };

            UserService.find(findData)
                .then(function(response){
                    if(response.data){
                        vm.result=response.data;
                        //console.log(vm.result);
                    }
                    else
                        console.log("No data available");
        });
    }

    }})();