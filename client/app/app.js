(function() {
    'use strict';

    angular
        .module('jobApp', [  // load the ui-router 
            'ui.router',
            'angular-filepicker'
            
        ])
        .config(['$stateProvider', '$urlRouterProvider', '$httpProvider', 'filepickerProvider', function($stateProvider, $urlRouterProvider, $httpProvider, filepickerProvider){

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

            .state('partner', {   //3rd state for partner.html
                url: '/partner', 
                templateUrl: 'app/route/partner.html', 
                controller: 'authControllers as vm',
            })

            .state('success', {   //4th state for success.html
                url: '/success', 
                templateUrl: 'app/route/success.html', 
                controller: 'authControllers as vm',
            })

            .state('admin', {   //5th state for admin.html
                url: '/admin', 
                templateUrl: 'app/route/admin.html', 
                controller: 'authControllers as vm',
            });
        }])  // end router

})();














