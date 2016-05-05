(function () {
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
