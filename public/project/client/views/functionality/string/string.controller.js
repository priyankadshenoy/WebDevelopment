(function(){
    angular
        .module("ProjectApp")
        .controller("StringController",StringController);

    function StringController($scope){
        $scope.stringsearch = stringsearch;
        $scope.stringreplace=stringreplace;
        $scope.stringconcat=stringconcat;
        $scope.stringsub = stringsub;
        var str= "Lorem ipsum dolor sit amet, et vel tale mundi. " +
            "Id corpora tacimates sed. Mazim copiosae ei qui, aliquid legimus" +
            " dissentiunt per at. Sint patrioque mei ut, his cu atqui molestie gloriatur. " +
            "Qui cu odio atqui clita, graeco recteque qui eu. Cu nam nullam dignissim, " +
            "sed augue fabulas impedit cu. At nam affert pertinacia signiferumque, alii graeco commune eos ea, " +
            "prima senserit eu vix. Veri admodum facilisis te vis, ridens sententiae reformidans usu at. " +
            "Quis mundi accusam eu qui, pri dicta vivendo ea. His no nisl inani philosophia. " +
            "Vituperata definitionem qui an, libris eruditi omittantur et vis. Cu pro conceptam pertinacia, " +
            "ad sed iudico utamur dolorum, simul noluisse cu pro. Duo cu oblique diceret oportere.";

        var rep= "Hello I am Priyanka! I enjoy web development! :)" +
            "I think programming is fun and if you have an" +
            "understanding od concepts it is not difficult to" +
            "create simple lines of code";
        str=str.split(" ");
        $scope.match="";

                function stringsearch(ssearch) {
                    var t=0;
                    for(var i=0; i<str.length; i++)
                    {
                       if( str[i]==(ssearch))
                       {
                          t++;
                           break;
                       }
                    }
                    if(t>0)
                        $scope.match="Yaay we found a match";
                    else
                        $scope.match="Oh no! We cant find you";

                }
                //console.log("1");
                function stringreplace(replacee, replacement){
                   // console.log(replacement);
                $scope.match=rep.replace(replacee,replacement);
                }

                function stringconcat(con1, con2){
                    $scope.match=con1.concat(" ",con2);
                }

                function stringsub(sub1, sub2){
                var sub= "Hello I am Priyanka! I enjoy web development! :)";
                    $scope.match= sub.substring(sub1, sub2);
                }

            }
})();

