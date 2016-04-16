module.exports = function(app,pageModel){
    app.post("/api/project/scripts", createPageForUser);
    app.get("/api/project/scripts",findAllPages);
    app.get("/api/project/scripts/:userId",findPagesById);
    app.put("/api/project/scripts/:pageId",updatePageById);
    app.delete("/api/project/scripts/:pageId",deletePageById);
    app.get("/api/project/page/:pageId",findPagesByPageId);

    function findPagesByPageId(req,res){
        var pageId = req.params.pageId;
        res.json(pageModel.findPageById(pageId));

    }

    function createPageForUser(req,res){
        var page=req.body;
        res.json(pageModel.createPageForUser(page));
    }

    function findAllPages(req,res){
        res.json(pageModel.findAllPages());
    }

    function findPagesById(req,res){
        var userId =req.params.userId;
        res.json(pageModel.findPagesForUser(userId));
    }

    function updatePageById(req,res){
        var pageId =req.params.pageId;
        var page = req.body;
       // console.log(page);
       // console.log(page);
        res.json(pageModel.updatePageById(pageId,page));
    }

    function deletePageById(req,res){
        var pageId =req.params.pageId;
        res.json(pageModel.deletePageById(pageId));
    }

};