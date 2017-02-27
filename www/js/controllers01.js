angular.module('starter.controllers01', [])

.controller('DashCtrl', function($scope) {})

// Affichage des points sur une carte
.controller('MapCtrl', function($scope, Users, $cordovaGeolocation){
  var posOptions = {timeout: 10000, enableHighAccuracy: false};
  $cordovaGeolocation
    .getCurrentPosition(posOptions)
    .then(function (position) {
      var lat  = position.coords.latitude
      var long = position.coords.longitude
        
      // CENTRAGE DE LA MAP SUR DES COORDONNEES que l'on souhaite
      $scope.map = {
        center: [lat, long]
      }
    }, function(err) {
      // error
    });


  // On récupère les données des users avec le service
  Users.getUsers().then(function(data){

  /*création d'un nouveau tableau pour stocker les données de que l'on va recuper pour pouvoir les parcourir ensuite*/
    var mapUsers = new Array (); 
    var pointName = new Array();

    // boucle pour récuperer les postions
    for (i=0; i<data.users.length; i++){

/*      console.log(data.users[i].name);
*/      pointName.push(data.users[i].name);
      // ne recuperer et stocker dans le nouveau tableau que les positions qui ne sont pas null
      if (data.users[i].position !== null) {
        mapUsers.push(data.users[i].position);
      }
    }
    
/*    console.log(mapUsers);
*/
    var tabCoord = new Array();
    // parcourir le nouveau tableau pour recuperer les valeur de lat et lng
    for (var i = 0; i < mapUsers.length; i++) {
/*      console.log(mapUsers[i]);
*/      var coord = [mapUsers[i].lat, mapUsers[i].lng];
        tabCoord.push(coord);
    }

    $scope.pointName = pointName;

      // point.label.push(pointName)
    console.log(pointName);

    $scope.points = {
      coords: tabCoord,
      options: function(coords, properties, i, map) {
        console.log("i", coords, pointName[i]);
        return {
          draggable: true,
        }
      },
      events: {
        click: function(e, point, map, points) {
        }
      },
      decimals: 3
    };



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

.controller('UserModCtrl', function($scope, $stateParams, $http, Users, $state, $q) {

  Users.getUsers($stateParams.userId02)
  .then(function(data){

    for (var i = 0; i < data.users.length; i++) {
      if (data.users[i].idUser == $stateParams.userId02) {
        $scope.oneUser = data.users[i];

        $scope.formUser = {
          prenom:$scope.oneUser.name,
          nom:$scope.oneUser.lastname,
          adresse:$scope.oneUser.adress,
          motto:$scope.oneUser.motto,
          age:$scope.age,
          email:$scope.oneUser.email,

        };

      } 
    }
  });  

  $scope.subFormUser = function(){
    console.log($scope.formUser);

    var adress = $scope.formUser.adresse;
    var age = $scope.formUser.age;
    var tel = $scope.formUser.phone;

/*    var req = {
     method: 'PUT',
     url: 'http://carbillet.net/api-digitalGrenoble/users/',
     headers: {
       'Content-Type': undefined
     },
     data: { test: 'test' }
    }*/
    var log = {json:{username: "antoine.sestier", password: "antoine"}};

    var deferred = $q.defer();
    console.log(log);
      $http.post('http://carbillet.net/api-digitalGrenoble/credentials/', log)
      .success(function(){
      
      var data = {
      "json" : {
        "idUser": $stateParams.userId02,
        "adress": adress,
        "age": parseInt(age),
        "phone": tel 
      }
    }

    console.log(data);

      $http.put('http://carbillet.net/api-digitalGrenoble/users/', data)
        .success(function(data, status){
          deferred.resolve(data);
        }).error(function(data, status){
          deferred.reject('erreur');
        })
      return deferred.promise;
      })


      





 

    $state.go('tab.chat-detail', {userId01: $stateParams.userId02});
  
    

    



  };



})
.controller('ChatDetailCtrl', function($scope, $stateParams, Users) {
  
/*  console.log($stateParams.idUser);
*/
Users.getUsers($stateParams.userId01)
  .then(function(data){

/*      console.log(data.users);
*/      console.log(data.users.length);

        for (var i = 0; i < data.users.length; i++) {
          if (data.users[i].idUser == $stateParams.userId01) {
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
