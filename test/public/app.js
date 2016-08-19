//Main file
var app = angular.module('superheroApp', ['addSuperheroCtrl',  'ngRoute', 'angular-filepicker'])
    .config(function($routeProvider, filepickerProvider){
        //The route provider handles the client request to switch route
        $routeProvider.when('/addSuperhero', {          
            templateUrl: 'partials/addSuperhero.html',
                        controller: 'addSuperheroController'            
        })
        //Redirect to addSuperhero in all the other cases.
        .otherwise({redirectTo:'/addSuperhero'});
        //Add the API key to use filestack service
        filepickerProvider.setKey('ARALkO2yATFGnmPrh8wqYz');
});



    