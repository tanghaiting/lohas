var newsDetailApp = angular.module('newsDetailApp', ['ngCookies','constApp','ngSanitize']);
	//注意：获取路径参数必须添加这个config
//	newsDetailApp.config(['$locationProvider', function($locationProvider) {  
//		$locationProvider.html5Mode(true);  
//	}]);
	newsDetailApp.controller('newsDetailController', ['$scope', '$http', '$const','$location', '$sce',function($scope, $http, $const, $location,$sce){
		//获取路径参数
//		var id =  $location.search().id;
		var url = window.location.href; 
		var id = url.substring("?").split("=")[1];
		//新闻详细内容
		$scope.newsDetail = null;
		$scope.getNewsDetail = function(){
			var url = "new/news/"+id;
			var promise = $const.syncRequest(url, "GET", "json", "");
			promise.then(function(data){
				if(data != null){
					$scope.newsDetail = data;
					$scope.newsDetail.content = $sce.trustAsHtml(data.content);
				}
			}, function(data){
				console.log(data);
			})
		}
		$scope.getNewsDetail();
	}]);