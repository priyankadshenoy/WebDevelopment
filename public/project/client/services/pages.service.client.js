(function() {
    "use strict";

    angular.module("ProjectApp")
        .factory("PageService",PageService);

    function PageService($http) {
        var model = {
            createPageForUser: createPageForUser,
            findAllPages: findAllPages,
            deletePageById: deletePageById,
            updatePageById: updatePageById,
            findPageById: findPageById,
            findPageByPageId:findPageByPageId
        };
        return model;

        function createPageForUser(page){
            return $http.post("/api/project/scripts" ,page);
        }

        function findAllPages(){
            return $http.get("/api/project/scripts");
        }

        function deletePageById(pageId){
            return $http.delete("/api/project/scripts/" +pageId);
        }

        function updatePageById(pageId, newPage){
            return $http.put("/api/project/scripts/" +pageId ,newPage);
        }

        function findPageById(userId){
            return $http.get("/api/project/scripts/" +userId);
        }

        function findPageByPageId(pageId){
            return $http.get("/api/project/page/" +pageId);

        }

    }
})();