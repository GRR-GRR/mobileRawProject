angular.module('starter.services01', [])



.factory('Users', function($http, $q) {
  // Might use a resource here that returns a JSON array
  // Some fake testing data
  var allUsers = {
    getUsers : function(){
      var deferred = $q.defer();
/*      $scope.loading = true;
*/
      $http.get('http://carbillet.net/api-digitalGrenoble/users/')
        .success(function(data, status){
/*          $scope.loading = false;
*/
          deferred.resolve(data);
        }).error(function(data, status){
          deferred.reject('erreur');
        })
      return deferred.promise;

    }
  };

  return allUsers;


});