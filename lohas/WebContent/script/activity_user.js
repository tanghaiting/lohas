var app = angular.module("activity_user", [ "ngCookies", "constApp" ]);
app.controller("activity_userContraller", function($scope, $http, $cookieStore,
		$templateCache, $const) {
	$scope.code = $cookieStore.get("code");
	$scope.user = $cookieStore.get("user");
	$scope.activityId = $cookieStore.get("activityId");
	$scope.getUsers=function(){
		var param = {};
        param["activityId"]  = $scope.activityId;
	        var promise = $const.syncRequest("userservice/activity/users","GET","json","",param);
	        promise.then(function(data) {
	            // 完成承诺，接收返回值
	            $scope.users=data;
	            console.log(data)
	        }, function(data) {
	            // 拒绝承诺，接收拒绝原因
	        });
	}
	
	$scope.affirm=function(user){
		var param={};
		param["activityId"]=$scope.activityId;
		param["code"]=user.code;
		param["disposeId"]=$scope.code;
		param["status"]=1;
		 var promise = $const.syncRequest("activityservice/affirm/activity","POST","json","",param);
	        promise.then(function(data) {
	        	$scope.getUsers();
	        }, function(data) {
	            // 拒绝承诺，接收拒绝原因
	        });
	}
	
	$scope.getUsers();
})
