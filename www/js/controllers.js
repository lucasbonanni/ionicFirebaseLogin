angular.module('starter.controllers', ['ionic'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout,$ionicLoading) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:





  $scope.$on('$ionicView.beforeEnter', function(event,data){
    $ionicLoading.show({
      template: '<ion-spinner icon="ripple" class="spinner-energized"></ion-spinner>',
      hideOnStageChange: true,
      duration: 1000
    });
    
  });


  // Form data for the login modal
  $scope.loginData = {};
  $scope.usuario ={};


 // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };


  $scope.$on('$ionicView.enter', function(event,data) {

    firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      $scope.loginData.isActive= true;
    } else {
      // No user is signed in.
      $scope.loginData.isActive= false;
      $scope.login();
    }
  });
    
    //console.info("event",event);
    //console.info("data",data);
    //console.log('enter state');
  });

  $scope.doLogout = function(){
    firebase.auth().signOut();
  }

 
  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    //Test  variables Set up
    
    $scope.loginData.username = "username";
    $scope.loginData.password = "password";


    firebase.auth()
    .signInWithEmailAndPassword($scope.loginData.username, $scope.loginData.password)
    .then(function(success){

       $scope.usuario = firebase.auth().currentUser;

        //console.info("success",success);
        $scope.loginData.isActive= true;

        /*http://lorempixel.com/90/90/people/*/
        $scope.usuario.updateProfile({
          displayName: "displayName",
          photoURL: "http://lorempixel.com/90/90/people"
        });
        $scope.closeLogin();
        console.info("usuario",$scope.usuario);
    }, function(error){
      $scope.loginData.isActive= false;
      console.info("error",error);

    });

    /*$timeout(function() {
      $scope.closeLogin();
    }, 1000);*/
  };
})

.controller('PlaylistsCtrl', function($scope,$ionicLoading) {



  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})



.controller('PlaylistCtrl', function($scope, $stateParams) {
});
