var app = angular.module("adminmgr", [ "ngCookies", "constApp" ]);
app.controller("adminmgrContraller", function($scope, $http, $cookieStore,
		$templateCache, $const) {
	$scope.code = $cookieStore.get("code");
	$scope.user = $cookieStore.get("user");
	
	$scope.getUsers=function(){
	        var promise = $const.syncRequest("userservice/users","GET","json","","");
	        promise.then(function(data) {
	            // 完成承诺，接收返回值
	            $scope.users=data;
	            console.log(data)
	        }, function(data) {
	            // 拒绝承诺，接收拒绝原因
	        });
	}
	
	$scope.getUser=function(user){
		$cookieStore.put("code",user.code);
		$cookieStore.put("userTypeId",$scope.user.userTypeId);
		location.href="usermessage.html";
	}
	$scope.getUsers();
})
