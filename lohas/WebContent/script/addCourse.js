var app = angular.module("addCourseApp",[]);

app.controller("addCourseContraller",function($scope,$http,$templateCache){

    $scope.uploadfile = function(fileval){
        $("#btnsubmit").attr('disabled',true);
        var fileObj = $("#fileToUpload")[0].files[0];
        var formData = new FormData();
        formData.append("file1",fileObj);
        var types="/jpg/png/";
        var src=fileval.split("\\");
        var type=src[src.length-1].split(".");
        if(types.indexOf(type[1])!='-1'){
            $.ajax({
                url: 'http://192.168.2.109/upload',
                type: 'POST',
                data: formData,
                success:function(data, status){
                    console.log(data);
                    var src1=data.split("/");
                    src1="http://192.168.2.109/image/"+src1[src1.length-1];
                    $scope.coverUrl = src1;
                    $("#btnsubmit").attr('disabled',false);
                },
                error:function(data,status, e){
                    alert("上传失败");
                },
                //Options to tell jQuery not to process data or worry about content-type.
                cache: false,
                contentType: false,
                processData: false
            });
        }
        else{
            alert("暂不支持该类型的文件，请重新选择!");
        }
    }

    $scope.creatCourse = function(){
        $scope.course.coverUrl=$scope.coverUrl;
        $scope.course.maxStudentNumber=parseInt($scope.course.maxStudentNumber);
        $scope.course.circle=parseInt($scope.course.circle);
        $scope.course.creator="1";
        jdata = "mydata="+JSON.stringify($scope.course);
        console.log(jdata);
        $http({
            method: "POST",
            url: "http://localhost:1212/creatCourse",
            data: jdata,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            cache: $templateCache
        }).
            success(function(response) {
                var s = response.data;
                if(s == "success"){
                    alert("上传成功");
                    window.location.href = "/course.html";
                }
                if(s == "false"){
                    alert("上传失败");
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