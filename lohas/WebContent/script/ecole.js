var app = angular.module("ecole", [ "ngCookies", "constApp" ]);
app.controller("ecoleContraller", function($scope, $http, $cookieStore,
		$templateCache, $const) {
	$scope.code = $cookieStore.get("code");
	$scope.user = $cookieStore.get("user");
	
	$scope.getDots=function(){
		 var param = {};
	        param["code"]  = $scope.code;
	        var promise = $const.syncRequest("doservice/dots","GET","json","",param);
	        promise.then(function(data) {
	            // 完成承诺，接收返回值
	            $scope.dots=data;
	            console.log(data)
	        }, function(data) {
	            // 拒绝承诺，接收拒绝原因
	        });
	}
	$scope.getDots();
})
