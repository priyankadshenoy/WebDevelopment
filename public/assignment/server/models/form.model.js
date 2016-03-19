var formMock = require("./form.mock.json");

module.exports= function(){

    var api = {
        findFormByTitle:findFormByTitle,
        findAllFormsForUser:findAllFormsForUser,
        addForm:addForm,
        deleteForm:deleteForm,
        updateForm:updateForm,
        findFieldsByFormId : findFieldsByFormId,
        findFieldById : findFieldById,
        deleteFieldById : deleteFieldById,
        createField : createField,
        updateFieldById : updateFieldById,
        findFormById : findFormById,
        findAllForms : findAllForms,
        createForm : createForm,
        deleteFormById : deleteFormById,
        updateFormById : updateFormById,
        findFormsByUserId : findFormsByUserId
    };
    return api;


    function findFormByTitle(title) {
        for (var u in formMock) {
            if (formMock[u].title == title) {
                return formMock[u];
            }
        }
        return null;
    }

    function findAllFormsForUser(userId){
        var userForms =[]
        for (var u in formMock) {
            if (formMock[u].userId == userId) {
                userForms.push(formMock[u]);
            }
        }
        return userForms;
    }

    function addForm(id,form){

        //set the id of the form using guid library

        form._id=(new Date).getTime();
        form.userId=id;
        formMock.push(form);
        var allForms = findAllFormsForUser(id);
        return allForms;
    }

    function deleteForm(formId,userId){
        for (var u in formMock) {
            if (formMock[u]._id == formId) {
                formMock.splice(u,1);
                var allForms = findAllFormsForUser(userId);
                return allForms;
            }
        }
    }

    function updateForm(formId,newForm){
        for (var u in formMock) {
            if (formMock[u]._id == formId) {
                formMock[u]=newForm;
                return formMock[u];
            }
        }
    }

    function findFormById(formId) {
        for(var u in formMock) {
            if (formMock[u]._id === formId) {
                return formMock[u];
            }
        }
        return null;
    }

    function findAllForms() {
        return formMock;
    }

    function createForm(form, userId) {
        form._id = (new Date()).getTime().toString();
        form.userId = userId;
        formMock.push(form);
        return formMock;
    }

    function deleteFormById(formId) {
        for(var u in formMock) {
            if (formMock[u]._id === formId) {
                delete formMock[u];
            }
        }
    }

    function updateFormById(formId, form) {
        for (var u in formMock) {
            if (formMock[u]._id === formId) {
                formMock[u].title = form.title;
                return formMock;
            }
        }
    }

    function findFormsByUserId(userId) {
        var forms = [];
        for(var u in formMock) {
            if (formMock[u].userId === userId) {
                forms.push(formMock[u]);
            }
        }
        return forms;
    }

    function findFieldsByFormId(formId) {
        for(var u in formMock) {
            if (formMock[u]._id === formId) {
                return formMock[u].fields;
            }
        }
    }

    function findFieldById(fieldId, formId) {
        for(var u in formMock) {
            if (formMock[u]._id === formId) {
                for(var v in formMock[u].fields) {
                    if (v._id === fieldId) {
                        return v;
                    }
                }
            }
        }
    }

    function deleteFieldById(fieldId, formId) {
        for(var u in formMock) {
            if (formMock[u]._id === formId) {
                for(var v in formMock[u].fields) {
                    if (formMock[u].fields[v]._id === fieldId) {
                        delete formMock[u].fields[v];
                        return formMock[u].fields;
                    }
                }
            }
        }
    }

    function createField(field, formId) {
        for (var u in formMock) {
            if (formMock[u]._id === formId) {
                field._id = (new Date()).getTime().toString();
                formMock[u].fields.push(field);
                return formMock[u].fields;
            }
        }
    }

    function updateFieldById(fieldId, field, formId) {

        for (var u in formMock) {
            if (formMock[u]._id === formId) {
                for(var v in formMock[u].fields) {
                    if (v._id === fieldId) {
                        v.label = field.label;
                        v.type = field.type;
                        v.placeholder = field.placeholder;
                    }
                }
            }
        }
    }
};

