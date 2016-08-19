(function() {
    'use strict';

    angular
        .module('Chirpapp')
        .factory('authInterceptor', authInterceptor);

    authInterceptor.$inject = [ '$location', 'localStorageService', '$q' ];

    /* @ngInject */
    function authInterceptor( $location, localStorageService, $q ) {
        var service = {
            request: request,
            response: response,
            requestError: requestError,
            responseError: responseError
        };
        return service;

        ////////////////

        // start request function
        function request(config){
        	config.headers = config.headers || {};  // check the headers
        	var userAuthData = localStorageService.get('authorizationData');
        	if(userAuthData){
        		config.headers.Authorization = "Bearer " + userAuthData.access_token;
        	}
        	return config;
        }   //end request function

        // start response function
        function response(response){
        	return response || $q.when(response); 
        }   // end response function

        // start requesterror function
        function requestError(rejection){
        	return $q.reject(rejection);
        }   // end requestError function

        // start responseError function
        function responseError(rejection){
        	if( rejection.status === 401 ){
        		localStorageService.remove('authorizationData');
        		$location.path('#/auth');
        	}
        	return $q.reject(rejection);
        }   // end responseError function


    }
})();