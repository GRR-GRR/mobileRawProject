angular.module('starter.controllers01', [])

.controller('DashCtrl', function($scope, $state, $http, $q) {
    $scope.step1 = {};
    $scope.step2 = {};
    $scope.step3 = {};

    $scope.start = function() {
        $state.go('tab.dash');
    };

    $scope.startCondition = function() {
        return angular.isDefined($scope.step3.something);
    };

    $scope.subMyCollection = function(){

      var key1 = $scope.step1.something
      var key2 = $scope.step2.name
      var key3 = $scope.step3.something

      $http({
        method: 'GET',
        url: 'http://api.giphy.com/v1/gifs/search?q='+key1+'+'+key2+'&api_key=dc6zaTOxFJmzC'
        }).then(function successCallback(response) {

          console.log(response.data, key1, key2, key3);


          $scope.collection = response.data.data;
          

        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
      });
    }

})


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
      $scope.marker = {
        position: [lat, long],
        decimals: 4,
        options: function() {
          return { draggable: true};
        }
      }

      console.log($scope.marker);

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
/*    console.log(pointName);
*/

    $scope.points = {
      coords: tabCoord,
      options: function(coords, properties, i, map) {
        console.log("i", coords, pointName[i]);
        return {
          draggable: false,
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
.controller('ValidationCtrl', function($scope) {

$scope.myComp={};

    $scope.validateMyComp = function (){

      var formNom = $scope.myComp.name;
      var formPrenom = $scope.myComp.lastname;

      console.log(formNom, formPrenom);

    }
})

.controller('ChatLike', function ($scope , Chats) {

});
