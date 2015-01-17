var Clientscontroller = angular.module("myApp_login", ['ajoslin.promise-tracker','ngRoute', 'ui.bootstrap']);

var API="http://147.83.113.109:8080/jersey-quickstart-webapp/beflow/myresource";






Clientscontroller.controller('logincontroller', function ($scope, $http, $log, promiseTracker, $timeout, $route, $window) {
    var headers = {'Content-Type': 'application/json; charset=utf-8'}
    $scope.errormiserr="";
    $scope.errormispass="";
    $scope.errorok="";

// Form submit handler.
    $scope.submit = function(form) {
        // Trigger validation flag.
        $scope.errormispass="";
        $scope.errormiserr="";
        $scope.errorok="";
        $scope.submitted = true;
        $scope.itsok = false;

        // If form is invalid, return and let AngularJS show validation errors.
        if (form.$invalid) {
            return;
        }

        // Default values for the request.
        var config = {

            'login' : $scope.email,
            'pass' : $scope.password


        };



        // Perform JSONP request.
        var $promise = $http.post(API+"/login", config)
            .success(function(data, status, headers, config, HttpPromise, response) {

                $scope.url="";
                $scope.submitted = true;
                $scope.itsok = true;
                if (data == 600){$scope.errormiserr="The combination is not correct"; $scope.password=""; $scope.email="";}
                else if (data == 400){$scope.errormispass="The combination is not correct"; $scope.password=""; $scope.email="";}
                else {$scope.errorok="Well done"; $scope.url="home.html"}



            }
        )

            .error(function(data, status, headers, config, response) {
                $scope.progress = data;
                $scope.itsok=false;
                $scope.messages = 'There was a network error. Try again later.';
                                $log.error(data);



            })



    };




});






