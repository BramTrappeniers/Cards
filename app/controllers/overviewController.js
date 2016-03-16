'use strict';

define(['app'], function (app) {

    var injectParams = [];

    var OverviewController = function () {
        console.log('Loading overview ...');

        var vm = this;

        var nextId = 0;

        vm.showNewPlayer = true;
        vm.openHits = false;
        vm.SECTIONS = {
            AddPlayer: {
                show: true
            },
            Dealer: {
                show: false
            }
        }
        var randomDealer = function () {
            var index = Math.floor(Math.random() * vm.players.length);
            return {
                player: vm.players[index],
                index: index
            }
        }
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
                    score: 0,
                    active: false,
                    id: nextId++
                };
                if(vm.players == null) {
                    vm.players = [];
                }
                vm.players.push(newPlayer);
            }
            vm.playersName = undefined;
        };
        vm.startGame = function () {
            console.log("Start game ...");
            vm.SECTIONS.AddPlayer.show = false;
            vm.SECTIONS.Dealer.show = true;
            vm.currentDealer = randomDealer();
            vm.activatePlayer(getNextDealer().player);
        };
        vm.submitRound = function () {
            for(var i = 0; i < vm.players.length; i++) {
                var player = vm.players[i];
                if(player.bid == player.hits){
                    player.score = player.score + 10 + player.bid;
                } else {
                    player.score = player.score - (Math.abs(player.bid - player.hits));
                }
                player.bid = player.hits = null;
            };
            console.log(vm.players);
            vm.currentDealer = getNextDealer();
            var nextPlayerIndex = vm.currentDealer.index + 1;
            if(nextPlayerIndex == vm.players.length) {
                nextPlayerIndex = 0;
            }
            vm.activatePlayer(vm.players[nextPlayerIndex]);
            vm.openHits = false;
        }
        vm.activatePlayer = function (player) {
            console.log("Open bidding ..." + player.id);
            for(var i = 0; i< vm.players.length; i++){
                vm.players[i].active = false;
            }
            player.active = true;
            vm.bidPlayer = player.bid;
            vm.hitsPlayer = player.hits;
//            _.each(vm.players, function(player) {
//                player.active = false;
//            });
        };
        vm.registerBid = function (player) {
            //TODO:
            // - check number and format to number
            // - improve focus of the field
            console.log("Register bidding ... ");
            player.bid = vm.bidPlayer;
            for(var i = 0; i< vm.players.length; i++){
                if(player == vm.players[i]) {
                    var nextPlayerIndex = i + 1;
                    if(nextPlayerIndex == vm.players.length) {
                        nextPlayerIndex = 0;
                    }
                    vm.activatePlayer(vm.players[nextPlayerIndex]);
                    vm.bidPlayer = vm.players[nextPlayerIndex].bid;
                    if(vm.players[nextPlayerIndex].bid != null) {
                        vm.openHits = true;
                    }
                }
            }
        }
        vm.registerHits = function (player) {
            player.hits = vm.hitsPlayer;
            for(var i = 0; i< vm.players.length; i++){
                if(player == vm.players[i]) {
                    var nextPlayerIndex = i + 1;
                    if(nextPlayerIndex == vm.players.length) {
                        nextPlayerIndex = 0;
                    }
                    vm.activatePlayer(vm.players[nextPlayerIndex]);
                    vm.hitsPlayer = vm.players[nextPlayerIndex].hits;
                }
            }
        }
        vm.canSubmit = function () {
            for(var i = 0; i< vm.players.length; i++){
                if(vm.players[i].bid == null || vm.players[i].hits == null) {
                    return false;
                }
                return true;
            }
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