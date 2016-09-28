angular
.module('musicTheory.widget', [])
.controller('RandomChordCtrl', ['$scope', 'KeyService', function ($scope, KeyService) {
    'use strict';

    var chords = KeyService.chords;
    var videos = [
        {
            name: 'How Chords Work',
            link: 'https://www.youtube.com/watch?v=5Y01jIorpeA'
        },
        {
            name: 'How Seventh Chords Work (Part 1)',
            link: 'https://www.youtube.com/watch?v=3tbK2jtVRM8'
        }, {
            name: 'How Seventh Chords Work (Part 2)',
            link: 'https://www.youtube.com/watch?v=rLhbK9g8yyE'
        }
    ];

    function generate() {
        var chord = getRandomValue(chords);

        $scope.key = chord.formatted.key.htmlSafe();
        $scope.quality = chord.formatted.quality.htmlSafe();
        $scope.seventh = chord.formatted.seventh.htmlSafe();
    }

    function getRandomValue(arr) {
        var rand = Math.floor(Math.random() * arr.length);
        return arr[rand];
    }

    generate();

    $scope.generate = generate;
    $scope.showQuality = true;
    $scope.showSeventh = true;
    $scope.videos = videos;
}]);
