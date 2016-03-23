/**
 * Created by JA15283 on 20/03/16.
 */
'use strict';

define(['app'], function (app) {

    var injectParams = ['gameService'];

    var OverviewController = function (gameService) {
        console.log('Loading overview ...');

        var vm = this;

        vm.isGameInProgress = gameService.isGameInProgress();

        gameService.registerObserver(function(){
            vm.isGameInProgress = gameService.isGameInProgress();
        });
    };

    OverviewController.$inject = injectParams;

    app.register.controller('OverviewController', OverviewController);

});