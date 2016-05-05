(function () {
    'use strict';

    angular
        .module('lightsService', ['ngResource'])
        .factory('Lights', ['$resource',
            function ($resource) { return $resource('/api/lights/:id'); }]);
})();