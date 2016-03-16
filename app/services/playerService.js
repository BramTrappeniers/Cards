/**
 * Created by JA15283 on 16/03/16.
 */
'use strict';

define(['app'], function (app) {

    var injectParams = [];

    var playerService = function(){
        var players = [{
            name: "Bram T",
            selected: false
        }, {
            name: "Rob",
            selected: false
        }, {
            name: "Maarten",
            selected: false
        }];
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

        var getPlayers = function(){
            return players;
        }

        return {
            addPlayer: addPlayer,
            getPlayers: getPlayers,
            registerObserver: registerObserver
        }
    }

    playerService.$inject = injectParams;

    app.factory('playerService', playerService);
});