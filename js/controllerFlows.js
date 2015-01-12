var Clientscontroller = angular.module("myApp_flows", ['ajoslin.promise-tracker','ngRoute', 'ui.bootstrap']);

var API="http://147.83.113.109:8080/jersey-quickstart-webapp/beflow/myresource";



Clientscontroller.controller('flowscontroller',function($scope, $http, $window)
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

    $scope.editNode = function () {


        $scope.proba="Aixo es edit";

    }




    $scope.deleteNode = function(name){
        $http.delete(API+"/delNode/"+name)
            .success(function(response, status, headers, config){
                $scope.missatge="S'ha esborrat be";
                $window.location.reload();
            })
            .error(function(response, status, headers, config){
                $scope.missatge="No s'ha borrat be";
            });
    }


});



Clientscontroller.controller('helpnode', function ($scope, $http, $log, promiseTracker, $timeout, $route, $window) {

    $scope.protos = [
        {
            proto: 'BCN'
        },
        {
            proto: 'UDP'
        },
        {
            proto: 'TCP'
        }
    ];

    $scope.booleans = [
        {
            boolean: 'true'
        },
        {
            boolean: 'false'
        }
    ];

    $scope.actions = [

        'DROP',
        'DISCART',
        'EXAMPLE'

    ];

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

            'name' : $scope.flow_name,
            'ingressPort' : $scope.port_number,
            'priority' : $scope.priority,
            'node' : {
                'id' : $scope.MAC_address,
                'type' : 'OF'
            },
            'hardTimeout' : $scope.hardtimer,
            'idleTimeout' : $scope.idletimer,
            'etherType' : $scope.ethtype,
            'vlanId' : $scope.vlan_number,
            'vlanPriority' : $scope.vlan_numberpriority,
            'nwSrc' : $scope.ipSource,
            'nwDst' : $scope.ipDestiny,
            'protocol' : $scope.proto_in.proto,
            'installHw' : $scope.installH_in.boolean,
            'actions' : [$scope.action_in]

        };


        // Perform JSONP request.
        var $promise = $http.post(API+"/addFlow", config)
            .success(function(data, status, headers, config) {
                $window.location.reload();
                $scope.submitted = true;
                $scope.itsok = true;
                $scope.flow_name ="";
                $scope.port_number="";
                $scope.priority="";
                $scope.MAC_address="";
                $scope.hardtimer="";
                $scope.idletimer="";
                $scope.ethtype="";
                $scope.vlan_number="";
                $scope.vlan_numberpriority="";
                $scope.ipSource="";
                $scope.ipDestiny="";
                $scope.proto_in="";
                $scope.installH_in="";
                $scope.action_in="";



            }
        )
            .error(function(data, status, headers, config) {
                $scope.progress = data;
                $scope.messages = 'There was a network error. Try again later.';
                $log.error(data);
            })



    };
});




