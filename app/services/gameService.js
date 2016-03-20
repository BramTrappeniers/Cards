/**
 * Created by JA15283 on 16/03/16.
 */
'use strict';

define(['app'], function (app) {

    var injectParams = [];

    var GameService = function () {
        var observerCalls = [];
        var registerObserver = function(fn){
            observerCalls.push(fn);
        };
        var notifyObservers = function(){
            angular.forEach(observerCalls, function(fn){
                fn();
            });
        };


        var STATUSSES = {
            INIT: "0",
            STARTED: "1",
            ENDED: "2"
        };
        var gameStatus = STATUSSES.INIT;
        var startGame = function(){
            gameStatus = STATUSSES.STARTED;
            notifyObservers();
        }
        var endGame = function(){
            gameStatus = STATUSSES.ENDED;
            notifyObservers()
        }
        var isGameInProgress = function(){
            return gameStatus == STATUSSES.STARTED;
        }
        var isGameStarted = function(){
            return gameStatus != STATUSSES.INIT;
        }

        return {
            startGame: startGame,
            endGame: endGame,
            isGameInProgress: isGameInProgress,
            isGameStarted: isGameStarted,
            registerObserver: registerObserver
        }
    };

    GameService.$inject = injectParams;

    app.factory('gameService', GameService);

});