(function() {
    'use strict';

    angular
        .module('jobApp')
        .controller('authControllers', authControllers);

    authControllers.$inject = ['$sce', 'authService', '$timeout', '$location', '$rootScope', '$http', 'filepickerService', '$scope'];

    /* @ngInject */
    function authControllers($sce, authService, $timeout, $location, $rootScope, $http, filepickerService, $scope) {
        var vm = this;
        vm.title = 'authControllers';


        $timeout(function() {
                            p2.style.display = 'none';
                        }, 4000);
        



        vm.status = function (){
            if ( !$rootScope.logged ){
                $location.path('/home');        
            }
        }
        

        // Start of register function
       vm.register = function(registerForm) {

            // initial values
            vm.error = false;
            vm.success = false;
            vm.disabled = true;

            // call register from service
            authService.register(vm.registerForm.username, vm.registerForm.password, vm.registerForm.usertype)
                // handle success
                .then(function() {
                    vm.success = true;
                    vm.successMessage = "Registration Complete!"
                    vm.disabled = false;
                    //vm.registerForm = {};
                    toastr.success('Registration Complete!');
                    if ( vm.registerForm.usertype === 'gamer'){
                        $timeout(function() {
                            $location.path('/gamer');
                        }, 1000);
                    }
                    else if ( vm.registerForm.usertype === 'partner'){
                        $timeout(function() {
                            $location.path('/partner');
                        }, 1000);
                    }

                })
                // handle error
                .catch(function(loginForm) {
                    vm.error = true;
                    vm.errorMessage = "Something went wrong!";
                    vm.disabled = false;
                    toastr.error('An error has occurred!');
                    vm.registerForm = {};
                });
        };

        // Start of sign in function
        vm.login = function() {
            // call login from service
            authService.login(vm.loginForm.username, vm.loginForm.password, vm.loginForm.usertype)
                // handle success
                .then(function(res) {
                    $rootScope.usertype = res.usertype;
                    vm.usertype = res.usertype;
                    if ( $rootScope.usertype !== vm.loginForm.usertype ){
                        toastr.error('Invalid user type!');
                    }

                    if ( $rootScope.usertype === vm.loginForm.usertype ){
                        if ( vm.loginForm.usertype === 'gamer'){
                            $timeout(function() {
                                $location.path('/gamer');
                            }, 1000);
                        }
                        else if ( vm.loginForm.usertype === 'partner'){
                            $timeout(function() {
                                $location.path('/partner');
                            }, 1000);
                        }
                        $rootScope.logged = true;
                        $rootScope.id = res.user;
                        $rootScope.username = res.username;
                        vm.username = $rootScope.username;

                        toastr.success('Successfully loged in!');
                    }
                })
                // handle error
                .catch(function() {
                    vm.error = true;
                    vm.errorMessage = "Invalid username and/or password";
                    toastr.error('Invalid username and/or password!');
                    vm.disabled = false;
                    vm.loginForm = {};
                });
        };

        // Start of sign out function
        vm.logout = function() {

            // call logout from service
            authService.logout()
                .then(function() {
                    $rootScope.logged = false;
                    $location.path('/home');
                    toastr.success('Successfully loged out!');
                });
        };

        // Start of profile function
        vm.profile = function() {       
            // call the getSettings from service
            authService.profile($rootScope.id)
                //handle success
                .then(function(res) {
                    vm.username = $rootScope.username;
                })
                // handle error
                .catch(function() {
                    toastr.error("Couldn't access the datebase");
                });           
        };

        // Start of delete function
        vm.deleteAccount = function() {       
            // call the getSettings from service
            authService.deleteAccount($rootScope.id)
                //handle success
                .then(function(res) {
                    toastr.success("Your account has been deleted!");
                })
                // handle error
                .catch(function() {
                    toastr.error("Couldn't access the datebase");
                });           
        };

        // Start of upload images function
        vm.superhero = [];
        vm.pic = function() {
            authService.pic(vm.superhero.picture.url, vm.superhero.picture.filename, $rootScope.username, vm.videoId, vm.job)
                // handle success
                .then(function() { 
                    vm.profile();
                    toastr.success('Complete!');
                    vm.superhero = [];                    
                    
                    $scope.trustSrc = function(src) {
                        return $sce.trustAsResourceUrl(src);
                    }
                    $scope.movie = {src: "https://www.youtube.com/embed/" + vm.videoId, title:"Egghead.io AngularJS Binding"}; 
                })
                // handle error 
                .catch(function() {
                    toastr.error("Couldn't access the datebase");
                });                      
        };
   
        //Single file upload, you can take a look at the options
        vm.upload = function(){
            filepickerService.pick(
                {
                    mimetype: 'image/*',
                    language: 'en',
                    services: ['COMPUTER','DROPBOX','GOOGLE_DRIVE','IMAGE_SEARCH', 'FACEBOOK', 'INSTAGRAM'],
                    openTo: 'IMAGE_SEARCH'
                },
                function(Blob){                
                    vm.superhero.picture = Blob;
                    $scope.$apply();
                }
            );
        }; 


        // Start of getpic function
        vm.getpic = function() {       
            // call the getSettings from service
            authService.getpic($rootScope.id)
                //handle success
                .then(function(res) {

                    $scope.trustSrc = function(src) {
                        return $sce.trustAsResourceUrl(src);
                    }
                    $scope.movie = {src: "https://www.youtube.com/embed/"};
                    vm.superheroes = res;  

                })
                // handle error
                .catch(function() {
                    toastr.error("Couldn't access the datebase");
                });           
        }; 

        vm.balance = 0;
        vm.degree = "None";
        vm.score = 0;

        // Start of scores function
        vm.scores = function() {
            authService.scores(vm.balance, vm.degree, vm.score, $rootScope.username)
                // handle success
                .then(function() { 
                    toastr.success('Complete!');
                                      
                })
                // handle error 
                .catch(function() {
                    toastr.error("Couldn't access the datebase");
                });                      
        };


        // Start of getpic function
        vm.getscores = function() {       
            // call the getSettings from service
            authService.getscores($rootScope.id)
                //handle success
                .then(function(res) {
                    vm.theScore = res;
                })
                // handle error
                .catch(function() {
                    toastr.error("Couldn't access the datebase");
                });           
        }; 


        // Start of schoolGrades function
        vm.schoolGrades = function() {
            authService.schoolGrades(vm.degree, vm.userScore, $rootScope.username)
                // handle success
                .then(function() { 
                    toastr.success('Complete!');
                                      
                })
                // handle error 
                .catch(function() {
                    toastr.error("Couldn't access the datebase");
                });                      
        };


        // Start of getSchoolGrades function
        vm.getSchoolGrades = function() {       
            // call the getSettings from service
            authService.getSchoolGrades($rootScope.id)
                //handle success
                .then(function(res) {
                    vm.schoolGrade = res;
                })
                // handle error
                .catch(function() {
                    toastr.error("Couldn't access the datebase");
                });           
        }; 

        // School scores
        vm.diplomaScore = 0;
        vm.associateScore = 0;
        vm.bachelorScore = 0;
        vm.masterScore = 0;
        vm.doctoralScore = 0;

        vm.diploma = function() {
            authService.getSchoolGrades($rootScope.id)
                //handle success
                .then(function(res) {
                    for (var i=0; i< res.length; i++){
                        if (res[i].degree === vm.diplomaCourse){
                            toastr.warning("you already got this degree. Try another one!");
                            vm.diplomaCourse = "";                       
                        }                                                               
                    }
                    if (vm.diplomaCourse !== ""){
                        authService.schoolGrades(vm.diplomaScore, vm.diplomaCourse, $rootScope.username)
                        toastr.success("Congratulation, you got a new degree!");
                        vm.diplomaCourse = "";
                    }                                             
                })     
        }


        vm.associate = function() {
            authService.getSchoolGrades($rootScope.id)
                //handle success
                .then(function(res) {
                    for (var i=0; i< res.length; i++){
                        if (res[i].degree === vm.associateCourse){
                            toastr.warning("you already got this degree. Try another one!");
                            vm.associateCourse = "";                       
                        }                                                               
                    }
                    if (vm.associateCourse !== ""){
                        authService.schoolGrades(vm.associateScore, vm.associateCourse, $rootScope.username)
                        toastr.success("Congratulation, you got a new degree!");
                        vm.associateCourse = "";
                    }                                             
                })     
        }


        vm.bachelor = function() {
            authService.getSchoolGrades($rootScope.id)
                //handle success
                .then(function(res) {
                    for (var i=0; i< res.length; i++){
                        if (res[i].degree === vm.bachelorCourse){
                            toastr.warning("you already got this degree. Try another one!");
                            vm.bachelorCourse = "";                       
                        }                                                               
                    }
                    if (vm.bachelorCourse !== ""){
                        authService.schoolGrades(vm.bachelorScore, vm.bachelorCourse, $rootScope.username)
                        toastr.success("Congratulation, you got a new degree!");
                        vm.bachelorCourse = "";
                    }                                             
                })     
        }


        vm.master = function() {
            authService.getSchoolGrades($rootScope.id)
                //handle success
                .then(function(res) {
                    for (var i=0; i< res.length; i++){
                        if (res[i].degree === vm.masterCourse){
                            toastr.warning("you already got this degree. Try another one!");
                            vm.masterCourse = "";                       
                        }                                                               
                    }
                    if (vm.masterCourse !== ""){
                        authService.schoolGrades(vm.masterScore, vm.masterCourse, $rootScope.username)
                        toastr.success("Congratulation, you got a new degree!");
                        vm.masterCourse = "";
                    }                                             
                })     
        }


        vm.doctoral = function() {
            authService.getSchoolGrades($rootScope.id)
                //handle success
                .then(function(res) {
                    for (var i=0; i< res.length; i++){
                        if (res[i].degree === vm.doctoralCourse){
                            toastr.warning("you already got this degree. Try another one!");
                            vm.doctoralCourse = "";                       
                        }                                                               
                    }
                    if (vm.doctoralCourse !== ""){
                        authService.schoolGrades(vm.doctoralScore, vm.doctoralCourse, $rootScope.username)
                        toastr.success("Congratulation, you got a new degree!");
                        vm.doctoralCourse = "";
                    }                                             
                })     
        }

        vm.schoolDip = function(){
            vm.diplomaScore += 1;
        }

        vm.schoolDipN = function(){
            vm.diplomaScore -= 1;
        }

        vm.schoolAss = function(){
            vm.associateScore += 1;
        }

        vm.schoolAssN = function(){
            vm.associateScore -= 1;
        }

        vm.schoolMas = function(){
            vm.masterScore += 1;
        }

        vm.schoolMasN = function(){
            vm.masterScore -= 1;
        }

        vm.schoolBac = function(){
            vm.bachelorScore += 1;
        }

        vm.schoolBacN = function(){
            vm.bachelorScore -= 1;
        }

        vm.schoolDoc = function(){
            vm.doctoralScore += 1;
        }

        vm.schoolDocN = function(){
            vm.doctoralScore -= 1;
        }

        vm.sas=0;

            
              

                for (var i = 0; i< 10000; i++){
                $timeout(function() {
                    
                    vm.sas += 0.01;
                    i ++ ;
                }, 13000);}
                
        




        //vm.status();
        vm.getpic();
        vm.profile();
        vm.getSchoolGrades();
        vm.getscores();



    }   // end Controller
})();















