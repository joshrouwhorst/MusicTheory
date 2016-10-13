angular
.module('musicTheory.list', ['musicTheory.service'])
.controller('ListCtrl', ['$scope', 'WidgetService', function ($scope, WidgetService) {
    'use strict';
    $scope.widgets = WidgetService.widgets;
}]);
