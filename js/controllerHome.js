var Clientscontroller = angular.module("myApp_home", ['ngRoute', 'ngSanitize', 'ajoslin.promise-tracker', 'ui.bootstrap']);

var API="http://147.83.113.109:8080/jersey-quickstart-webapp/beflow/myresource";

/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */
/*/////////////////////////////////////////////////HOME///////////////////////////////////////////////////////////// */
/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

Clientscontroller.controller('homecontroller',function($scope, $http, $sce)
{


    $scope.companiesFound = false;

    $http.get(API+"/getAllCompanies")                   //Muestra las compañias al lado izquierdo de pantalla
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


    $http.get(API+"/getAllCompanies")                           //muestra todas compañias
        .success(function (data) {

            $scope.companies = data;
            $scope.loaded = true;
            $scope.namecompany=$scope.companies.company_name;
        })
        .error(function () {
            $scope.companyNotFound = true;
            $scope.hihaerror = "aqui no s'ha trobat res";
        });

    $scope.getAdmins = function (namecompany) {             //Muestra todos los admins dado una compañia
        $http.get(API + "/getUsersFromCompany/" + namecompany)
            .success(function (data) {

                $scope.admins = data;
                $scope.usersFound = data.length>0;



            })
            .error(function () {
                $scope.usersFound = false;

            });
    }

    $scope.editCompany = function (namecompany) {           //Funcion no funcional


        $http.get(API+"/getCompany/"+ namecompany)
            .success(function (data) {

                $scope.companyia = data;



            })
            .error(function () {

                $scope.hihaerror = "aqui no s'ha trobat res";
            });

    }


    $scope.deleteCompany = function(name){                              //Borrar compañia
        $http.delete(API+"/delCompany/"+name)
            .success(function(response, status, headers, config){
                $window.location.reload();
                $scope.missatge="S'ha esborrat be";

            })
            .error(function(response, status, headers, config){
                $scope.missatge="No s'ha borrat be";
            });
    }


    $scope.editUser = function () {                                     //Editar usuario no funcional


        $scope.proba="Aixo es edit";

    }




    $scope.deleteUser = function(name){                                 //Borrar Usuario
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


    $scope.submit = function(form) {
        // Trigger validation flag.
        $scope.submitted = true;
        $scope.itsok = false;


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
/*/////////////////////////////////////////////////SWITCH/////////////////////////////////////////////////////////// */
/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */


Clientscontroller.controller('switchcontroller',function($scope, $http, $window)
{

    $scope.switchFound = false;

    $http.get(API+"/getNodesController")
        .success(function (data) {

            $scope.nodeslo = data;
            $scope.nodesloaded = $scope.nodeslo.nodes;
            $scope.loadedloaded = true;

        })
        .error(function () {
            $scope.nodesNotFound = true;
            $scope.hihaerror = "aqui no s'ha trobat res";
        });

    $scope.showPorts = function (mac) {
        $http.get(API + "/getPortsByMac/" + mac)
            .success(function (data) {
                $scope.portsloaded = data;
                $scope.ports=$scope.portsloaded.listPorts;


            })
            .error(function () {
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

    $http.get(API + "/getNodesController")
        .success(function (data) {

            $scope.nodeslo = data;
            $scope.nodesloaded=$scope.nodeslo.nodes;


        })
        .error(function () {

        });

    $scope.showPorts = function (mac) {
        $http.get(API + "/getPortsByMac/" + mac)
            .success(function (data) {
                $scope.portsloaded = data;
                $scope.ports=$scope.portsloaded.listPorts;


            })
            .error(function () {
            });
    }


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

            'MAC_address' : $scope.MAC_address.id,
            'node_name' : $scope.node_name,
            'port_number' : $scope.port_in,
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
/*/////////////////////////////////////////////////FLOWS//////////////////////////////////////////////////////////// */
/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */


Clientscontroller.controller('flowscontroller',function($scope, $http, $window)
{

    $scope.nodesFound = false;


    $http.get(API+"/getFlows")
        .success(function (data) {

            $scope.flowslo = data;
            $scope.flowsloaded=$scope.flowslo.flowConfig;
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




    $scope.deleteFlow = function(name,mac){
        $http.get(API+"/delFlow/"+name+"/"+mac)
            .success(function(response, status, headers, config){
                $scope.missatge="S'ha esborrat be";
                $window.location.reload();
            })
            .error(function(response, status, headers, config){
                $scope.missatge="No s'ha borrat be";
            });
    }


});



Clientscontroller.controller('helpflow', function ($scope, $http, $log, promiseTracker, $timeout, $route, $window) {

    $scope.protos = [
        {
            proto: 'UDP'
        },
        {
            proto: 'TCP'
        }
    ];


    $scope.actions = [

        {
            action: 'Controller',
            bool: 'false'
        },
        {
            action: 'Drop',
            bool: 'false'
        },
        {
            action: 'HwPath',
            bool: 'false'
        },
        {
            action: 'Output',
            bool: 'true'
        },
        {
            action: 'SetVlanId',
            bool: 'false'
        },
        {
            action: 'SwPath',
            bool: 'false'
        }


    ];

    $scope.portsout = [
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

    $http.get(API + "/getNodesController")//esto se encarga rafael i lo hara en su sistema, de momento lo dejo por si acaso
        .success(function (data) {

            $scope.nodeslo = data;
            $scope.nodesloaded=$scope.nodeslo.nodes;


        })
        .error(function () {

        });


    $scope.showPorts = function (mac) {
        $http.get(API + "/getPortsByMac2/" + mac)
            .success(function (data) {
                $scope.portsloaded = data;
                $scope.ports=$scope.portsloaded.listPorts;


            })
            .error(function () {


            });
    }



// Form submit handler.
    var headers = {'Content-Type': 'application/json'}
    $scope.submit = function(form) {
        // Trigger validation flag.
        $scope.submitted = true;
        $scope.itsok = false;
        if($scope.action == "Output"){$scope.action = "Output="+$scope.port_outin.id}

        // If form is invalid, return and let AngularJS show validation errors.
        if (form.$invalid) {
            return;
        }

        // Default values for the request.
        var config = {

            'name' : $scope.flow_name,
            'ingressPort' : $scope.port_in.id,
            'priority' : $scope.priority,
            'node' : {
                'id' : $scope.MAC_address.id,
                'type' : 'OF'
            },
            'hardTimeout' : $scope.hardtimer,
            'idleTimeout' : $scope.idletimer,
            'etherType' : '',
            'vlanId' : $scope.vlan_number,
            'vlanPriority' : $scope.vlan_numberpriority,
            'nwSrc' : $scope.ipSource,
            'nwDst' : $scope.ipDestiny,
            'protocol' : $scope.proto_in.proto,
            'installHw' : 'true',
            'actions' : [$scope.action_in]

        };


        // Perform JSONP request.
        var $promise = $http.post(API+"/addFlow", config)
            .success(function(data, status, headers, config) {
                //$window.location.reload();
                $scope.submitted = true;
                $scope.itsok = true;
                $scope.flow_name ="";
                $scope.port_number="";
                $scope.priority="";
                $scope.MAC_address="";
                $scope.hardtimer="";
                $scope.idletimer="";
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

    $http.get(API + "/getNodesController")
        .success(function (data) {

            $scope.nodeslo = data;
            $scope.nodesloaded=$scope.nodeslo.nodes;


        })
        .error(function () {

        });

$scope.showPorts = function (mac) {
    $http.get(API + "/getPortsByMac/" + mac)
        .success(function (data) {
            $scope.portsloadednodes = data;
            $scope.portsbymacnodes=$scope.portsloadednodes.listPorts;


        })
        .error(function () {


        });
}


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

            'MAC_address' : $scope.MAC_address.id,
            'node_name' : $scope.node_name,
            'port_number' : $scope.port_in,
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

    $http.get(API + "/getNodesController")
        .success(function (data) {

            $scope.nodeslo = data;
            $scope.nodesloaded=$scope.nodeslo.nodes;


        })
        .error(function () {


        });



    $scope.intervalo = [
        {
            acr: '-',
            name: 'minutes'
        },

        {
            acr: 'h',
            name: 'hours'
        },
        {
            acr: 'd',
            name: 'days'
        },
        {
            acr: 'w',
            name: 'weeks'
        },
        {
            acr: 'm',
            name: 'months'
        }


    ];
    $scope.grafics = [];
    $scope.deleteItem = function (index) {
        $scope.grafics.splice(index ,1);};

    $scope.clearAll = function () {
        $scope.grafics = [];};


    $http.get(API + "/getNodesController")//esto se encarga rafael i lo hara en su sistema, de momento lo dejo por si acaso
        .success(function (data) {

            $scope.nodeslo = data;
            $scope.nodesloaded=$scope.nodeslo.nodes;


        })
        .error(function () {

        });


    $scope.showPorts = function (mac) {
        $http.get(API + "/getPortsByMac2/" + mac)
            .success(function (data) {
                $scope.portsbymacloaded = data;
                $scope.portsbymac=$scope.portsbymacloaded.listPorts;


            })
            .error(function () {


            });
    }

// Form submit handler.
    $scope.submit = function(form, port, MAC) {
        // Trigger validation flag.
        $scope.submitted = true;
        $scope.itsok = false;

        // If form is invalid, return and let AngularJS show validation errors.
        if (form.$invalid) {
            return;
        }

        if($scope.time < 10){$scope.timelidia = $scope.time+'&';}
        else $scope.timelidia = $scope.time;


        $http.get(API + "/getGraphPort/" + $scope.timelidia+$scope.range.acr+"_"+$scope.MAC_address.id+"_"+$scope.port_in.id)
            .success(function (data) {
                $scope.nographfound="";
                $scope.rawgraph = data;
                $scope.grafics.push($scope.rawgraph);

                if (data.length == 0){$scope.nographfound="There is no graph for MAC: "+$scope.MAC_address.id+" and port: "+$scope.port_in.id;}
                $scope.time=""
                $scope.range="";
                $scope.MAC_address="";
                $scope.port_in="";



            })
            .error(function () {


            });
    }


});



