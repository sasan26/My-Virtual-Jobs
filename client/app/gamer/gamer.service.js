(function() {
    'use strict';

    angular
        .module('jobApp')
        .factory('gamerService', gamerService);

    gamerService.$inject = [ '$q'];

    /* @ngInject */
    function gamerService(  $q ) {
        var state ={
            isLoggedIn: false

        };
        var service = {
            state: state    
        };

        return service;

        ////////////////

       


    }   
})();