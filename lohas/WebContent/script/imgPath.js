var app = angular.module("pathApp", [ "ngCookies", "constApp" ]);
app.controller("pathContraller", function($scope, $http, $cookieStore,$templateCache,$const) {
	console.log("加载成功");
    //获取轮播地址
	$scope.path=[];
    $scope.imgPath=function(){
   	 var promise = $const.syncRequest("path/imgPath","GET","json","");
        promise.then(function(data) {
            // 完成承诺，接收返回值
            $scope.imgPath1=data[0].PATH;
            var  imgPath2=data[1].PATH;
            var  imgPath3=data[2].PATH;
            var  imgPath4=data[3].PATH;
            var  imgPath5=data[4].PATH;
            $scope.path=[imgPath2,imgPath3,imgPath4,imgPath5];
        }, function(data) {
            // 拒绝承诺，接收拒绝原因
        });
   }
    //首页广播
    $scope.andorra=function(){
      	 var promise = $const.syncRequest("andorra/content","GET","json","");
           promise.then(function(data) {
        	   $scope.ando=data;
        	   $cookieStore.put("data", data);
               // 完成承诺，接收返回值
               console.log(data)
           }, function(data) {
               // 拒绝承诺，接收拒绝原因
           });
      }
    //首页产品信息
    $scope.andorraPath=function(){
    	var promise = $const.syncRequest("notice/andorraPath","GET","json","");
    	promise.then(function(data) {
    		$scope.andorraPath=data;
    		// 完成承诺，接收返回值
    		console.log(data)
    		
    	}, function(data) {
    		// 拒绝承诺，接收拒绝原因
    	});
    }
    $scope.detail= function(andorraPath){
    	console.log(andorraPath);
    	$cookieStore.put("andorraPath", andorraPath);
    	window.location.href="detil.html";
    	
    }
    $scope.imgPath();
    $scope.andorra();
    $scope.andorraPath();
    //首页广告轮播效果开始
    
    //首页广告轮播效果结束
})

