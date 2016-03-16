'use strict';

define(['app'], function (app) {

    var injectParams = ['playerService', 'gameService'];

    var PlayersOverviewController = function(playerService, gameService){
        console.log('Loading players overview controller ...');

        var vm = this;

        vm.regularPlayers = playerService.getPlayers();

        vm.removePlayer = function(name){
            console.log("remove player");
            var toBeRemoved = name || "test";
            var index = vm.regularPlayers.indexOf(toBeRemoved);
            if(index > -1){
                vm.regularPlayers.splice(index, 1);
            }
        };
        vm.startGame = function(){
            gameService.startGame();
        };
        var updatePlayers = function(){
            vm.regularPlayers = playerService.getPlayers();
        };
        playerService.registerObserver(updatePlayers);
    };

    PlayersOverviewController.$inject = injectParams;

    app.controller('PlayersOverviewController', PlayersOverviewController);

});