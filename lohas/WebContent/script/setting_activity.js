var app = angular.module("settingActivity", [ "ngCookies", "constApp" ]);
app.controller("setttingActivityContraller", function($scope, $http, $cookieStore,
		$templateCache, $const) {
	$scope.code = $cookieStore.get("code");
	$scope.user = $cookieStore.get("user");
	
	$scope.startActivity=function(){
		$scope.activity.createdId=$scope.code;
	        var promise = $const.syncRequest("activityservice/activity","POST","json",$scope.activity,"");
	        promise.then(function(data) {
	        	alert("创建成功，开始任务！")
	            location.href="activity.html"
	        }, function(data) {
	            // 拒绝承诺，接收拒绝原因
	        });
	}
})
