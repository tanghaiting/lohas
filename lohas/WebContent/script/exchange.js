var app = angular.module("exchange", [ "ngCookies", "constApp" ]);
app.controller("exchangeContraller", function($scope, $http, $cookieStore,
		$templateCache, $const) {
	$scope.code = $cookieStore.get("code");
	$scope.user = $cookieStore.get("user");
	$scope.getProducts=function(){
		var promise = $const.syncRequest("productservice/products","GET","json","","");
        promise.then(function(data) {
            // 完成承诺，接收返回值
            $scope.products=data;
            console.log(data)
        }, function(data) {
            // 拒绝承诺，接收拒绝原因
        });
	}
	
	$scope.exchange=function(product,index){
	    var param = {};
        param["exchangeId"]  = product.id;
        param["userId"] =$scope.user.code;
        param["number"]=$("#number"+index).val();
		var promise = $const.syncRequest("productservice/exchange/apply/product","POST","json","",param);
        promise.then(function(data) {
        	alert("兑换申请成功，等待管理员审核后，发放物品！");
            location.href="user.html"
        }, function(data) {
            // 拒绝承诺，接收拒绝原因
        });
	}
	
	
	$scope.getProducts();
})
