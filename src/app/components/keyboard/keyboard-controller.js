angular
.module('musicTheory.widget')
.controller('KeyboardCtrl', ['$scope', 'KeyService', 'AudioService', function($scope, KeyService, AudioService) {
    'use strict';
    var keyboard,
        pressedKeys = [],
        keymapping = [
            {
                num: 97,
                key: 'A'
            },
            {
                num: 119,
                key: 'W'
            },
            {
                num: 115,
                key: 'S'
            },
            {
                num: 101,
                key: 'E'
            },
            {
                num: 100,
                key: 'D'
            },
            {
                num: 102,
                key: 'F'
            },
            {
                num: 116,
                key: 'T'
            },
            {
                num: 103,
                key: 'G'
            },
            {
                num: 121,
                key: 'Y'
            },
            {
                num: 104,
                key: 'H'
            },
            {
                num: 117,
                key: 'U'
            },
            {
                num: 106,
                key: 'J'
            },
            {
                num: 105,
                key: 'I'
            },
            {
                num: 107,
                key: 'K'
            }
        ],
        notes = [
            {
                name: 'C',
                text: 'A'
            },
            {
                name: 'C#',
                text: 'W'
            },
            {
                name: 'D',
                text: 'S'
            },
            {
                name: 'D#',
                text: 'E'
            },
            {
                name: 'E',
                text: 'D'
            },
            {
                name: 'F',
                text: 'F'
            },
            {
                name: 'F#',
                text: 'T'
            },
            {
                name: 'G',
                text: 'G'
            },
            {
                name: 'G#',
                text: 'Y'
            },
            {
                name: 'A',
                text: 'H'
            },
            {
                name: 'A#',
                text: 'U'
            },
            {
                name: 'B',
                text: 'J'
            }
        ];

    function keyboardAdded(kb) {
        keyboard = kb;
        kb.options.octaves = 1;
        kb.options.updateSpeed = 100;

        setOptions();
    }

    function keydown(e) {
        var key = e.key.toLowerCase();

        for (var i = 0; i < keymapping.length; i++) {
            if (keymapping[i].key.toLowerCase() === key) {
                var note;

                for (var j = 0; j < notes.length; j++) {
                    if (notes[j].text === keymapping[i].key) {
                        note = notes[j];
                        break;
                    }
                }

                if (!note) {
                    break;
                }

                if ($scope.limitToKey && !isInKey(note)) {
                    break;
                }

                if (note && !pressedKeys.includes(note)) {
                    pressedKeys.push(note);
                    note.tone = AudioService.playNote(note.noteObj);
                    note.tone2 = AudioService.playNote(note.noteObj, 5);
                    // note.tone3 = AudioService.playNote(note.noteObj, 3);
                }

                break;
            }
        }

        setOptions();
    }

    function keyup(e) {
        var key = e.key.toLowerCase();

        for (var i = 0; i < keymapping.length; i++) {
            if (keymapping[i].key.toLowerCase() === key) {
                var note;

                for (var j = 0; j < notes.length; j++) {
                    if (notes[j].text === keymapping[i].key) {
                        note = notes[j];
                        break;
                    }
                }

                if (note && pressedKeys.includes(note)) {
                    var idx = pressedKeys.indexOf(note);
                    pressedKeys.splice(idx, 1);
                    if (note.tone) { AudioService.stopNote(note.tone); }
                    if (note.tone2) { AudioService.stopNote(note.tone2); }
                    // if (note.tone3) { AudioService.stopNote(note.tone3); }
                    note.tone = null;
                }

                break;
            }
        }

        setOptions();
    }

    function getKey() {
        if (!$scope.selectedKey || !$scope.selectedMode) { return null; }
        return KeyService.getKeyModeFromRootMode($scope.selectedKey, $scope.selectedMode);
    }

    function isInKey(note) {
        var km = getKey();
        if (!km) { return false; }
        return km.scale.includes(note.noteObj);
    }

    function setOptions() {
        if (!keyboard) { return; }
        var opts = keyboard.options;
        opts.alterKeys.length = 0;

        for (var i = 0; i < notes.length; i++) {
            var note = notes[i];

            if (pressedKeys.includes(note)) {
                note.highlight = true;
                note.highlightColor = '#279AF1';
                note.textColor = '#FFFFFF';
            }
            else if (isInKey(note)) {
                note.highlight = true;
                note.highlightColor = '#BBBBBB';
                note.textColor = '#111111';
            }
            else if (note.name.indexOf('#') > -1){
                note.highlight = false;
                note.textColor = '#FFFFFF';
            }
            else {
                note.highlight = false;
                note.textColor = '#111111';
            }

            opts.alterKeys.push(note);
        }
    }

    function init() {
        for (var i = 0; i < notes.length; i++) {
            var note = notes[i];

            for (var j = 0; j < KeyService.notes.length; j++) {
                if (KeyService.notes[j].name === note.name) {
                    note.noteObj = KeyService.notes[j];
                    break;
                }
            }
        }
    }

    $scope.keyboardAdded = keyboardAdded;
    $scope.keydown = keydown;
    $scope.keyup = keyup;
    $scope.keys = KeyService.notes;
    $scope.modes = KeyService.modes;
    $scope.setOptions = setOptions;
    init();
}]);
