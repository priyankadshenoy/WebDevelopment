
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
        //console.log("hello");
        for(var i=0; i<page.fields.length; i++)
        if(!(page.fields[i].name === undefined))
        console.log("Helo"+ page.fields[i].name);
        //console.log("server" +page.fields);
;    }

    function publishField(){
        console.log("j"+page.fields[1].name);
        for(var j=0 ; j < page.fields.length; j++)
            if(!(page.fields[j].name === undefined))
            {
                test[j]= page.fields[j].name;
                console.log("god please"+ test[j]);
            }
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