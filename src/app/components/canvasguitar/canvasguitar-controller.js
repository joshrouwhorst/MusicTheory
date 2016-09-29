angular
.module('canvasguitar', [])
.component('canvasGuitar', {
    templateUrl: './components/canvasguitar/canvasguitar.html',
    controller: ['$scope', '$attrs', '$timeout', function($scope, $attrs, $timeout) {
        'use strict';
        var HEIGHT_RATIO = 0.6; // How tall should the guitar be in relation to its width
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
                    highlightNotes: [],
                    fretColor: '#AAAAAA',
                    highlightColor: '#bfbfbf',
                    textColor: '#111111',
                    textFont: '12pt Arial',
                    fretFont: '10pt Arial',
                    updateSpeed: 500,
                    blackColor: '#111111'
                };

                $scope.tuningSelection = $scope.tunings[0];
                tuningSelected();

                setupCommunication();
                loop();
            });
        };


        var rawNotes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

        var strings = [];

        // Handles sizing the canvas element
        function resize() {
            canvasWidth = canvas.width = div.clientWidth;
            canvasHeight = canvas.height = Math.round(canvasWidth * HEIGHT_RATIO);
        }

        function draw() {
            var sideSpace = Math.floor(canvasWidth * 0.1),
                bottomSpace = Math.floor(canvasHeight * 0.1),
                fretHeight = canvasHeight - bottomSpace,
                fretZero = sideSpace + 0.5,
                fretWidth = Math.floor((canvasWidth - sideSpace) / NUM_OF_FRETS),
                stringHeight = fretHeight / tuning.length,
                startPointX, startPointY, revI, radius;

            ctx.clearRect(0, 0, canvasWidth, canvasHeight);

            // Draw frets
            for (var i = 0; i < NUM_OF_FRETS; i++) {
                startPointX = fretZero;
                startPointY = 0.5;

                startPointX += Math.round(i * fretWidth);
                ctx.strokeStyle = options.fretColor;
                ctx.lineWidth = 1;
                ctx.strokeRect(startPointX, startPointY, fretWidth, fretHeight);
            }

            // Draw tuning labels
            for (i = 0; i < tuning.length; i++) {
                revI = tuning.length - i;
                startPointX = Math.floor(sideSpace * 0.5);
                startPointY = Math.floor((stringHeight * revI) - (stringHeight / 2)) + 7;
                ctx.font = options.textFont;
                ctx.fillStyle = options.blackColor;
                ctx.textAlign = 'center';
                ctx.fillText(tuning[i], startPointX, startPointY);
            }

            // Draw fret labels
            for (i = 0; i < NUM_OF_FRETS; i++) {
                startPointX = sideSpace + fretWidth * i + fretWidth / 2;
                startPointY = fretHeight + bottomSpace / 2 + 5;
                ctx.font = options.fretFont;
                ctx.fillStyle = options.blackColor;
                ctx.textAlign = 'center';
                ctx.fillText((i + 1).toString(), startPointX, startPointY);
            }

            // Draw strings
            for (i = 0; i < strings.length; i++) {
                revI = tuning.length - i;
                var modifier = 0;
                ctx.lineWidth = strings.length - i;

                if (ctx.lineWidth % 2 !== 0) {
                    modifier = 0.5;
                }

                startPointX = fretZero;
                startPointY = Math.floor((stringHeight * revI) - (stringHeight / 2)) - modifier;
                ctx.strokeStyle = options.blackColor;
                ctx.beginPath();
                ctx.moveTo(startPointX, startPointY);
                ctx.lineTo(fretWidth * NUM_OF_FRETS + sideSpace, startPointY);
                ctx.stroke();
            }

            // Draw highlight notes
            for (i = 0; i < strings.length; i++) {
                for (var j = 0; j < strings[i].length; j++) {
                    var note = strings[i][j];
                    if (!options.highlightNotes.includes(note.name)) {
                        continue;
                    }

                    revI = strings.length - i;

                    if (j === 0) { // Open strings
                        ctx.strokeStyle = options.blackColor;
                        ctx.lineWidth = 1;
                        startPointX = Math.floor(fretZero - sideSpace * 0.2);
                        startPointY = Math.floor(stringHeight * revI - stringHeight / 2);
                        radius = fretWidth / 6;
                        ctx.beginPath();
                        ctx.arc(startPointX, startPointY, radius, 0, 2 * Math.PI, false);
                        ctx.stroke();
                    }
                    else { // Fingered strings
                        ctx.strokeStyle = options.highlightColor;
                        ctx.lineWidth = 1;
                        startPointX = Math.floor(fretZero + (j - 1) * fretWidth + fretWidth / 2);
                        startPointY = Math.floor(stringHeight * revI - stringHeight / 2);
                        //var radius = Math.floor(stringHeight / 3);
                        radius = fretWidth / 3;
                        ctx.beginPath();
                        ctx.arc(startPointX, startPointY, radius, 0, 2 * Math.PI, false);
                        ctx.stroke();
                        ctx.fillStyle = options.highlightColor;
                        ctx.fill();
                        ctx.font = options.textFont;
                        ctx.fillStyle = options.blackColor;
                        ctx.textAlign = 'center';
                        ctx.fillText(note.name, startPointX, startPointY + radius / 1.7);
                    }
                }
            }
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
                for (var j = idx, fret = 0; fret <= NUM_OF_FRETS; fret++) {
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

        // Lets the widget's controller interact with the guitar
        function setupCommunication() {
            var parent = $scope.$parent;

            if (!parent.guitars) {
                parent.guitars = [];
            }

            var obj = {
                id: $attrs.id,
                index: parent.guitars.length,
                rawNotes: rawNotes,
                options: options
            };

            parent.guitars.push(obj);

            // Let the parent setup options immediately
            if (parent.guitars) {
                parent.guitarAdded(obj);
            }
        }

        function tuningSelected() {
            var newTuning = $scope.tuningSelection.tuning;

            // $scope.string1 = tuning[0];
            // $scope.string2 = tuning[1];
            // $scope.string3 = tuning[2];
            // $scope.string4 = tuning[3];
            // $scope.string5 = tuning[4];
            // $scope.string6 = tuning[5];

            for (var i = 0; i < newTuning.length; i++) {
                var note = null;
                for (var j = 0; j < $scope.selectNotes.length && !note; j++) {
                    if ($scope.selectNotes[j].name === newTuning[i]) {
                        note = $scope.selectNotes[j];
                    }
                }
                $scope['string' + (i + 1)] = note;
            }

            updateTuning();
        }

        function updateTuning() {
            options.tuning = [];

            for (var i = 0; i < 6; i++) {
                options.tuning.push($scope['string' + (i + 1)].name);
            }

            setupStrings();
            draw();
        }

        $scope.tunings = [
            {
                name: 'Standard',
                tuning: ['E', 'A', 'D', 'G', 'B', 'E']
            },
            {
                name: 'Drop D',
                tuning: ['D', 'A', 'D', 'G', 'B', 'E']
            },
            {
                name: 'Half Step Down',
                tuning: ['D#', 'G#', 'C#', 'F#', 'A#', 'D#']
            },
            {
                name: 'Full Step Down',
                tuning: ['D', 'G', 'C', 'F', 'A', 'D']
            },
            {
                name: 'Open D',
                tuning: ['D', 'A', 'D', 'F#', 'A', 'D']
            },
            {
                name: 'Open D Minor',
                tuning: ['D', 'A', 'D', 'F', 'A', 'D']
            }
        ];
        $scope.tuningSelected = tuningSelected;
        $scope.selectNotes = [];
        $scope.draw = draw;
        $scope.updateTuning = updateTuning;

        for (var i = 0; i < rawNotes.length; i++) {
            $scope.selectNotes.push({name: rawNotes[i]});
        }
    }]
});
