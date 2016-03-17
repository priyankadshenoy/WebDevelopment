var mock= require("./form.mock.json");
module.exports = function(app) {

    var api = {
        createForm: createForm,
        findAll: findAll,
        findFormById: findFormById,
        findAllFormsForUser: findAllFormsForUser,
        findFormByTitle: findFormByTitle,
        deleteFormById: deleteFormById,
        updateFormById: updateFormById
    }
    return api;

    function createForm(userId, form) {
        var form = {
            _id: (new Date).getTime(),
            title: form.title,
            userId: userId
        };
        mock.push(form);
        return form;
    }

    function findAll() {
        return mock;
    }

    function findFormById(formId) {
        for (var i in mock) {
            if (mock[i]._id === formId) {
                return mock[i];
            }
        }
        return null;
    }

    function findAllFormsForUser(userId) {
        var uforms = [];
        for (var i in mock) {
            if (mock[i].userId === userId) {
                uforms.push(mock[i]);
            }
        }
        return uforms;
    }

    function deleteFormById(formId) {
        for (var i in mock) {
            if (mock[i]._id === formId) {
                delete mock[i];
                break;
            }
        }
        return mock;
    }

    function updateFormById(formId, newForm) {
        for (var i in mock) {
            if (mock[i]._id === formId) {
                mock[i].title = newForm.title;
                mock[i].userId = newForm.userId;
                break;
            }
        }
        return mock[i];
    }

    function findFormByTitle(title) {
        for (var i in mock) {
            if (mock[i].title == title) {
                return mock[i];
            }
        }
    }
}