angular
.module('musicTheory.widget')
.controller('NoteCtrl', ['$scope', '$routeParams', '$location', '$timeout', 'KeyService', function ($scope, $routeParams, $location, $timeout, KeyService) {
    'use strict';

    var notes = KeyService.notes;
    var chords = [];
    var visualblock;
    var rows = [];

    function visualBlockAdded(vb) {
        visualblock = vb;
        getNoteFromParam();
    }

    function getNoteFromParam() {
        if ($routeParams.id !== undefined) {
            var note = KeyService.getNoteById($routeParams.id);

            if (note) {
                $scope.selectedNote = note;
                updateView();
            }
        }
    }

    $scope.$root.$on('$locationChangeSuccess', getNoteFromParam);

    function updateView() {
        var note = $scope.selectedNote;

        if (!note || !visualblock) {
            return;
        }

        visualblock.updateOptions({
            notes: [{
                name: note.name,
                highlight: true
            }
        ]});

        chords.length = 0;
        var maxRowSize = 4;

        for (var i = 0; i < note.chords.length; i++) {
            var chord = note.chords[i];
            var row = [];
            var chordObj = {
                chord: chord,
                rows: [row]
            };
            chords.push (chordObj);
            var rowSize = 0;


            for (var j = 0; j < chord.modes.length; j++) {
                if (rowSize >= maxRowSize) {
                    rowSize = 0;
                    row = [];
                    chordObj.rows.push(row);
                }
                rowSize++;
                row.push(chord.modes[j]);
            }

            // Making sure it fills a partial row with empty cells
            if (row.length < maxRowSize) {
                row.length = maxRowSize;
            }
        }
    }

    function update() {
        var note = $scope.selectedNote;

        if (note && $scope.routeParams.id !== note.id) {
            $scope.location.search('id', note.id);
        }
    }

    $scope.routeParams = $routeParams;
    $scope.location = $location;
    $scope.rows = rows;
    $scope.update = update;
    $scope.visualBlockAdded = visualBlockAdded;
    $scope.notes = notes;
    $scope.chords = chords;
}]);
