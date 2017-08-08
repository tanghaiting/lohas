angular.module('newsApp', ['ngCookies','constApp'])
.controller('newsController', function($scope, $http, $cookieStore, $templateCache, $const){
	console.log("newApp加载成功");
	//新闻
	$scope.news = [];
	$scope.getToShowNews = function(){
		var promise = $const.syncRequest("new/news", "GET", "json", "");
		promise.then(function(data){
			if(data.length > 0){
				for(var i in data){
					$scope.news.push(data[i]);
				}
			}
		}, function(data){
			console.log(data);
		})
	}
	//当前打开的新闻
	$scope.current = -1;
	$scope.showSubContent = function(id){
		if(id==$scope.current){
			$scope.current = -1;
		}else{
			$scope.current = id;
		}
	}
	$scope.getToShowNews();
})