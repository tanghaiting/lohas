var app = angular.module('resfile',["ngCookies"]);


app.controller('resfileController', function($scope, $http, $cookieStore, $templateCache) {
    var posturl = "http://localhost:1212";

    $scope.col = 'name';//默认按name列排序
    $scope.desc = 0;//默认排序条件升序
    //获取资源列表
    $http({
        method: "POST",
        url: posturl+"/resourcefile",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        cache: $templateCache
    }).
        success(function(response) {
            $scope.resource = response.data;
            for(var i=0;i<$scope.resource.length;i++){
                $scope.resource[i].resourceName = UnUnicode( $scope.resource[i].resourceName);
                $scope.resource[i].resourceIntroduce = UnUnicode( $scope.resource[i].resourceIntroduce);
                $scope.resource[i].resourceUrl = UnUnicode( $scope.resource[i].resourceUrl);
                console.log($scope.resource[i]);
            }
        }).
        error(function(response) {
            console.log("error"); // Getting Error Response in Callback
            $scope.codeStatus = response || "Request failed";
            console.log($scope.codeStatus);
        });
    $scope.resourcefile = function(){
        $http({
            method: "POST",
            url: posturl+" /resourcefile",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            cache: $templateCache
        }).
            success(function(response) {
                $scope.resource = response.data;
                for(var i=0;i<$scope.resource.length;i++){
                    $scope.resource[i].resourceName = UnUnicode( $scope.resource[i].resourceName);
                    $scope.resource[i].resourceIntroduce = UnUnicode( $scope.resource[i].resourceIntroduce);
                    $scope.resource[i].resourceUrl = UnUnicode( $scope.resource[i].resourceUrl);
                }
            }).
            error(function(response) {
                console.log("error"); // Getting Error Response in Callback
                $scope.codeStatus = response || "Request failed";
                console.log($scope.codeStatus);
            });
    }
    //获取已删除资源列表
    $scope.deletedresource = function(){
        $http({
            method: "POST",
            url: posturl+"/deletedresource",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            cache: $templateCache
        }).
            success(function(response) {
                $scope.resource = response.data;
                for(var i=0;i<$scope.resource.length;i++){
                    $scope.resource[i].resourceName = UnUnicode( $scope.resource[i].resourceName);
                    $scope.resource[i].resourceIntroduce = UnUnicode( $scope.resource[i].resourceIntroduce);
                    $scope.resource[i].resourceUrl = UnUnicode( $scope.resource[i].resourceUrl);
                }
            }).
            error(function(response) {
                console.log("error"); // Getting Error Response in Callback
                $scope.codeStatus = response || "Request failed";
                console.log($scope.codeStatus);
            });
    }

    //资源名称模糊查询
    $scope.findResource = function(){
        var jdata = "mydata="+JSON.stringify($scope.findresource);
        $http({
            method: "POST",
            url: posturl+"/findresource",
            data: jdata,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            cache: $templateCache
        }).
            success(function(response) {
                $scope.resource1 = response.data;
                for(var i=0;i<$scope.resource1.length;i++){
                    $scope.resource1[i].resourceName = UnUnicode( $scope.resource1[i].resourceName);
                    $scope.resource1[i].resourceIntroduce = UnUnicode( $scope.resource1[i].resourceIntroduce);
                    $scope.resource1[i].resourceUrl = UnUnicode( $scope.resource1[i].resourceUrl);
                }
            }).
            error(function(response) {
                console.log("error"); // Getting Error Response in Callback
                $scope.codeStatus = response || "Request failed";
                console.log($scope.codeStatus);
            });
    }
    //编辑资源
    $scope.updateResource=function(e){
        $cookieStore.put("file",e);
        console.log(e);
        window.location.href = "/updateResource.html";
    }
    //删除资源
    $scope.deleteResource=function(e){
        var jdata = "mydata="+e;
        $http({
            method: "POST",
            url: posturl+"/deletefile",
            data: jdata,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            cache: $templateCache
        }).
            success(function(response) {
                if(response.data=="success"){
                    alert("删除成功");
                    window.location.reload ();
                }
                if(response.data=="false"){
                    alert("删除失败");
                    window.location.reload ();
                }

            }).
            error(function(response) {
                console.log("error"); // Getting Error Response in Callback
                $scope.codeStatus = response || "Request failed";
                console.log($scope.codeStatus);
            });
    }
    //获取便签列表
    $scope.getTagList = function(e){
        console.log(e);
        $scope.resourceTag = e;
        $http({
            method: "POST",
            url: posturl+"/gettaglist",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            cache: $templateCache
        }).
            success(function(response) {
                $scope.tags = response.data;
                for(var i=0;i<$scope.tags.length;i++){
                    $scope.tags[i].tagName = UnUnicode( $scope.tags[i].tagName);
                    console.log($scope.tags[i]);
                }

            }).
            error(function(response) {
                console.log("error"); // Getting Error Response in Callback
                $scope.codeStatus = response || "Request failed";
                console.log($scope.codeStatus);
            });
    }

    //添加资源便签
    $scope.addResourceTag = function(){
        console.log($scope.resourceTag+"----"+$scope.tag.tagId);
        var jdata = "mydata={resourceId:"+$scope.resourceTag+","+"tagId:"+$scope.tag.tagId+"}";
        $http({
            method: "POST",
            url: posturl+"/addresourcetag",
            data : jdata,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            cache: $templateCache
        }).
            success(function(response) {
                if(response.data=="success"){
                    alert("添加成功");
                    window.location.reload ();
                }
                if(response.data=="false"){
                    alert("添加失败，标签已存在。");
                    window.location.reload ();
                }
            }).
            error(function(response) {
                console.log("error"); // Getting Error Response in Callback
                $scope.codeStatus = response || "Request failed";
                console.log($scope.codeStatus);
            });
    }
});
//转码
function UnUnicode(str)
{
    return unescape(str.replace(/\\/g, "%"));
}