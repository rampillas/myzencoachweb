var personalization = angular.module("personalizationModule",[]);

personalization.controller("personalizationController",function($scope,$location,$rootScope,reminders,users,stress,
    recomendations){

    /**** REMINIDERS - TASKS *********/
    $scope.allReminders = [];
    $scope.hours = [];
    $scope.minutes = [];
    $scope.frequencies = [];
    $scope.users = [];
    $scope.nextReminders = "";
    $scope.previousReminders = "";

    $scope.title = "";
    $scope.subtitle = "";
    $scope.description = "";
    $scope.date = "";
    $scope.hourId = "";
    $scope.minutesId = "";
    $scope.frequency = "";
    $scope.allUsers = false;
    $scope.userId = "";
    $scope.observationsEnabled = true;

    $scope.getAllReminders = function () {
        reminders.getReminders('user')
            .success(function (r) {
                $scope.allReminders = r.results;
                $scope.nextReminders = r.next;
                $scope.previousReminders = r.previous;
            })
            .error(function (e) {
                console.clear();
            })
    }

    $scope.getAllUsers = function () {
        users.getUsers()
            .success(function (r) {
                $scope.users = r.results;
            })
            .error(function (e) {
                console.clear();
            })
    }

    $scope.splitUser = function (user) {
        if(user != undefined) {
            var param = user.split('/users/');
            if (param.length > 0) {
                user = param[1].replace('/', '');
            }
        }
        return user;
    }
    
    $scope.seeReminder = function (reminder) {
        $scope.currentReminder = reminder;
        var date = new Date($scope.currentReminder.date);
        date = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay();
        $scope.currentReminder.date = date;
        jQuery("#seeReminder").modal("show");
    }
    
    $scope.cleanRemindersValues = function () {
        $scope.title = "";
        $scope.subtitle = "";
        $scope.description = "";
        $scope.date = "";
        $scope.hourId = "";
        $scope.minutesId = "";
        $scope.frequency = "";
        $scope.allUsers = false;
        $scope.userId = "";
        $scope.observationsEnabled = true;
    }

    $scope.saveReminder = function () {
        if($scope.title != "" && $scope.subtitle != "" && $scope.description != ""
            && $scope.date != "" && $scope.hourId != "" && $scope.minutesId != ""
            && $scope.frequency != "")
        {
            var username = "";
            var type = "all"
            if(!$scope.allUsers){
                username = $scope.userId;
                type = "individual";
            }

            var date = $scope.date.getFullYear() + '-' + $scope.date.getMonth() + '-' + $scope.date.getDay();

            reminders.registerReminder({
                type: type,
                user: username,
                title: $scope.title,
                subtitle: $scope.subtitle,
                description: $scope.description,
                is_personal: false,
                date: date,
                time: $scope.hourId + ":" + $scope.minutesId,
                is_observations_enabled: $scope.observationsEnabled,
                frequency: $scope.frequency
            })
                .success(function (r) {
                    $scope.cleanRemindersValues();
                    $scope.getAllReminders();
                    $('#newReminder').hide();
                    $('.modal-backdrop').hide();
                })
                .error(function (e) {
                    console.clear();
                })
        }
        else
            alert("Todos los campos son obligatorios");
    }

    $scope.deleteReminder = function (reminder) {
        reminders.removeReminder({
            username: $scope.splitUser(reminder.user),
            title: reminder.title
        })
            .success(function (r) {
                $scope.getAllReminders();
            })
            .error(function (e) {
                console.clear();
            })
    }

    $scope.nextPageReminders = function () {
        reminders.nextOrPreviousReminders($scope.nextReminders)
            .success(function (r) {
                $scope.allReminders = r.results;
                $scope.nextReminders = r.next;
                $scope.previousReminders = r.previous;
            })
            .error(function (e) {
                console.clear();
            })
    }

    $scope.previousPageReminders = function () {
        reminders.nextOrPreviousReminders($scope.previousReminders)
            .success(function (r) {
                $scope.allReminders = r.results;
                $scope.nextReminders = r.next;
                $scope.previousReminders = r.previous;
            })
            .error(function (e) {
                console.clear();
            })
    }

    /**** STRESS DETECTION *********/
    $scope.questions = [];
    $scope.colors = [];
    $scope.answers = [];

    $scope.descriptionAnswer = "";
    $scope.colorId = "";
    $scope.popupMessage = "";
    $scope.descriptionQuestion = "";

    $scope.nextStress = "";
    $scope.previousStress = "";

    $scope.getAllQuestions = function () {
        stress.getQuestions()
            .success(function (r) {
                $scope.questions = r.results;
                $scope.nextStress = r.next;
                $scope.previousStress = r.previous;
            })
            .error(function (e) {
                console.clear();
            })
    }

    $scope.seeQuestion = function (question) {
        $scope.currentQuestion = question;
        jQuery("#seeQuestion").modal("show");
    }

    $scope.clearAnswers = function () {
        $scope.descriptionAnswer = "";
        $scope.colorId = "";
        $scope.popupMessage = "";
    }

    $scope.addAnwser = function () {
        if($scope.descriptionAnswer != "" && $scope.colorId != "" && $scope.popupMessage != ""){
            $scope.answers.push({
                description: $scope.descriptionAnswer,
                color: $scope.colorId,
                popup_message: $scope.popupMessage
            });
            $scope.clearAnswers();
        }
        else
            alert("Todos los campos para la respuesta son obligatorios");
    }
    
    $scope.saveQuestion = function () {
        if($scope.descriptionQuestion != "" && $scope.answers.length > 0){
            stress.registerQuestion({
                    description: $scope.descriptionQuestion,
                    possible_answers: $scope.answers.length,
                    is_personal_question: false,
                    answers: $scope.answers
                })
                .success(function (r) {
                    $scope.clearAnswers();
                    $scope.descriptionQuestion = "";
                    $scope.answers = [];
                    $scope.getAllQuestions();
                    $('#newQuestion').hide();
                    $('.modal-backdrop').hide();
                })
                .error(function (e) {
                    console.clear();
                })
        }
        else
            alert("Todos los campos son obligatorios");
    }

    $scope.deleteQuestion = function (question) {
        stress.removeQuestion({
            description: question.description
        })
            .success(function (r) {
                $scope.getAllQuestions();
            })
            .error(function (e) {
                console.clear();
            })
    }

    $scope.nextPageStress = function () {
        stress.nextOrPreviousQuestions($scope.nextStress)
            .success(function (r) {
                $scope.questions = r.results;
                $scope.nextStress = r.next;
                $scope.previousStress = r.previous;
            })
            .error(function (e) {
                console.clear();
            })
    }

    $scope.previousPageStress = function () {
        stress.nextOrPreviousQuestions($scope.previousStress)
            .success(function (r) {
                $scope.questions = r.results;
                $scope.nextStress = r.next;
                $scope.previousStress = r.previous;
            })
            .error(function (e) {
                console.clear();
            })
    }

    /**** RECOMENDATIONS *********/
    $scope.recomendationsArray = [];
    $scope.descriptionRecomendation = "";

    $scope.nextRecomendations = "";
    $scope.previousRecomendations = "";

    $scope.getAllRecomendations = function () {
        recomendations.getRecomendations('user')
            .success(function (r) {
                $scope.recomendationsArray = r.results;
                $scope.nextRecomendations = r.next;
                $scope.previousRecomendations = r.previous;
            })
            .error(function (e) {
                console.clear();
            })
    }

    $scope.cutDescription = function (description) {
        return description.substring(0,50);
    }

    $scope.seeRecomendation = function (recomendation) {
        $scope.currentRecomendation = recomendation;
        jQuery("#seeRecomendation").modal("show");
    }
    
    $scope.saveRecomendation = function () {
        if($scope.descriptionRecomendation != ""){
            recomendations.registerRecomendation({
                description: $scope.descriptionRecomendation
            })
                .success(function (r) {
                    $scope.descriptionRecomendation = "";
                    $scope.getAllRecomendations();
                    $('#newRecomendation').hide();
                    $('.modal-backdrop').hide();
                })
                .error(function (e) {
                    console.clear();
                })
        }
        else
            alert("Escriba la recomendación");
    }

    $scope.deleteRecomendation = function (recomendation) {
        recomendations.removeRecomendation({
            description: recomendation.description
        })
            .success(function (r) {
                $scope.getAllRecomendations();
            })
            .error(function (e) {
                console.clear();
            })
    }

    $scope.nextPageRecomendations = function () {
        recomendations.nextOrPreviousRecomendations($scope.nextRecomendations)
            .success(function (r) {
                $scope.recomendationsArray = r.results;
                $scope.nextRecomendations = r.next;
                $scope.previousRecomendations = r.previous;
            })
            .error(function (e) {
                console.clear();
            })
    }

    $scope.previousPageRecomendations = function () {
        recomendations.nextOrPreviousRecomendations($scope.previousRecomendations)
            .success(function (r) {
                $scope.recomendationsArray = r.results;
                $scope.nextRecomendations = r.next;
                $scope.previousRecomendations = r.previous;
            })
            .error(function (e) {
                console.clear();
            })
    }

    function initialize() {
        //hours
        for(var i=1;i<=24;i++){
            $scope.hours.push({value:i,name:i});
        }

        //minutes
        for(var i=1;i<=60;i++){
            $scope.minutes.push({value:i,name:i});
        }

        //frecuencies
        $scope.frequencies.push({value:"everyday",name:"Todos los dias"});
        $scope.frequencies.push({value:"weekend",name:"Fines de semana"});

        //colors
        $scope.colors.push({value:"azul",name:"azul"});
        $scope.colors.push({value:"amarillo",name:"amarillo"});
        $scope.colors.push({value:"naranja",name:"naranja"});
        $scope.colors.push({value:"rojo",name:"rojo"});
    }

    $rootScope.verifyLogin();
    $scope.getAllReminders();
    $scope.getAllUsers();

    $scope.getAllQuestions();

    $scope.getAllRecomendations();

    initialize();
});