'use strict';

define(['app'], function (app) {

    var injectParams = ['playerService', 'gameService'];

    var PlayersOverviewController = function(playerService, gameService){
        console.log('Loading players overview controller ...');

        var vm = this;

        vm.selectActivePlayer = function(player){
            playerService.setActivePlayer(player);
        }

        vm.switchPlayers = function(player){
            console.log('switching in controller ...');
            playerService.switchPlayers(player);
        };

        vm.players = playerService.getPlayers();
        vm.isGameStarted = gameService.isGameStarted();

        vm.removePlayer = function(name){
            console.log("remove player");
            var toBeRemoved = name || "test";
            var index = vm.players.indexOf(toBeRemoved);
            if(index > -1){
                vm.players.splice(index, 1);
            }
        };
        vm.startGame = function(){
            gameService.startGame();
            vm.players = playerService.getPlayers(gameService.isGameStarted());
        };
        var updatePlayers = function(){
            vm.players = playerService.getPlayers();
        };
        playerService.registerObserver(updatePlayers);
        gameService.registerObserver(function(){
            vm.isGameStarted = gameService.isGameStarted();
        });
    };

    PlayersOverviewController.$inject = injectParams;

    app.controller('PlayersOverviewController', PlayersOverviewController);

});