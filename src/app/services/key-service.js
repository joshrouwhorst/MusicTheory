angular
.module('musicTheory.service')
.factory('KeyService', function (Chord, Note, Mode, Key, KeyMode) {
  'use strict';
  var keysCrunched = false;
  var keys = [];
  var keyModes = [];
  var majorScale = [2, 2, 1, 2, 2, 2, 1];
  var harmonicMinor = [2, 1, 2, 2, 1, 3, 1];
  var melodicMinor = [2, 1, 2, 2, 2, 2, 1];
  var keyedChords = Chord.keyedChords;
  var chords = Chord.chords;

  var chordLayouts = [
    {
      name: {
        full: 'Major',
        quality: 'maj'
      },
      steps: [4, 7]
    },
    {
      name: {
        full: 'Minor',
        quality: 'min'
      },
      steps: [3, 7]
    },
    {
      name: {
        full: 'Augmented',
        quality: 'aug'
      },
      steps: [4, 8]
    },
    {
      name: {
        full: 'Diminished',
        quality: 'dim'
      },
      steps: [3, 6]
    },
    {
      name: {
        full: 'Suspended 2',
        quality: 'sus2'
      },
      steps: [2, 7]
    },
    {
      name: {
        full: 'Suspended 4',
        quality: 'sus4'
      },
      steps: [5, 7]
    },
    {
      name: {
        full: '5',
        quality: '5'
      },
      steps: [7]
    },
    {
      name: {
        full: 'Major 7th',
        quality: 'maj',
        seventh: '7'
      },
      steps: [4, 7, 11]
    },
    {
      name: {
        full: 'Minor 7th',
        quality: 'min',
        seventh: '7'
      },
      steps: [3, 7, 10]
    },
    {
      name: {
        full: 'Dominant 7th',
        seventh: '7'
      },
      steps: [4, 7, 10]
    },
    {
      name: {
        full: 'Minor Major 7th',
        quality: 'min',
        seventh: 'maj7'
      },
      steps: [3, 7, 11]
    },
    {
      name: {
        full: 'Half Diminished 7th',
        seventh: '&#119241;7'
      },
      steps: [3, 6, 10]
    },
    {
      name: {
        full: 'Diminished 7th',
        seventh: '&#119240;7'
      },
      steps: [3, 6, 9]
    },
    {
      name: {
        full: 'Augmented Major 7th',
        quality: 'aug',
        seventh: 'maj7'
      },
      steps: [4, 8, 11]
    }
  ];

  var modes = [
    {
      name: 'Ionian (Major Scale)',
      position: 0
    },
    {
      name: 'Dorian',
      position: 1
    },
    {
      name: 'Phrygian',
      position: 2
    },
    {
      name: 'Lydian',
      position: 3
    },
    {
      name: 'Mixolydian',
      position: 4
    },
    {
      name: 'Aeolian (Natural Minor)',
      position: 5
    },
    {
      name: 'Harmonic Minor',
      position: 5
    },
    {
      name: 'Melodic Minor',
      position: 5
    },
    {
      name: 'Locrian',
      position: 6
    }];
  var notes = Note.notes;

  this.getChordById = function (id) {
    return keyedChords[id];
  };

  this.getNoteById = function (id) {
    return notes[id];
  };

  this.getKeyMode = function (id) {
    id = parseInt(id, 10);

    if (isNaN(id)) {
      return null;
    }

    return keyModes[id];
  };

  function isChordInKey(chord, keyMode) {
    for (var i = 0; i < chord.notes.length; i++) {
      if (!keyMode.scale.includes(chord.notes[i])) {
        return false;
      }
    }

    return true;
  }

  function getChordsForMode(keyMode) {
    for (var i = 0; i < chords.length; i++) {
      if (isChordInKey(chords[i], keyMode)) {
        chords[i].modes.push(keyMode);
        keyMode.chords.push(chords[i]);
      }
    }
  }

  function createChords() {
    for (var i = 0; i < notes.length; i++) {
      for (var j = 0; j < chordLayouts.length; j++) {
        new Chord(notes[i], chordLayouts[j]);
      }
    }
  }

  function createModes() {
    var note, mode, key, i, j;

    for (i = 0; i < notes.length; i++) {
      key = new Key(notes[i]);
      for (j = 0; j < modes.length; j++) {
        var keyMode = new KeyMode(key, modes[j], notes);
        getChordsForMode(keyMode);
        keyModes[keyMode.id] = keyMode;
        key.modes.push(keyMode);
      }
      keys.push(key);
    }
  }

  function crunchKeys() {
    if (keysCrunched) {
      return;
    }
    keysCrunched = true;

    for (var i = 0; i < notes.length; i++) {
      notes[i] = new Note(notes[i]);
    }

    for (i = 0; i < modes.length; i++) {
      modes[i] = new Mode(modes[i].name, modes[i].position);
    }

    createChords();
    createModes();

    chords.sort(function (a, b) {
      var numTest = /[0-9]/;
      var aIsSeventh = numTest.test(a.name);
      var bIsSeventh = numTest.test(b.name);

      if (!aIsSeventh && bIsSeventh){
        return -1;
      }
      else if (aIsSeventh && !bIsSeventh){
        return 1;
      }

      var aFirstLetter = a.name.substr(0, 1);
      var bFirstLetter = b.name.substr(0, 1);

      if (aFirstLetter < bFirstLetter) {
        return -1;
      }
      else if (aFirstLetter > bFirstLetter) {
        return 1;
      }

      var aIsSharp = a.name.indexOf('#') > -1;
      var bIsSharp = b.name.indexOf('#') > -1;

      if (!aIsSharp && bIsSharp){
        return -1;
      }
      else if (aIsSharp && !bIsSharp) {
        return 1;
      }

      var aIsSus = a.name.indexOf('sus') > -1;
      var bIsSus = b.name.indexOf('sus') > -1;

      if (aIsSus && !bIsSus) {
        return -1;
      }
      else if (!aIsSus && bIsSus) {
        return 1;
      }

      var otherTest = /^[a-zA-Z0-9# ]/;
      var aIsOther = otherTest.test(a.name);
      var bIsOther = otherTest.test(b.name);

      if (!aIsOther && bIsOther) {
        return -1;
      }
      else if (aIsOther && bIsOther) {
        return 1;
      }

      return 0;
    });
  }

  //this.crunchKeys = crunchKeys;
  this.modes = modes;
  this.notes = notes;
  this.keys = keys;
  this.chords = chords;

  crunchKeys();

  return this;
});
