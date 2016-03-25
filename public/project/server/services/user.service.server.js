module.exports = function(app,userModel){
    app.post("/api/project/user", createUser);
    app.get("/api/project/user",allUsers);
    app.get("/api/project/user/:userId",findById);
    app.get("/api/project/user/:username",findUserByUsername);
    app.get("/api/project/user/:username/:password",findUserByCredentials);
    app.put("/api/project/user/:userId",updateUser);
    app.delete("/api/project/user/:userId",deleteUserById);
    app.get("/api/project/user/:operator1/:operator2/:operator",find);
    app.get("/api/project/user/:num3/:num4/:operator2",logical);
    app.get("/api/project/user/:num1/:num2/:operator1", comparison);


    function logical(req, res){
        var findBool2={
            num3:req.params.num3,
            num4:req.params.num4,
            operator2:req.params.operator2
        };

        res.json(userModel.logical(findBool2));
    }

    function comparison(req, res){
        var findBool1={
            num1:req.params.num1,
            num2:req.params.num2,
            operator:req.params.operator1
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


    function createUser(req,res){
        var user=req.body;
        res.json(userModel.createUser(user));
        req.session.getCurrentUser=user;
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

};