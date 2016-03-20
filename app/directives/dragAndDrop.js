/**
 * Created by JA15283 on 19/03/16.
 */
'use strict';

define(['app'], function (app) {

    var DragAndDrop = function () {
        return {
            scope: {
                dropenter: '&',
                dragactive: '&'
            },
            link: function(scope,element){
                var el = element[0];

                el.draggable = true;

                el.addEventListener(
                    'dragstart',
                    function(e) {
                        e.dataTransfer.effectAllowed = 'move';
                        this.classList.add('dragging');
                        scope.$apply('dragactive()');

                        return false
                    },
                    false
                );

                el.addEventListener(
                    'dragend',
                    function(e) {
                        this.classList.remove('dragging');
                        return false
                    },
                    false
                );

                el.addEventListener(
                    'dragover',
                    function(e){
                        e.dataTransfer.dropEffect = 'move';
                        if(e.preventDefault) e.preventDefault();
                        return false;
                    },
                    false
                );
                el.addEventListener(
                    'dragenter',
                    function(e){
                        scope.$apply('dropenter()');
                    },
                    false
                );
                el.addEventListener(
                    'dragleave',
                    function(e){
                    },
                    false
                );
                el.addEventListener(
                    'drop',
                    function(e){
                        if(e.stopPropagation) e.stopPropagation();
                        //Call function to change positions
                    },
                    false
                );
            }
        };
    };

    app.directive('dragAndDrop', DragAndDrop);

});