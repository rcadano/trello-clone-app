/*jshint undef: false, unused: false, indent: 2*/
/*global angular: false */

'use strict';

angular.module('demoApp').service('BoardService', ['$modal', 'BoardManipulator', function ($modal, BoardManipulator) {

  return {
    removeCard: function (board, column, card) {
      if (confirm('This card will be deleted. Continue?')) {
        BoardManipulator.removeCardFromColumn(board, column, card);
      }
    },
    
    removeAllCards: function (board) {
      if (confirm('Are you sure you want to delete all cards?')) {
        BoardManipulator.removeAllCards(board);
      }
    },    
    
    changeCardColor: function(board, column, card, color) {
      var tc = document.getElementsByClassName('card-title');
      
      var e=document.getElementById('cardContent');
      var cs=document.defaultView.getComputedStyle(e,null);
      var bg=cs.getPropertyValue('background-color');
      var cardIndex;

      if (column.name == "Backlog") {
        var cardIndex = column.cards.indexOf(card);
        tc[cardIndex].style.backgroundColor = color;
      } else if (column.name == "In progress") {
        var cardIndex = board.columns[0].cards.length + column.cards.indexOf(card);
        tc[cardIndex].style.backgroundColor = color;
      } else if (column.name == "Done") {
        var cardIndex = board.columns[0].cards.length + board.columns[1].cards.length + column.cards.indexOf(card);
        tc[cardIndex].style.backgroundColor = color;
      }      
    },
    
    retainColor: function(board, column, card) {
      var tc = document.getElementsByClassName('card-title');
      
      var e=document.getElementById('cardContent');
      var cs=document.defaultView.getComputedStyle(e,null);
      var bg=cs.getPropertyValue('background-color');
      var cardIndex;

      if (column.name == "Backlog") {
        var cardIndex = column.cards.indexOf(card);
        tc[cardIndex].style.backgroundColor = bg;
      } else if (column.name == "In progress") {
        var cardIndex = board.columns[0].cards.length + column.cards.indexOf(card);
        tc[cardIndex].style.backgroundColor = bg;
      } else if (column.name == "Done") {
        var cardIndex = board.columns[0].cards.length + board.columns[1].cards.length + column.cards.indexOf(card);
        tc[cardIndex].style.backgroundColor = bg;
      }      
    },  

    resetColor: function (board) {
      BoardManipulator.resetColor(board);
    },      
    
    showHint: function () {
      var item = 'b';
      var modalInstance = $modal.open({
        templateUrl: 'views/partials/hintWindow.html',
        controller: 'HintWindowController',
        backdrop: 'static',
        resolve: {
              items: function () {
                     return 'b';
              }
        }
      });
    },      
    
    addNewCard: function (board, column) {
      var modalInstance = $modal.open({
        templateUrl: 'views/partials/newCard.html',
        controller: 'NewCardController',
        backdrop: 'static',
        resolve: {
          column: function () {
            return column;
          }
        }
      });
      modalInstance.result.then(function (cardDetails) {
        if (cardDetails) {
          BoardManipulator.addCardToColumn(board, cardDetails.column, cardDetails.title, cardDetails.details);
        }
      });
    },
    
    modifyCard: function (board, column, card) {
      var indexOfCard = column.cards.indexOf(card);
      var title = column.cards[indexOfCard].title;
      var details = column.cards[indexOfCard].details;
      var modalInstance = $modal.open({
        templateUrl: 'views/partials/modifyCard.html',
        controller: 'ModifyCardController',
        backdrop: 'static',
        resolve: {
          column: function () {
            return column;
          },
          title: function () {
            return title;
          },
          details: function () {
            return details;
          }
        }
      });
      modalInstance.result.then(function (cardDetails) {
        if (cardDetails) {
          BoardManipulator.modifyCardInColumn(board, indexOfCard, cardDetails.column, cardDetails.title, cardDetails.details);
        }
      });
    },    
    
    kanbanBoard: function (board) {
      var kanbanBoard = new Board(board.name, board.numberOfColumns);
      angular.forEach(board.columns, function (column) {
        BoardManipulator.addColumn(kanbanBoard, column.name);
        angular.forEach(column.cards, function (card) {
          BoardManipulator.addCardToColumn(kanbanBoard, column, card.title, card.details);
        });
      });
      return kanbanBoard;
    },
  };
}]);