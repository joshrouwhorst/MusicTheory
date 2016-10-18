angular
.module('previewLink', ['musicTheory.service'])
.component('previewLink', {
    templateUrl: './components/previewlink/previewlink.html',
    bindings: {
        note: '=',
        chord: '='
    },
    controller: ['$scope', '$element', 'AudioService', function ($scope, $element, AudioService) {
        'use strict';

        var ctrl = $scope.$ctrl;
        var note, chord, previewWindow;

        $scope.open = function () {
            previewWindow.addClass('active');
        };

        $scope.close = function () {
            previewWindow.removeClass('active');
        };

        $scope.playPreview = function () {
            if (chord) {
                AudioService.playChord(chord);
            }
            else if (note) {
                AudioService.playNote(note);
            }
        };

        $scope.imHere = function () {
            var baseElement = $element[0];
            var className = baseElement.getElementsByClassName('preview-window');
            var windowRaw = className[0];
            previewWindow = angular.element(windowRaw);
        };

        if (ctrl.note) {
            note = ctrl.note;
            $scope.name = note.name;
            $scope.link = note.link;
        }
        else if (ctrl.chord) {
            chord = ctrl.chord;
            $scope.chord = chord;
            $scope.name = chord.formatted.full;
            $scope.link = chord.link;
        }
        else {
            throw 'Need to provide a note or chord to preview links';
        }
    }]
});
