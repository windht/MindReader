/**
* MindReader.directive Module
*
* Description
*/
angular.module('MindReader.directives', [])
.directive('goBack',function($ionicHistory,$ionicViewSwitcher){
	return {
		link:function(scope,element,attrs){
			element.bind('click',function(){
				$ionicViewSwitcher.nextDirection('back');
				$ionicHistory.goBack();
			})
		}
	}
})

// .directive('forwardView',function($ionicHistory,$ionicViewSwitcher){
// 	return {
// 		link:function(scope,element,attrs){
// 			element.bind('click',function(){
// 				$ionicViewSwitcher.nextDirection('forward');
// 			})
// 		}
// 	}
// })