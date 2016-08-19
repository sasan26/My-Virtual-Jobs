(function() {
    'use strict';

    angular
        .module('Chirpapp')
        .factory('authService', authService);

    authService.$inject = [ 'apiUrl', '$q', '$http', 'localStorageService', '$location'];

    /* @ngInject */
    function authService( apiUrl, $q, $http, localStorageService, $location ) {
    	var state ={
    		isLoggedIn: false

    	};
        var service = {
            state: state,
            registerUser: registerUser,
            loginUser: loginUser,
            logoutUser: logoutUser,
            init: init
        };
        return service;

        ////////////////

        // start sign up function
        function registerUser(val){
        	var defer = $q.defer();
            console.log(val);
            $http({
                method: 'POST',
                url: apiUrl + 'accounts/register',
                data: val
            })


    	    .then(
    	     	function(response){
    	     		defer.resolve(response.data);
    	     	},
    	     	function(error){
    	     		defer.reject(error.data.message);
    	     	}
    	    );
    	   return defer.promise;
        }   // End sign up function

        // start login function
        function loginUser(username, password){
            logoutUser();
            var defer = $q.defer();
            var data = 'grant_type=password&username=' + username + '&password=' + password;                 
            $http({
                method: 'POST', 
                url: apiUrl + 'token',
                data: data, 
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
                 .then(
                    function(response){
                        //token
                        localStorageService.set('authorizationData', response.data); 
                        state.isLoggedIn = true;
                        defer.resolve(response.data);
                    },
                    function(error){
                        defer.reject(error);
                    }
                 );
              return defer.promise;
        }   // End Login function

        // Start Log out function
        function logoutUser(){
            state.loggedIn = false;
            localStorageService.remove('authorizationData');
            $location.path('#/auth');
        }   // End log out function

        // start init function                
        function init(){
            var userAuthorizationData = localStorageService.get('authorizationData');
            if(userAuthorizationData){
                    state.loggedIn = true;
                    $location.path('#/chirp');
                }
        }   // end init function  

    }   
})();