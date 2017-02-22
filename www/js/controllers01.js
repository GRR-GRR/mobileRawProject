angular.module('starter.controllers01', [])

.controller('DashCtrl', function($scope) {})


.controller('MapCtrl', function($scope, Users){
  $scope.map = {
    center: [45.2914569, 2.0399013]
  }

  $scope.markers = {
    position: [
      [45.2914569, 2.0399013],
      [49, 2.0399013]
    ]   
  }




  $scope.marker1 = {
    position: [45.2914569, 2.0399013]   
  };
  $scope.marker2 = {
    position: [45, 2.0399013]   
  };

  Users.getUsers().then(function(data){
    $scope.mapUsers = data.users;
  console.log(data.users)
  });

})


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
  
/*  console.log($stateParams.idUser);
*/
Users.getUsers($stateParams.idUser)
  .then(function(data){

/*      console.log(data.users);
*/      console.log(data.users.length);

        for (var i = 0; i < data.users.length; i++) {
          if (data.users[i].idUser == $stateParams.idUser) {
           $scope.oneUser = data.users[i];
          }
        }
  console.log($scope.oneUser);

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
