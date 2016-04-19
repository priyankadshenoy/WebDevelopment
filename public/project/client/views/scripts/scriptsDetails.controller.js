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

        var arr= new Array();
        $scope.result;


        var currentUser = $rootScope.currentUser;

        function publish(res) {

            for (var l = 0; l < vm.fields.length; l++) {
                if (!(vm.fields[l].name === undefined))
                    arr[l] = vm.fields[l].name;

                else if (!(vm.fields[l].option === undefined))
                    arr[l] = vm.fields[l].option;

                else if (!(vm.fields[l].area === undefined))
                    arr[l] = vm.fields[l].area;

                else if (!(vm.fields[l].date === undefined))
                    arr[l] = vm.fields[l].date;
                else
                    console.log($scope.result = "Invalid Data");
            }
            for (var m = 0; m < arr.length; m++) {
                if (arr[m] == "Multiply" && m == 1)
                    $scope.result = parseFloat(arr[m - 1]) * parseFloat(arr[m + 1]);
                else if (arr[m] == "Add" && m == 1)
                    $scope.result = parseFloat(arr[m - 1]) + parseFloat(arr[m + 1]);
                else if (arr[m] == "Subtract" && m == 1)
                    $scope.result = parseFloat(arr[m - 1]) - parseFloat(arr[m + 1]);
                else if (arr[m] == "Divide" && m == 1)
                    $scope.result = parseFloat(arr[m - 1]) / parseFloat(arr[m + 1]);
                else if (arr[m] == "Divide")
                    $scope.result = $scope.result / parseFloat(arr[m + 1]);
                else if (arr[m] == "Multiply")
                    $scope.result = $scope.result * parseFloat(arr[m + 1]);
                else if (arr[m] == "Add")
                    $scope.result = $scope.result + parseFloat(arr[m + 1]);
                else if (arr[m] == "Subtract")
                    $scope.result = $scope.result - parseFloat(arr[m + 1]);
                else if (arr[m] == "Slice") {
                    var ar = arr[m - 1];
                    var num1 = arr[m + 1];
                    var num2 = arr[m + 2];
                    $scope.result = ar.substr(parseInt(num1), parseInt(num2));

                }
                else if (arr[m] == "Search") {
                    ar = arr[m - 1];
                    num1 = arr[m + 1];
                    ar = ar.split(" ");
                    var t = 0;
                    for (var i = 0; i < ar.length; i++) {
                        if (ar[i].toLowerCase() == num1.toLowerCase()) {
                            t++;
                            break;
                        }
                    }
                    if (t > 0)
                        $scope.result = "Yaay we found a match";
                    else
                        $scope.result = "Oh no! We cant find you";
                }

                else if (arr[m] == "Replace") {
                    ar = arr[m - 1];
                    num1 = arr[m + 1];
                    num2 = arr[m + 2];
                    $scope.result = ar.replace(num1, num2);
                }
                else if (arr[m] == "Join") {
                    ar = arr[m - 1];
                    num1 = arr[m + 1];
                    $scope.result = ar.concat(" ", num1);
                }
                else if (arr[m] == "Days Ago") {
                    var days = parseInt(arr[m - 1]);
                    var date = new Date();
                    var last = new Date(date.getTime() - (days * 24 * 60 * 60 * 1000));
                    var day = last.getDate();
                    var month = last.getMonth() + 1;
                    var year = last.getFullYear();
                    $scope.result = month + "/" + day + "/" + year;
                }

                else if (arr[m] == "Days Ahead") {
                    days = parseInt(arr[m - 1]);
                    date = new Date();
                    last = new Date(date.getTime() + (days * 24 * 60 * 60 * 1000));
                    day = last.getDate();
                    month = last.getMonth() + 1;
                    year = last.getFullYear();
                    $scope.result = month + "/" + day + "/" + year;

                }

                else if (arr[m] == "Who's Greater") {
                    num1 = arr[m-1];
                    num2 = arr[m+1];
                    if(Boolean(num1 > num2))
                        $scope.result = "A is greater than B";
                    else
                        $scope.result = "A is greater than B";

                }

            }
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
                    field = {
                        "label": "Date", "type": "OPTIONS", "options": [
                            {"label": "Days Ago", "value": "Ago", "selected" : false},
                            {"label": "Days Ahead", "value": "Ahead", "selected" : false}
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
                        "label": "Arithmetic", "type": "OPTIONS", "options": [
                            {"label": "Add", "value": "Add", "selected" : false},
                            {"label": "Subtract", "value": "Subtract", "selected" : false},
                            {"label": "Multiply", "value": "Multiply" , "selected" : false},
                            {"label": "Divide", "value": "Divide", "selected" : false}
                        ]
                    };
                    break;

                case "STRING":
                    field = {
                        "label": "String", "type": "OPTIONS", "options": [
                            {"label": "Replace", "value": "Replace"},
                            {"label": "Search", "value": "Search"},
                            {"label": "Join", "value": "Join"},
                            {"label": "Slice", "value": "Slice"}
                        ]
                    };
                    break;

                case "BOOLEAN":
                    field = {
                        "label": "Boolean", "type": "OPTIONS", "options": [
                            {"label": "Logical AND", "value": "Logical AND"},
                            {"label": "Logical OR", "value": "Logical OR"},
                            {"label": "Logical XOR", "value": "Logical XOR"},
                            {"label": "Who's Greater", "value": "Who's Greater"}
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