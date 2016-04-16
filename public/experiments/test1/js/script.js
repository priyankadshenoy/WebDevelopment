
var app = angular.module('shanidkvApp', []);

  app.controller('MainCtrl', function($scope) {

  $scope.choices = [{id: 'choice1'}, {id: 'choice2'}];
  
  $scope.addNewChoice = function() {
    var newItemNo = $scope.choices.length+1;
    $scope.choices.push({'id':'choice'+newItemNo});
    for(var i=0; i<$scope.choices.length; i++) {
     // console.log($scope.choices[i].name);
      if($scope.choices[i].name=="+")
      {//console.log("true");
       //console.log(parseInt($scope.choices[i-1].name)+parseInt($scope.choices[i+1].name));
      }
    }
  };

    $scope.addNewChoice = function(choices) {
      console.log(choices.);

    };

    
  $scope.removeChoice = function() {
    var lastItem = $scope.choices.length-1;
    $scope.choices.splice(lastItem);
  };
  
});
