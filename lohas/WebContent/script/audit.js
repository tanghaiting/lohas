var app = angular.module("audit", [ "ngCookies", "constApp" ]);
app.controller("auditContraller", function($scope, $http, $cookieStore,
		$templateCache, $const) {
	$scope.code = $cookieStore.get("code");
	$scope.user = $cookieStore.get("user");
	
	$scope.getAudits=function(){
	        var promise = $const.syncRequest("userservice/examin/user","GET","json","","");
	        promise.then(function(data) {
	            // 完成承诺，接收返回值
	            $scope.audits=data;
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
	
	$scope.getAudits();
})
