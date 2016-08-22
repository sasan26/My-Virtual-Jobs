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

            // call register from service
            authService.register(vm.registerForm.username, vm.registerForm.password, vm.registerForm.usertype)
                // handle success
                .then(function() {
                    $rootScope.username = vm.registerForm.username;
                    vm.scores();
                    toastr.success('Registration Complete!');
                    // if ( vm.registerForm.usertype === 'gamer'){
                    //     $timeout(function() {
                    //         $location.path('/gamer');
                    //     }, 1000);
                    // }
                    // else if ( vm.registerForm.usertype === 'partner'){
                    //     $timeout(function() {
                    //         $location.path('/partner');
                    //     }, 1000);
                    // }

                })
                // handle error
                .catch(function(loginForm) {
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
                        toastr.success('Successfully logged in!');
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
                    $rootScope.id = "";
                    $rootScope.username = "";
                    toastr.info('Successfully loged out!');
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

            for ( var i=0; i<$rootScope.score.length; i++){
                if ( $rootScope.score[i].username === $rootScope.username ){
                    vm.scoreDeleteId = $rootScope.score[i]._id;
                     authService.deleteScore(vm.scoreDeleteId)
                }
            }
                //handle success
                toastr.info("Your account has been deleted!");
                $timeout(function() {
                                $location.path('/home');
                            }, 1000);
        };

        // Start of change Email function
        vm.changeEmail = function() {

                    authService.changeEmail($rootScope.id, vm.changeE)
                    $rootScope.username = vm.changeE;

                    authService.updateScore($rootScope.scoreID, vm.changeE, $rootScope.scoreBalance)
                        // handle success
                            toastr.success('Your Email has been successfully changed!');
                                              
                    
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
                        $rootScope.job = res;
                    })
                    // handle error
                    .catch(function() {
                        toastr.error("Couldn't access the datebase");
                    });           
        }; 


        // Start of scores function
        vm.deletePic = function() {
                    authService.deletePic(vm.delete)
                        // handle success
                        toastr.warning('Deleted!');                                                               
        };

        
        // Start of scores function
        vm.scores = function() {
            authService.scores(100, $rootScope.username)
                // handle success
                .then(function() { 
                    toastr.info('Wellcome, ' + $rootScope.username + '! You got 100 Coins!');
                                      
                })
                // handle error 
                .catch(function() {
                    toastr.error("Couldn't access the datebase");
                });                      
        };


        // Start of getpic function
        vm.getscores = function() {
            $timeout(function() {       
                    // call the getSettings from service
                    authService.getscores($rootScope.id)
                        //handle success
                        .then(function(res) {
                            vm.theScore = res;
                            for (var i=0; i< res.length; i++){
                                vm.scoreUser = res[i].username;
                                if (vm.scoreUser === $rootScope.username){
                                    $rootScope.scoreUser = $rootScope.username;    
                                    $rootScope.scoreBalance = res[i].balance;
                                    $rootScope.scoreID =res[i]._id;
                                }                                                                                                             
                            }
                            $rootScope.score = res;
                        })
                        // handle error
                        .catch(function() {
                            toastr.error("Couldn't access the datebase");
                        }); 
            }, 1000);          
        };


        // Start of scores function
        vm.updateScore = function() {
            $timeout(function() {
                            
                    vm.balance = $rootScope.scoreBalance - $rootScope.school ;
                    authService.updateScore($rootScope.scoreID, $rootScope.username, vm.balance)
                        // handle success
                        .then(function() { 
                            toastr.success('Complete!');
                                              
                        })
                    // handle error 
                    .catch(function() {
                        toastr.error("Couldn't access the datebase");
                    });
            }, 1000);                          
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
                    $rootScope.grade = res;
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
                    $rootScope.school = 26;
                    for (var i=0; i< res.length; i++){
                        if (res[i].degree === vm.diplomaCourse && res[i].username === $rootScope.username){
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
                    $rootScope.school = 81;
                    for (var i=0; i< res.length; i++){
                        if (res[i].degree === vm.associateCourse && res[i].username === $rootScope.username){
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
                    $rootScope.school = 126;
                    for (var i=0; i< res.length; i++){
                        if (res[i].degree === vm.bachelorCourse && res[i].username === $rootScope.username){
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
                    $rootScope.school = 260;
                    for (var i=0; i< res.length; i++){
                        if (res[i].degree === vm.masterCourse && res[i].username === $rootScope.username){
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
                    $rootScope.school = 620;
                    for (var i=0; i< res.length; i++){
                        if (res[i].degree === vm.doctoralCourse && res[i].username === $rootScope.username){
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
        vm.timer = function(){
            if( vm.sas <= 100){       
                $timeout(function() {
                    vm.sas += 0.1*(10/6);
                    vm.time = Math.round(vm.sas);
                    vm.timer();
                }, 100);
            }

        }


        // Start of scores function
        vm.earnCoin = function() {
                       
            vm.sas=0;
            vm.time=0;
            for (var i=0; i<$rootScope.score.length; i++){
                if ( vm.pUser === $rootScope.score[i].username){
                    $rootScope.partnerID = $rootScope.score[i]._id;
                    $rootScope.partnerBalance = $rootScope.score[i].balance;

                }
            }

            if ( $rootScope.partnerBalance < vm.currentjob.slice(8,10) ){
                    toastr.error("Sorry! The employer doesn't have enough fund to pay you. Try another job.")
            }
            else if ( $rootScope.partnerBalance >= vm.currentjob.slice(8,10) ){

                    vm.coins = $rootScope.scoreBalance + parseInt(vm.currentjob.slice(8,10));
                    authService.updateScore($rootScope.scoreID, $rootScope.username, vm.coins)

                    vm.expense = $rootScope.partnerBalance - parseInt(vm.currentjob.slice(8,10));
                    authService.updateScore($rootScope.partnerID, vm.pUser, vm.expense)

                    toastr.info(' Your employer paid '+vm.currentjob.slice(8,10)+' coins!');
            }
        }; 




        //vm.status();
        vm.getpic();
        vm.getSchoolGrades();



    }   // end Controller
})();















