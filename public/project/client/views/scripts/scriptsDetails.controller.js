(function() {
    "use strict";

    angular.module("ProjectApp")
        .controller("ScriptDetailsController",ScriptDetailsController);

    function ScriptDetailsController(FieldService,PageService,$routeParams,$rootScope,$scope) {
        var vm = this;
        var pageId;
        vm.currentField = null;
        vm.fieldEdit=null;
        vm.commitEdit = commitEdit;
        vm.editField = editField;
        vm.deleteField = deleteField;
        vm.addField=addField;
        vm.repeatField = repeatField;
        $scope.updatePage = updatePage;



        var currentUser =$rootScope.currentUser;


        if($routeParams.pageId){
            pageId = $routeParams.pageId;
        }

        function updatePage(start,end){
            var newFields = [];

            for(var i in vm.fields){
                newFields[i] = vm.fields[i];
            }

            var temp = newFields[start];
            newFields[start] = newFields[end];
            newFields[end] = temp;

            PageService.findPageByPageId(pageId)
                .then(function(response){
                    var page = response.data;
                    page.fields = newFields;
                    //console.log("after drag:" +page.fields);
                    PageService.updatePageById(page._id,page);
                });
        }


        function init(){

            FieldService.findFieldByPage(pageId)
                .then(function(response){
                    vm.fields = response.data;
                    console.log("init fields" +vm.fields);
                });

            PageService.findPageByPageId(pageId)
                .then(function(response){
                    vm.page = response.data;
                })

        }init();

        function editField(field){
            vm.fieldEdit = field;
            vm.label = field.label;

            var op =field.options;

            if(op){
                var optionList = [];
                for(var u in op){
                    optionList.push(op[u].label+ ":" +op[u].value+ "\n")
                }
                vm.fieldEdit.options = optionList;
            }
            if(field.placeholder){
                vm.placeholder = field.placeholder;
            }
        }

        function commitEdit(){
            //console.log("commit edit");
            if(vm.fieldEdit.options){
                var opt = vm.options.split("\n");
                var optionList =[];

                for(var u in opt){
                    var val = opt[u].split(":");
                    optionList.push({"label":val[0],"value":val[1]});
                }
                vm.fieldEdit.options = optionList;
                //console.log(vm.options);
            }

            if(vm.fieldEdit.placeholder){
                vm.fieldEdit.placeholder  = vm.placeholder
            }

            vm.fieldEdit.label = vm.label;

            FieldService.updateField(pageId,vm.fieldEdit._id,vm.fieldEdit)
                .then(init());
            vm.label = null;
            vm.placeholder = null;
            vm.options = null;
        }

        function deleteField(fieldId){
            FieldService.deleteField(pageId,fieldId)
                .then(init());
        }

        function addField(fieldType){
            var field;
            switch(fieldType) {
                case "LABEL":
                    field = {"_id": null, "label": "New Label", "type": "LABEL"};
                    break;

                case "HEADER":
                    field = {"_id": null, "label": "New Header", "type": "HEADER"};
                    break;

                case "BUTTON":
                    field = {"_id": null, "label": "New Button", "type": "BUTTON"};
                    break;

                case "PARAGRAPH":
                    field = {"_id": null, "label": "New Header", "type": "PARAGRAPH","placeholder":"Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum"};
                    break;

                case "TEXT":
                    field = {"_id": null, "label": "New Text Field", "type": "TEXT", "placeholder": "New Field"};
                    break;

                case "TEXTAREA":
                    field = {"_id": null, "label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"};
                    break;

                case "DATE":
                    field = {"_id": null, "label": "New Date Field", "type": "DATE"};
                    break;

                case "LIST":
                    field = {
                        "_id": null, "label": "New List", "type": "LIST", "options": [
                            {"label": "Item 1", "value": "Item_1"},
                            {"label": "Item 2", "value": "Item_2"},
                            {"label": "Item 3", "value": "Item_3"}
                        ]
                    };
                    break;

                case "OPTIONS":
                    field = {
                        "_id": null, "label": "New Dropdown", "type": "OPTIONS", "options": [
                            {"label": "Option 1", "value": "OPTION_1"},
                            {"label": "Option 2", "value": "OPTION_2"},
                            {"label": "Option 3", "value": "OPTION_3"}
                        ]
                    };
                    break;

                case "CHECKBOXES":
                    field = {
                        "_id": null, "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                            {"label": "Option A", "value": "OPTION_A"},
                            {"label": "Option B", "value": "OPTION_B"},
                            {"label": "Option C", "value": "OPTION_C"}
                        ]
                    };
                    break;

                case "RADIOS":
                    field = {
                        "_id": null, "label": "New Radio Buttons", "type": "RADIOS", "options": [
                            {"label": "Option X", "value": "OPTION_X"},
                            {"label": "Option Y", "value": "OPTION_Y"},
                            {"label": "Option Z", "value": "OPTION_Z"}
                        ]
                    };
                    break;

                case "ARITHMETIC":
                    field = {
                        "_id": null, "label": "New Dropdown", "type": "OPTIONS", "options": [
                            {"label": "Add", "value": "Add"},
                            {"label": "Subtract", "value": "Subtract"},
                            {"label": "Multiply", "value": "Multiply"}
                        ]
                    };
                    break;

                case "STRING":
                    field = {
                        "_id": null, "label": "New Dropdown", "type": "OPTIONS", "options": [
                            {"label": "Replace", "value": "Replace"},
                            {"label": "Search", "value": "Search"},
                            {"label": "Join", "value": "Join"},
                            {"label": "Slice", "value": "Slice"}
                        ]
                    };
                    break;

                case "BOOLEAN":
                    field = {
                        "_id": null, "label": "New Dropdown", "type": "OPTIONS", "options": [
                            {"label": "Add", "value": "Add"},
                            {"label": "Subtract", "value": "Subtract"},
                            {"label": "Multiply", "value": "Multiply"}
                        ]
                    };
                    break;

            }
           // console.log("type" +fieldType);
           // console.log(field);
            FieldService.createField(pageId,field)
                .then(init());
        }

        function repeatField(field){
            FieldService.createField(pageId,field)
                .then(init());
        }

        $scope.choices = [{id: 'choice1'}];

        $scope.addNewChoice = function() {
            var newItemNo = $scope.choices.length;
            $scope.choices.push({'id':'choice'+newItemNo});
           // var test= $scope.choices;
           // for(var i=0;i<newItemNo; i++)
            //console.log($scope.choices[i].name);
           //findSolution()

        };

        $scope.findSolution = function() {
            var x= $scope.choices;
            var result=0;
            if(x[1].name == "*")
             result= parseInt(x[0].name) * parseInt(x[2].name);
            if(x[1].name == "+")
              result= parseInt(x[0].name) + parseInt(x[2].name);
            if(x[1].name == "/")
              result= parseInt(x[0].name) / parseInt(x[2].name);
            if(x[1].name == "-")
              result= parseInt(x[0].name) - parseInt(x[2].name);
            //console.log(result);

            for(var i=3; i<x.length; i++){
                if(x[i].name == "+")
                result= result + parseInt(x[i+1].name);
                else if(x[i].name == "*")
                {
                    result= result * parseInt(x[i+1].name);
                console.log(result+" "+ x[i]);
                }
                else if(x[i].name == "/")
                    result= result/ parseInt(x[i+1].name);
            }
           $scope.output= result;
    }

    }

})();