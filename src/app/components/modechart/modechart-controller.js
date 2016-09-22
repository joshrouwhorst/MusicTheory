angular
.module('musicTheory.widget')
.controller('ModeChartCtrl', ['$scope', '$routeParams', '$timeout', '$location', 'KeyService', function ($scope, $routeParams, $timeout, $location, KeyService) {
    'use strict';

    var visualblock;
    var notes = [];
    var chords = [];
    var videos = [
        {
            name: 'Introduction to Modes',
            link: 'https://www.youtube.com/watch?v=d_DxhbYwJDA'
        },
        {
            name: 'How to Turn a Mode Into Music',
            link: 'https://www.youtube.com/watch?v=3hgP_PuviTg'
        }
    ];

    var modes = KeyService.modes;
    var keys = KeyService.keys;

    $scope.visualBlockAdded = function (vb) {
        visualblock = vb;
        visualblock.updateOptions({ octaves: 2 });
        getKeyFromParam();
    };

    function getKeyFromParam() {
        if ($routeParams.id !== undefined) {
            $timeout(function() {
                $scope.$apply(function() {
                    var keyMode = KeyService.getKeyMode($routeParams.id);
                    if (keyMode) {
                        $scope.selectedKey = keyMode.key;
                        $scope.selectedMode = keyMode.mode;
                        updateView(keyMode);
                    }
                });
            });
        }
    }

    $scope.$root.$on('$locationChangeSuccess', getKeyFromParam);

    function updateView(mode) {
        if (!visualblock) return;

        var vbNotes = [];

        for (var i = 0; i < mode.scale.length; i++) {
            var obj = {
                name: mode.scale[i].name,
                highlight: true,
                text: (i + 1)
            };

            if (i === 0) {
                obj.highlightColor = '#279AF1';
            }

            vbNotes.push(obj);

            notes.push(mode.scale[i]);
        }

        visualblock.updateOptions({ notes: vbNotes });

        for (i = 0; i < mode.chords.length; i++) {
            chords.push(mode.chords[i]);
        }
    }

    function updateKeyboard() {
        var key = $scope.selectedKey;
        var mode = $scope.selectedMode;
        notes.length = 0;
        chords.length = 0;

        if (!key || !mode || !keyboard) {
            return false;
        }

        for (var i = 0; i < key.modes.length; i++) {
            if (key.modes[i].mode.name === mode.name) {
                mode = key.modes[i];
                break;
            }
        }

        $scope.location.search('id', mode.id);
    }

    $scope.location = $location;
    $scope.modes = modes;
    $scope.notes = notes;
    $scope.chords = chords;
    $scope.videos = videos;
    $scope.keys = keys;
    $scope.updateKeyboard = updateKeyboard;
}]);
