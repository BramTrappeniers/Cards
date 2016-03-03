'use strict';

define(['app'], function (app) {

    var injectParams = [];

    var OtherpageController = function () {
        console.log('Loading other page ...');
    };

    OtherpageController.$inject = injectParams;

    app.register.controller('OtherpageController', OtherpageController);

});