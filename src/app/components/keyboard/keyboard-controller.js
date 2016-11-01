angular
.module('musicTheory.widget')
.controller('KeyboardCtrl', ['$scope', 'KeyService', 'AudioService', function($scope, KeyService, AudioService) {
    'use strict';
    var keyboards = [],
        oneHandKeyboard,
        twoHandKeyboard,
        noteMappings = [],
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
            },
            {
                num: 76,
                key: 'L'
            },
            {
                num: 90,
                key: 'Z'
            },
            {
                num: 88,
                key: 'X'
            },
            {
                num: 90,
                key: 'Z'
            },
            {
                num: 67,
                key: 'C'
            },
            {
                num: 86,
                key: 'V'
            },
            {
                num: 66,
                key: 'B'
            },
            {
                num: 78,
                key: 'N'
            },
            {
                num: 77,
                key: 'M'
            },
            {
                num: 81,
                key: 'Q'
            },
            {
                num: 82,
                key: 'R'
            },
            {
                num: 79,
                key: 'O'
            },
            {
                num: 80,
                key: 'P'
            },
            {
                num: 49,
                key: '1'
            },
            {
                num: 50,
                key: '2'
            },
            {
                num: 51,
                key: '3'
            },
            {
                num: 52,
                key: '4'
            },
            {
                num: 53,
                key: '5'
            },
            {
                num: 54,
                key: '6'
            },
            {
                num: 55,
                key: '7'
            },
            {
                num: 56,
                key: '8'
            },
            {
                num: 57,
                key: '9'
            },
            {
                num: 48,
                key: '0'
            }
        ],
        notesOneHand = [
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
        ],
        notesTwoHand = {
            handOne: [
                {
                    name: 'C',
                    text: 'Z'
                },
                {
                    name: 'C#',
                    text: 'S'
                },
                {
                    name: 'D',
                    text: 'X'
                },
                {
                    name: 'D#',
                    text: 'D'
                },
                {
                    name: 'E',
                    text: 'C'
                },
                {
                    name: 'F',
                    text: 'V'
                },
                {
                    name: 'F#',
                    text: 'G'
                },
                {
                    name: 'G',
                    text: 'B'
                },
                {
                    name: 'G#',
                    text: 'H'
                },
                {
                    name: 'A',
                    text: 'N'
                },
                {
                    name: 'A#',
                    text: 'J'
                },
                {
                    name: 'B',
                    text: 'M'
                }
            ],
            handTwo: [
                {
                    name: 'C',
                    text: 'R'
                },
                {
                    name: 'C#',
                    text: '5'
                },
                {
                    name: 'D',
                    text: 'T'
                },
                {
                    name: 'D#',
                    text: '6'
                },
                {
                    name: 'E',
                    text: 'Y'
                },
                {
                    name: 'F',
                    text: 'U'
                },
                {
                    name: 'F#',
                    text: '8'
                },
                {
                    name: 'G',
                    text: 'I'
                },
                {
                    name: 'G#',
                    text: '9'
                },
                {
                    name: 'A',
                    text: 'O'
                },
                {
                    name: 'A#',
                    text: '0'
                },
                {
                    name: 'B',
                    text: 'P'
                }
            ]
        };

    function keyboardAdded(kb) {
        keyboards.push(kb);

        if (kb.id === "twoHand") {
            twoHandKeyboard = kb;
        }
        else {
            oneHandKeyboard = kb;
        }

        kb.options.octaves = 1;
        kb.options.updateSpeed = 100;

        changeHands();
        setOptions();
    }

    function changeHands() {
        noteMappings.length = 0;
        if ($scope.twoHanded) {
            noteMappings.push(notesTwoHand[0]);
            noteMappings.push(notesTwoHand[1]);
        }
        else {
            noteMappings.push(notesOneHand);
        }
    }

    function keydown(e) {
        var key = e.key.toLowerCase();

        for (var i = 0; i < keymapping.length; i++) {
            if (keymapping[i].key.toLowerCase() === key) {
                var note;
                var hand;

                for (var j = 0; j < noteMappings.length && !note; j++) {
                    var notes = noteMappings[j];
                    hand = j;
                    for (var k = 0; k < notes.length; k++) {
                        if (notes[k].text === keymapping[i].key) {
                            note = notes[k];
                            break;
                        }
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
                    note.tone = AudioService.playNote(note.noteObj, 4 + hand, 0.5);
                    note.tone2 = AudioService.playNote(note.noteObj, 5 + hand, 0.5); // Sounds better with two tones
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
                var note, hand;

                for (var j = 0; j < noteMappings.length && !note; j++) {
                    var notes = noteMappings[j];
                    hand = j;
                    for (var k = 0; k < notes.length; k++) {
                        if (notes[k].text === keymapping[i].key) {
                            note = notes[k];
                            break;
                        }
                    }
                }

                if (note && pressedKeys.includes(note)) {
                    var idx = pressedKeys.indexOf(note);
                    pressedKeys.splice(idx, 1);
                    if (note.tone) { AudioService.stopNote(note.tone); }
                    if (note.tone2) { AudioService.stopNote(note.tone2); }
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
        if (keyboards.length !== 2) { return; }

        for (var i = 0; i < noteMappings.length; i++) {
            var notes = noteMappings[i];
            var keyboard;
            if (i === 0) {
                keyboard = oneHandKeyboard;
            }
            else {
                keyboard = twoHandKeyboard;
            }

            var opts = keyboard.options;
            opts.alterKeys.length = 0;

            for (var j = 0; j < notes.length; j++) {
                var note = notes[j];

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
    }

    function init() {
        for (var i  = 0; i < noteMappings.length; i++) {
            var notes = noteMappings[i];
            for (var j = 0; j < notes.length; j++) {
                var note = notes[j];

                for (var k = 0; k < KeyService.notes.length; k++) {
                    if (KeyService.notes[k].name === note.name) {
                        note.noteObj = KeyService.notes[k];
                        break;
                    }
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
