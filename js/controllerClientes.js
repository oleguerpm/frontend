var Clientscontroller = angular.module("myApp_clients", ['ajoslin.promise-tracker','ngRoute', 'ui.bootstrap']);

var API="http://147.83.113.109:8080/jersey-quickstart-webapp/beflow/myresource";



Clientscontroller.controller('clientscontroller',function($scope, $http)
{

    $scope.usersFound = false;




    $http.get(API+"/getAllCompanies")
        .success(function (data) {

            $scope.companies = data;
            $scope.loaded = true;
            $scope.namecompany=$scope.companies.company_name;
        })
        .error(function () {
            $scope.companyNotFound = true;
            $scope.hihaerror = "aqui no s'ha trobat res";
        });

    $scope.getAdmins = function (namecompany) {
        $http.get(API + "/getUsersFromCompany/" + namecompany)
            .success(function (data) {

                $scope.admins = data;
                $scope.usersFound = data.length>0;



            })
            .error(function () {
                $scope.usersFound = false;

            });
    }

    $scope.editCompany = function () {


        $scope.proba="Aixo es edit";

    }




    $scope.deleteCompany = function(name){
        $http.delete(API+"/delCompany/"+name)
            .success(function(response, status, headers, config){
                $scope.missatge="S'ha esborrat be";
                $route.reload();
            })
            .error(function(response, status, headers, config){
                $scope.missatge="No s'ha borrat be";
            });
    }


});


Clientscontroller.controller('help', function ($scope, $http, $log, promiseTracker, $timeout, $route) {

    // Form submit handler.
    $scope.submit = function(form) {
        // Trigger validation flag.
        $scope.submitted = true;
        $scope.itsok=false;


        // If form is invalid, return and let AngularJS show validation errors.
        if (form.$invalid) {
            return;
        }

        $scope.clear = function () {
            $scope.company_in="";
            $scope.adress_in="";
            $scope.leader_in="";
            $scope.itsok=false;
        }
        // Default values for the request.
        var config = {

            'company_name' : $scope.company_in,
            'address' : $scope.adress_in,
            'leader' : $scope.leader_in
        };

        // Perform JSONP request.
        var $promise = $http.post(API+"/addCompany", config)
            .success(function(data, status, headers, config) {

                $route.reload();
                $scope.submitted = true;
                $scope.itsok=true;

            }
        )
            .error(function(data, status, headers, config) {
                $scope.progress = data;
                $scope.messages = 'There was a network error. Try again later.';
                $log.error(data);
            })
    };



});




Clientscontroller.controller('helpadmin', function ($scope, $http, $log, promiseTracker, $timeout, $route) {

    $http.get(API+"/getAllCompanies")
        .success(function (data) {

            $scope.companiesname = data;
            $scope.loaded = true;
        })
        .error(function () {
            $scope.companyNotFound = true;
            $scope.hihaerror = "aqui no s'ha trobat res";
        });

// Form submit handler.
    $scope.submit = function(form) {
        // Trigger validation flag.
        $scope.submitted = true;
        $scope.itsok = false;

        // If form is invalid, return and let AngularJS show validation errors.
        if (form.$invalid) {
            return;
        }

        // Default values for the request.
        var config = {

            'login' : $scope.email,
            'password' : $scope.password,
            'role' : '2',
            'name' : $scope.name,
            'phone' : $scope.phone,
            'department' : $scope.department,
            'name_company' : $scope.compname.company_name

        };

        $scope.clear = function () {
            $scope.email="";
            $scope.password="";
            $scope.name="";
            $scope.phone="";
            $scope.department="";
            $scope.itsok = false;

        }

        // Perform JSONP request.
        var $promise = $http.post(API+"/addUser", config)
            .success(function(data, status, headers, config) {

                $route.reload();
                $scope.submitted = true;
                $scope.itsok = true;


            }
        )
            .error(function(data, status, headers, config) {
                $scope.progress = data;
                $scope.messages = 'There was a network error. Try again later.';
                $log.error(data);
            })



    };
});




