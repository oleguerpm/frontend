var Clientscontroller = angular.module("myApp_home", ['ngRoute']);

var API="http://147.83.113.109:8080/jersey-quickstart-webapp/beflow/myresource";



Clientscontroller.controller('homecontroller',function($scope, $http)
{

    $scope.companiesFound = false;





    $http.get(API+"/getAllCompanies")
        .success(function (data) {

            $scope.companies = data;
            $scope.loaded = true;
            $scope.companiesFound = data.length>0;

        })
        .error(function () {
            $scope.companyNotFound = true;
            $scope.hihaerror = "aqui no s'ha trobat res";
        });



    $scope.editCompany = function () {


        $scope.proba="Aixo es edit";

    }





});


