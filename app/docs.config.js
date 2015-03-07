(function() {
  'use strict';

  angular
    .module('app.cnDocs')
    .config(Config);

  Config.$inject = ['$stateProvider'];

  /* @ngInject */
  function Config($stateProvider) {

    //$stateProvider
    //  .state('docs', {
    //    url: '/docs',
    //    controller: 'docsController',
    //    controllerAs: 'vm',
    //    templateUrl: 'app/docs/docs.html'
    //  })
    //  .state('docs-section', {
    //    url: '/docs/:section',
    //    controller: 'docsController',
    //    controllerAs: 'vm',
    //    templateUrl: 'app/docs/docs.html'
    //  });

  }

})();