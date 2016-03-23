(function(){
    angular
        .module("ProjectApp")
        .controller("BooleanController",BooleanController);

    function BooleanController($scope) {
            $scope.comparison=comparison;
            $scope.logical=logical;
            $scope.result;

        function comparison(num1, num2, operator) {
            //console.log(num1 +" "+ num2);
            if (operator == '>') {
                if (num1 > num2)
                    $scope.result = "Oh yes " + num1 + " is greater than " + num2;
                else
                    $scope.result = "No "+ num1 + " is not greater than " + num2;
            }
            if (operator == '<') {
                if (num1 < num2)
                    $scope.result = "Oh yes **" + num1 + " is smaller than " + num2;
                else
                    $scope.result = "Nope "+ num1 + " is not smaller than " + num2;
            }
            if (operator == '='){

                if (num1 == num2)
                    $scope.result = "Yaay " + num1 + " is equal to " + num2;
                else
                    $scope.result = "No No "+ num1 + " is not equal to" + num2;
            }
        }

        function logical(num1, num2, operator){

            if (operator == '&'){
                $scope.result = (num1 & num2);
                //console.log(result);
            }
            if (operator == '|'){
                $scope.result = (num1 | num2);
                //console.log(result);
            }
            if (operator == '^'){
                $scope.result = (num1 ^ num2);
                //console.log(result);
            }
            if (operator == '<<'){
                $scope.result = (num1 << num2);
                //console.log(result);
            }
            if (operator == '>>'){
                $scope.result = (num1 >> num2);
                //console.log(result);
            }

        }

    }})();