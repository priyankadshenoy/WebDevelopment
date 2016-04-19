(function() {
    "use strict";
    angular
        .module("ProjectApp")
        .config(Configure);

    function Configure($routeProvider) {
        $routeProvider

            .when("/home", {
                templateUrl: "views/home/home.view.html",
                controller: "HomeController",
                controllerAs: "model",
                resolve: {loggedin: checkCurrentUser}
            })

            .when("/findScripts", {
                templateUrl: "views/home/findScripts.view.html",
                controller: "HomeController",
                controllerAs: "model",
                resolve: {loggedin: checkLoggedin}
            })

            .when("/signup", {
                templateUrl: "views/users/signup.view.html",
                controller: "SignUpController",
                controllerAs: "model"
            })

            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {loggedin: checkLoggedin}
            })

            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller: "LoginController",
                controllerAs: "model"
            })

            .when("/newapp", {
                templateUrl: "views/home/newapplication.view.html"
            })

            .when("/string", {
                templateUrl: "views/functionality/string/string.view.html",
                controller: "StringController",
                controllerAs: "model"
            })

            .when("/stringreplace", {
                templateUrl: "views/functionality/string/stringreplace.view.html",
                controller: "StringController",
                controllerAs: "model"
            })

            .when("/stringjoin", {
                templateUrl: "views/functionality/string/stringjoin.view.html",
                controller: "StringController",
                controllerAs: "model"
            })

            .when("/stringslice", {
                templateUrl: "views/functionality/string/stringslice.view.html",
                controller: "StringController",
                controllerAs: "model"
            })

            .when("/arithmetic", {
                templateUrl: "views/functionality/arithmetic/arithmetic.view.html",
                controller: "ArithmeticController",
                controllerAs: "model"
            })

            .when("/date", {
                templateUrl: "views/functionality/date/date.view.html",
                controller: "DateController",
                controllerAs: "model"
            })

            .when("/datemanipulate", {
                templateUrl: "views/functionality/date/datemanipulate.view.html",
                controller: "DateController",
                controllerAs: "model"
            })

            .when("/boolean", {
                templateUrl: "views/functionality/boolean/boolean.view.html",
                controller: "BooleanController",
                controllerAs: "model"
            })

            .when("/booleanlogical", {
                templateUrl: "views/functionality/boolean/booleanlogical.view.html",
                controller: "BooleanController",
                controllerAs: "model"
            })

            .when("/scripts", {
                templateUrl: "views/scripts/scripts.view.html",
                controller: "ScriptController",
                controllerAs: "model",
                resolve: {loggedin: checkLoggedin}
            })

            .when("/admin", {
                templateUrl: "views/admin/admin.view.html",
                controller: "adminController",
                controllerAs: "model"
            })

            .when("/PageDetails", {
                templateUrl: "views/scripts/scriptsDetails.view.html",
                controller: "ScriptDetailsController",
                controllerAs: "model",
                resolve: {loggedin: checkLoggedin}
            })

            .when("/page/:pageId/fields", {
                templateUrl: "views/scripts/scriptsDetails.view.html",
                controller: "ScriptDetailsController",
                controllerAs: "model",
                resolve: {loggedin: checkLoggedin}
            })


            .when("/header", {
                templateUrl: "views/header/header.view.html",
                controller: "HeaderController",
                controllerAs: "model"
            })

            .when("/underconsscripts", {
                templateUrl: "views/scripts/scriptsDetailsEdit.html",
                controller: "ScriptDetailsController",
                controllerAs: "model"
            })

            .otherwise({
                redirectTo: "login"
            })
    }

    var checkLoggedin = function ($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function (user) {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0') {
                $rootScope.currentUser = user;
                deferred.resolve();
            }
            // User is Not Authenticated
            else {
                $rootScope.errorMessage = 'Please log in.';
                console.log("error");
                deferred.reject();
                $location.url('/login');
            }
        });

        return deferred.promise;
    };

    var checkCurrentUser = function ($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function (user) {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0') {
                $rootScope.currentUser = user;
            }
            deferred.resolve();
        });

        return deferred.promise;
    };
})();