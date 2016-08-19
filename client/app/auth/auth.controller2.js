(function() {
    'use strict';

    angular
        .module('Chirpapp')
        .controller('authControllers', authControllers);

    authControllers.$inject = ['authService', '$state'];

    /* @ngInject */
    function authControllers(authService, $state) {
        var vm = this;
        vm.title = 'authControllers';
        
        
        // start register function
        vm.registerUser = function(reg){
        	authService.registerUser(vm.reg)
		        .then(
		        	function(response){
		        		toastr.success('Successfully added a new user!');
                        console.log(vm.reg);
		        		$state.go('auth');
		        	},
		        	function(error){
		        		toastr.error('An error has occurred!');
		        	}
		        );
        }   // end register function 

        //start login function
        vm.loginUser = function(username, password) {
            authService.loginUser(username, password)
                .then(
                    function(response) {
                        toastr.success('Successfully Loged in!');
                        $state.go('chirp');
                    },
                    function(message) {
                        toastr.warning(message);
                    }
                );
        }   //end login function

        // start logout function
        vm.logoutUser = function(){
            authService.logoutUser()
               .then(
                    function(response){
                        $state.go('login')
                    },
                    function(message){
                        toastr.warning(message);
                    }
                );                     
        }   //end logout function
    }   // end Controller
})();