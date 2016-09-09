angular
.module('musicTheory.widget')
.controller('ChordCtrl', ['$scope', '$routeParams', '$location', 'KeyService', function($scope, $routeParams, $location, KeyService) {
  'use strict';
  var chords = KeyService.chords;
  var keyboard;
  var rows = [];
  var videos = [
      {
          name: 'How Basic Chords Work - Music Theory Lesson 1',
          link: 'https://www.youtube.com/watch?v=5Y01jIorpeA'
      },
      {
          name: 'How Seventh Chords Work (part 1) - Music Theory Lesson 2',
          link: 'https://www.youtube.com/watch?v=3tbK2jtVRM8'
      },
      {
          name: 'How Seventh Chords Work (part 2) - Music Theory Lesson 3',
          link: 'https://www.youtube.com/watch?v=rLhbK9g8yyE'
      },
      {
          name: 'How to Fit Chords Into a Key (Music Theory)',
          link: 'https://www.youtube.com/watch?v=xLaw0CLTNfA'
      },
      {
        name: 'How to Invert Chords',
        link: 'https://www.youtube.com/watch?v=Nr2XBoanNJY'
      },
      {
          name: 'How Suspended Chords Work, And Some Cool Things You Can Do With Them',
          link: 'https://www.youtube.com/watch?v=oQsxM5LPrwc'
      }
  ];

  function getSelectedChord() {
    // var i = parseInt($scope.selectedChord, 10);
    //
    // if (isNaN(i)) {
    //   return null;
    // }
    //
    // return chords[i];

    if ($scope.valueSelector.value) {
      return $scope.valueSelector.value;
    }
  }

  function keyboardAdded(kb) {
    keyboard = kb;
    kb.options.octaves = 2;
    getChordFromParam();
  }

  function getChordFromParam() {
    if ($routeParams.id !== undefined) {
      var chord = KeyService.getChordById($routeParams.id);

      if (chord) {
        updateView(chord);
      }
    }
  }

  $scope.$root.$on('$locationChangeSuccess', getChordFromParam);

  function updateView(chord) {
    if (chord === null || !keyboard) {
      return;
    }

    $scope.showcaseChord = chord;

    keyboard.options.alterKeys = [];

    for (var i = 0; i < chord.notes.length; i++) {
      var note = chord.notes[i];
      var obj = {
        name: note.name,
        highlight: true
      };

      if (i === 0) {
        obj.highlightColor = '#279AF1';
      }

      keyboard.options.alterKeys.push(obj);
    }

    rows.length = 0;

    if (chord.modes.length > 0) {
      var row = [];
      var maxRowSize = 4;
      rows.push(row);

      for (i = 0; i < chord.modes.length; i++) {
        if (row.length >= maxRowSize) {
          row = [];
          rows.push(row);
        }

        row.push(chord.modes[i]);
      }

      if (row.length < maxRowSize) {
        row.length = maxRowSize;
      }
    }
  }

  function update(chord) {
    if (!chord) {
      chord = getSelectedChord();
    }

    if (chord) {
      $scope.location.search('id', chord.id);
    }
  }

  $scope.location = $location;
  $scope.rows = rows;
  $scope.chords = chords;
  $scope.update = update;
  $scope.keyboardAdded = keyboardAdded;
  $scope.videos = videos;
  $scope.valueSelector = {};
}]);
