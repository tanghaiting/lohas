var app = angular.module("admin", [ "ngCookies", "constApp" ]);
app.controller("adminContraller", function($scope, $http, $cookieStore,
		$templateCache,$const) {
    $cookieStore.put("code","00003");
    $scope.queryUser=function () {
        var param = {};
        param["code"]  = "00003";
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
	$scope.getDot=function () {
        location.href="ecole.html";
    }
    
    $scope.getlim=function () {
        location.href=""
    }

    $scope.getUser=function () {
	    location.href="usermessage.html"
    }
    $scope.getActivitys=function(){
    	location.href="activity.html"
    }
    $scope.getProducts=function(){
    	location.href="exchangepro.html"
    }
    $scope.queryUser();
})

