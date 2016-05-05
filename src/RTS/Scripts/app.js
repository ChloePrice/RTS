(function () {
    'use strict';

    var app = angular.module('rtsApp', ['ngRoute', 'lightsService']).config(config);

    //Les appels de resource sur le serveur redirige vers l'index.html
    //routes
    function config($routeProvider, $locationProvider) {
        $routeProvider.when('/', {
            templateUrl: 'Lights/list.html',
            controller: 'LightsListController'
        })
        .when('/lights', {
            templateUrl: 'Lights/list.html',
            controller: 'LightsListController'
        })
        .when('/lights/add', {
            templateUrl: 'Lights/edit.html',
            controller: 'LightsSaveController'
        })
        .when('/lights/edit/:id', {
            templateUrl: 'Lights/edit.html',
            controller: 'LightsSaveController'
        })
        .when('/lights/delete/:id', {
            templateUrl: 'Lights/delete.html',
            controller: 'LightsDeleteController'
        })
        .when('/404', {
            templateUrl: '/404.html',
            controller: 'LightsAddController'
        })
        .otherwise({
            redirectTo: '/404'
        });

        $locationProvider.html5Mode(true);
    }
})();