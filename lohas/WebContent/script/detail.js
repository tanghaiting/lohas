var app = angular.module("detailApp",["ngCookies","courseServiceApp"]);

app.controller("courseDetailContraller",function($scope,$http,$cookieStore,$templateCache,$courseService,$const){
    $scope.courseDetail = $cookieStore.get("courseDetail");
    $scope.getLessonResource = function(e){
        var courseId =  $scope.courseDetail.id;
        var jdata = "myData={"+"courseId:"+"'"+courseId+"'"+","+"lessonId:"+"'"+e+"'"+"}";
        $http({
            method: "POST",
            url: $const.URL+"getLessonResource",
            data: jdata,
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            cache: $templateCache
        }).
            success(function(response){
                $scope.ss = response.data;
                $(".ss").val($scope.ss)
            }).
            error(function(response){

            });
    }
    $scope.addLesson = function(e){
        $scope.lesson.courseId = $scope.courseDetail.id;
        var jdata = "myData="+JSON.stringify($scope.lesson);
        $http({
            method: "POST",
            url: $const.URL+"addLesson",
            data: jdata,
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            cache: $templateCache
        }).
            success(function(response){
                $courseService.getCourseDetail($scope.lesson.courseId,$http,$cookieStore,$templateCache);
            }).
            error(function(response){

            });
    }
    $scope.addCourse = function(e){
        $scope.lesson.courseId = $scope.courseDetail.id;
        var jdata = "myData="+JSON.stringify($scope.lesson);
        $http({
            method: "POST",
            url: $const.URL+"addLesson",
            data: jdata,
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            cache: $templateCache
        }).
            success(function(response){
                $courseService.getCourseDetail($scope.lesson.courseId,$http,$cookieStore,$templateCache);
            }).
            error(function(response){

            });
    }
});
//转码
function UnUnicode(str)
{
    return unescape(str.replace(/\\/g, "%"));
}