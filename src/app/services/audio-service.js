angular
.module('musicTheory.service')
.factory('AudioService', ['$timeout', function ($timeout) {
    'use strict';

    var _this = this;
    var DEFAULT_OCTAVE = 4;

    this.playChord = function (chord, octave) {
        var lastNote, note, oct = octave || DEFAULT_OCTAVE;

        for (var i = 0; i < chord.notes.length; i++) {
            note = chord.notes[i];

            if (i > 0 && note.id < lastNote.id) {
                oct++; // Increase the octave so we're not playing inverted chords
            }
            _this.playNote(chord.notes[i], oct);
            lastNote = note;
        }
    };

    this.playNote = function (note, octave) {
        var oct = octave || DEFAULT_OCTAVE;
        return createTone(note.name + oct);
    };

    this.stopNote = function (tone) {
        tone.stop();
    };

    function createTone(pitch, duration) {
        var tone = new Wad(Wad.presets.piano);

        tone.play({
            pitch: pitch,
            label: pitch,
            volume: 0.5,
            env: {
                decay: 1,
                release: 1
            }
        });

        if (duration) {
            $timeout(function () {
                _this.stopNote(pitch);
            }, duration);
        }

        return tone;
    }

    return this;
}]);
