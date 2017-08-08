var app = angular.module("ecole", [ "ngCookies", "constApp" ]);
app.controller("ecoleContraller", function($scope, $http, $cookieStore,
		$templateCache, $const) {
	$scope.code = $cookieStore.get("code");
	$scope.user = $cookieStore.get("user");
	$scope.getEcoleExplain=function(){
		var promise = $const.syncRequest("doservice/rule/dot","GET","json","","");
        promise.then(function(data) {
            // 完成承诺，接收返回值
            $scope.ecoleExplain=data;
            console.log(data)
        }, function(data) {
            // 拒绝承诺，接收拒绝原因
        });
	}
	
	$scope.exchange=function(){
		location.href="exchange.html";
	}
	
	
	$scope.getEcoleExplain();
})
