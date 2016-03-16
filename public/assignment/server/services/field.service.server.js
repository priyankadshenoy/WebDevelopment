module.exports= function(app, formModel, userModel){
    app.post("/api/assignment/user/:userId/form", findAllFormsForUser);
    app.get("/api/assignment/form/:formId", findFormById);
    app.delete("/api/assignment/form:formId", deleteFormById);
    app.post("/api/assignment/user/:userId/form", createFormForUser);
    app.put("/api/assignment/form/:formId", updateFormById);
}