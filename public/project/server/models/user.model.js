var mock = require("./user.mock.json");

module.exports = function (uuid) {

    var api = {
        createUser: createUser,
        findAllUsers: findAllUsers,
        findById: findById,
        updateUser: updateUser,
        deleteUserById:deleteUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        find: find,
        comparison: comparison,
        logical: logical,
        findDay: findDay,
        findDate: findDate,
        findDatePre: findDatePre,
        findDatePost: findDatePost,
        stringsearch: stringsearch,
        stringconcat: stringconcat,
        stringreplace: stringreplace,
        stringsub: stringsub

    };

    return api;

    function createUser(user) {
        var user = {
            username: user.username,
            password: user.password,
            _id: uuid.v1(),
            firstName:user.firstName,
            lastName:user.lastName,
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
            if (mock[u]._id == userid) {
                return mock[u];
            }
            else {
                return null;
            }
        }
    }

    function findUserByUsername(username) {
        for (var u in mock)
        {
            if (mock[u].username == username)
            {
                return mock[u];
            }
        }
        return null;
    }

    function updateUser(userId, user) {
        for (var u in mock) {
            if (mock[u]._id == userId) {
                flag = "true";
                mock[u] = user;
                return (mock[u]);
            }
        }
        return (null);
    }

    function deleteUserById(userId) {
        for (var u in mock) {
            if (mock[u]._id == userId) {
                mock.splice(u, 1);
            }
        }
        return (mock);
    }


    function findUserByCredentials(credentials) {
        for (var u in mock) {
            if (mock[u].username == credentials.username &&
                mock[u].password == credentials.password) {
                return mock[u];
            }
        }
        return null;
    }

    function  stringsub(sslice){
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
        var q= rep.replace(strrep.replacee,strrep.replacement);
        return q;
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
    }

};