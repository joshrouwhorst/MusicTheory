angular
.module('chordSelector', [])
.component('chordSelector', {
    templateUrl: './components/chordselector/chordselector.html',
    bindings: {
        onSelected: '&',
        options: '<',
        selectedVal: '='
    },
    controller: function() {
        'use strict';
        var ctrl = this;

        this.itemSelected = function (item) {
            ctrl.selectedVal.value = undefined;
            if (ctrl.onSelected && item) {
                ctrl.selectedVal.value = item;
                ctrl.onSelected();
                ctrl.searchText = '';
            }
        };

        this.searchFilter = function () {
            var displayOpts = [];

            for (var i = 0; i < ctrl.options.length; i++) {
                if (ctrl.options[i].name.toLowerCase().indexOf(ctrl.searchText.toLowerCase()) > -1) {
                    displayOpts.push(ctrl.options[i]);
                }
            }

            return displayOpts;
        };
    }
});
