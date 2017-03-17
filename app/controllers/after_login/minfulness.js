var minfulness = angular.module("minfulnessModule",[]);

essential.controller("minfulnessController",function($scope,$location,$rootScope,plans){

    $scope.plansData = [];

    $scope.plans = [];
    $scope.description = "";
    $scope.date = "";

    $scope.selectedWeek = "";
    $scope.descriptionExercise = "";
    $scope.urlAudio = "";
    $scope.instructions = "";
    $scope.questions = [];
    $scope.weeks = [];

    $scope.numberWeeks = [];

    $scope.getPlans = function () {
        plans.getPlans()
            .success(function (r) {
                $scope.plansData = r.results;
            })
            .error(function (e) {
                console.clear();
            })
    }

    $scope.clean = function () {
        $scope.selectedWeek = "";
        $scope.descriptionExercise = "";
        $scope.urlAudio = "";
        $scope.instructions = "";
        $scope.questions = [];
        $scope.question = "";
    }

    $scope.addQuestion = function () {
        if($scope.question != undefined && $scope.question != ""){
            $scope.questions.push({question: $scope.question});
            $scope.question = "";
        }
        else
            alert("Debes ingresar la pregunta");
    }
    
    $scope.addExercise = function () {
        if($scope.selectedWeek != "" && $scope.descriptionExercise != "" && $scope.urlAudio != ""
            && $scope.instructions != "" && $scope.questions.length > 0)
        {
            $scope.weeks.push({
                week: $scope.selectedWeek,
                description: $scope.descriptionExercise,
                audio_url: $scope.urlAudio,
                instructions: $scope.instructions,
                questions: $scope.questions
            });
            $scope.clean();
        }
        else
            alert("Todos los campos son requeridos");
    }
    
    $scope.activePlan = function () {
        if($scope.description != "" && $scope.date != "" && $scope.weeks.length > 0)
        {
            var date = $scope.date.getFullYear() + '-' + $scope.date.getMonth() + '-' + $scope.date.getDay();
            var data = {
                date: date,
                description: $scope.description,
                exercises: $scope.weeks
            }
            plans.registerPlan(data)
                .success(function (r) {
                    $scope.getPlans();
                    $('#newPlan').hide();
                    $('.modal-backdrop').hide();
                    $scope.description = "";
                    $scope.date = "";
                    $scope.weeks = [];
                    $scope.clean();
                })
                .error(function (e) {
                    console.clear();
                })
        }
        else
            alert("Debes registrar al menos un ejercicio para el plan");
    }

    /**SEE DETAIL'S PLAN*/
    $scope.seePlan = function (plan) {
        $scope.currentPlan = plan;

        var date = new Date($scope.currentPlan.date);
        date = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay();

        $scope.currentPlan.date = date;

        jQuery("#seePlan").modal("show");
    }

    /*DELETE PLAN*/
    $scope.deletePlan = function (description) {
        plans.removePlan({
            description: description
        })
            .success(function (r) {
                $scope.getPlans();
            })
            .error(function (e) {
                console.clear();
                alert("Hubo un error inesperado, intenta nuevamente");
            })
    }

    function initialize(){
        //Populate numberWeeks
        for(var i=1;i<9;i++){
            $scope.numberWeeks.push({value:i,name:i});
        }

    }

    initialize();
    $scope.getPlans();
    $rootScope.verifyLogin();

});