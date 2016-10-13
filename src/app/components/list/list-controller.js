angular
.module('musicTheory.list', ['musicTheory.service'])
.controller('ListCtrl', ['$scope', 'WidgetService', 'AudioService', function ($scope, WidgetService, AudioService) {
    'use strict';
    $scope.widgets = WidgetService.widgets;
}]);
