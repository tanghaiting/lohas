var app = angular.module("adminActivity", [ "ngCookies", "constApp" ]);
app.controller("adminActivityContraller", function($scope, $http, $cookieStore,
		$templateCache, $const) {
	$scope.code = $cookieStore.get("code");
	$scope.user = $cookieStore.get("user");
	$scope.activityId = $cookieStore.get("activityId");
	
	$scope.getActivity = function() {
		var param = {};
		param["activityId"] = $scope.activityId;
		var promise = $const.syncRequest("activityservice/activity", "GET",
				"json","", param);
		promise.then(function(data) {
			$scope.activity =data;
		}, function(data) {
			// 拒绝承诺，接收拒绝原因
		});
	}
	
	$scope.getActivityUsers=function(){
		location.href="activity_user.html";
	}
	
	$scope.getActivity();
})
