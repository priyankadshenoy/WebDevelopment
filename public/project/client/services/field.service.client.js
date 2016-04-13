(function(){
    "use strict";
    angular.module("ProjectApp")
        .factory("FieldService",FieldService);

    function FieldService($http){

        var api = {
            createField:createField,
            findField:findField,
            findPageFields:findPageFields,
            deleteField:deleteField,
            updateField:updateField,
            publishField :publishField,
            sortField : sortField
        };

        return api;

        function publishField(){
            return $http.post("/api/project/page");
        }

        function createField (pageId, field) {
            return $http.post("/api/project/page/" +pageId+ "/field", field);
        }

        function findField (pageId, fieldId) {
            return $http.get("/api/project/page/" +pageId+ "/field/" + fieldId);
        }

        function findPageFields (pageId) {
            return $http.get("/api/project/page/" +pageId+ "/field")
        }

        function deleteField (pageId, fieldId) {
            return $http.delete("/api/project/page/" +pageId+ "/field/" +fieldId);
        }

        function updateField (pageId, fieldId, field) {
            return $http.put("/api/project/page/" +pageId+ "/field/" + fieldId, field);
        }
        function sortField(pageId,startIndex,endIndex){
            return $http.put("/api/project/"+pageId+"/field?startIndex="+startIndex+"&endIndex="+endIndex);
        }

    }
})();