var app = angular.module("companyApp", [ "ngCookies", "constApp" ]);
app.controller("company", function($scope, $http, $cookieStore,$templateCache,$const,$sce) {
	$scope.gonggao = $cookieStore.get("data");
	$scope.i=0;        //默认i为初始化显示的内容
	$scope.img1='static/img/LOHASdt.png'; 		//图片默认位置
	$scope.img2='static/img/meiti.png'; 		
	$scope.img3='static/img/gsgonggao.png'; 		
	$scope.dynamic=function(i){
		if(i==0){
			$scope.img1='static/img/LOHASdt.png';
			$scope.img2='static/img/meiti.png'; 		
			$scope.img3='static/img/gsgonggao.png'; 
			$scope.i=i;
		}
		if(i==1){
			$scope.img2='static/img/meiti1.png';
			$scope.img1='static/img/LOHASdt1.png'; 		
			$scope.img3='static/img/gsgonggao.png'; 
			$scope.i=i;
		}
		if(i==2){
			$scope.img3='static/img/gsgonggao1.png';
			$scope.img2='static/img/meiti.png';
			$scope.img1='static/img/LOHASdt1.png'; 		
			$scope.i=i;
		}
	}
    //公司动态信息
    $scope.news=function(){
    	var promise = $const.syncRequest("new/news","GET","json","");
    	promise.then(function(data) {
    		// 完成承诺，接收返回值
    		console.log(data)
    		$scope.getNews=data;
    	}, function(data) {
    		// 拒绝承诺，接收拒绝原因
    	});
    }

    //点击查看详细
    $scope.getdetliNew= function(n){
    	console.log(n)
    	$scope.i=3;
    	$scope.detliNew=n;
    }
    $scope.news();
});
app.filter('to_trusted', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);