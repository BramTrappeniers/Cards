'use strict';

define(['app'], function (app) {

    var injectParams = [];

    var OverviewController = function () {
        console.log('Loading overview ...');

        var vm = this;

        var nextId = 0;

        vm.showNewPlayer = true;
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
        vm.activatePlayer = function (player) {
            console.log("Open bidding ..." + player.id);
            for(var i = 0; i< vm.players.length; i++){
                vm.players[i].active = false;
            }
            player.active = true;
            vm.bidPlayer = player.bid;
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
            vm.bidPlayer = null;
            for(var i = 0; i< vm.players.length; i++){
                if(player == vm.players[i]) {
                    var nextPlayerIndex = i + 1;
                    if(nextPlayerIndex == vm.players.length) {
                        vm.activatePlayer(vm.players[0])
                    } else {
                        vm.activatePlayer(vm.players[nextPlayerIndex]);
                    }
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