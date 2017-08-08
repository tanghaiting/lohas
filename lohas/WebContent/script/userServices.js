var courseServices = angular.module('userServiceApp',["ngCookies","constApp"]);

courseServices.service('$userService', ['$http','$q','$const','$cookieStore',//service方式
    function($http,$q,$const,$cookieStore){
		/**
         * <p>Description:根据条件查询报名人员</p>
		 * @param contestName 赛项名称
		 * @param level 院校级别
		 * @param group 报名组别
		 * @param level 报名性质
         * @param begin 从哪个位置开始
		 * @param count 查多少条
         */
        this.findUserList = function(contestName,level,group,genre,begin,count){
              			$http({
							url : '/sysc/rest/userservice/users' ,
							method : 'POST' ,
							dataType : "json" ,
							params : {
								contestName:contestName,
								level:level,
								genre:genre,
								group:group,
								bigin : begin ,
								count : count,
								numberId : numberUid ,
								access_token : token
							}
						}).success(function(data) {
							$.each(data, function(i) {
								if(data[i].nation!=null){
									data[i].nation = nation[parseInt(data[i].nation) - 1].name;
									}	var year = (new Date()).getFullYear();
								data[i].year=(year-parseInt(data[i].year));
							})			
                               return data;							
						});
        }
		/**
         * <p>Description:根据条件查询报名人员总数</p>
		 * @param contestName 赛项名称
		 * @param level 院校级别
		 * @param group 报名组别
		 * @param level 报名性质
         */
		 this.findUserCount = function(contestName,level,group,genre,begin,count){
              			$http({
							url : '/sysc/rest/userservice/count' ,
							method : 'POST' ,
							dataType : "json" ,
							params : {
								contestName:contestName,
								level:level,
								genre:genre,
								group:group,
								numberId : numberUid ,
								access_token : token
							}
						}).success(function(data) {
							return data;
						});
        }
    }
]);

//转码
function UnUnicode(str)
{
    return unescape(str.replace(/\\/g, "%"));
}