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
})();;angular.module('rtsApp').run(['$templateCache', function($templateCache) {
  $templateCache.put("Lights/delete.html",
    "<div>\n" +
    "    <h1>delete Light!</h1>\n" +
    "\n" +
    "</div>");
  $templateCache.put("Lights/edit.html",
    "<div ng-switch on=\"isEditing\">\n" +
    "    <h1 ng-switch-when=\"true\">{{ light.Label }}</h1>\n" +
    "    <h1 ng-switch-default>Add a new light</h1>\n" +
    "</div>\n" +
    "<div class=\"row\">\n" +
    "    <div class=\"col-md-5\">\n" +
    "        <form ng-submit=\"save()\">\n" +
    "            <div class=\"form-group\">\n" +
    "                <label for=\"Label\">Label</label>\n" +
    "                <input name=\"Label\" class=\"form-control\" placeholder=\"Enter label\" ng-model=\"light.Label\" />\n" +
    "            </div>\n" +
    "            <a href=\"/lights\" class=\"btn btn-default\">Cancel</a>\n" +
    "            <button type=\"submit\" class=\"btn btn-primary\">Save</button>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "</div>");
  $templateCache.put("Lights/list.html",
    "<div>\n" +
    "    <h1>Lights list</h1>\n" +
    "    <table class=\"table table-bordered table-striped\">\n" +
    "        <thead>\n" +
    "            <tr>\n" +
    "                <th></th>\n" +
    "                <th>Id</th>\n" +
    "                <th>Label</th>\n" +
    "            </tr>\n" +
    "        </thead>\n" +
    "        <tbody>\n" +
    "            <tr ng-repeat=\"light in lights\">\n" +
    "                <td>\n" +
    "                    <a href=\"/lights/delete/{{ light.Id }}\">Delete</a>\n" +
    "                </td>\n" +
    "                <td>\n" +
    "                    <a href=\"/lights/edit/{{ light.Id }}\">{{ light.Id }}</a>\n" +
    "                </td>\n" +
    "                <td>\n" +
    "                    <a href=\"/lights/edit/{{ light.Id }}\">{{ light.Label }}</a>\n" +
    "                </td>\n" +
    "            </tr>\n" +
    "        </tbody>\n" +
    "    </table>\n" +
    "\n" +
    "    <p>\n" +
    "        <a href=\"/lights/add\" class=\"btn btn-primary\">New Light</a>\n" +
    "    </p>\n" +
    "</div>");
}]);
;(function () {
    'use strict';

    angular
        .module('rtsApp')
        .controller('LightsListController', lightsListController)
        .controller('LightsSaveController', lightsSaveController)
        .controller('LightsDeleteController', lightsDeleteController);

    //List
    lightsListController.$inject = ['$scope', 'Lights'];
    function lightsListController($scope, Lights) {
        angular.extend($scope, {
            lights: Lights.query()
        });
    }

    //Save
    lightsSaveController.$inject = ['$scope', '$routeParams', '$location', 'Lights'];
    function lightsSaveController($scope, $routeParams, $location, Lights) {
        var isEditing = (angular.isDefined($routeParams.id));
        var light = isEditing ? Lights.get({ id: $routeParams.id }) : new Lights();
        var headerTitle = isEditing ? light.Label : 'Add a new Light';
      
        angular.extend($scope, {
            isEditing: isEditing,
            light: light,
            save: function () {
                $scope.light.$save(function () {
                    $location.path('/lights');
                });
            }
        });
    }

    //Delete
    lightsDeleteController.$inject = ['$scope', '$routeParams', '$location', 'Lights'];
    function lightsDeleteController($scope, $routeParams, $location, Lights) {
        $scope.light = Lights.get({ id: $routeParams.id });
        $scope.remove = function () {
            $scope.light.$remove({
                id: $scope.light.Id
            }, function () {
                $location.path('/');
            });
        };
    }
})();
;(function () {
    'use strict';

    angular
        .module('lightsService', ['ngResource'])
        .factory('Lights', ['$resource',
            function ($resource) { return $resource('/api/lights/:id'); }]);
})();