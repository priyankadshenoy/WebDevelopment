(function() {
    angular
        .module('ProjectApp')
        .controller('ArithmeticController', ArithmeticController);
            function  ArithmeticController($scope){
                $scope.answer=answer;
                $scope.result = 0;

                function answer(){

            if ($scope.operator == '+') {
                $scope.result= $scope.operator1 + $scope.operator2;

            }
            if ($scope.operator == '-') {
                $scope.result=$scope.operator1 - $scope.operator2;
            }
            if ($scope.operator == '*') {
                $scope.result=$scope.operator1 * $scope.operator2;
            }
            if ($scope.operator == '/') {
                $scope.result=$scope.operator1 / $scope.operator2;

        }}}
    })();