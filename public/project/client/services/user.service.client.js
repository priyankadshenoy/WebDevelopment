(function() {
    angular.module("ProjectApp")
        .factory("UserService", UserService);

    function UserService($http,$rootScope) {
        var model = {
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            setCurrentUser: setCurrentUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            findUserByUsername:findUserByUsername,
            findById:findById,
            find: find,
            comparison:comparison,
            logical:logical,
            findDay: findDay,
            findDate: findDate,
            findDatePre: findDatePre,
            findDatePost :findDatePost,
            stringsearch: stringsearch,
            stringconcat: stringconcat,
            stringreplace: stringreplace,
            stringsub:stringsub
        };

        return model;

        function stringsub(sslice){
            console.log(sslice+"client service");
            return $http.get("/api/project/slice/" + sslice.sub1 + "/" + sslice.sub2);
        }

        function stringreplace(strrep){
            return $http.get("/api/project/replace/" + strrep.replacee + "/" + strrep.replacement);
        }

        function stringconcat(strcon){
            return $http.get("/api/project/concat/" + strcon.con1 + "/" + strcon.con2);
        }

        function stringsearch(ssearch){
            return $http.get("/api/project/search/" + ssearch);
        }

        function findDatePre(pre){
            return $http.get("/api/project/prev/" + pre);
        }

        function findDatePost(post){
            return $http.get("/api/project/post/" + post);
        }

       function findDate(pick){
                return $http.get("/api/project/findDate/" + pick);
        }

        function findDay(pick){
            return $http.get("/api/project/findDay/" + pick);
        }

        function comparison(findBool1){
            console.log("In client");
            return $http.get("/api/project/comparison/" + findBool1.num1 + "/" + findBool1.num2 + "/" + findBool1.operator1);
        }

        function logical(findBool2){
            return $http.get("/api/project/logical/" + findBool2.num3 + "/" + findBool2.num4 + "/" + findBool2.operator2);
        }

        function find(data){
            console.log(data.operator+" "+data.operator1);
            return $http.get("/api/project/user/" + data.operator1+ "/" + data.operator2 + "/" + data.operator);
        }

        function findUserByCredentials(credentials) {
            return $http.get("/api/project/user/" + credentials.username+ "/" + credentials.password);
        }

        function findAllUsers() {
            return $http.get("/api/assignment/user");
        }

        function createUser(user) {
            return $http.post("/api/assignment/user", user);
        }

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        function deleteUserById(userId) {
            return $http.delete("/api/assignment/user/" + userId);
        }

        function updateUser(userId,user) {
            return $http.put("/api/assignment/user/" + userId , user);
        }

        function findUserByUsername(username){
            return $http.get("/api/assignment/user/" + username);
        }

        function findById(userId){
            return $http.get("/api/assignment/user/" + userId);
        }
    }
})();