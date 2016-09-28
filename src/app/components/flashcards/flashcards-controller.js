angular
.module('musicTheory.widget')
.controller('FlashCardsCtrl', ['$scope', function ($scope) {
    'use strict';
    var options = [
        {
            name: 'Fifths',
            description: 'Select the fifth of each key'
        },
        {
            name: 'Relative Minors',
            description: 'Select the relative minor of each key'
        }
    ];

    $scope.options = options;
}]);
