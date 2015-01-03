var Clientscontroller = angular.module("myApp_nodes", ['ajoslin.promise-tracker','ngRoute', 'ui.bootstrap']);

var API="http://147.83.113.109:8080/jersey-quickstart-webapp/beflow/myresource";



Clientscontroller.controller('nodescontroller',function($scope, $http)
{

    $scope.nodesFound = false;




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

    $scope.getNodes = function (namecompany) {
        $http.get(API + "/getNodesFromCompany/" + namecompany)
            .success(function (data) {

                $scope.nodes = data;
                $scope.nodesFound = data.length>0;



            })
            .error(function () {
                $scope.nodesFound = false;

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



Clientscontroller.controller('helpnode', function ($scope, $http, $log, promiseTracker, $timeout, $route) {

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

            'MAC_address' : $scope.MAC_address,
            'node_name' : $scope.node_name,
            'port_number' : $scope.port_number,
            'name_company' : $scope.compname.company_name

        };


        // Perform JSONP request.
        var $promise = $http.post(API+"/addNode", config)
            .success(function(data, status, headers, config) {

                $route.reload();
                $scope.submitted = true;
                $scope.itsok = true;
                $scope.MAC_address="";
                $scope.node_name="";
                $scope.port_number="";
                $scope.name_company="";



            }
        )
            .error(function(data, status, headers, config) {
                $scope.progress = data;
                $scope.messages = 'There was a network error. Try again later.';
                $log.error(data);
            })



    };
});




