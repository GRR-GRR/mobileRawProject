angular.module('starter.services01', [])



.factory('Users', function($http, $q) {

  return {
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