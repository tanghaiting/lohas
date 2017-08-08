var app = angular.module("administrator", [ "ngCookies", "constApp" ]);
app.controller("administratorContraller", function($scope, $http, $cookieStore,
		$templateCache,$const) {
    $cookieStore.put("code","00001");
    $scope.queryUser=function () {
        var param = {};
        param["code"]  = "00001";
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
    $scope.getCheck=function () {
	    location.href="audit.html"
    }
    $scope.getActivity=function () {
	    location.href="activity.html"
    }
    $scope.getUsers=function () {
	    location.href="adminmgr.html"
    }
    $scope.getRole=function () {
	    location.href="usermessage.html"
    }
    
    $scope.queryUser();
})

