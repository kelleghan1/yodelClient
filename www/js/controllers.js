angular.module('starter.controllers', ['ionic', 'ngCordova'])

.controller('homeCtrl', function($scope) {

  $scope.pagecontent = 'Home';

})



.controller('signInCtrl', function($scope, $state, $http,$log) {
  $scope.user = {}
  var userData = $scope.user
  $scope.login = function() {
    $log.info('function fired!')
    $log.info(userData)
    $http.get('http://yodelappbcjmm.herokuapp.com/newlocation',userData)
    .then(function(data){
      console.log(data);
      $state.go('tab.home')
    })
  }



})

.controller('signUpCtrl', function($scope, $state, $http, $log) {
  $scope.user = {}
  $scope.signUp = function() {
    var userData = $scope.user
    // $log.info('function fired!')
    // $log.info(userData)
    // var userData = $scope.user.password;
    console.log(userData);
    $http.post('http://yodelappbcjmm.herokuapp.com/signup', userData)
    .then(function(data){
      console.log(data);
      $state.go('tab.home')
    })
  }



})



.controller('locationCtrl', function($scope, $http, $cordovaGeolocation) {

  $scope.takeLocation = function() {

    var posOptions = {
      timeout: 10000, enableHighAccuracy: false
    };

    $cordovaGeolocation
    .getCurrentPosition(posOptions)
    .then(function (position) {
      $scope.newLocation = {};
      $scope.newLocation.long = position.coords.longitude;
      $scope.newLocation.lat = position.coords.latitude;
      var newLocation = $scope.newLocation;

      $http.post('http://yodelappbcjmm.herokuapp.com/newlocation', newLocation)
      .then(function(result){
        $scope.result = result;
      })

    }, function(err) {
      console.log(err);
    });

  }

})



.controller('cameraCtrl', function($scope, $cordovaCamera) {
  $scope.pictureUrl = "http://placehold.it/300/300";

  $scope.takePicture = function() {

    var options = {
      destinationType: Camera.DestinationType.DATA_URL,
      encodingType: Camera.EncodingType.JPEG,
      quality: 100,
    };

    $cordovaCamera.getPicture(options)
    .then(function(data){
      console.log('camera data ' + angular.toJson(data));
      $scope.pictureUrl = "data:image/jpeg;base64," + data;
      $scope.pictureData = data;

    }, function(error) {
      console.log('camera error ' + angular.toJson(error));
    });

  };
});
