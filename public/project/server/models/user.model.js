var mock = require("./user.mock.json");

module.exports = function (app) {

    var api = {
        createUser: createUser,
        findAllUsers: findAllUsers,
        findById: findById,
        updateUser: updateUser,
        deleteUserById:deleteUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        find: find
    };

    return api;

    function find(findData){
        if (findData.operator == '+') {
            return(findData.operator1 + findData.operator2);

        }
        if (findData.operator == '-') {
            return(findData.operator1 - findData.operator2);
        }
        if (findData.operator == '*') {
            return(findData.operator1 * findData.operator2);
        }
        if (findData.operator == '/') {
            return(findData.operator1 / findData.operator2);
    }
    }


    function createUser(user) {
        var user = {
            username: user.username,
            password: user.password,
            _id: (new Date).getTime(),
            email:user.email
        };
        mock.push(user);
        return (user);
    }

    function findAllUsers() {
        return (mock);
    }

    function findById(userid) {
        for (var u in mock) {
            if (mock[u]._id === userid) {
                return mock[u];
            }
            else {
                return null;
            }
        }
    }

    function findUserByUsername(username) {
        for (var u in mock) {
            if (mock[u].username === username) {
                return mock[u];
            }
            else {
                return null;
            }
        }
    }

    function updateUser(userId, user) {
        for (var u in mock) {
            if (mock[u]._id === userId) {
                flag = "true";
                mock[u] = user;
                return (mock[u]);
            }
        }
        return (null);
    }

    function deleteUserById(userId) {
        for (var u in mock) {
            if (mock[u]._id === userId) {
                delete mock[u];
            }
        }
        return (mock);
    }


    function findUserByCredentials(credentials) {
        for (var u in mock) {
            if (mock[u].username === credentials.username &&
                mock[u].password === credentials.password) {
                return mock[u];
            }
        }
        return null;
    }
};