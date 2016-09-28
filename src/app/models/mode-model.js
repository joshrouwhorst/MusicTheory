angular
.module('musicTheory.models')
.factory('Mode', function () {
    'use strict';

    function Mode(name, steps) {
        this.name = name;
        this.steps = steps;
    }

    Mode.prototype = {

    };

    return Mode;
});
