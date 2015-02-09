/*jshint undef: false, unused: false, indent: 2*/
/*global angular: false */

'use strict';



angular.module('demoApp').service('BoardDataFactory', function () {

  return {
    kanban: {
      "name": "Kanban Board",
      "numberOfColumns": 3,
      "columns": [
        {"name": "Backlog", "cards": [
          {"title": "Confirm design specification with architect."},
          {"title": "Send use case for review."}
        ]},
        {"name": "In progress", "cards": [
          {"title": "Describe compatibility issues.",
            "details": "Testing Card Details"},
          {"title": "Route change request specs for approval.",
            "details": "Testing Card Details"}
        ]},
        {"name": "Done", "cards": [
          {"title": "Fill up review checklist.",
            "details": "Testing Card Details"},
          {"title": "Workshop on solution of newly reported deffect.",
            "details": "Testing Card Details"},
          {"title": "Response email on newly detected deffect.",
            "details": "Needs detail description on the origin of the defect."}
        ]}
      ]
    } 
  };
});


