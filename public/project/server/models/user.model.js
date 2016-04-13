var mongoose = require("mongoose");
var q = require("q");

module.exports = function (db) {
    var ProjUserSchema = require("./user.schema.server.js")();
    var user = mongoose.model("ProjUser", ProjUserSchema);

    var api = {
        createUser: createUser,
        findAllUsers: findAllUsers,
        findById: findById,
        updateUser: updateUser,
        deleteUserById:deleteUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials


        /*find: find,
        comparison: comparison,
        logical: logical,
        findDay: findDay,
        findDate: findDate,
        findDatePre: findDatePre,
        findDatePost: findDatePost,
        stringsearch: stringsearch,
        stringconcat: stringconcat,
        stringreplace: stringreplace,
        stringsub: stringsub*/

    };

    return api;

    function createUser(newUser) {
        var deferred = q.defer();
        user.create(newUser,function(err,doc) {
            if(err){
                deferred.reject(err);
            } else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findAllUsers() {
        var deferred = q.defer();
        user.find(function(err,users){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(users);
            }
        });
        return deferred.promise;
    }

    function findById(userid) {
        return user.findById(userid);
    }

    function findUserByUsername(username) {
        var deferred = q.defer();
        user.findOne({username:username},
            function (err,user) {
                if(!err){
                    deferred.resolve(user);
                }else{
                    deferred.reject(err);
                }
            });
        return deferred.promise;
    }

    function updateUser(userId,newuser) {
        var deferred = q.defer();
        delete newuser._id;
        user.update({_id:userId},
            {$set:newuser},
            function(err,stats){
                if(!err){
                    deferred.resolve(newuser);
                }else{
                    deferred.reject(err);
                }
            });
        return deferred.promise;
    }

    function deleteUserById(userId) {
        var deferred = q.defer();
        user.remove({_id:userId},
            function(err,stats){
                if(!err){
                    deferred.resolve(stats);
                }
            });
        return deferred.promise;
    }

    function findUserByCredentials(credentials) {
        var deferred = q.defer();
        user.findOne({
                username: credentials.username,
                password: credentials.password},
            function (err,user) {
                if(!err){
                    deferred.resolve(user);
                }else{
                    deferred.reject(err);
                }
            });
        return deferred.promise;
    }

   /* function  stringsub(sslice){
        console.log(sslice.sub1+"user model server");
        var sub= "Hello I am Priyanka! I enjoy web development! :)";
        var s = sub.substring(sslice.sub1, sslice.sub2);
        return s;
    }

    function stringreplace(strrep){
        var rep= "Hello I am Priyanka! I enjoy web development! :)" +
            "I think programming is fun and if you have an" +
            "understanding od concepts it is not difficult to " +
            "create simple lines of code";
        var l= rep.replace(strrep.replacee,strrep.replacement);
        return l;
    }

    function stringconcat(strcon){
        var s= strcon.con1.concat(" ",strcon.con2);
        console.log(s);
        return s;
    }

    function stringsearch(ssearch){
        var ss=ssearch+"";
        var str= "Lorem ipsum dolor sit amet, et vel tale mundi. " +
            "Id corpora tacimates sed. Mazim copiosae ei qui, aliquid legimus" +
            " dissentiunt per at. Sint patrioque mei ut, his cu atqui molestie gloriatur. " +
            "Qui cu odio atqui clita, graeco recteque qui eu. Cu nam nullam dignissim, " +
            "sed augue fabulas impedit cu. At nam affert pertinacia signiferumque, alii graeco commune eos ea, " +
            "prima senserit eu vix. Veri admodum facilisis te vis, ridens sententiae reformidans usu at. " +
            "Quis mundi accusam eu qui, pri dicta vivendo ea. His no nisl inani philosophia. " +
            "Vituperata definitionem qui an, libris eruditi omittantur et vis. Cu pro conceptam pertinacia, " +
            "ad sed iudico utamur dolorum, simul noluisse cu pro. Duo cu oblique diceret oportere.";
        str = str.split(" ");
        var t=0;
        for(var i=0; i<str.length; i++)
        {
            if( str[i]== ss)
            {
                t++;
                break;
            }
        }
        if(t>0)
            return("Yaay we found a match");
        else
            return("Oh no! We cant find you");

    }

    function findDatePre(pre){
        var d=new Date();
        d.setDate(d.getDate()-pre);
        //console.log(pre+ " " +d);
        return d;

    }
    function findDatePost(post){
        var di= Number(post);
        var d1=new Date();
        d1.setDate(d1.getDate()+ di);
        return d1;
    }

    function findDate(pick){
        var t=pick+"";
        var g= new Date(t);
        g= g.getTime();
        return(g);
        //return(pick.getTime());
        //return("hello");
    }

    function findDay(pick){
        var test=pick+"";
        return(test.substring(0,4));
        //console.log(substring(pick, 1, 4));
        //var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        //var test=days[pick.getDay()];
        //return("hello");
    }


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
        if (findBool2.operator2 == '&'){
            return(findBool2.num3 & findBool2.num4);
            // console.log(findBool2.num3 & findBool2.num4);
        }
        if (findBool2.operator2 == '|'){
            return(findBool2.num3 | findBool2.num4);
        }
        if (findBool2.operator2 == '^'){
            return(findBool2.num3 ^ findBool2.num4);
        }
        if (findBool2.operator2 == '<<'){
            return(findBool2.num3 << findBool2.num4);
        }
        if (findBool2.operator2 == '>>'){
            return(findBool2.num3 >> findBool2.num4);
        }

    }

    function find(findData){
        //console.log("In findDate");
        if (findData.operator == '+') {
            tt=Number(findData.operator1)+Number(findData.operator2);
            tt=Number(tt.toFixed(2));
            return tt;

        }
        if (findData.operator == '-') {
            tt=findData.operator1-findData.operator2;
            tt=Number(tt.toFixed(2));
            return tt;
        }
        if (findData.operator == '*') {
            tt=findData.operator1*findData.operator2;
            tt=Number(tt.toFixed(2));
            return tt;

        }
        if (findData.operator == "div") {
            var tt=Number(findData.operator1)/ Number(findData.operator2);
            tt=Number(tt.toFixed(2));
            return tt;
        }
    }*/

};