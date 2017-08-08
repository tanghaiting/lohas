var app = angular.module("activity", [ "ngCookies", "constApp" ]);
app.controller("activityContraller", function($scope, $http, $cookieStore,
		$templateCache, $const) {
	$scope.code = $cookieStore.get("code");
	$scope.user = $cookieStore.get("user");
	
	$scope.getActivitys=function(){
	        var promise = $const.syncRequest("activityservice/activitys","GET","json","","");
	        promise.then(function(data) {
	            // 完成承诺，接收返回值
	            $scope.activitys=data;
	            console.log(data)
	        }, function(data) {
	            // 拒绝承诺，接收拒绝原因
	        });
	}
	
	$scope.passAudit=function(audit,status){
        var param = {};
        param["code"]  = $scope.code;
        param["userCode"]=audit.userCode;
        param["id"]=audit.id;
        param["status"]=status;
        console.log(param)
		var promise = $const.syncRequest("userservice/examin/user","POST","json","",param);
        promise.then(function(data) {
            // 完成承诺，接收返回值
        	$scope.getAudits();
        }, function(data) {
            // 拒绝承诺，接收拒绝原因
        });
	}
	
	$scope.getActivity=function(activity){
		$cookieStore.put("activityId",activity.id);
		location.href="admin_activity.html";
	}
	
	$scope.getActivitys();
})
