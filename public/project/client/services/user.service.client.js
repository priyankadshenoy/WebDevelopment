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
            logical:logical
        };

        return model;

        function comparison(findBool1){
            return $http.get("/api/project/user/" + findBool1.num1 + "/" + findBool1.num2 + "/" + findBool1.operator1);
        }

        function logical(findBool2){
            return $http.get("/api/project/user/" + findBool2.num3 + "/" + findBool2.num4 + "/" + findBool2.operator2);
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