angular
.module('musicTheory.models', [])
.factory('Chord', function () {
    'use strict';

    var keyedChords = {};
    var chords = [];

    function Chord(rootNote, layout) {
        this.root = rootNote;
        this.notes = [rootNote];
        this.layout = layout;
        this.modes = [];

        for (var i = 0; i < layout.steps.length; i++) {
            this.notes.push(rootNote.getNoteBySteps(layout.steps[i]));
        }

        setId(this);
        this.setFormat();
        keyedChords[this.id] = this;
        this.root.chords.push(this);
        chords.push(this);
        this.link = '#/widget/chord?id=' + this.id;

        return this;
    }

    function setId(chord) {
        var id = '';
        for (var i = 0; i < chord.notes.length; i++) {
            id = id + chord.notes[i].name;
        }
        chord.id = id.replace(/#/g, '_');
        chord.link = '#/widget/chord/' + chord.id;
    }

    Chord.prototype = {
        setId: function () {

        },
        setFormat: function() {
            var key = this.root.name,
                name = this.layout.name,
                quality = name.quality || '',
                seventh = name.seventh || '';

            //this.name = (key + quality + seventh).trim();
            this.name = (key + ' ' + name.full).trim();

            this.formatted = {
                full: '<span class="key">' + key + '</span><span class="quality">' + quality + '</span><sup class="seventh">' + seventh + '</sup>',
                key: key.trim(),
                quality: quality.trim(),
                seventh: seventh.trim()
            };
        }
    };

    Chord.keyedChords = keyedChords;
    Chord.chords = chords;

    return Chord;
});
