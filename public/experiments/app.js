(function() {
    angular
        .module("MovieDBApp", [])
        .controller("MovieListController", theController);

function theController($scope){
    var movies=[
    {id: 123, title : "Avatar", year : 2007},
        {id: 234, title : "Star Wars", year : 1997}
    ];
    $scope.movies=movies;
}}());