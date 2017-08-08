var courseServices = angular.module('courseServiceApp',["ngCookies","constApp"]);

courseServices.service('$courseService', ['$http','$q','$const','$cookieStore',//service方式
    function($http,$q,$const,$cookieStore){
		/**
         * <p>Description:查询课程列表</p>
         * @param begin 从哪个位置开始
		 * @param count 查多少条
         */
        this.getCourseList = function(){
            //获取课程列表的承诺
            var promise =$const.syncRequest("getCourseList","POST","json","","");
            promise.then(function(data) {
                //完成承诺，接收返回值
                return data;
            },function(data){
                //拒绝承诺，接收拒绝原因
                return data;
            });
        }
		
		
         /**
         * <p>Description:根据ID查询课程详细信息</p>
         * @param uid 课程标识
         */
        this.getCourseDetail =function(uid){
			params={};
			params["uid"]=uid;
			return $const.asyncRequest("getCourseDetail","POST","json","",params);
        }
        
		/**
         * <p>Description:创建课程</p>
         * @param course 课程对象
         */
        this.creatCourse = function(course){
           return $const.asyncRequest("creatCourse","POST","json",course,"");
        }
    }
]);

//转码
function UnUnicode(str)
{
    return unescape(str.replace(/\\/g, "%"));
}