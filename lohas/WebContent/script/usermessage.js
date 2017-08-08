var app = angular.module("usermessageApp", [ "ngCookies", "constApp" ]);
app.controller("usermessageContraller", function($scope, $http, $cookieStore,
		$templateCache, $const) {
	$scope.code = $cookieStore.get("code");
	$scope.user = $cookieStore.get("user");
	$scope.userTypeId = $cookieStore.get("userTypeId");
	var count = 6;
	$scope.check = function() {
		if ($scope.user.picture == undefined || $scope.user.picture == "") {
			count -= 1;
		}
		if ($scope.user.name == undefined || $scope.user.name == "") {
			count -= 1;
		}
		if ($scope.user.gender == undefined || $scope.user.gender == "") {
			count -= 1;
		}
		if ($scope.user.phone == undefined || $scope.user.phone == "") {
			count -= 1;
		}
		if ($scope.user.email == undefined || $scope.user.email == "") {
			count -= 1;
		}
		if ($scope.user.address == undefined || $scope.user.address == "") {
			count -= 1;
		}
		$scope.bai=100/6;
		$scope.bai=(parseInt($scope.bai)*count)==96?100:parseInt($scope.bai)*count;
	}
	$scope.check();
	
	$scope.update=function(){
		 location.href="modifyuser.html";
	}
	 $scope.queryUser=function () {
		 console.log($scope.code)
	        var param = {};
	        param["code"]  = $scope.code;
	        var promise = $const.syncRequest("userservice/user","GET","json","",param);
	        promise.then(function(data) {
	            // 完成承诺，接收返回值
	            $scope.user=data;
	            console.log(data)
	            $cookieStore.put("user",data);
	        }, function(data) {
	            // 拒绝承诺，接收拒绝原因
	        });
	}
	$scope.addEcole=function(){
		var param = {};
        param["userCode"]  = $scope.code;
        param["createdId"] = $scope.user.code;
        param["dot"] = $("#dot").val();
        console.log(param)
        var promise = $const.syncRequest("doservice/add/dot","POST","json","",param);
        promise.then(function(data) {
        	alert("添加羽点成功！")
            location.href="adminmgr.html"
        }, function(data) {
            // 拒绝承诺，接收拒绝原因
        });
	}
	
	$scope.queryUser();
})
