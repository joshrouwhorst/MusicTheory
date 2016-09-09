angular
.module('videolist', [])
.component('videoList', {
  templateUrl: './components/videolist/videolist.html',
  controller: ['$scope', function($scope) {
      'use strict';
      $scope.videos = $scope.$parent.videos || [];
  }]
});
