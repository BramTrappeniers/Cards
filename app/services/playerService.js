/**
 * Created by JA15283 on 16/03/16.
 */
'use strict';

define(['app'], function (app) {

    var injectParams = [];

    var playerService = function(){
        var players = [{
            name: "Bram T",
            selected: false,
            score: 0
        }, {
            name: "Rob",
            selected: false,
            score: 0
        }, {
            name: "Maarten",
            selected: false,
            score: 0
        }];
        var activePlayer;
        var observerCalls = [];

        var registerObserver = function(fn){
            observerCalls.push(fn);
        };
        var notifyObservers = function(){
            angular.forEach(observerCalls, function(fn){
                fn();
            });
        };

        var addPlayer = function(player){
            players.push(player);
            notifyObservers();
        };

        var getPlayers = function(filtered){
            if(filtered){
                var selected = [];
                angular.forEach(players, function(player){
                    if(player.selected){
                        selected.push(player);
                    }
                });
                return selected;
            } else {
                return players;
            }
        }

        var switchPlayers = function(switchedPlayer){
            console.log('switching in service ...');

            if(activePlayer != switchedPlayer){
                var indexOfActivePlayer = 0, indexOfSwitchedPlayer = 0;
                angular.forEach(players, function(player, index){
                    if(player == activePlayer){
                        indexOfActivePlayer = index;
                    } else if(player == switchedPlayer){
                        indexOfSwitchedPlayer = index;
                    }
                });
                players[indexOfActivePlayer] = switchedPlayer;
                players[indexOfSwitchedPlayer] = activePlayer;
            }
        };

        var setActivePlayer = function(player){
            console.log(player);
            activePlayer = player;
        };

        return {
            addPlayer: addPlayer,
            getPlayers: getPlayers,
            registerObserver: registerObserver,
            switchPlayers: switchPlayers,
            setActivePlayer: setActivePlayer
        }
    }

    playerService.$inject = injectParams;

    app.factory('playerService', playerService);
});