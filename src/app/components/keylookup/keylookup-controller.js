angular
.module('musicTheory.widget')
.controller('KeyLookupCtrl', ['$scope', 'KeyService', function ($scope, KeyService) {
  'use strict';

  var selectedVals = [];
  var keyModes = [];
  var rows = [];
  var lookupTypes = [
    {
      name: 'Notes',
      modeAttr: 'scale',
      vals: KeyService.notes
    },
    {
      name: 'Chords',
      modeAttr: 'chords',
      vals: KeyService.chords
    }
  ];

  $scope.valueSelector = {};

  function selectType() {
    var i = parseInt($scope.typeDropdown, 10);
    $scope.selectedType = lookupTypes[i];
    $scope.selectedVals.length = 0;
  }

  function addSelectedVal(val) {
    var newVal = $scope.valueSelector.value;
    var found = false;

    for (var i = 0; i < selectedVals.length && !found; i++) {
      found = selectedVals[i].obj === newVal;
    }

    if (newVal && !found) {
      selectedVals.push({
        name: newVal.formatted ? newVal.formatted.full : newVal.name,
        obj: newVal
      });
    }
  }

  function deleteSelectedVal(note) {
    var i = selectedVals.indexOf(note);
    selectedVals.splice(i, 1);
  }

  function lookup() {
    var keys = KeyService.keys;
    var type = $scope.selectedType;
    var maxRowSize = 4;
    var row = [];

    rows.length = 0;
    rows.push(row);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      for (var j = 0; j < key.modes.length; j++) {
        var mode = key.modes[j];
        var good = true;

        for (var k = 0; k < selectedVals.length && good; k++) {
          good = mode[type.modeAttr].includes(selectedVals[k].obj);
        }

        if (good) {
          if (row.length >= maxRowSize) {
            row = [];
            rows.push(row);
          }
          row.push(mode);
        }
      }
    }

    $scope.noneFound = rows.length === 0 || rows[0].length === 0;
  }

  $scope.rows = rows;
  $scope.lookupTypes = lookupTypes;
  $scope.selectType = selectType;
  $scope.selectedVals = selectedVals;
  $scope.keyModes = keyModes;
  $scope.addSelectedVal = addSelectedVal;
  $scope.deleteSelectedVal = deleteSelectedVal;
  $scope.lookup = lookup;
}]);
