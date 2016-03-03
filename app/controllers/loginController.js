'use strict';

define(['app'], function (app) {

    var injectParams = ['$scope','$location','authService','$routeParams'];

    var LoginController = function ($scope, $location, authService, $routeParams) {
        console.log('Logging into the system ...');

        var vm = this;

        vm.email = null;
        vm.password = null;
        vm.errorMessage = null;

        vm.login = function(){
            authService.login(vm.email, vm.password).then(function(status){
                var path = '/';
                if (!status) {
                    vm.errorMessage = 'Unable to login';
                    return;
                }

                if (status && $routeParams && $routeParams.redirect) {
                    path = path + $routeParams.redirect;
                }

                $location.path(path);
            })
        };
    };

    LoginController.$inject = injectParams;

    app.register.controller('LoginController', LoginController);

});