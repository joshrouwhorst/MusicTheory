angular
.module('musicTheory.models')
.factory('Key', function () {
    'use strict';

    function Key(root) {
        this.root = root;
        this.modes = [];
    }

    Key.prototype = {

    };

    return Key;
});
