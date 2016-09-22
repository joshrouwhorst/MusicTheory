
angular.module('musicTheory', [
  'ngRoute',
  'musicTheory.list',
  'musicTheory.header',
  'musicTheory.service',
  'musicTheory.widget',
  'musicTheory.models',
  'canvaskeyboard',
  'canvasguitar',
  'visualblock',
  'videolist',
  'chordSelector',
  'ngMaterial'
])
.config(function ($routeProvider) {
  'use strict';
  $routeProvider
    .when ('/', {
      controller: 'ListCtrl',
      templateUrl: './components/list/list.html'
    })
    .when('/widget/:name', {
      reloadOnSearch: false,
      templateUrl: function (urlattr) {
        return './components/' + urlattr.name + '/' + urlattr.name + '.html';
      }
    })
    .otherwise({
      redirectTo: '/'
    });
})
.run(function ($sce) {
  'use strict';
  String.prototype.htmlSafe = function() {
    return $sce.trustAsHtml(this.toString());
  }
});
