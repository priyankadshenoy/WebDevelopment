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
                templateUrl: "views/users/register.view.html"
            })
            .when("/login", {
                templateUrl: "views/admin/login.view.html"
            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html"
            });
    }
})();