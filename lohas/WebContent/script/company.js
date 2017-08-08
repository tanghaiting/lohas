angular.module('companyApp', ['ngCookies','constApp'])
.controller('companyController', function($scope, $http, $cookieStore, $templateCache, $const){
	console.log("companyApp加载成功");
	//产品图片
	$scope.productImgs = [];
	$scope.getProductImgs = function(){
		var promise = $const.syncRequest("path/productImgs", "GET", "json", "");
		promise.then(function(data){
			if(data.length > 0){
				for(var i in data){
					$scope.productImgs.push(data[i]);
				}
			}
		}, function(data){
			console.log(data);
		})
	}
	$scope.getProductImgs();
})