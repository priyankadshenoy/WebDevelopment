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
        find: find,
        comparison: comparison
        //logical: logical
    };

    return api;


    function comparison(findBool1){

        if (findBool1.operator1 == '>') {
            if (findBool1.num1 > findBool1.num2)
               return("Oh yes " + findBool1.num1 + " is greater than " + findBool1.num2);
            else
                return("No "+ findBool1.num1 + " is not greater than " + findBool1.num2);
        }
        if (findBool1.operator1 == '<') {
            if (findBool1.num1 < findBool1.num2)
               return("Oh yes **" + findBool1.num1 + " is smaller than " + findBool1.num2);
            else
                return("Nope "+ findBool1.num1 + " is not smaller than " + findBool1.num2);
        }
        if (findBool1.operator1 == '='){

            if (findBool1.num1 == findBool1.num2)
                return("Yaay " + findBool1.num1 + " is equal to " + findBool1.num2);
            else
                return("No No "+ findBool1.num1 + " is not equal to" + findBool1.num2);
        }
    }

   function logical(findBool2){
        if (findBool2.operator2 == '>') {
            if (findBool2.num3 > findBool2.num4)
                return("Oh yes " + findBool2.num3 + " is greater than " + findBool2.num4);
            else
                return("No "+ findBool2.num3 + " is not greater than " + findBool2.num4);
        }
        if (findBool2.operator2 == '<') {
            if (findBool2.num3 < findBool2.num4)
                return("Oh yes **" + findBool2.num3 + " is smaller than " + findBool2.num4);
            else
                return("Nope "+ findBool2.num3 + " is not smaller than " + findBool2.num4);
        }
        if (findBool2.operator2 == '='){

            if (findBool2.num3 == findBool2.num4)
                return("Yaay " + findBool2.num3 + " is equal to " + findBool2.num4);
            else
                return("No No "+ findBool2.num3 + " is not equal to" + findBool2.num4);
        }
    }

    function find(findData){
        console.log("In findDate");
        if (findData.operator == '+') {
            return(findData.operator1+findData.operator2);

        }
        if (findData.operator == '-') {
            return(findData.operator1-findData.operator2);
        }
        if (findData.operator == '*') {
            return(findData.operator1*findData.operator2);
        }
        if (findData.operator == "div") {
            return(findData.operator1/findData.operator2);
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