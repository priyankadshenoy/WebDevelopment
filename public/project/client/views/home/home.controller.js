(function() {
    "use strict";
    angular.module("ProjectApp")
        .controller("HomeController",HomeController);

    function HomeController(PageService,$rootScope) {
        var vm = this;
        vm.pages = [];
        var currentUser = $rootScope.currentUser;
        $rootScope.uname=  $rootScope.currentUser.username;

        function init()
        {
            PageService.findAllPages()
                .then(function(response)
                {
                    vm.pages = response.data;
                },function(err){
                    console.log(err);
                });
        }init();

    }
})();