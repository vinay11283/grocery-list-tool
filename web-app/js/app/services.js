angular.module('groceryListApp.services', []).factory('Grocery', function($resource) {
  return $resource('http://localhost:5000/api/groceries/:id',{id:'@_id'},{
        update: {
            method: 'PUT'
        }
    });
}).service('popupService',function($window){
    this.showPopup=function(message){
        return $window.confirm(message);
    }
});
