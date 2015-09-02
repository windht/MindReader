/**
* MindReader.book Module
*
* Description
*/
angular.module('MindReader.book', [])
.factory('$book', ['$http','$q',function($http,$q){
	var self=this;

	var books;

	var get=function(type,cache){
		var q=$q.defer();

		if (cache && books) {
			q.resolve(books)
		}
		else {
			$http.get('https://bu.ildm.in/d/reader/api/book-list/all').success(function(books){
				q.resolve(books)
			}).error(function(err){
				q.reject(err);
			})
		}	

		return q.promise;
	}

	self={
		get:get
	}

	return self;
}])