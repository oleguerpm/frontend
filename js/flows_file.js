/**
 * Created by Oleguer on 25/11/2014.
 */
// Code goes here



var Flowscontroller = angular.module("myApp_flowsfile", []);
Flowscontroller.controller('flowscontroller',function($scope)


{
    $scope.search=[];
    $scope.flows = [
        {
            Origin: 'BCN',
            Destination: 'MAD',
            Time: '2',
            Protocol: 'HTTP',
            Rate: ''
        },
        {
            Origin: 'VAL',
            Destination: 'BCN',
            Time: '3',
            Protocol: 'SIP',
            Rate: '567'
        },
        {
            Origin: 'MAD',
            Destination: 'BCN-SHOP',
            Time: '5',
            Protocol: 'HTTPS',
            Rate: '5675'
        },
        {
            Origin: 'BCN',
            Destination: 'VAL',
            Time: '5',
            Protocol: 'HTTP',
            Rate: 5675
        },
        {
            Origin: 'BCN-SHOP',
            Destination: 'VAL',
            Time: '5',
            Protocol: 'HTTPS',
            Rate: 5675
        },
        {
            Origin: 'BUR',
            Destination: 'VAL',
            Time: '5',
            Protocol: 'HTTP',
            Rate: 567
        },
        {
            Origin: 'MAD',
            Destination: 'VAL',
            Time: '5',
            Protocol: 'HTTPS',
            Rate: 5675
        },
        {
            Origin: 'MAD',
            Destination: 'BCN-SHOP',
            Time: '5',
            Protocol: 'HTTPS',
            Rate: 5675
        },
        {
            Origin: 'BCN-SHOP',
            Destination: 'VAL',
            Time: '5',
            Protocol: 'HTTPS',
            Rate: 5675
        },
        {
            Origin: 'BCN',
            Destination: 'VAL',
            Time: '5',
            Protocol: 'HTTPS',
            Rate: 5675
        },
        {
            Origin: 'MAD',
            Destination: 'BAR',
            Time: '5',
            Protocol: 'HTTPS',
            Rate: 5675
        }
    ];
});