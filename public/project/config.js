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
            .when("/arithmetic", {
                templateUrl: "views/arithmetic/arithmetic.view.html",

            })
            .otherwise({
                redirectTo: "/login"
            });
    }
})();