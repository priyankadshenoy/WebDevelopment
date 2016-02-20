(function(){
    angular
        .module("FormBuilderApp")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/admin", {
                templateUrl: "admin/admin.view.html"
            });
    }
})();