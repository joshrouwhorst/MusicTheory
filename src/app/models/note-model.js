angular
.module('musicTheory.models')
.factory('Note', function () {
    'use strict';
    var noteCount = 0;
    var notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

    function Note(name) {
        this.name = name;
        this.chords = [];
        this.id = noteCount++;
        this.link = '#/widget/note?id=' + this.id;
    }

    Note.prototype = {
        getNoteBySteps: function (steps) {
            return Note.getNoteBySteps(this, steps);
        }
    };

    Note.notes = notes;

    Note.getNoteBySteps = function(rootNote, steps) {
        var idx = notes.indexOf(rootNote);
        var nextIdx = idx + steps;
        if (nextIdx >= notes.length) {
            nextIdx -= notes.length;
        }
        return notes[nextIdx];
    };

    return Note;
});
