// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','ngMaterial','MindReader.book','MindReader.directives'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider,$mdGestureProvider) {
  $mdGestureProvider.skipClickHijack();
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.books', {
    url: '/books',
    views: {
      'tab-books': {
        templateUrl: 'templates/tab-books.html',
        controller: 'BooksCtrl'
      }
    }
  })

  .state('tab.read', {
    url: '/read/:bookId',
    views: {
      'tab-books': {
        templateUrl: 'templates/books-read.html',
        controller: 'BooksReadCtrl'
      }
    }
  })

  .state('tab.cloud', {
    url: '/cloud',
    views: {
      'tab-cloud': {
        templateUrl: 'templates/tab-cloud.html',
        controller: 'CloudCtrl'
      }
    }
  })

  .state('tab.book-info', {
    url: '/book-info/:book',
    views: {
      '@': {
        templateUrl: 'templates/book-info.html',
        controller: 'BookInfoCtrl'
      }
    }
  })
    

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })


  .state('tab.social-network', {
    url: '/social-network',
    views: {
      'tab-social-network': {
        templateUrl: 'templates/tab-social-network.html',
        controller: 'SocialNetworkCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/books');

});
