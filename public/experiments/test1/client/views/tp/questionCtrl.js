(function() {
    "use strict";
    angular.module("ProjectApp")
        .controller("questionCtrl",questionCtrl);

    function questionCtrl($scope) {
    var counter = 0;
    $scope.questionelemnt = [{
        id: counter,
        question: 'Question-Click on me to edit!',
        answer: ''
    }];

    $scope.addFormField = function ($event) {
        counter++;
        $scope.questionelemnt.push({
            id: counter,
            question: 'Question-Click on me to edit!',
            answer: ''
        });
        $event.preventDefault();
    }

    $scope.showitems = function ($event) {
        $('#displayitems').css('visibility', 'none');
    }
}})();