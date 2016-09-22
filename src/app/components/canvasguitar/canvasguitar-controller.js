angular
.module('canvasguitar', [])
.component('canvasGuitar', {
    templateUrl: './components/canvasguitar/canvasguitar.html',
    controller: ['$scope', '$attrs', '$timeout', function($scope, $attrs, $timeout) {
        'use strict';
        var HEIGHT_RATIO = 0.5; // How tall should the keyboard be in relation to its width
        var NUM_OF_FRETS = 12;

        var canvas, div, ctx, canvasHeight, canvasWidth, options, tuning;

        this.$onInit = function () {
            // I hate having to use a $timeout function, but if you're leaving a view with
            // a canvaskeyboard and going into a new view with one it'll target the last view's
            // and won't render properly.
            $timeout(function () {
                canvas = document.getElementById('guitar');
                div = canvas.parentElement;
                ctx = canvas.getContext('2d');
                canvasHeight = 0;
                canvasWidth = 0;
                options = {
                    tuning: ['E', 'A', 'D', 'G', 'B', 'E'],
                    highlightNotes: [],
                    fretColor: '#666666',
                    highlightColor: '#23B5D3',
                    textColor: '#EA526F',
                    textFont: '15pt Arial',
                    updateSpeed: 500,
                    blackColor: '#111111'
                };

                setupCommunication();
                loop();
            });
        }


        var rawNotes = [
            {
                name: 'C'
            },
            {
                name: 'C#'
            },
            {
                name: 'D'
            },
            {
                name: 'D#'
            },
            {
                name: 'E'
            },
            {
                name: 'F'
            },
            {
                name: 'F#'
            },
            {
                name: 'G'
            },
            {
                name: 'G#'
            },
            {
                name: 'A'
            },
            {
                name: 'A#'
            },
            {
                name: 'B'
            }
        ];

        var strings = [];

        // Handles sizing the canvas element
        function resize() {
            var octaveHeightModifier = 1 / 2;
            canvasWidth = canvas.width = div.clientWidth;
            canvasHeight = canvas.height = Math.round(canvasWidth * HEIGHT_RATIO * octaveHeightModifier);
        }

        function getHighlightColor(key) {
            for (var i = 0; i < options.alterKeys.length; i++) {
                var highKey = options.alterKeys[i];
                if (highKey.highlight && highKey.name.toLowerCase() === key.name.toLowerCase() && (options.octaves === 1 || !highKey.octive || highKey.octave === key.octave)) {
                    if (highKey.highlightColor) {
                        return highKey.highlightColor;
                    }
                    else {
                        return options.highlightColor;
                    }
                }
            }

            return false;
        }

        function getText(key) {
            for (var i = 0; i < options.alterKeys.length; i++) {
                var textKey = options.alterKeys[i];
                if (textKey.text && textKey.name.toLowerCase() === key.name.toLowerCase() && (options.octaves === 1 || !textKey.octave || textKey.octave === key.octave)) {
                    return textKey.text;
                }
            }

            return null;
        }

        function draw() {
            var sideSpace = Math.floor(canvasWidth * 0.1),
                bottomSpace = Math.floor(canvasHeight * 0.1),
                fretHeight = canvasHeight - bottomSpace,
                fretZero = sideSpace + 0.5,
                fretWidth = Math.floor(canvasWidth - sideSpace / NUM_OF_FRETS),
                stringHeight = fretHeight / tuning.length;

            // Draw frets
            for (var i = 0; i < NUM_OF_FRETS; i++) {
                var startPointX = fretZero;
                var startPointY = 0.5;

                startPointX += Math.round(i * fretWidth);
                ctx.strokeStyle = options.fretColor;
                ctx.lineWidth = 1;
                ctx.strokeRect(startPointX, startPointY, fretWidth, fretHeight);
            }

            // Draw tuning labels
            for (var i = 0; i < tuning.length; i++) {
                var startPointX = Math.floor(sideSpace * 0.5);
                var startPointY = Math.floor((stringHeight * i) + (stringHeight / 2));
                ctx.font = options.textFont;
                ctx.fillStyle = options.blackColor;
                ctx.textAlign = 'center';
                ctx.fillText(tuning[i], startPointX, startPointY);
            }

            // Draw strings
            for (var i = 0; i < strings.length; i++) {
                var startPointX = fretZero;
                var startPointY = Math.floor((stringHeight * i) + (stringHeight / 2));
                ctx.strokeStyle = options.blackColor;
                ctx.lineWidth = strings.length - i;
                ctx.beginPath();
                ctx.moveTo(startPointX, startPointY);
                ctx.lineTo(canvasWidth, startPointY);
                ctx.stroke();
            }

            // Draw highlight notes
            for (var i = 0; i < strings.length; i++) {
                for (var j = 0; j < strings[i].length; j++) {
                    var note = strings[i];
                    if (!options.highlightNotes.includes(note.name)) {
                        continue;
                    }

                    if (j === 0) {
                        ctx.strokeStyle = options.blackColor;
                        ctx.lineWidth = 1;
                        var startPointX = Math.floor(fretZero - sideSpace * 0.2);
                        var startPointY = Math.floor(stringHeight * i - stringHeight / 2);
                        var radius = Math.floor(stringHeight / 5);
                        ctx.beginPath();
                        ctx.arc(startPointX, startPointY, radius, 0, 2 * Math.PI, false);
                        ctx.stroke();
                    }
                    else {
                        ctx.strokeStyle = options.highlightColor;
                        ctx.lineWidth = 1;
                        var startPointX = Math.floor(fretZero + j * fretWidth + fretWidth / 2);
                        var startPointY = Math.floor(stringHeight * i - stringHeight / 2);
                        var radius = Math.floor(stringHeight / 3);
                        ctx.beginPath();
                        ctx.arc(startPointX, startPointY, radius, 0, 2 * Math.PI, false);
                        ctx.stroke();
                        ctx.font = options.textFont;
                        ctx.fillStyle = options.blackColor;
                        ctx.textAlign = 'center';
                        ctx.fillText(note.name, startPointX, startPointY);
                    }
                }
            }
        }

        function drawOld() {
            var whiteKeysSoFar = 0;
            var blackKeyWidth = Math.floor(blackKeyWidthPerc * (canvasWidth - 1));
            var whiteKeyWidth = Math.floor(whiteKeyWidthPerc * (canvasWidth - 1));
            var blackKeyHeight = Math.round(canvasHeight / 2);
            var whiteKeyHeight = canvasHeight;
            var key, startPointX, startPointY, text, highlightColor;

            // Do the white keys first
            for (var i = 0; i < keys.length; i++) {
                key = keys[i];
                startPointX = 0;
                startPointY = 0.5;

                if (key.blackKey) {
                    continue;
                }

                startPointX = 0.5;
                startPointX += Math.round((whiteKeysSoFar * whiteKeyWidth));

                highlightColor = getHighlightColor(key);

                if (highlightColor) {
                    ctx.fillStyle = highlightColor;
                    ctx.fillRect(startPointX, startPointY, whiteKeyWidth, whiteKeyHeight - 1);
                }

                ctx.strokeStyle = options.blackColor;
                ctx.lineWidth = 1;
                ctx.strokeRect(startPointX, startPointY, whiteKeyWidth, whiteKeyHeight - 1);

                text = getText(key);

                if (text) {
                    ctx.font = options.textFont;
                    ctx.fillStyle = options.textColor;
                    ctx.textAlign = 'center';
                    ctx.fillText(text, startPointX + (whiteKeyWidth / 2), Math.round(whiteKeyHeight * 0.75));
                }

                whiteKeysSoFar++;
            }

            whiteKeysSoFar = 0;

            // Now draw the black keys over the white keys
            for (i = 0; i < keys.length; i++) {
                key = keys[i];
                startPointX = 0;
                startPointY = 0.5;

                if (!key.blackKey) {
                    whiteKeysSoFar++;
                    continue;
                }

                startPointX += Math.round((whiteKeysSoFar * whiteKeyWidth) - (blackKeyWidth / 2));

                highlightColor = getHighlightColor(key);

                if (highlightColor) {
                    ctx.fillStyle = highlightColor;
                    ctx.fillRect(startPointX, startPointY, blackKeyWidth, blackKeyHeight - 1);
                    ctx.strokeStyle = options.blackColor;
                    ctx.lineWidth = 1;
                    ctx.strokeRect(startPointX + 0.5, startPointY, blackKeyWidth, blackKeyHeight - 1);
                }
                else {
                    ctx.fillStyle = options.blackColor;
                    ctx.fillRect(startPointX, startPointY, blackKeyWidth, blackKeyHeight - 1);
                }

                text = getText(key);

                if (text) {
                    ctx.font = options.textFont;
                    ctx.fillStyle = options.textColor;
                    ctx.textAlign = 'center';
                    ctx.fillText(text, startPointX + (blackKeyWidth / 2), Math.round(blackKeyHeight * 0.75));
                }
            }
        }

        function figureOutKeyWidth() {
            blackKeys = 0;
            whiteKeys = 0;

            for (var i = 0; i < keys.length; i++) {
                if (keys[i].name.indexOf('#') > -1) {
                    blackKeys++;
                    keys[i].blackKey = true;
                }
                else {
                    whiteKeys++;
                    keys[i].blackKey = false;
                }
            }

            whiteKeyWidthPerc = 1 / whiteKeys;
            blackKeyWidthPerc = whiteKeyWidthPerc * 0.5;
        }

        function loop() {
            if (options.tuning !== tuning) {
                setupStrings();
                //figureOutKeyWidth();
            }

            resize();
            draw();
            setTimeout(loop, options.updateSpeed);
        }

        // Goes through each string figuring out the notes
        function setupStrings() {
            strings = [];
            tuning = options.tuning;

            for (var i = 0; i < tuning.length; i++) {
                var notes = [];
                strings.push(notes);
                var idx = rawNotes.indexOf(tuning[i]);
                for (var j = idx, fret = 0; fret < NUM_OF_FRETS; fret++) {
                    notes.push({
                        name: rawNotes[j],
                        string: i,
                    });
                    j++;
                    if (j >= rawNotes.length) {
                        j -= rawNotes.length;
                    }
                }
            }
        }

        // Lets the widget's controller interact with the keyboard
        function setupCommunication() {
            var parent = $scope.$parent;

            if (!parent.keyboards) {
                parent.keyboards = [];
            }

            var obj = {
                id: $attrs.id,
                index: parent.keyboards.length,
                rawNotes: rawNotes,
                options: options
            };

            parent.keyboards.push(obj);

            // Let the parent setup options immediately
            if (parent.keyboardAdded) {
                parent.keyboardAdded(obj);
            }
        }
    }]
});
