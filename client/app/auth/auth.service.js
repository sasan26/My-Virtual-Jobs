(function() {
    'use strict';

    angular
        .module('jobApp')
        .factory('authService', authService);

    authService.$inject = [ '$q', '$http'];

    /* @ngInject */
    function authService(  $q, $http ) {
    	
        var service = {
            register: register,
            login: login,
            logout: logout,
            profile: profile,
            deleteAccount: deleteAccount,
            pic: pic,
            getpic: getpic,
            getscores: getscores,
            scores: scores,
            getSchoolGrades: getSchoolGrades,
            schoolGrades: schoolGrades,
            updateScore: updateScore,
            deletePic: deletePic,
            deleteScore: deleteScore,
            changeEmail: changeEmail,
            updatepayment: updatepayment,
            getpayment: getpayment    
        };

        return service;

        ////////////////


         

        // Start of sign up function
        function register(username, password, usertype) {
            // create a new instance of deferred
            var deferred = $q.defer();
            // send a post request to the server
            $http.post('/user/register', {
                    username: username,
                    password: password,
                    usertype: usertype,
                })
                // handle success
                .success(function(data, status) {
                    if (status === 200 && data.status) {
                        deferred.resolve();
                    } else {
                        deferred.reject();
                    }
                })
                // handle error
                .error(function(data) {
                    deferred.reject();
                });
            // return promise object
            return deferred.promise;
        } // End of sign up function


        // Start of sign in function
        function login(username, password, usertype) {
            // create a new instance of deferred
            var deferred = $q.defer();
            // send a post request to the server
            $http.post('/user/login', {
                    username: username,
                    password: password,
                    usertype: usertype
                })
                // handle success
                .success(function(data, status) {
                    if (status === 200 && data.status) {
                        //user = true;
                        deferred.resolve(data);
                    } else {
                        //user = false;
                        deferred.reject();
                    }
                })
                // handle error
                .error(function(data) {
                    //user = false;
                    deferred.reject();
                });

            // return promise object
            return deferred.promise;
        }  // End of sign in function


        // Start of log out function
        function logout() {
            // create a new instance of deferred
            var deferred = $q.defer();
            // send a get request to the server
            $http.get('/user/logout')
                // handle success
                .success(function(data) {
                    //user = false;
                    deferred.resolve();
                })
                // handle error
                .error(function(data) {
                    user = false;
                    deferred.reject();
                });
            // return promise object
            return deferred.promise;
        }  // End of log out function


        // Start of profile function
        function profile(username) {
            // create a new instance of deferred
            var deferred = $q.defer();
            // send a post request to the server
            $http.get('/user/profile', {
                    username: username                   
                })
                // handle success
                .success(function(data, status) {
                    if (status === 200 && data.status) {
                        //user = true;
                        deferred.resolve(data);
                    } else {
                        //user = false;
                        deferred.reject();
                    }
                })
                // handle error
                .error(function(data) {
                    //user = false;
                    deferred.reject();
                });

            // return promise object
            return deferred.promise;
        }  // End of profile function


        // Start of profile function
        function deleteAccount(id) {
            
            var deferred = $q.defer();  // create a new instance of deferred   
            $http({     // send a delete request to the server
                method: 'DELETE',
                url: '/user/register/' + id
            })
                // handle success
                .success(function(data, status) {
                    if (status === 200 && data.status) {
                        //user = true;
                        deferred.resolve(data);
                    } else {
                        //user = false;
                        deferred.reject();
                    }
                })
                // handle error
                .error(function(data) {
                    //user = false;
                    deferred.reject();
                });

            // return promise object
            return deferred.promise;
        }  // End of profile function


        // Start of change Email function
        function changeEmail(id, username){
            var defer = $q.defer();
            var data = {username: username};
            $http({
                method: 'PUT',
                url: '/user/register/' + id,
                data: data
            }).then(function(response) {
                    if (response.status === 204) {
                        defer.resolve(response);
                    } else {
                        defer.reject("No data found!");
                    }
                },
                function(error) {
                    defer.reject(error);
                });
            return defer.promise;      
        }


        // Start of ad function
        function pic(picurl, filename, username, videoId, job) {
            // create a new instance of deferred
            var deferred = $q.defer();
            // send a post request to the server
            $http.post('/user/superhero', {
                    picurl: picurl,
                    filename: filename,
                    username: username,
                    videoId : videoId,
                    job: job
                })
                // handle success
                .success(function(data, status) {
                    if (status === 200) {
                        deferred.resolve();
                    } else {
                            deferred.reject();
                    }
                })
                // handle error
                .error(function(data) {
                    deferred.reject();
                });
            // return promise object
            return deferred.promise;
        } // End of ad function


        // // Start of getpic function
        function getpic(data) {
            // create a new instance of deferred
            var deferred = $q.defer();
            // send a post request to the server
            $http.get('/user/superhero', {
                          data: data             
                })
                // handle success
                .success(function(data, status) {
                    if (status === 200) {                        
                        deferred.resolve(data);
                    } else {
                        //user = false;
                        deferred.reject();
                        console.log('Error1: ' + data);
                    }
                })
                // handle error
                .error(function(data) {
                    //user = false;
                    deferred.reject();
                    console.log('Error2: ' + data);
                });

            // return promise object
            return deferred.promise;
        }  // End of getpic function


        // Start of delete ad function
        function deletePic(id){
            var defer = $q.defer();
            $http({
                method: 'DELETE',
                url: '/user/superhero/' + id
            }).then(function(response) {
                    if (response.status === 204) {
                        defer.resolve(response);
                    } else {
                        defer.reject("No data found!");
                    }
                },
                function(error) {
                    defer.reject(error);
                });
            return defer.promise;      
        }

       
       // Start of score function
        function scores(balance, username) {
            // create a new instance of deferred
            var deferred = $q.defer();
            // send a post request to the server
            $http.post('/user/score', {
                    balance: balance,
                    username: username
                })
                // handle success
                .success(function(data, status) {
                    if (status === 200) {
                        deferred.resolve();
                    } else {
                            deferred.reject();
                    }
                })
                // handle error
                .error(function(data) {
                    deferred.reject();
                });
            // return promise object
            return deferred.promise;
        } // End of score function


        // // Start of getpic function
        function getscores(data) {
            // create a new instance of deferred
            var deferred = $q.defer();
            // send a post request to the server
            $http.get('/user/score', {
                          data: data             
                })
                // handle success
                .success(function(data, status) {
                    if (status === 200) {                        
                        deferred.resolve(data);
                    } else {
                        //user = false;
                        deferred.reject();
                        console.log('Error1: ' + data);
                    }
                })
                // handle error
                .error(function(data) {
                    //user = false;
                    deferred.reject();
                    console.log('Error2: ' + data);
                });

            // return promise object
            return deferred.promise;
        }  // End of getpic function


        // Start of score function
        function schoolGrades(userScore, degree, username) {
            // create a new instance of deferred
            var deferred = $q.defer();
            // send a post request to the server
            $http.post('/user/school', {
                    userScore: userScore,
                    degree: degree,
                    username: username
                })
                // handle success
                .success(function(data, status) {
                    if (status === 200) {
                        deferred.resolve();
                    } else {
                            deferred.reject();
                    }
                })
                // handle error
                .error(function(data) {
                    deferred.reject();
                });
            // return promise object
            return deferred.promise;
        } // End of score function


        // Start of getpic function
        function getSchoolGrades(data) {
            // create a new instance of deferred
            var deferred = $q.defer();
            // send a post request to the server
            $http.get('/user/school', {
                          data: data             
                })
                // handle success
                .success(function(data, status) {
                    if (status === 200) {                        
                        deferred.resolve(data);
                    } else {
                        //user = false;
                        deferred.reject();
                        console.log('Error1: ' + data);
                    }
                })
                // handle error
                .error(function(data) {
                    //user = false;
                    deferred.reject();
                    console.log('Error2: ' + data);
                });

            // return promise object
            return deferred.promise;
        }  // End of getpic function


        // Start of update score function
        function updateScore(id, username, balance){
            var defer = $q.defer();
            var data = {username: username, balance: balance};
            $http({
                method: 'PUT',
                url: '/user/score/' + id,
                // headers: {
                //         'Content-Type': 'application/json; charset=utf-8'
                // },
                data: data
            }).then(function(response) {
                    if (response.status === 204) {
                        defer.resolve(response);
                    } else {
                        defer.reject("No data found!");
                    }
                },
                function(error) {
                    defer.reject(error);
                });
            return defer.promise;      
        }


        // Start of delete ad function
        function deleteScore(id){
            var defer = $q.defer();
            $http({
                method: 'DELETE',
                url: '/user/score/' + id
            }).then(function(response) {
                    if (response.status === 204) {
                        defer.resolve(response);
                    } else {
                        defer.reject("No data found!");
                    }
                },
                function(error) {
                    defer.reject(error);
                });
            return defer.promise;      
        }


        // // Start of getpic function
        function getpayment(data) {
            // create a new instance of deferred
            var deferred = $q.defer();
            // send a post request to the server
            $http.get('/user/payments', {
                          data: data             
                })
                // handle success
                .success(function(data, status) {
                    if (status === 200) {                        
                        deferred.resolve(data);
                    } else {
                        //user = false;
                        deferred.reject();
                        console.log('Error1: ' + data);
                    }
                })
                // handle error
                .error(function(data) {
                    //user = false;
                    deferred.reject();
                    console.log('Error2: ' + data);
                });

            // return promise object
            return deferred.promise;
        } 


        // Start of updatepayment function
        function updatepayment(id, status){
            var defer = $q.defer();
            var data = {status: status};
            $http({
                method: 'PUT',
                url: '/user/payments/' + id,
                // headers: {
                //         'Content-Type': 'application/json; charset=utf-8'
                // },
                data: data
            }).then(function(response) {
                    if (response.status === 204) {
                        defer.resolve(response);
                    } else {
                        defer.reject("No data found!");
                    }
                },
                function(error) {
                    defer.reject(error);
                });
            return defer.promise;      
        }


        


    }   
})();
















