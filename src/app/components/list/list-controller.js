angular
.module('musicTheory.list', ['musicTheory.service'])
.controller('ListCtrl', ['$scope', 'WidgetService', function ($scope, WidgetService) {
    'use strict';
    var widgets = WidgetService.widgets;

    $scope.rows = [];
    var row = [];
    var MAX_ROW_SIZE = 2;

    for (var i = 0; i < widgets.length; i++) {
        row.push(widgets[i]);
        if (row.length === MAX_ROW_SIZE || i + 1 === widgets.length) {
            $scope.rows.push(row);
            row = [];
        }
    }
}]);
