/* Services */

var phonecatServices = angular.module('constApp', []);

const URL="http://localhost:8080/lohas/rest";

phonecatServices.service('$const', ["$http","$q",          //service方式
    function($http,$q){
		/**
		同步请求
		**/
		this.syncRequest=function(url,method,dataType,object,params){
			//同步请求,建立延迟
            var deferred = $q.defer();
			 $http({
                method: method,
                url: URL+"/"+url,
				dataType:dataType,
                data:object,
                params:params
            }).
                success(function(response){
					//完成状态
//                	console.log(response)
                    deferred.resolve(response);
                }).
                error(function(response){
					//拒绝状态
                    deferred.reject(response);
                });
            return deferred.promise;
		}
		/**
		异步请求
		**/
		this.asyncRequest=function(url,method,dataType,object){
			 $http({
                method: method,
                url: URL+"/"+url,
				dataType:dataType,
                data:object,
                params:params
            }).
                success(function(response){
	
                    return response.data;
                }).
                error(function(response){
					return response.data;
                });
		}
    }
]);