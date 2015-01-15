var Clientscontroller = angular.module("myApp_home", ['ngRoute', 'ngSanitize', 'ajoslin.promise-tracker', 'ui.bootstrap']);

var API="http://147.83.113.109:8080/jersey-quickstart-webapp/beflow/myresource";

/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */
/*/////////////////////////////////////////////////HOME///////////////////////////////////////////////////////////// */
/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

Clientscontroller.controller('homecontroller',function($scope, $http, $sce)
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
/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */
/*/////////////////////////////////////////////////PRINTAR TOPOLOGIA//////////////////////////////////////////////// */
/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

Clientscontroller.controller('topocontroller',function($scope, $http, $sce) //he llamado al controlador "topocontroller" por ejemplo
{
    $http.get(API + "getTopologyController")
        .success(function (data) {

            $scope.topo = data;                //El json de la topolojia se carga en data, i en esta linea se copia a topo
                                               //Ahora "topo" es accesible des de la pantalla principal
                                               //No se como es el script pero le tienes que enchufar "topo"

        })
        .error(function () {                    //esto de aqui solo se ejecuta si al hacer el get te devuelve un 400
            $scope.companyNotFound = true;
            $scope.thereiserror = "aqui no hay nada"; //si a home.html pussieses {{thereiserror}} si hubiese error angular
        });                                           //mostria "aqui no hay nada" en el browser

});






/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */
/*/////////////////////////////////////////////////CLIENTS////////////////////////////////////////////////////////// */
/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */


Clientscontroller.controller('clientscontroller',function($scope, $http, $window)
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

    $scope.editCompany = function (namecompany) {


        $http.get(API+"/getCompany/"+ namecompany)
            .success(function (data) {

                $scope.companyia = data;



            })
            .error(function () {

                $scope.hihaerror = "aqui no s'ha trobat res";
            });




    }




    $scope.deleteCompany = function(name){
        $http.delete(API+"/delCompany/"+name)
            .success(function(response, status, headers, config){
                $window.location.reload();
                $scope.missatge="S'ha esborrat be";

            })
            .error(function(response, status, headers, config){
                $scope.missatge="No s'ha borrat be";
            });
    }


    $scope.editUser = function () {


        $scope.proba="Aixo es edit";

    }




    $scope.deleteUser = function(name){
        $http.delete(API+"/delUser/"+name)
            .success(function(response, status, headers, config){
                $window.location.reload();
                $scope.missatge="S'ha esborrat be";

            })
            .error(function(response, status, headers, config){
                $scope.missatge="No s'ha borrat be";
            });
    }


});


Clientscontroller.controller('help', function ($scope, $http, $log, promiseTracker, $timeout, $route, $window) {
    var headers = {'Content-Type': 'application/json; charset=utf-8'}
    $scope.notok = false;
    // Form submit handler.
    $scope.submit = function(form) {
        // Trigger validation flag.
        $scope.submitted = true;
        $scope.itsok=false;
        $route.reload();


        // If form is invalid, return and let AngularJS show validation errors.
        if (form.$invalid) {
            return;
        }

        $scope.clear = function () {

        }
        // Default values for the request.
        var config = {

            'company_name' : $scope.company_in,
            'address' : $scope.address_in,
            'leader' : $scope.leader_in
        };

        // Perform JSONP request.
        var $promise = $http.post(API+"/addCompany", config)
            .success(function(data, status, headers, config) {

                $window.location.reload();
                $scope.submitted = true;
                $scope.itsok=true;
                $scope.company_in="";
                $scope.address_in="";
                $scope.leader_in="";




            }
        )
            .error(function(data, status, headers, config) {
                $scope.progress = data;
                $scope.itsok=true
                $scope.messages = 'There was an error. Try again later.';
                $log.error(data);
            })
    };



});




