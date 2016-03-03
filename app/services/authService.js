'use strict';

define(['app'], function (app) {
    console.log('Creating AuthService ...');
    var injectParams = ['$http', '$rootScope', '$location', '$q'];

    var authFactory = function ($http, $rootScope, $location, $q) {
        var serviceBase = '/api/dataservice/',
            factory = {
                loginPath: '/login',
                user: {
                    isAuthenticated: false,
                    roles: null
                }
            };

        factory.login = function (email, password){
            //TODO Real logic
            var deferred = $q.defer();

            changeAuth(true);
            deferred.resolve(true);

            return deferred.promise;

//            return $http.post(serviceBase + 'login', { userLogin: { userName: email, password: password } }).then(
//                function (results) {
//                    var loggedIn = results.data.status;
//                    changeAuth(loggedIn);
//                    return loggedIn;
//                });
        };

        factory.logout = function () {
            return $http.post(serviceBase + 'logout').then(
                function (results) {
                    var loggedIn = !results.data.status;
                    changeAuth(loggedIn);
                    return loggedIn;
                });
        };

        factory.redirectToLogin = function () {
            var path = '/login' + $location.$$path;
            $location.replace();
            $location.path(path);
        };

        function changeAuth(loggedIn) {
            factory.user.isAuthenticated = loggedIn;
            $rootScope.$broadcast('loginStatusChanged', loggedIn);
        }

        return factory;
    };

    authFactory.$inject = injectParams;

    app.factory('authService', authFactory);

});