(function() {
    "use strict";
    angular.module("ProjectApp")
        .controller("BooleanController",BooleanController);

    function BooleanController($scope,$location,UserService,$rootScope) {
        var vm = this;
        vm.comparison = comparison;
        vm.logical = logical;
        var currentUser = $rootScope.currentUser;
        function init(){
        }init();


            function comparison(bool1) {
                vm.result="";
                var findBool1={
                    num1:bool1.num1,
                    num2:bool1.num2,
                    operator1:bool1.operator1

                };

                UserService.comparison(findBool1)
                    .then(function(response){
                        if(response.data){
                            vm.result=response.data;
                            //console.log(vm.result);
                        }
                        else
                            vm.result="Invalid Operation";
                    });
            }


        function logical(bool2){
            var findBool2={
                num3:bool2.num3,
                num4:bool2.num4,
                operator2:bool2.operator2
            };


            UserService.logical(findBool2)
                .then(function(response){
                    if(response.data){
                        vm.result=response.data;
                    }
                    else
                        vm.result="Invalid Operation";
                });
        }

    }})();