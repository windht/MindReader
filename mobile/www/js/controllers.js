angular.module('starter.controllers', [])

.controller('BooksCtrl', function($scope) {

})

.controller('CloudCtrl', function($scope,Chats,$book,$state) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };

  $scope.$on('$ionicView.loaded',function(){
    $book.get('all').then(function(books){
      $scope.books=books;
      console.log($scope.books);
    })
  })

  $scope.read=function(book){
    $state.go('tab.book-info',{book:JSON.stringify(book)})
  }
})

.controller('BookInfoCtrl', function($scope,$stateParams,$state) {
  $scope.book=JSON.parse($stateParams.book);
  console.log($scope.book);
  $scope.read=function(book){
    $state.go('tab.read',{bookPath:book.online_path})
  }
})

.controller('BooksReadCtrl', function($scope, $stateParams, Chats,$ionicSlideBoxDelegate,$ionicModal,$state) {
  var bookPath=$stateParams.bookPath;
  var Book1,Book2,Book3;

  $scope.titleShow=false;

  $ionicModal.fromTemplateUrl('templates/toc.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.openModal = function() {
    $scope.modal.show();
  };

  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  $scope.back=function(){
    $state.go('tab.books');
  }

  $scope.selectChapter=function(item){
    $scope.modal.hide();
    $scope.titleShow=false;

    window.localStorage['currentChapter']=item.cfi;
    window.localStorage['currentCfi']=item.cfi;
    switch ($scope.currentSlide) {
      case 0:
        
        Book1.displayChapter(item.cfi).then(function(){
          $scope.title=$scope.toc[Book1.currentChapter.spinePos-2].label;
          Book2.displayChapter(item.cfi).then(function(){
            Book2.nextPage();
          });
          Book3.displayChapter(item.cfi).then(function(){
            Book3.prevPage();
          });
        });
        break;
      case 1:
        
        Book2.displayChapter(item.cfi).then(function(){
          $scope.title=$scope.toc[Book2.currentChapter.spinePos-2].label;
          Book3.displayChapter(item.cfi).then(function(){
            Book3.nextPage();
          });
          Book1.displayChapter(item.cfi).then(function(){
            Book1.prevPage();
          });
        });
        break;
      case 2:
        
        Book3.displayChapter(item.cfi).then(function(){
          $scope.title=$scope.toc[Book3.currentChapter.spinePos-2].label;
          Book1.displayChapter(item.cfi).then(function(){
            Book1.nextPage();
          });
          Book2.displayChapter(item.cfi).then(function(){
            Book2.prevPage();
          });
        });
        break;
    }
  }


  $scope.$on('$ionicView.beforeEnter',function(){

    Book1 = ePub(bookPath);
    Book2 = ePub(bookPath);
    Book3 = ePub(bookPath);

    Book1.renderTo('page-1').then(function(){
      Book1.getMetadata().then(function(meta){
        console.log(meta);
        $scope.meta=meta;
      })
      Book1.getToc().then(function(toc){
        $scope.toc=toc;
        if (!window.localStorage['currentCfi']) {
          Book1.displayChapter(toc[0].cfi);
        }
        else {
          Book1.displayChapter(window.localStorage['currentCfi']);
        }
        setTimeout(function(){
          $scope.title=$scope.toc[Book1.currentChapter.spinePos-2].label;
        },200)       
        console.log(toc);
      })
      
    });

    setTimeout(function(){
      Book2.renderTo('page-2').then(function(){
        Book2.displayChapter(window.localStorage['currentCfi']).then(function(){
          Book2.nextPage();
        });
      })
    },200)

    setTimeout(function(){
      Book3.renderTo('page-3').then(function(){
        Book3.displayChapter(window.localStorage['currentCfi']).then(function(){                      
          Book3.prevPage();
        });
      });
    },400)

    Book1.on('renderer:locationChanged',function(locationCfi){
      // console.log(Book1.renderer.currentLocationCfi)
      // console.log(locationCfi)
    })    
  })

  $scope.$on('$ionicView.loaded',function(){
    $scope.currentSlide=0;
    $scope.continue=false;
  })

  $scope.test=function(){
    console.log(Book1);
    console.log(Book1.renderer.currentLocationCfi)
    console.log(Book2.renderer.currentLocationCfi)
    console.log(Book3.renderer.currentLocationCfi)
  }

  $scope.$watch(function(){
    return $scope.currentSlide;
  },function(nv,ov){



    if (ov==nv) {return;}
    $scope.titleShow=false;
    switch ( nv + 1 ) {
      case 1:
        $scope.title=$scope.toc[Book1.currentChapter.spinePos-2].label;
        window.localStorage['currentCfi']=Book1.renderer.currentLocationCfi;
        if ( ov + 1 == 2) {
          Book3.prevPage()
          setTimeout(function(){Book3.prevPage()},50)
          setTimeout(function(){Book3.prevPage()},100) 
        }
        else {
          Book2.nextPage();
          setTimeout(function(){Book2.nextPage()},50)
          setTimeout(function(){Book2.nextPage()},100) 
        }
        break;
      case 2:
        $scope.title=$scope.toc[Book2.currentChapter.spinePos-2].label;
        window.localStorage['currentCfi']=Book2.renderer.currentLocationCfi;
        if (ov + 1 == 3) {
          Book1.prevPage()
          setTimeout(function(){Book1.prevPage()},50)
          setTimeout(function(){Book1.prevPage()},100) 
        }
        else {
          Book3.nextPage();
          setTimeout(function(){Book3.nextPage()},50)
          setTimeout(function(){Book3.nextPage()},100)
        }
                 
        break;
      case 3:
        $scope.title=$scope.toc[Book3.currentChapter.spinePos-2].label;
        window.localStorage['currentCfi']=Book3.renderer.currentLocationCfi;
        if (ov + 1 == 1) {
          Book2.prevPage()
          setTimeout(function(){Book2.prevPage()},50)
          setTimeout(function(){Book2.prevPage()},100) 
        }
        else {
          Book1.nextPage();
          setTimeout(function(){Book1.nextPage()},50)
          setTimeout(function(){Book1.nextPage()},100)
        }
        break;  
    }
  })

  $scope.next=function(){
    $ionicSlideBoxDelegate.next()
  }

  $scope.prev=function(){
    $ionicSlideBoxDelegate.previous()
  }

  $scope.slideHasChanged=function($index){
    // switch ($index+1) {
    //   case 1:
    //     console.log(Book1.location);
    //     Book2.displayChapter(Book1.location).then(function(){
    //       Book2.nextPage();
    //     });   
    //     Book3.displayChapter(Book1.location).then(function(){
    //       Book3.prevPage();
    //     });  
    //     break;
    //   case 2:
    //     console.log(Book2.location);
    //     Book3.displayChapter(Book1.location).then(function(){
    //       Book3.nextPage();
    //     });
        
    //     Book1.displayChapter(Book1.location).then(function(){
    //       Book1.prevPage();
    //     });
        
    //     break;
    //   case 3:
    //     console.log(Book3.location);
    //     Book1.displayChapter(Book1.location);
    //     Book1.nextPage();
    //     Book2.displayChapter(Book1.location);
    //     Book2.prevPage();
    //     break;
    // }
  }

  $scope.setContinue=function(bool){
    $scope.continue=bool
  }

  $scope.showTitle=function(){
    $scope.titleShow=!$scope.titleShow;
  }

  $scope.$on('$ionicView.beforeLeave',function(){
    Book1.destroy();
    Book2.destroy();
    Book3.destroy();

    Book1=null;
    Book2=null;
    Book3=null;
  })

})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('SocialNetworkCtrl', function($scope) {

});
