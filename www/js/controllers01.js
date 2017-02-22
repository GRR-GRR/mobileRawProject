angular.module('starter.controllers01', [])

.controller('DashCtrl', function($scope) {})

.controller('UsersCtrl', function($scope, Users) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
/*  $scope.users = [
    {name:'John', age:25, gender:'boy'},
    {name:'Jessie', age:30, gender:'girl'},
    {name:'Johanna', age:28, gender:'girl'},
    {name:'Joy', age:15, gender:'girl'},
    {name:'Mary', age:28, gender:'girl'},
    {name:'Peter', age:95, gender:'boy'},
    {name:'Sebastian', age:50, gender:'boy'},
    {name:'Erika', age:27, gender:'girl'},
    {name:'Patrick', age:40, gender:'boy'},
    {name:'Samantha', age:60, gender:'girl'}
  ];*/
  
  Users.getUsers().then(function(data){
    $scope.viewUsers = data.users;
  });

  $scope.remove = function(chat) {
    Chats.remove(chat);
  };

  $scope.change = function(){
    console.log("change");
  };


})

.controller('ChatDetailCtrl', function($scope, $stateParams, Users) {
  console.log($stateParams.idUser);

Users.getUsers($stateParams.idUser)
  .then(function(data){
    console.log(data.users);
      $scope.oneUser = Users.getUsers(data.users);
        for (var i = data.users.length - 1; i >= 0; i--) {
          data.users[i].idUser = $stateParams.idUser;
          console.log($scope.onUser)
        }
  });

})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  }
})

//chat

.controller('ChatLike', function ($scope , Chats) {

});
