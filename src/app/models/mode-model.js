angular
.module('musicTheory.models')
.factory('Mode', function () {
  'use strict';

  var majorScale = [2, 2, 1, 2, 2, 2, 1];
  var harmonicMinor = [2, 1, 2, 2, 1, 3, 1];
  var melodicMinor = [2, 1, 2, 2, 2, 2, 1];

  function Mode(name, position) {
    this.name = name;
    this.position = position;
    this.steps = getModeSteps(this);
  }

  function getModeSteps(mode) {
    var scaleIdx = mode.position;
    var steps = [];
    var scale;

    if (mode.name === 'Harmonic Minor') {
      scale = harmonicMinor;
      scaleIdx = 0;
    }
    else if (mode.name === 'Melodic Minor') {
      scale = melodicMinor;
      scaleIdx = 0;
    }
    else {
      scale = majorScale;
    }

    for (var i = 0; i < scale.length; i++) {
      steps.push(scale[scaleIdx]);

      scaleIdx++;
      if (scaleIdx >= scale.length) {
        scaleIdx -= scale.length;
      }
    }

    return steps;
  }

  Mode.prototype = {

  };

  return Mode;
});
