(function() {
    "use strict";
    angular.module("ProjectApp")
        .controller("DateController",DateController);

    function DateController($scope,$location,UserService,$rootScope) {
        var vm = this;
        vm.dategetday = dategetday;
        vm.dategettime= dategettime;
        vm.datepre = datepre;
        vm.datepost= datepost;
        var currentUser = $rootScope.currentUser;
        function init(){
        }init();

        function datepre(pre){
            UserService.findDatePre(pre)
                .then(function(response){
                    if(response.data){
                        vm.result1=response.data;
                    }
                    else
                        vm.result1="No data available";
                });
        }

        function datepost(post){
            UserService.findDatePost(post)
                .then(function(response){
                    if(response.data){
                        vm.result2=response.data;
                    }
                    else
                        vm.result2="No data available";
                });
        }

        function dategetday(pick){
            UserService.findDay(pick)
                .then(function(response){
                    if(response.data){
                        vm.result3=response.data;
                    }
                    else
                        vm.result3="No data available";
                });}


        function dategettime(pick){
            UserService.findDate(pick)
                .then(function(response){
                    if(response.data){
                        vm.result4=response.data;
                    }
                    else
                        vm.result4="No data available";
                });
        }

        }})();
/*(function(){
        angular
            .module("ProjectApp")
            .controller("DateController",DateController);

        function DateController($scope){
            $scope.datefindday=datefindday;
            $scope.dategettime=dategettime;
            $scope.datepost=datepost;
            $scope.datepre=datepre;
            $scope.view;
            $scope.long;
            $scope.pastdt;
            $scope.postdt;

            function datefindday(datepick){
                var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
                $scope.view = days[datepick.getDay()];

            }
            function dategettime(datepick){
                $scope.long=datepick.getTime();
            }
            function datepre(days){
                var d=new Date();
                d.setDate(d.getDate()-days);
                $scope.pastdt=d;
            }
            function datepost(days){
                var d=new Date();
                d.setDate(d.getDate()+days);
                $scope.postdt=d;
            }


        }
    }
)();*/