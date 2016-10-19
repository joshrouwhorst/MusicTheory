
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
    'previewLink',
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
.run(function ($sce, $rootScope) {
    'use strict';
    $rootScope.$on('$routeUpdate', setPage);
    $rootScope.$on('$routeChangeSuccess', setPage);

    function setPage(evnt, toRoute) {
        var page = toRoute.$$route.originalPath;
        if (page !== '/') {
            page = '/#/widget/' + toRoute.params.name;
            if (toRoute.params.id !== undefined) {
                page += '?id=' + toRoute.params.id;
            }
        }

        ga('set', 'page', page);
        ga('send', 'pageview');
    }

    String.prototype.htmlSafe = function() {
        return $sce.trustAsHtml(this.toString());
    };
});
