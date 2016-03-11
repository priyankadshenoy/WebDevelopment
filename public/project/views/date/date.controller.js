(function(){
        angular
            .module("ProjectApp")
            .controller("DateController",DateController);

        function DateController($scope){
            $scope.datefindday=datefindday;
            $scope.dategettime=dategettime;
            $scope.view;
            $scope.long;
            var d=new Date();
            console.log(d);

            function datefindday(datepick){
                var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
                $scope.view = days[datepick.getDay()];

            }
            function dategettime(datepick){
                $scope.long=datepick.getTime();
            }
            function datepost(days){
                console.log(d);
            }



        }
    }
)();