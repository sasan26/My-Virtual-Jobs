angular.module('myApp').controller('loginController', ['$scope', '$rootScope', '$location', 'AuthService',
    function($scope, $rootScope, $location, AuthService) {

        $scope.login = function() {

            // initial values
            $scope.error = false;
            $scope.disabled = true;

            // call login from service
            AuthService.login($scope.loginForm.username, $scope.loginForm.password)
                // handle success
                .then(function(res) {
                    $location.path('/');
                    $scope.disabled = false;
                    $scope.loginForm = {};
                    $rootScope.logged = true;
                    $rootScope.id = res.user;
                })
                // handle error
                .catch(function() {
                    $scope.error = true;
                    $scope.errorMessage = "Invalid username and/or password";
                    $scope.disabled = false;
                    $scope.loginForm = {};
                });
        };
    }
]);

angular.module('myApp').controller('settingsController', ['$scope', '$rootScope', '$location', 'AuthService',
    function($scope, $rootScope, $location, AuthService) {

        $scope.getSettings = function() {
            // initial values
            $scope.error = false;
            $scope.disabled = true;

            // call the getSettings from service
            AuthService.getSettings($rootScope.id)
                //handle success
                .then(function(res) {
                    $location.path('/settings');
                    $scope.disabled = false;
                    $scope.settingsForm = {
                        first: res.data.first,
                        last: res.data.last,
                        city: res.data.city,
                        state: res.data.state
                    };
                })
                // handle error
                .catch(function() {
                    $scope.error = true;
                    $scope.errorMessage = "Couldn't access the datebase";
                    $scope.disabled = false;
                    $scope.settingsForm = {};
                });
        };
        $scope.getSettings();


        $scope.updateSettings = function() {
            // initial values
            $scope.success = false;
            $scope.error = false;
            $scope.disabled = true;

            // call updateSettings from service
            AuthService.updateSettings($rootScope.id, $scope.settingsForm.first, $scope.settingsForm.last, $scope.settingsForm.city, $scope.settingsForm.state)
                // handle success
                .then(function(res) {
                    $location.path('/settings');
                    $scope.success = true;
                    $scope.successMessage = "Settings Updated!"
                    $scope.disabled = false;
                    $scope.settingsForm = {
                        first: res.data.first,
                        last: res.data.last,
                        city: res.data.city,
                        state: res.data.state
                    };
                })
                // handle error
                .catch(function() {
                    $scope.error = true;
                    $scope.errorMessage = "Invalid first, last, city or state";
                    $scope.disabled = false;
                    $scope.settingsForm = {};
                });
        };

    }
]);

angular.module('myApp').controller('logoutController', ['$scope', '$rootScope', '$location', 'AuthService',
    function($scope, $rootScope, $location, AuthService) {

        $scope.logout = function() {

            // call logout from service
            AuthService.logout()
                .then(function() {
                    $rootScope.logged = false;
                    $location.path('/login');
                });
        };
    }
]);

angular.module('myApp').controller('registerController', ['$scope', '$location', '$timeout', 'AuthService',
    function($scope, $location, $timeout, AuthService) {

        $scope.register = function() {

            // initial values
            $scope.error = false;
            $scope.success = false;
            $scope.disabled = true;

            // call register from service
            AuthService.register($scope.registerForm.username, $scope.registerForm.password)
                // handle success
                .then(function() {
                    $scope.success = true;
                    $scope.successMessage = "Registration Complete!"
                    $scope.disabled = false;
                    $scope.registerForm = {};
                    $timeout(function() {
                        $location.path('/login');
                    }, 4000);

                })
                // handle error
                .catch(function() {
                    $scope.error = true;
                    $scope.errorMessage = "Something went wrong!";
                    $scope.disabled = false;
                    $scope.registerForm = {};
                });
        };
    }
]);

angular.module('myApp').controller('indexController', ['$scope', '$rootScope', 'AuthService',
    function($scope, $rootScope, AuthService) {

        // initialize the 'logged' variable
        $rootScope.logged = false;

        // check if user is logged in 
        // used to update 'logged' variable for the navbar to show/hide nav elements
        AuthService.getUserStatus()
            .then(function() {
                $rootScope.logged = AuthService.isLoggedIn();
                console.log('logged in indexController', $rootScope.logged);
            });

    }
]);