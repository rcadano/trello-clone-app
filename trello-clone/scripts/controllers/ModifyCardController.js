/*jshint undef: false, unused: false, indent: 2*/
/*global angular: false */


'use strict';

angular.module('demoApp').controller('ModifyCardController', ['$scope', '$modalInstance', 'column', 'title', 'details', function ($scope, $modalInstance, column, title, details) {

  function initScope(scope) {
    scope.columnName = column.name;
    scope.column = column;
    scope.title = title;
    scope.details = details;
  }

  $scope.modifyCard = function () {
    if (!this.newCardForm.$valid) {
      return false;
    }
    
    $modalInstance.close({title: this.title, column: column, details: this.details});
  };

  $scope.close = function () {
    $modalInstance.close();
  };

  initScope($scope);

}]);

