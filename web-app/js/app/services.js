angular.module('groceryListApp.services', []).factory('Grocery', function($resource) {
  return $resource('http://localhost:5000/api/groceries/:id',{id:'@_id'},{
        update: {
            method: 'PUT'
        },
        delete: {
            method: 'DELETE',
            isArray: true
        },
        get: {
          method:'GET',
          isArray: true
        },
        save: {
          method:'POST'
        },
        query: {
          method:'GET',
          isArray:true
        }
    });
}).service('popupService',function($window){
    this.showPopup=function(message){
        return $window.confirm(message);
    }
});
