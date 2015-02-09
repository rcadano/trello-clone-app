/*jshint undef: false, unused: false, indent: 2*/
/*global angular: false */


'use strict';

angular.module('demoApp').controller('HintWindowController', ['$scope', '$modalInstance', function ($scope, $modalInstance) {

  function initScope(scope) {
  }

  $scope.close = function () {
    $modalInstance.close();
  };

  initScope($scope);

}]);

