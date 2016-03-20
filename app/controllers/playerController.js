'use strict';

define(['app'], function (app) {

    var injectParams = ['playerService'];

    var PlayerController = function(playerService){
        console.log('Loading player controller ...');

        var vm = this;

        vm.addPlayer = function(){
            console.log("add player ...");
            if(vm.playersName != null && vm.playersName.length > 0) {
                playerService.addPlayer({
                    name: vm.playersName,
                    selected: true,
                    score: 100
                });
                vm.playersName = null;
            }
        }
    };

    PlayerController.$inject = injectParams;

    app.controller('PlayerController', PlayerController);

});