(function() {
    'use strict';

    angular
        .module('jobApp')
        .controller('partnerController', partnerController);

    partnerController.$inject = ['authService'];

    /* @ngInject */
    function partnerController(authService) {
        var vm = this;
        vm.title = 'partnerController';
        
        
       

        
    }   // end Controller
})();