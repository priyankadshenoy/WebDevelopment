(function(){
    angular
        .module("ProjectApp")
        .config(config);

    function config($routeProvider) {
        $routeProvider
            .when("/login", {
                templateUrl: "views/login/login.view.html",
                controller: "LoginController"
            })
            .when("/test", {
                templateUrl: "test.html"
            })
            .when("/home", {
                templateUrl: "views/home/home.view.html"
            })
            .when("/newapp", {
                templateUrl: "views/home/newapplication.html"
            })
            .when("/string", {
                templateUrl: "views/string/string.view.html",
                controller: "StringController"
            })
            .when("/stringreplace", {
                templateUrl: "views/string/stringreplace.view.html",
                controller: "StringController"
            })
            .when("/stringjoin", {
                templateUrl: "views/string/stringjoin.view.html",
                controller: "StringController"
            })
            .when("/stringslice", {
                templateUrl: "views/string/stringslice.view.html",
                controller: "StringController"
            })
            .when("/arithmetic", {
                templateUrl: "views/arithmetic/arithmetic.view.html",
                controller: "ArithmeticController"
            });

    }
})();