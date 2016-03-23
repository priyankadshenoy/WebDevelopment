(function(){
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
)();