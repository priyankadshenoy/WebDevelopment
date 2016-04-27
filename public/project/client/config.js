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

            .when("/homeheader", {
                templateUrl: "views/home/hometopbar.view.html",
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


            .when("/scripts", {
                templateUrl: "views/scripts/scripts.view.html",
                controller: "ScriptController",
                controllerAs: "model",
                resolve: {loggedin: checkLoggedin}
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
                resolve: {loggedin: checkLoggedin}
            });

            /*.otherwise({
                redirectTo: "login"
            })*/
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