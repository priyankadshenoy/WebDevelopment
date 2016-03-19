(function(){
    "use strict";
    angular.module("FormBuilderApp")
        .controller("FormController",FormController);

    function FormController(FormService,$rootScope,$location){

        var vm=this;
        vm.currentUser=$rootScope.currentUser;
        vm.message=null;
        vm.addForm=addForm;
        vm.updateForm=updateForm;
        vm.deleteForm=deleteForm;
        vm.selectForm=selectForm;

        function init(){

            if(vm.currentUser == null){
                $location.url("/home");
            }
            else{
                FormService.findAllFormsForUser(vm.currentUser._id)
                    .then(function(response){
                        if(response.data) {
                            vm.forms=response.data;
                        }
                    });
            }
        }
        init();

        function addForm(formName){
            var userId=vm.currentUser._id;
            var newForm={"title":formName};
            if(formName!=null){
                FormService.addForm(newForm,userId)
                    .then(function(response){
                        vm.forms=response.data;
                        vm.formIndexSelected=null;
                        vm.formName=null;
                    })
            }
            else{
                vm.message="Enter form name please";
            }
        }

        function updateForm(form){
            if (form!= null) {
                var formToBeUpdatedId= vm.forms[vm.formIndexSelected]._id;
                var changedForm ={"title" : form, "userId" : vm.currentUser._id ,
                    "_id": formToBeUpdatedId};
                FormService.updateForm(formToBeUpdatedId,changedForm)
                    .then(finalList)
            }
        }

        function finalList(response){
            FormService.findAllFormsForUser(vm.currentUser._id)
                .then(function(response){
                    if(response.data) {
                        vm.forms=response.data;
                        vm.formIndexSelected=null;
                        vm.formName=null;
                    }
                });
        }

        function selectForm(index){
            vm.formIndexSelected = index;
            vm.formName = vm.forms[index].title;
        }

        function deleteForm(index){
            var userId=vm.currentUser._id;
            vm.formIndexSelected = index;
            var formToDelete=vm.forms[index]._id;
            FormService.deleteForm(formToDelete,userId)
                .then(function(response){
                    vm.forms=response.data;
                    vm.formIndexSelected=null;
                    vm.formName=null;
                })
        }

    }

})();