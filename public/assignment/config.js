(function(){
    angular
        .module("FormBuilderApp")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/admin", {
                templateUrl: "views/admin/admin.view.html"
            })
            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller:"RegisterController"
            })
            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller: "LoginController"
            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController"
            })
             .when("/home", {
                templateUrl: "views/home/home.view.html"
            })

            .when("/forms", {
                templateUrl: "views/forms/forms.view.html"
            })
            .when("/string", {
                templateUrl: "views/forms/string.view.html"
            })
            .when("/fields", {
                templateUrl: "views/forms/fields.view.html"
            });

    }
})();