var app = angular.module("exchangepro", [ "ngCookies", "constApp" ]);
app.controller("exchangeproContraller", function($scope, $http, $cookieStore,
		$templateCache, $const) {
	$scope.code = $cookieStore.get("code");
	$scope.user = $cookieStore.get("user");
	$scope.getProducts=function(){
		var promise = $const.syncRequest("productservice/apply/products","GET","json","","");
        promise.then(function(data) {
            // 完成承诺，接收返回值
            $scope.products=data;
            console.log(data)
        }, function(data) {
            // 拒绝承诺，接收拒绝原因
        });
	}
	
	$scope.exchange=function(product){
		 var param = {};
	     param["id"]  = product.id;
	     param["status"]=status;
	     param["code"]=product.code;
	     param["disposeId"]=$scope.user.code;
	     param["dot"]=product.ecole*product.number;
	    var promise = $const.syncRequest("productservice/exchange/product","POST","json","",param);
	        promise.then(function(data) {
	        $scope.getProducts();
	        }, function(data) {
	            // 拒绝承诺，接收拒绝原因
	        });
	}
	
	$scope.getProducts();
})
