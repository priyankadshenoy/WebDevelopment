var app = angular
    .module('shanidkvApp', []);
var total = 0;

function ShoppingCartCtrl($scope)  {
    $scope.items = [
        {Price: "25" , Operand: '+'},
        {Price: "50" , Operand: '+'},
        {Price: "100" ,Operand: '+'}
    ];

    $scope.addItem = function(item) {
        $scope.items.push(item);
        $scope.item = {};
    }

    $scope.totalPrice = function(){

        if($scope.items.Operand=='+')
        for(count=0;count<$scope.items.length;count++){
            total += $scope.items[count].Price*1;
        }
        return total;
    }

    $scope.removeItem = function(index){
        $scope.items.splice(index,1);
    }
}