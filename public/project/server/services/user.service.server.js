module.exports = function(app,userModel){
    app.get("/api/project/user/:username/:password",findUserByCredentials);
    app.post("/api/project/user", createUser);
    app.get("/api/project/user",allUsers);
    app.get("/api/project/user/:userId",findById);
    app.get("/api/project/username/:username",findUserByUsername);
    app.put("/api/project/user/:userId",updateUser);
    app.delete("/api/project/user/:userId",deleteUserById);
    app.get("/api/project/user/:operator1/:operator2/:operator",find);
    app.get("/api/project/logical/:num3/:num4/:operator2",logical);
    app.get("/api/project/comparison/:num1/:num2/:operator1", comparison);
    app.get("/api/project/findDay/:pick",findDay);
    app.get("/api/project/findDate/:pick",findDate);
    app.get("/api/project/prev/:pre",findDatePre);
    app.get("/api/project/post/:post",findDatePost);
    app.get("/api/project/search/:ssearch",stringSearch);
    app.get("/api/project/concat/:con1/:con2",stringconcat);
    app.get("/api/project/replace/:replacee/:replacement",stringreplace);
    app.get("/api/project/slice/:sub1/:sub2",stringsub);


    function createUser(req,res){
        var user=req.body;
        res.json(userModel.createUser(user));
    }

    function allUsers(req,res){
        res.json(userModel.findAllUsers());
    }

    function findById(req,res){
        var userId =req.params.userId;
        res.json(userModel.findById(userId));
    }

    function findUserByUsername(req,res){
        var username = req.params.username;
        res.json(userModel.findUserByUsername(username));
    }

    function findUserByCredentials(req,res){
        var credentials = {
            username:req.params.username,
            password:req.params.password
        };
        res.json(userModel.findUserByCredentials(credentials));
    }

    function updateUser(req,res){
        var userId =req.params.userId;
        var user = req.body;
        res.json(userModel.updateUser(userId,user));
    }

    function deleteUserById(req,res){
        var userId =req.params.userId;
        res.json(userModel.deleteUserById(userId));
    }

    function stringsub(req, res){
        var sslice={
            sub1: req.params.sub1,
            sub2: req.params.sub2
        };
        console.log(sslice+"service server");
        res.json(userModel.stringsub(sslice));
    }
    function stringreplace(req, res){
        var strrep={
            replacee: req.params.replacee,
            replacement: req.params.replacement
        };
        res.json(userModel.stringreplace(strrep));
    }

    function stringconcat(req, res){
        var strcon={
            con1: req.params.con1,
            con2: req.params.con2
        };
        res.json(userModel.stringconcat(strcon));
    }


    function stringSearch(req, res){
        var ssearch=req.params.ssearch;
        console.log(ssearch+"service server");
        res.json(userModel.stringsearch(ssearch));
    }

    function findDatePre(req, res){
        var pre=req.params.pre;
        res.json(userModel.findDatePre(pre));
    }
    function findDatePost(req, res){
        var post=req.params.post;
        res.json(userModel.findDatePost(post));
    }

    function findDate(req, res){
        var pick =req.params.pick;
        res.json(userModel.findDate(pick));
    }

    function  findDay(req, res){
        var pick =req.params.pick;
        res.json(userModel.findDay(pick));
    }

    function logical(req, res){
        var findBool2={
            num3:req.params.num3,
            num4:req.params.num4,
            operator2:req.params.operator2
        };
        console.log(req.params.num3+" "+req.params.num4+" "+req.params.operator2);
        res.json(userModel.logical(findBool2));
    }

    function comparison(req, res){
        // console.log(req.params.num1);
        // console.log(req.params.num2);
        // console.log(req.params.operator1);
        var findBool1={
            num1:req.params.num1,
            num2:req.params.num2,
            operator1:req.params.operator1
        };
        res.json(userModel.comparison(findBool1));
    }

    function find(req, res){
        //console.log("in service");
        var findData={
            operator1:req.params.operator1,
            operator2:req.params.operator2,
            operator:req.params.operator
        };

        res.json(userModel.find(findData));
    }

};