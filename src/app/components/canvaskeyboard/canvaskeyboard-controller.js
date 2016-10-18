angular
.module('canvaskeyboard', [])
.component('canvasKeyboard', {
    templateUrl: './components/canvaskeyboard/canvaskeyboard.html',
    controller: ['$scope', '$attrs', '$timeout', function($scope, $attrs, $timeout) {
        'use strict';
        var HEIGHT_RATIO = 0.5; // How tall should the keyboard be in relation to its width

        var canvas, div, ctx, canvasHeight, canvasWidth, whiteKeys, blackKeys,
            whiteKeyWidthPerc, blackKeyWidthPerc, octaves, options;

        this.$onInit = function () {
            // I hate having to use a $timeout function, but if you're leaving a view with
            // a canvaskeyboard and going into a new view with one it'll target the last view's
            // and won't render properly.
            $timeout(function () {
                canvas = document.getElementById('keyboard');
                div = canvas.parentElement;
                ctx = canvas.getContext('2d');
                canvasHeight = 0;
                canvasWidth = 0;
                whiteKeys = 0; // Count of how many keys there are.
                blackKeys = 0;
                whiteKeyWidthPerc = 0; // Width of keys by percent of canvas' width.
                blackKeyWidthPerc = 0;
                octaves = 0;
                options = {
                    octaves: 1,
                    alterKeys: [],
                    highlightColor: '#bfbfbf',
                    textColor: '#111111',
                    textFont: '15pt Arial',
                    updateSpeed: 500,
                    blackColor: '#111111'
                };

                setupCommunication();
                loop();
            });
        };


        var rawKeys = [
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

        var keys = [];

        // Handles sizing the canvas element
        function resize() {
            var octaveHeightModifier = 1 / options.octaves;
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
                    return {
                        text: textKey.text,
                        textColor: textKey.textColor
                    };
                }
            }

            return null;
        }

        function draw() {
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
                    ctx.fillStyle = text.textColor || options.textColor;
                    ctx.textAlign = 'center';
                    ctx.fillText(text.text, startPointX + (whiteKeyWidth / 2), Math.round(whiteKeyHeight * 0.75));
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
                    ctx.fillStyle = text.textColor || options.textColor;
                    ctx.textAlign = 'center';
                    ctx.fillText(text.text, startPointX + (blackKeyWidth / 2), Math.round(blackKeyHeight * 0.75));
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
            if (options.octaves !== octaves) {
                setupKeys();
                figureOutKeyWidth();
            }

            resize();
            draw();
            setTimeout(loop, options.updateSpeed);
        }

        // Adds however many keys we need for this keyboard
        function setupKeys() {
            octaves = options.octaves;
            keys = [];
            for (var i = 1; i <= options.octaves; i++) {
                for (var j = 0; j < rawKeys.length; j++) {
                    keys.push({
                        name: rawKeys[j].name,
                        octave: i
                    });
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
                rawKeys: rawKeys,
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
