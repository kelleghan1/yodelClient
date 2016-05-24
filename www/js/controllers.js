angular.module('starter.controllers', ['ionic', 'ngCordova'])


.controller('homeCtrl', function($scope) {

  $scope.pagecontent = 'home';

})




.controller('locationCtrl', function($scope, $cordovaGeolocation) {

  $scope.takeLocation = function() {

    var posOptions = {
      timeout: 10000, enableHighAccuracy: false
    };

    $cordovaGeolocation
    .getCurrentPosition(posOptions)
    .then(function (position) {
      var lat  = position.coords.latitude;
      var long = position.coords.longitude;
      $scope.newLocationLong = position.coords.longitude;
      $scope.newLocationLat = position.coords.latitude;

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
