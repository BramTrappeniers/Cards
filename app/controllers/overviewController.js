'use strict';

define(['app'], function (app) {

    var injectParams = [];

    var OverviewController = function () {
        console.log('Loading overview ...');

        var vm = this;
        vm.players = [];
        vm.showNewPlayer = true;

        var getNextDealer = function () {
            var index = 0
            if(vm.currentDealer != undefined) {
                if(vm.currentDealer.index < (vm.players.length - 1)) {
                    index = vm.currentDealer.index + 1;
                }
            }
            return {
                player: vm.players[index],
                index: index
            }
        }

        vm.addPlayer = function () {
            console.log("Add player ...");
            if(vm.playersName != null && vm.playersName.length > 0) {
                var newPlayer = {
                    name: vm.playersName,
                    score: 0
                };
                vm.players.push(newPlayer);
                if(vm.players.length == 4){
                    vm.startGame();
                }
            }
            vm.playersName = undefined;
        };
        vm.startGame = function () {
            console.log("Start game ...");
            vm.showNewPlayer = false;
            vm.currentDealer = getNextDealer();
        };
        vm.submitRound = function () {
            for(var i = 0; i < vm.players.length; i++) {
                var player = vm.players[i];
                if(player.offer == player.hits){
                    player.score = player.score + 10 + player.offer;
                } else {
                    player.score = player.score - (Math.abs(player.offer - player.hits));
                }
                player.offer = player.hits = undefined;
            };
            console.log(vm.players);
            vm.currentDealer = getNextDealer();
        }

        var addDummyData = function () {
            vm.playersName = "test 1";
            vm.addPlayer();
            vm.playersName = "test 2";
            vm.addPlayer();
            vm.playersName = "test 3";
            vm.addPlayer();
            vm.playersName = "test 4";
            vm.addPlayer();
        }
        addDummyData();
    };

    OverviewController.$inject = injectParams;

    app.register.controller('OverviewController', OverviewController);

});