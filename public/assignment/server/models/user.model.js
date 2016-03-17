var mock = require("/user.mock.json");

module.exports=function(app){
    var api={
        createUser: createUser,
        updateUser: updateUser,
        deleteUserById:deleteUserById,
        findUserByUsername: findUserByUsername,
        findAll: findAll,
        findById: findById,
        findUserByCredentials: findUserByCredentials
    };
    return api;

    function createUser(user){
        var user = {
            username: user.username,
            password: user.password,
            _id: (new Date).getTime()
        };
        mock.push(user);
        return user;
    }

    function updateUser(userId, user) {
        var flag = "false";
        for (var i in mock) {
            if (mock[i]._id === userId) {
                flag = "true";
                mock[i] = user;
                return mock[i];
            }
        }
        if (flag = "false") {
            return null;
        }
    }

    function deleteUserById(userId){
        for (var i in mock) {
            if (mock[i]._id === userId)
                delete mock[i];
        }
    }

    function findUserByUsername(userName){
        var flag="false";
        for(var i in mock){
            if(mock[i].username === userName)
            {
                flag= "true";
                return mock[i];
            }
        }
        if(flag=="false")
        return null;
    }

    function findAll(){
        return mock;
    }

    function findById(userID){
        var flag="false";
        for(var i in mock){
            if(mock[i]._id === userID)
            {
                flag= "true";
                return mock[i];
            }
        }
        if(flag=="false")
            return null;
    }

    function findUserByCredentials(credentials){
        var flag="false";
        for(var i in mock){
            if(mock[i].username === credentials.username &&
                mock[i].password === credentials.password)
            {
                flag= "true";
                return mock[i];
            }
        }
        if(flag=="false")
            return null;
    }
}