Clientscontroller.controller('helpadmin', function ($scope, $http, $log, promiseTracker, $timeout, $route, $window) {
    var headers = {'Content-Type': 'application/json; charset=utf-8'}

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

                $window.location.reload();
                $scope.submitted = true;
                $scope.itsok = true;


            }
        )
            .error(function(data, status, headers, config) {
                $scope.progress = data;
                $scope.itsok=false;
                $scope.messages = 'There was a network error. Try again later.';
                $log.error(data);
            })



    };
});

/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */
/*/////////////////////////////////////////////////FLOWS//////////////////////////////////////////////////////////// */
/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */


Clientscontroller.controller('flowscontroller',function($scope, $http, $window)
{

    $scope.nodesFound = false;




    $http.get(API+"/getAllFlows")
        .success(function (data) {

            $scope.flows = data;
            $scope.loaded = true;

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
    var headers = {'Content-Type': 'application/json'}
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

/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */
/*/////////////////////////////////////////////////NODES//////////////////////////////////////////////////////////// */
/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */


Clientscontroller.controller('nodescontroller',function($scope, $http, $window)
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
    var headers = {'Content-Type': 'application/json'};
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
                $window.location.reload();
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


/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */
/*/////////////////////////////////////////////////STATISTICS/////////////////////////////////////////////////////// */
/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */


Clientscontroller.controller('statisticscontroller',function($scope, $http, $window) {

});

Clientscontroller.controller('helpstatistics', function ($scope, $http, $log, promiseTracker, $timeout, $route, $window) {

    $scope.nodeslo={"nodes":[{"id":"00:01:d4:ca:6d:b5:f4:0f","name":"Aixo es 1"},{"id":"00:01:d4:ca:6d:d4:4f:6b","name":""},{"id":"00:01:d4:ca:6d:c4:44:1e","name":""}]};
    $scope.parse=$scope.nodeslo.nodes;
    $scope.infomicro={"listWsObjectStats":[{"mac":"00:01:d4:ca:6d:b5:f4:0f","listPorts":[{"portId":"1","receivePackets":0,"transmitPackets":2},{"portId":"2","receivePackets":2190,"transmitPackets":203},{"portId":"3","receivePackets":2192,"transmitPackets":204},{"portId":"4","receivePackets":6606,"transmitPackets":37638}]},{"mac":"00:01:d4:ca:6d:d4:4f:6b","listPorts":[{"portId":"1","receivePackets":0,"transmitPackets":2},{"portId":"2","receivePackets":2190,"transmitPackets":203},{"portId":"3","receivePackets":2192,"transmitPackets":204},{"portId":"4","receivePackets":6606,"transmitPackets":37638}]},{"mac":"00:01:d4:ca:6d:c4:44:1e","listPorts":[{"portId":"1","receivePackets":0,"transmitPackets":2},{"portId":"2","receivePackets":2190,"transmitPackets":203},{"portId":"3","receivePackets":2192,"transmitPackets":204},{"portId":"4","receivePackets":6606,"transmitPackets":37638}]}]}

    $scope.ports = [
        {
            port: '1'

        },
        {
            port: '2'

        },
        {
            port: '3'

        },
        {
            port: '4'

        }
    ];

    $scope.intervalo = [
        {
            acr: 'w',
            name: 'weeks'
        },
        {
            acr: 'd',
            name: 'days'
        },
        {
            acr: 'h',
            name: 'hours'
        }
    ];


// Form submit handler.
    $scope.submit = function(form, port, MAC) {
        // Trigger validation flag.
        $scope.submitted = true;
        $scope.itsok = false;

        // If form is invalid, return and let AngularJS show validation errors.
        if (form.$invalid) {
            return;
        }

        $http.get(API + "/getGraphPortJSON/" + $scope.time+$scope.range.acr+"_"+$scope.MAC_address+"_"+$scope.port_in.port)
            .success(function (data) {

                $scope.rawgraph = data;
                if (data.length == 0){$scope.nographfound="There is no graph for MAC: "+$scope.MAC_address+" and port: "+$scope.port_in.port;}

            })
            .error(function () {


            });
    }

});
