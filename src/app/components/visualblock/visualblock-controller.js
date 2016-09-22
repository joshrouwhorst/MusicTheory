angular
.module('visualblock', [])
.component('visualBlock', {
    templateUrl: './components/visualblock/visualblock.html',
    controller: ['$scope', '$attrs', function($scope, $attrs) {
        var keyboard,
            guitar,
            options = {
                octaves: 1,
                notes: []
            };

        this.$onInit = function () {
            $scope.selectedVisual = 'keyboard';
            $scope.$parent.visualBlockAdded($scope);
        };

        function updateOptions(opts) {
            for (var opt in opts) {
                options[opt] = opts[opt];
            }
            updateKeyboard();
            updateGuitar();
        }

        function updateKeyboard() {
            if (!keyboard) return;
            keyboard.options.octaves = options.octaves;
            keyboard.options.alterKeys = options.notes;
        }

        function updateGuitar() {
            if (!guitar) return;
            guitar.options.highlightNotes = [];
            for (var i = 0; i < options.notes.length; i++) {
                guitar.options.highlightNotes.push(options.notes[i].name);
            }
        }

        function guitarAdded(gtr) {
            guitar = gtr;
            updateOptions(options);
        }

        function keyboardAdded(kb) {
            keyboard = kb;
            updateOptions(options);
        }

        $scope.keyboardAdded = keyboardAdded;
        $scope.guitarAdded = guitarAdded;
        $scope.updateOptions = updateOptions;
    }]
});
