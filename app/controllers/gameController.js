/**
 * Created by Bram Trappeniers on 16/03/16.
 */
'use strict';

define(['app'], function (app) {

    var injectParams = ['gameService', 'playerService'];

    var GameController = function (gameService, playerService) {
        console.log("Loading game ...");

        var vm = this;

        vm.TABS = [
            {
                name: "spelers",
                show: true,
                src: "app/views/game/players.html"
            },
            {
                name: "bieden",
                show: false,
                src: "app/views/game/bidding.html"
            }
        ];

        var resetAllTabs= function(){
            angular.forEach(vm.TABS, function(tab){
                tab.show = false;
            })
        };

        vm.activateTab = function(tab){
            resetAllTabs();
            tab.show = true;
        };

        vm.players = playerService.getPlayers(true);
    };

    GameController.$inject = injectParams;

    app.controller('GameController', GameController);

});