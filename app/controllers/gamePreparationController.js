'use strict';

define(['app'], function (app) {

    var injectParams = ['playerService','gameService'];

    var GamePreparation = function(playerService, gameService){
        console.log('Loading game preparation controller ...');

        var vm = this;

        vm.players = playerService.getPlayers();

        vm.addPlayer = function(){
            if(vm.playersName != null && vm.playersName.length > 0) {
                playerService.addPlayer({
                    name: vm.playersName,
                    selected: true,
                    score: 100
                });
                vm.playersName = null;
            }
        };

        vm.selectActivePlayer = function(player){
            playerService.setActivePlayer(player);
        };

        vm.switchPlayers = function(player){
            playerService.switchPlayers(player);
        };

        vm.startGame = function(){
            gameService.startGame();
        };
    };

    GamePreparation.$inject = injectParams;

    app.controller('gamePreparationController', GamePreparation);

});