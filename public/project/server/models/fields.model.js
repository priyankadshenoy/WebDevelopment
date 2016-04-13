
module.exports = function(uuid,pageModel){
    var api = {
        createField : createField,
        deleteField:deleteField,
        updateField:updateField,
        findField:findField,
        findFieldByPageId:findFieldByPageId,
        publishField :publishField
    };
    var page;
    var fields;
    var test=new Array();
    return api;



    function createField(pageId,field){
        field._id = uuid.v1();
        page = pageModel.findPageById(pageId);
        page.fields.push(field);
    }

    function publishField(){
        var result=0;

        for(var k=0 ; k < page.fields.length; k++) {
            if (!(page.fields[k].name === undefined)) {
                test[k] = page.fields[k].name;
                //console.log(test[j] + "  ");
            }
        }
            for (var j = 1; j < test.length; j++) {
                if (j == 2 && test[1] == "+")
                    result = parseFloat(test[0]) + parseFloat(test[2]);
                else if (j == 2 && test[2] == "*") {
                    console.log("in");
                    result = parseFloat(test[1]) * parseFloat(test[3]);
                    console.log("in result"+ result);
                }
                else if (j == 2 && test[1] == "-")
                    result = parseFloat(test[0]) - parseFloat(test[2]);

                else if (j == 2 && test[1] == "/")
                    result = parseFloat(test[0]) / parseFloat(test[2]);

                else if (j > 2 && test[j] == "*")
                    result = result * parseFloat(test[j + 1]);

                else if (j > 2 && test[j] == "+")
                    result = result + parseFloat(test[j + 1]);

                else if (j > 2 && test[j] == "-")
                    result = result - parseFloat(test[j + 1]);

                else if (j > 2 && test[j] == "/")
                    result = result / parseFloat(test[j + 1]);
            }
            console.log(result + "result");
        }


    function  deleteField(pageId,fieldId){
        page = pageModel.findPageById(pageId);
        fields = page.fields;
        for(var u in fields){
            if(fields[u]._id == fieldId){
                fields.splice(u,1);
            }
        }
    }

    function  updateField(pageId,fieldId,field){
        page = pageModel.findPageById(pageId);
        fields= page.fields;
        for(var u in fields){
            if(fields[u]._id ==fieldId){
                fields[u] = field;
            }
        }
    }

    function findField(pageId,fieldId){
        page = pageModel.findPageById(pageId);
        fields = page.fields;
        for(var u in fields){
            if(field[u]._id == fieldId){
                return fields[u];
            }
        }
    }

    function findFieldByPageId(pageId){
        page = pageModel.findPageById(pageId);
       //
        // console.log(page.fields);
        return page.fields;

    }
};