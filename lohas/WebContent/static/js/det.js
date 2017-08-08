var app = angular.module("detApp", [ "ngCookies"]);
app.controller("detContraller", function($scope, $http, $cookieStore,$templateCache) {
	$scope.det = $cookieStore.get("andorraPath");
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
});