angular.module('groceryListApp', ['ui.router', 'ngResource', 'groceryListApp.controllers', 'groceryListApp.services']);

angular.module('groceryListApp').config(function($stateProvider) {
  $stateProvider.state('groceries', { // state for showing all groceries..
    url: '/groceries',
    templateUrl: 'partials/grocery/groceries.html',
    controller: 'GroceryListController'
  }).state('viewGrocery', { //state for showing single grocery.
    url: '/groceries/:id/view',
    templateUrl: 'partials/grocery/grocery-view.html',
    controller: 'GroceryViewController'
  }).state('newGrocery', { //state for adding a new grocery.
    url: '/groceries/new',
    templateUrl: 'partials/grocery/grocery-add.html',
    controller: 'GroceryCreateController'
  }).state('editGrocery', { //state for updating a grocery.
    url: '/groceries/:id/edit',
    templateUrl: 'partials/grocery/grocery-edit.html',
    controller: 'GroceryEditController'
  });

}).run(function($state) {
  $state.go('groceries'); //make a transition to groceries state when app starts.
});
