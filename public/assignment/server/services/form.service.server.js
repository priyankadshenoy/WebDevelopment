
module.exports = function(app,formModel) {
    app.post("/api/assignment/findFormByTitle/:title", findFormByTitle);
    app.get("/api/assignment/findAllFormsForUser/:id/form",findAllFormsForUser);
    app.post("/api/assignment/addForm/user/:id/form",addForm);
    app.delete("/api/assignment/form/:formId/:userId", deleteForm);
    app.put("/api/assignment/form/:formToBeUpdatedId",updateForm);
    app.get('/api/assignment/user/:userId/form', findFormsForUser);
    app.get('/api/assignment/form/:formId', findFormById);
    app.delete('/api/assignment/form/:formId', deleteFormById);
    app.post('/api/assignment/user/:userId/form', createForm);
    app.put('/api/assignment/form/:formId', updateFormById);

    function findFormByTitle(req,res){
        var title= req.params.title;
        var formsWithGivenTitle=formModel.findFormByTitle(title);
        res.json(formsWithGivenTitle);
    }

    function findAllFormsForUser(req,res){
        var userId=req.params.id;
        var allForms=formModel.findAllFormsForUser(userId);
        res.json(allForms);
    }

    function addForm(req,res){
        var userId= req.params.id;
        var form=req.body;
        var newSetOfForms=formModel.addForm(userId,form);
        res.json(newSetOfForms);
    }

    function deleteForm(req,res){
        var formId=req.params.formId;
        var userId=req.params.userId;
        var newSetOfForms=formModel.deleteForm(formId,userId);
        res.json(newSetOfForms);

    }

    function updateForm(req,res){
        var formId=req.params.formToBeUpdatedId;
        var newForm=req.body;
        var updatedForm=formModel.updateForm(formId,newForm);
        res.json(updatedForm);
    }
    function findFormsForUser(req, res) {
        var userId = Number(req.params.userId);
        var forms = formModel.findFormsByUserId(userId);
        res.json(forms);
    }

    function findFormById(req, res) {
        var formId = req.params.formId;
        var form = formModel.findFormById(formId);
        res.json(form);
    }

    function deleteFormById(req, res) {
        var formId = req.params.formId;
        var forms = formModel.deleteFormById(formId);
        res.send(200);
    }

    function createForm(req, res) {
        var userId = Number(req.params.userId);
        var form = req.body;
        var forms = formModel.createForm(form, userId);
        res.json(forms);
    }

    function updateFormById(req, res) {
        var formId = req.params.formId;
        var form = req.body;
        var forms = formModel.updateFormById(formId, form);
        res.json(forms);
    }
};