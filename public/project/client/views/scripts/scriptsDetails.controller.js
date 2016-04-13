(function() {
    "use strict";

    angular.module("ProjectApp")
        .controller("ScriptDetailsController",ScriptDetailsController);

    function ScriptDetailsController(FieldService,PageService,$routeParams,$rootScope,$scope) {
        var vm = this;

        var pageId;
        vm.currentField = null;
        vm.fieldEdit = null;
        vm.commitEdit = commitEdit;
        vm.editField = editField;
        vm.deleteField = deleteField;
        vm.addField = addField;
        vm.cloneField = cloneField;
        vm.sortField = sortField;

        vm.findSolution = findSolution;
        vm.publish = publish;
        vm.sortField = sortField;


        var currentUser = $rootScope.currentUser;

        function publish() {
            console.log(vm.fields[1].date);
            FieldService.publishField()
                .then(console.log("tata"));
        }

        if ($routeParams.pageId) {
            pageId = $routeParams.pageId;
        }

        function updatePage(start, end) {
            var newFields = [];

            for (var i in vm.fields) {
                newFields[i] = vm.fields[i];
            }

            var temp = newFields[start];
            newFields[start] = newFields[end];
            newFields[end] = temp;

            PageService.findPageByPageId(pageId)
                .then(function (response) {
                    var page = response.data;
                    page.fields = newFields;
                    console.log("after drag:" + page.fields);
                    PageService.updatePageById(page._id, page);
                }, function (err) {
                    console.log(err);
                });
        }


        function init() {

            FieldService.findPageFields(pageId)
                .then(function (response) {
                    vm.fields = response.data;
                }, function (err) {
                    console.log(err);
                });

            PageService.findPageByPageId(pageId)
                .then(function (response) {
                    vm.page = response.data;
                }, function (err) {
                    console.log(err);
                })

        }

        init();

        function editField(field) {
            vm.fieldEdit = field;
            vm.label = field.label;
            var optionsString = "";
            var op = field.options;

            if (op) {
                var optionList = [];
                for (var u in op) {
                    optionList.push(op[u].label + ":" + op[u].value + "\n")
                    optionsString = optionsString + (op[u].label + ":" + op[u].value + "\n");
                }
                vm.fieldEdit.options = optionList;
                optionsString = optionsString.substring(0, optionsString.length - 1);
                vm.options = optionsString;
            }
            if (field.placeholder) {
                vm.placeholder = field.placeholder;
            }
        }

        function commitEdit() {
            if (vm.options != null) {
                var opt = vm.options.split("\n");
                var optionList = [];

                for (var u in opt) {
                    var val = opt[u].split(":");
                    optionList.push({"label": val[0], "value": val[1]});
                }
                vm.fieldEdit.options = optionList;
            }

            if (vm.fieldEdit.placeholder) {
                vm.fieldEdit.placeholder = vm.placeholder
            }

            vm.fieldEdit.label = vm.label;

            FieldService.updateField(pageId, vm.fieldEdit._id, vm.fieldEdit)
                .then(init());
            vm.label = null;
            vm.placeholder = null;
            vm.options = null;
        }

        function deleteField(fieldId) {
            FieldService.deleteField(pageId, fieldId)
                .then(init());
        }

        function addField(fieldType) {
            var field;
            switch (fieldType) {
                case "LABEL":
                    field = {"label": "New Label", "type": "LABEL"};
                    break;

                case "HEADER":
                    field = {"label": "New Header", "type": "HEADER"};
                    break;

                case "BUTTON":
                    field = {"label": "New Button", "type": "BUTTON"};
                    break;

                case "PARAGRAPH":
                    field = {
                        "label": "New Header",
                        "type": "PARAGRAPH",
                        "placeholder": "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum"
                    };
                    break;

                case "TEXT":
                    field = {
                        "label": "New Text Field", "type": "TEXT",
                        "placeholder": "New Field"
                    };
                    break;

                case "TEXTAREA":
                    field = {"label": "New Text Area Field", "type": "TEXTAREA", "placeholder": "New Field"};
                    break;

                case "DATE":
                    field = {"label": "New Date Field", "type": "DATE"};
                    break;

                case "LIST":
                    field = {
                        "label": "New List", "type": "LIST", "options": [
                            {"label": "Item 1", "value": "Item_1"},
                            {"label": "Item 2", "value": "Item_2"},
                            {"label": "Item 3", "value": "Item_3"}
                        ]
                    };
                    break;

                case "OPTIONS":
                    field = {
                        "label": "New Dropdown", "type": "OPTIONS", "options": [
                            {"label": "Option 1", "value": "OPTION_1"},
                            {"label": "Option 2", "value": "OPTION_2"},
                            {"label": "Option 3", "value": "OPTION_3"}
                        ]
                    };
                    break;


                case "ARITHMETIC":
                    field = {
                        "label": "New Dropdown", "type": "OPTIONS", "options": [
                            {"label": "Add", "value": "Add"},
                            {"label": "Subtract", "value": "Subtract"},
                            {"label": "Multiply", "value": "Multiply"}
                        ]
                    };
                    break;

                case "STRING":
                    field = {
                        "label": "New Dropdown", "type": "OPTIONS", "options": [
                            {"label": "Replace", "value": "Replace"},
                            {"label": "Search", "value": "Search"},
                            {"label": "Join", "value": "Join"},
                            {"label": "Slice", "value": "Slice"}
                        ]
                    };
                    break;

                case "BOOLEAN":
                    field = {
                        "label": "New Dropdown", "type": "OPTIONS", "options": [
                            {"label": "Add", "value": "Add"},
                            {"label": "Subtract", "value": "Subtract"},
                            {"label": "Multiply", "value": "Multiply"}
                        ]
                    };
                    break;

            }

            FieldService.createField(pageId, field)
                .then(init());
        }

        function sortField(start, end) {
            FieldService
                .sortField(pageId, start, end)
                .then(function (response) {
                        vm.fields = response.data;
                    },
                    function (err) {
                        console.log(err);
                    });
        }

        function cloneField(field) {
            FieldService.createField(pageId, field)
                .then(init());
        }


        $scope.choices = [{id: 'choice1'}];

        function addNewChoice() {
            var newItemNo = $scope.choices.length;
            $scope.choices.push({'id': 'choice' + newItemNo});

        }

        function findSolution() {
            var x = $scope.choices;
            var result = 0;
            if (x[1].name == "*")
                result = parseInt(x[0].name) * parseInt(x[2].name);
            if (x[1].name == "+")
                result = parseInt(x[0].name) + parseInt(x[2].name);
            if (x[1].name == "/")
                result = parseInt(x[0].name) / parseInt(x[2].name);
            if (x[1].name == "-")
                result = parseInt(x[0].name) - parseInt(x[2].name);
            //console.log(result);

            for (var i = 3; i < x.length; i++) {
                if (x[i].name == "+")
                    result = result + parseInt(x[i + 1].name);
                else if (x[i].name == "*") {
                    result = result * parseInt(x[i + 1].name);
                    console.log(result + " " + x[i]);
                }
                else if (x[i].name == "/")
                    result = result / parseInt(x[i + 1].name);
            }
            $scope.output = result;
        }


    }
})();