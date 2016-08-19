(function() {
    'use strict';

    angular
        .module('jobApp')
        .controller('gamerController', gamerController);

    gamerController.$inject = ['authService'];

    /* @ngInject */
    function gamerController(authService) {
        var vm = this;
        vm.title = 'gamerController';
        
        
       

        
    }   // end Controller
})();