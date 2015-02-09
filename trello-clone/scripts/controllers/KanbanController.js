/*jshint undef: false, unused: false, indent: 2*/
/*global angular: false */

'use strict';

angular.module('demoApp').controller('KanbanController', ['$scope', 'BoardService', 'BoardDataFactory', function ($scope, BoardService, BoardDataFactory) {

  $scope.kanbanBoard = BoardService.kanbanBoard(BoardDataFactory.kanban);

  $scope.kanbanSortOptions = {

    //restrict move across columns. move only within column.
    /*accept: function (sourceItemHandleScope, destSortableScope) {
     return sourceItemHandleScope.itemScope.sortableScope.$id !== destSortableScope.$id;
     },*/
    itemMoved: function (event) {
      event.source.itemScope.modelValue.status = event.dest.sortableScope.$parent.column.name;
    },
    orderChanged: function (event) {
    },
    containment: '#board'
  };
  
  $scope.init = function () {
    BoardService.showHint();
  };

  $scope.removeCard = function (column, card) {
    BoardService.removeCard($scope.kanbanBoard, column, card);
  };
  
  $scope.changeCardColor = function (column, card, color) {
    BoardService.changeCardColor($scope.kanbanBoard, column, card, color);
  };

  $scope.addNewCard = function (column) {
    BoardService.addNewCard($scope.kanbanBoard, column);
  };
  
  $scope.modifyCard = function (column, card) {
    BoardService.modifyCard($scope.kanbanBoard, column, card);
  };  
  
  $scope.retainColor = function (column, card) {
    BoardService.retainColor($scope.kanbanBoard, column, card);
  } ;
  
  $scope.removeAllCards = function () {
    BoardService.removeAllCards($scope.kanbanBoard);
  }; 
  
  $scope.resetColor = function () {
    BoardService.resetColor($scope.kanbanBoard);
  };   
}]);
