
var q = require("q");

module.exports = function (db, mongoose) {

    var UserSchema = require("./user.schema.server.js")(mongoose);

    var UserModel =  mongoose.model('User', UserSchema);
    var api = {
        findUserById : findUserById,
        findAllUsers : findAllUsers,
        createUser : createUser,
        findUserByUsername : findUserByUsername,
        findUserByCredentials : findUserByCredentials,
        deleteUserById : deleteUserById,
        updateUserById : updateUserById
    };

    return api;

    function findAllUsers() {

        var deferred = q.defer();

        UserModel.find(function(err, doc) {
            if(err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function findUserById(userId) {
        var deferred = q.defer();
        UserModel.find({_id : userId}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findUserByUsername(username) {
        return UserModel.findOne({username : username});
    }

    function findUserByCredentials(credentials) {
        var deferred = q.defer();

        UserModel.findOne(

            { username: credentials.username,
                password: credentials.password },

            function(err, doc) {

                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }

            });
        return deferred.promise;
    }

    function createUser(user) {
        var deferred = q.defer();

        UserModel.create(user, function (err, doc) {

            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }

        });

        return deferred.promise;
    }

    function deleteUserById(userId) {
        var deferred = q.defer();
        UserModel.remove({_id : userId}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function updateUserById(userId, user) {
      var deferred = q.defer();
        UserModel.update({_id : userId}, {$set : user}, function(err, doc) {
           if(err) {
               deferred.reject(err);
           }
            else {
               UserModel.findById(userId, function(err, doc) {
                   if(err)
                       deferred.reject(err);
                   else
                   deferred.resolve(doc);
               });
           }
        });
        return deferred.promise;
    }
};