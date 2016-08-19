(function() {
    'use strict';

    angular
        .module('jobApp')
        .factory('partnerService', partnerService);

    partnerService.$inject = [ '$q'];

    /* @ngInject */
    function partnerService(  $q ) {
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