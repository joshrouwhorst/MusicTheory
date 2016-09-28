angular
.module('musicTheory.models')
.factory('KeyMode', function () {
    'use strict';
    var keyModeCount = 0;

    function KeyMode(key, mode, notes) {
        this.key = key;
        this.mode = mode;
        this.name = key.root.name + ' ' + mode.name;
        this.scale = getNotesFromMode(this, notes);
        this.id = keyModeCount++;
        this.link = '#/widget/modechart?id=' + this.id;
        this.chords = [];
    }

    function getNotesFromMode(keyMode, notes) {
        var noteArr = [keyMode.key.root],
            rootIdx = notes.indexOf(keyMode.key.root),
            noteIdx = rootIdx,
            steps = keyMode.mode.steps;

        for (var i = 0; i < steps.length; i++) {
            noteIdx = rootIdx + steps[i];

            if (noteIdx >= notes.length) {
                noteIdx -= notes.length;
            }

            noteArr.push(notes[noteIdx]);
        }

        return noteArr;
    }

    KeyMode.prototype = {

    };

    return KeyMode;
});
