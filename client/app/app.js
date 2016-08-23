(function() {
    'use strict';

    angular
        .module('jobApp', [  // load the ui-router 
            'ui.router',
            'angular-filepicker'
            
        ])
        .config(['$stateProvider', '$urlRouterProvider', '$httpProvider', 'filepickerProvider', function($stateProvider, $urlRouterProvider, $httpProvider, filepickerProvider){
        	//$httpProvider.interceptors.push('authInterceptor'); 
            $urlRouterProvider.otherwise('home'); // redirection
            filepickerProvider.setKey('AHJOdoEgQ9OJkRjndz7Jkz');



            //start router
        	$stateProvider
            .state('home', {    //first state for home.html
                url: '/home', 
                templateUrl: 'app/route/home.html', 
                controller: 'authControllers as vm'
            })

        	.state('gamer', {   //2nd state for gamer.html
                url: '/gamer', 
                templateUrl: 'app/route/gamer.html', 
                controller: 'authControllers as vm',
            })

            .state('partner', {   //2nd state for partner.html
                url: '/partner', 
                templateUrl: 'app/route/partner.html', 
                controller: 'authControllers as vm',
            })

            .state('success', {   //2nd state for partner.html
                url: '/success', 
                templateUrl: 'app/route/success.html', 
                controller: 'authControllers as vm',
            });
        }])  // end router

        //.value('apiUrl', 'http://localhost:49645/api/'); // define the apiURL
})();














