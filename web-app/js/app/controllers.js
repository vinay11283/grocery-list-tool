angular.module('groceryListApp.controllers', []).controller('GroceryListController', function($scope, $state, popupService, $window, Grocery) {
  console.log("fetch list");
    $scope.groceries = Grocery.query(); //fetch all groceries. Issues a GET to /api/groceries

    $scope.deleteGrocery = function(grocery) { // Delete a grocery. Issues a DELETE to /api/groceries/:id
        if (popupService.showPopup('Really delete this?')) {
            grocery.$delete(function(response) {
              $scope.groceries = Grocery.query();
            });
        }
    };

    $scope.toggleCompletion = function(grocery) { //Update the edited grocery. Issues a PUT to /api/groceries/:id
       console.log('update grocery step  grocery = ' + angular.toJson(grocery));
        grocery.$update(function() {
            $state.go('groceries'); // on success go back to home i.e. groceries state.
        });
  };
}).controller('GroceryViewController', function($scope, $stateParams, Grocery) {
    $scope.grocery = Grocery.get({
        id: $stateParams.id
    }); //Get a single grocery.Issues a GET to /api/groceries/:id
}).controller('GroceryCreateController', function($scope, $state, $stateParams, Grocery) {
    $scope.grocery = new Grocery(); //create new grocery instance. Properties will be set via ng-model on UI

    $scope.addGrocery = function() { //create a new grocery item. Issues a POST to /api/groceries
        $scope.grocery.$save(function() {
            $state.go('groceries'); // on success go back to home i.e. groceries state.
        });
    };
}).controller('GroceryEditController', function($scope, $state, $stateParams, Grocery) {
    $scope.updateGrocery = function() { //Update the edited grocery. Issues a PUT to /api/groceries/:id
       console.log('update grocery step');
    $scope.grocery.$update(function() {
        $state.go('groceries'); // on success go back to home i.e. groceries state.
    });
    };

    $scope.loadGrocery = function() { //Issues a GET request to /api/groceries/:id to get a grocery to update
        $scope.grocery = Grocery.get({
            id: $stateParams.id
        });
    };

    $scope.loadGrocery(); // Load a grocery which can be edited on UI
});
