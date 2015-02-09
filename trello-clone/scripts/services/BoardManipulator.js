/*jshint undef: false, unused: false, indent: 2*/
/*global angular: false */


'use strict';



angular.module('demoApp').factory('BoardManipulator', function () {

  return {

    addColumn: function (board, columnName) {
      board.columns.push(new Column(columnName));
    },

    addCardToColumn: function (board, column, cardTitle, details) {
      angular.forEach(board.columns, function (col) {
        if (col.name === column.name) {
          col.cards.push(new Card(cardTitle, column.name, details));
        }
        
      });
    },
    
    modifyCardInColumn: function (board, indexOfCard, column, cardTitle, details) {
      column.cards[indexOfCard].title = cardTitle;
      column.cards[indexOfCard].details = details;    
    },    
    
    removeCardFromColumn: function (board, column, card) {
      angular.forEach(board.columns, function (col) {
        if (col.name === column.name) {
          col.cards.splice(col.cards.indexOf(card), 1);
        }
      });
    },
    
    removeAllCards: function (board) {    
      angular.forEach(board.columns, function (col) {
        col.cards.splice(0,col.cards.length);
      });
    },

    resetColor: function (board) { 
      var cards = document.getElementsByClassName('card-title');  
      angular.forEach(cards, function (card) {
        card.style.backgroundColor = "white";
      });
    }     
  };
});
