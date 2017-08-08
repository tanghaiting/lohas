var app = angular.module("modifyuser", [ "ngCookies", "constApp" ]);
app.controller("modifyuserContraller", function($scope, $http, $cookieStore,
		$templateCache, $const) {
	$scope.code = $cookieStore.get("code");
	$scope.user = $cookieStore.get("user");
	
	$scope.udpate=function(){
		if($("#picture").val()!=undefined){
			$scope.user.picture=$("#picture").val()
		}
		console.log($scope.user.picture)
		var promise =$const.syncRequest("userservice/user","PUT","json",$scope.user,"");
		promise.then(function(data) {
            // 完成承诺，接收返回值
			alert("修改成功")
        }, function(data) {
            // 拒绝承诺，接收拒绝原因
        });
	}
})
