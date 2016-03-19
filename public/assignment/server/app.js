module.exports = function(app){
    var userModel = require("./models/user.model.js")();
    var formModel=require("./models/form.model.js")(app);

    var userService = require("./services/user.service.server.js")(app,userModel);
    var modelService = require("./services/form.service.server.js")(app,formModel);
    var fieldService = require('./services/field.service.server.js')(app, formModel);
};