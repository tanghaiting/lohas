var editorService = angular.module('editorServiceApp',["ngCookies","constApp"]);

editorService.service('$editorService', ['$const','$cookieStore',//service方式
    function($const){
				
		/**
         * <p>Description:查看资源列表</p>
         * @param course 课程对象
         */
        this.getResourceList = function(course){
           return $const.syncRequest("getResourceList","POST","json","","");
        }
		
		/**
         * <p>Description:查看资源</p>
         * @param course 课程对象
         */
        this.getResourceDetail11 = function(resID){
			var param = {};
			param["resID"]  = resID
			var result = $const.asyncRequest("getResourceDetail","POST","json","",param);
			console.log(result)
           return result;
        }
		
		this.getResourceDetail = function(resID){
			//获取课程列表的承诺
			var param = {};
			param["resID"]  = resID
			var result = $const.syncRequest("getResourceDetail","POST","json","",param);
			return result;
        }
		
		/**
         * <p>Description:查看全部学科</p>
         * @param course 课程对象
         */
        this.getLabels = function(course){
			var param = {};
			var result = $const.syncRequest("getLabels","POST","json","",param);
           return result;
        }
		
		/**
         * <p>Description:获取关键字列表</p>
         * @param course 课程对象
         */
        this.getKeywords = function(userId,type){
			var param = {};
			param["userId"] = userId;
			param["type"] = type;
			var result = $const.syncRequest("getKeywords","POST","json","",param);
           return result;
        }
        
        /**
         * <p>Description:添加关键字</p>
         * @param course 课程对象
         */
        this.addKeyword = function(name,userId){
			var param = {};
			param["name"] = name;
			param["userId"] = userId;
			var result = $const.syncRequest("addKeyword","POST","json","",param);
           return result;
        }
        
        /**
         * <p>Description:上传资源</p>
         * @param course 课程对象
         */
        this.uploadResource = function(name,author,description,path,jsonLabels,jsonAppendixs){
			var param = {};
			param["name"] = name;
			param["author"] = author;
			param["description"] = description;
			param["path"] = path;
			param["jsonLabels"] = jsonLabels;
			param["jsonAppendixs"] = jsonAppendixs;
			var result = $const.syncRequest("uploadResource","POST","json","",param);
           return result;
        }
        
        /**
         * <p>Description:修改资源</p>
         * @param course 课程对象
         */
        this.modifyResource = function(resID,name,author,description,jsonLabels,jsonAppendixs){
			var param = {};
			param["name"] = name;
			param["author"] = author;
			param["description"] = description;
			param["jsonLabels"] = jsonLabels;
			param["jsonAppendixs"] = jsonAppendixs;
			param["resID"]=resID;
			var result = $const.syncRequest("modifyResource","POST","json","",param);
           return result;
        }
        
        

        
        /**
         * <p>Description:是否启用最新资源</p>
         * @param course 课程对象
         */
        this.getAvailableNewResource = function(){
			var param = {};
			var result = $const.syncRequest("getAvailableNewResource","POST","json","",param);
           return result;
        }
        
        /**
         * <p>Description:是否启用热门资源</p>
         * @param course 课程对象
         */
        this.getAvailableHotResource = function(){
			var param = {};
			var result = $const.syncRequest("getAvailableHotResource","POST","json","",param);
           return result;
        }
        
        /**
         * <p>Description:是否启用名师资源</p>
         * @param course 课程对象
         */
        this.getAvailableTeacherResource = function(){
			var param = {};
			var result = $const.syncRequest("getAvailableTeacherResource","POST","json","",param);
           return result;
        }
        
        /**
         * <p>Description:是否启用滚播资源</p>
         * @param course 课程对象
         */
        this.getAvailableRollResource = function(){
			var param = {};
			var result = $const.syncRequest("getAvailableRollResource","POST","json","",param);
           return result;
        }
        
        /**
         * <p>Description:是否启用精品资源</p>
         * @param course 课程对象
         */
        this.getAvailableBestResource = function(){
			var param = {};
			var result = $const.syncRequest("getAvailableBestResource","POST","json","",param);
           return result;
        }
        
        /**
         * <p>Description:获取最新资源</p>
         * @param course 课程对象
         */
        this.getNewResource = function(start,num){
			var param = {};
			param["start"] = start;
			param["num"] = num;
			var result = $const.syncRequest("getNewResource","POST","json","",param);
           return result;
        }
        
        /**
         * <p>Description:获取热门资源</p>
         * @param course 课程对象
         */
        this.getHotResource = function(start,num){
			var param = {};
			param["start"] = start;
			param["num"] = num;
			var result = $const.syncRequest("getHotResource","POST","json","",param);
           return result;
        }
        
        /**
         * <p>Description:获取名师资源</p>
         * @param course 课程对象
         */
        this.getTeacherResource = function(start,num){
			var param = {};
			param["start"] = start;
			param["num"] = num;
			var result = $const.syncRequest("getTeacherResource","POST","json","",param);
           return result;
        }
        
        /**
         * <p>Description:获取滚播资源</p>
         * @param course 课程对象
         */
        this.getRollResource = function(start,num){
			var param = {};
			param["start"] = start;
			param["num"] = num;
			var result = $const.syncRequest("getRollResource","POST","json","",param);
           return result;
        }
        
        /**
         * <p>Description:获取精品资源</p>
         * @param course 课程对象
         */
        this.getBestRecource = function(start,num){
			var param = {};
			param["start"] = start;
			param["num"] = num;
			var result = $const.syncRequest("getBestRecource","POST","json","",param);
           return result;
        }
		
    }
]);

//转码
function UnUnicode(str)
{
    return unescape(str.replace(/\\/g, "%"));
}