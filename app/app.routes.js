'use strict';
rokkerlabsTest.config(['$stateProvider','$urlRouterProvider',
  function($stateProvider,$urlRouterProvider) {
    $stateProvider
      .state('menu', {
        templateUrl: 'app/components/menu/menu.html',
        controller: 'MenuCtrl',
        abstract: true
      })
      .state('menu.news', {
        url: '/news',
        templateUrl: 'app/components/news/news.html',
        controller: 'NewsCtrl',
        parent: 'menu'
      })
      .state('menu.charts', {
        url: '/charts',
        templateUrl: 'app/components/charts/charts.html',
        controller: 'ChartsCtrl',
        parent: 'menu'
      });
      $urlRouterProvider.otherwise('/news');
    }]);
