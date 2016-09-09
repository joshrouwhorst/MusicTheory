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

  function formatKey(val) {
    var sharp = '';
    if (val.indexOf('-') > -1) {
      val = val.split('-')[0];
      sharp = '#';
    }

    val = val.toUpperCase();
    return val + sharp;
  }

  function formatQuality(quality, seventh) {
    if (quality === 'maj' && seventh === 'maj') {
      return 'maj';
    }
    else if (quality === 'maj' && seventh === 'min') {
      return '';
    }
    else if (quality === 'dim' && seventh === 'min') {
      return '';
    }
    else if (quality === 'dim' && seventh === 'dim') {
      return '';
    }

    return quality;
  }

  function formatSeventh(seventh, quality) {
    if (quality === 'min' && seventh === 'maj') {
      return 'maj7';
    }
    else if (quality === 'dim' && seventh === 'min') {
      return '&#119241;7';
    }
    else if (quality === 'dim' && seventh === 'dim') {
      return '&#119240;7';
    }
    else if (quality === 'aug') {
      return 'maj7';
    }

    return '7';
  }


  generate();

  $scope.generate = generate;
  $scope.showQuality = true;
  $scope.showSeventh = true;
  $scope.videos = videos;
}]);
