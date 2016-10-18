angular
.module('musicTheory.service')
.factory('KeyService', function (Chord, Note, Mode, Key, KeyMode) {
    'use strict';
    var keysCrunched = false;
    var keys = [];
    var keyModes = [];
    var keyedChords = Chord.keyedChords;
    var chords = Chord.chords;

    var chordLayouts = [
        {
            name: {
                full: 'Major',
                quality: 'maj'
            },
            steps: [4, 7]
        },
        {
            name: {
                full: 'Minor',
                quality: 'min'
            },
            steps: [3, 7]
        },
        {
            name: {
                full: 'Augmented',
                quality: 'aug'
            },
            steps: [4, 8]
        },
        {
            name: {
                full: 'Diminished',
                quality: 'dim'
            },
            steps: [3, 6]
        },
        {
            name: {
                full: 'Suspended 2',
                quality: 'sus2'
            },
            steps: [2, 7]
        },
        {
            name: {
                full: 'Suspended 4',
                quality: 'sus4'
            },
            steps: [5, 7]
        },
        {
            name: {
                full: '5',
                quality: '5'
            },
            steps: [7]
        },
        {
            name: {
                full: 'Major 7th',
                quality: 'maj',
                seventh: '7'
            },
            steps: [4, 7, 11]
        },
        {
            name: {
                full: 'Minor 7th',
                quality: 'min',
                seventh: '7'
            },
            steps: [3, 7, 10]
        },
        {
            name: {
                full: 'Dominant 7th',
                seventh: '7'
            },
            steps: [4, 7, 10]
        },
        {
            name: {
                full: 'Minor Major 7th',
                quality: 'min',
                seventh: 'maj7'
            },
            steps: [3, 7, 11]
        },
        {
            name: {
                full: 'Half Diminished 7th',
                seventh: '&#119241;7'
            },
            steps: [3, 6, 10]
        },
        {
            name: {
                full: 'Diminished 7th',
                seventh: '&#119240;7'
            },
            steps: [3, 6, 9]
        },
        {
            name: {
                full: 'Augmented Major 7th',
                quality: 'aug',
                seventh: 'maj7'
            },
            steps: [4, 8, 11]
        }
    ];

    var modes = [
        {
            name: 'Ionian (Major)',
            steps: [2, 4, 5, 7, 9, 11]
        },
        {
            name: 'Dorian',
            steps: [2, 3, 5, 7, 9, 10]
        },
        {
            name: 'Phrygian',
            steps: [1, 3, 5, 7, 8, 10]
        },
        {
            name: 'Lydian',
            steps: [2, 4, 6, 7, 9, 11]
        },
        {
            name: 'Mixolydian',
            steps: [2, 4, 5, 7, 9, 10]
        },
        {
            name: 'Aeolian (Natural Minor)',
            steps: [2, 3, 5, 7, 8, 10]
        },
        {
            name: 'Harmonic Minor',
            steps: [2, 3, 5, 7, 8, 11]
        },
        {
            name: 'Melodic Minor',
            steps: [2, 3, 5, 7, 9, 11]
        },
        {
            name: 'Locrian',
            steps: [1, 3, 5, 6, 8, 10]
        },
        {
            name: 'Major Pentonic',
            steps: [2, 4, 7, 9]
        },
        {
            name: 'Minor Pentonic',
            steps: [3, 5, 7, 10]
        },
        {
            name: 'Blues',
            steps: [3, 5, 6, 7, 10]
        },
        {
            name: 'Minor Blues',
            steps: [2, 3, 5, 6, 7, 8, 10]
        },
        {
            name: 'Major Blues',
            steps: [2, 3, 4, 5, 6, 7, 9, 10]
        },
        {
            name: 'Augmented',
            steps: [2, 4, 6, 8, 10]
        },
        {
            name: 'Diminished',
            steps: [2, 3, 5, 6, 8, 9, 11]
        },
        {
            name: 'Phrygian Dominant',
            steps: [1, 4, 5, 7, 8, 10]
        },
        {
            name: 'Jazz Melodic Minor',
            steps: [2, 3, 5, 7, 9, 11]
        },
        {
            name: 'Phrygian #6',
            steps: [1, 3, 5, 7, 9, 10]
        },
        {
            name: 'Lydian Augmented',
            steps: [2, 4, 6, 8, 9, 11]
        },
        {
            name: 'Lydian Dominant',
            steps: [2, 4, 6, 7, 9, 10]
        },
        {
            name: 'Hindu',
            steps: [2, 4, 5, 7, 8, 10]
        },
        {
            name: 'Locrian #2',
            steps: [2, 3, 5, 6, 8, 10]
        },
        {
            name: 'Altered',
            steps: [1, 3, 4, 6, 8, 10]
        },
        {
            name: 'Whole Half Diminished',
            steps: [2, 3, 5, 6, 8, 9, 11]
        },
        {
            name: 'Half Whole Diminished',
            steps: [1, 3, 4, 6, 7, 9, 10]
        },
        {
            name: 'Enigmatic',
            steps: [1, 4, 6, 8, 10, 11]
        },
        {
            name: 'Double Harmonic',
            steps: [1, 4, 5, 7, 8, 11]
        },
        {
            name: 'Hungarian Minor',
            steps: [2, 3, 6, 7, 8, 11]
        },
        {
            name: 'Persian',
            steps: [1, 4, 5, 6, 8, 11]
        },
        {
            name: 'Arabian',
            steps: [2, 4, 5, 6, 8, 10]
        },
        {
            name: 'Japanese',
            steps: [1, 5, 7, 8]
        },
        {
            name: 'Egyptian',
            steps: [2, 5, 7, 10]
        },
        {
            name: 'Hirajoshi',
            steps: [2, 3, 7, 8]
        }
    ];

    var notes = Note.notes;

    this.getChordById = function (id) {
        return keyedChords[id];
    };

    this.getNoteById = function (id) {
        return notes[id];
    };

    this.getKeyMode = function (id) {
        id = parseInt(id, 10);

        if (isNaN(id)) {
            return null;
        }

        return keyModes[id];
    };

    this.getKeyModeFromRootMode = function (root, mode) {
        for (var i = 0; i < keyModes.length; i++) {
            if (keyModes[i].key.root === root && keyModes[i].mode === mode) {
                return keyModes[i];
            }
        }

        return null;
    };

    function isChordInKey(chord, keyMode) {
        for (var i = 0; i < chord.notes.length; i++) {
            if (!keyMode.scale.includes(chord.notes[i])) {
                return false;
            }
        }

        return true;
    }

    function getChordsForMode(keyMode) {
        for (var i = 0; i < chords.length; i++) {
            if (isChordInKey(chords[i], keyMode)) {
                chords[i].modes.push(keyMode);
                keyMode.chords.push(chords[i]);
            }
        }
    }

    function createChords() {
        for (var i = 0; i < notes.length; i++) {
            for (var j = 0; j < chordLayouts.length; j++) {
                new Chord(notes[i], chordLayouts[j]);
            }
        }
    }

    function createModes() {
        var key, i, j;

        for (i = 0; i < notes.length; i++) {
            key = new Key(notes[i]);
            for (j = 0; j < modes.length; j++) {
                var keyMode = new KeyMode(key, modes[j], notes);
                getChordsForMode(keyMode);
                keyModes[keyMode.id] = keyMode;
                key.modes.push(keyMode);
            }
            keys.push(key);
        }
    }

    function crunchKeys() {
        if (keysCrunched) {
            return;
        }
        keysCrunched = true;

        for (var i = 0; i < notes.length; i++) {
            notes[i] = new Note(notes[i]);
        }

        for (i = 0; i < modes.length; i++) {
            modes[i] = new Mode(modes[i].name, modes[i].steps);
        }

        createChords();
        createModes();

        chords.sort(function (a, b) {
            var numTest = /[0-9]/;
            var aIsSeventh = numTest.test(a.name);
            var bIsSeventh = numTest.test(b.name);

            if (!aIsSeventh && bIsSeventh){
                return -1;
            }
            else if (aIsSeventh && !bIsSeventh){
                return 1;
            }

            var aFirstLetter = a.name.substr(0, 1);
            var bFirstLetter = b.name.substr(0, 1);

            if (aFirstLetter < bFirstLetter) {
                return -1;
            }
            else if (aFirstLetter > bFirstLetter) {
                return 1;
            }

            var aIsSharp = a.name.indexOf('#') > -1;
            var bIsSharp = b.name.indexOf('#') > -1;

            if (!aIsSharp && bIsSharp){
                return -1;
            }
            else if (aIsSharp && !bIsSharp) {
                return 1;
            }

            var aIsSus = a.name.indexOf('sus') > -1;
            var bIsSus = b.name.indexOf('sus') > -1;

            if (aIsSus && !bIsSus) {
                return -1;
            }
            else if (!aIsSus && bIsSus) {
                return 1;
            }

            var otherTest = /^[a-zA-Z0-9# ]/;
            var aIsOther = otherTest.test(a.name);
            var bIsOther = otherTest.test(b.name);

            if (!aIsOther && bIsOther) {
                return -1;
            }
            else if (aIsOther && bIsOther) {
                return 1;
            }

            return 0;
        });
    }

    //this.crunchKeys = crunchKeys;
    this.modes = modes;
    this.notes = notes;
    this.keys = keys;
    this.chords = chords;

    crunchKeys();

    return this;
});
