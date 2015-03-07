(function() {
  'use strict';

  angular
    .module('app.cnDocs')
    .controller('DocsController', DocsController);

  DocsController.$inject = ['$stateParams'];

  /* @ngInject */
  function DocsController($stateParams) {
    var vm = this;

    vm.selectedSection = $stateParams.section || 'api';
    vm.templateLocation = templateLocation;

    vm.sections = [
      'api',
      'stats',
      'misc',
      'php'
    ];

    ////////////////

    function templateLocation(section) {
      return 'app/source/' + section + '.md';
    }
  }

})();