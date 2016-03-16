/**
 * Created by Bram Trappeniers on 16/03/16.
 */
'use strict';

define(['app'], function (app) {

    var injectParams = ['gameService'];

    var GameController = function (gameService) {
        console.log("Loading game ...");

        var vm = this;

        vm.gameInProgress = gameService.isGameInProgress();

        gameService.registerObserver(function(){
            vm.gameInProgress = gameService.isGameInProgress();
        });

    };

    GameController.$inject = injectParams;

    app.register.controller('GameController', GameController);

});