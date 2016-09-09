angular
  .module('musicTheory.header', [])
  .component('musicHeader', {
    templateUrl: './components/header/header.html',
    controller: ['$window', '$scope', '$route', function ($window, $scope, $route) {
      'use strict';

      $scope.showListButton = $route.current.$$route.originalPath !== '/';

      $scope.$on('$routeChangeStart', function(next, current) {
        $scope.showListButton = current.$$route.originalPath !== '/';
      });
    }]
  });
