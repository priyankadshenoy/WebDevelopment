module.exports = function(app){
    console.log("app.js");
    var userModel = require("./models/user.model.js")();
    var formModel = require("./models/form.model.js")();
    var userService = require("./services/user.service.server.js")(app,userModel);
    var formService = require("./services/form.service.server.js")(app,userModel,formModel);
};