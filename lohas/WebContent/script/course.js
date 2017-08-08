var app = angular.module("courseApp", [ "ngCookies", "editorServiceApp" ]);

var labels = {};
var majors = {}
app.controller("courseContraller", function($scope, $http, $cookieStore,
		$templateCache, $editorService) {
	var log = "";
	var list = [];
	var list2 = [];
	var list3 = [];
	var list4 = [];
	$scope.majors = [];
	// 获取资源列表
	$scope.getResourceList = function() {
		var promise = $editorService.getResourceList();

		promise.then(function(data) {
			// 完成承诺，接收返回值
			$scope.resources = strToJson(data);
			return data;
		}, function(data) {
			// 拒绝承诺，接收拒绝原因
			return data;
		});

	}
	// 获取资源详细信息
	$scope.getResourceDetail = function(resID) {
		var map1={},map2={},map3={},map4={};
		var promise = $editorService.getResourceDetail(resID);
		promise.then(function(data) {
			// 完成承诺，接收返回值
			data=strToJson(data);
			console.log(data)
			$.each(data.labels,function(index,data){
				switch(data.type){
				case 1:
				map1[data.code]=data;
				break;
				case 2:
				map2[data.code]=data;
				break;
				case 3:
				map3[data.code]=data;
				break;
				case 4:
				map4[data.code]=data;
				break;
				}
			})
			$scope.resId=resID;
			$scope.subjects=addChecked($scope.labels,map1,1);
			list=$scope.subjects;
			$scope.majors=addChecked($scope.subjects,map2,2);
			list2=$scope.majors;
			$scope.majorFields=addChecked($scope.majors,map3,3);
			list3=$scope.majorFields;
			$scope.keys=addChecked($scope.keywords,map4,4);
			list4=$scope.keys;
			$scope.author=data.resAuthor;
			$scope.name=data.resName;
			$scope.description=data.resDescription;
			$scope.appendixs=data.appendixs;
//			$scope.resImg=data.
			return data;
		}, function(data) {
			// 拒绝承诺，接收拒绝原因
			return data;
		});

	}

	// 添加关键字
	$scope.addKeyword = function() {
		console.log($scope.keywords)
/*		var keyword = $("#newKeyword").val();*/
		for (var i = 0; i < $scope.keywords.length; i++) {
			if ($scope.keyword.name == $scope.keywords[i].name) {
				$("#keyworddiv").append("关键字已存在")
				return ;
			}
		}
		var promise = $editorService.addKeyword($scope.keyword.name, "1");
		promise.then(function(data) {
			// 完成承诺，接收返回值
			$scope.keyword.code=data;
			$scope.keywords.push($scope.keyword);
		}, function(data) {
			// 拒绝承诺，接收拒绝原因
			
		});
	}

	// 判断推荐资源状态
	$scope.whetherRes = function() {
		// 是否启用最新资源
		var newPromise = $editorService.getAvailableNewResource();
		newPromise.then(function(data) {
			// 完成承诺，接收返回值
			console.log(data + "----是否启用最新资源-------")
			return data;
		}, function(data) {
			// 拒绝承诺，接收拒绝原因
			return data;
		});

		// 是否启用热门资源
		var hotPromise = $editorService.getAvailableHotResource();
		hotPromise.then(function(data) {
			// 完成承诺，接收返回值
			console.log(data + "----是否启用热门资源-------")
			return data;
		}, function(data) {
			// 拒绝承诺，接收拒绝原因
			return data;
		});

		// 是否启用名师资源
		var teacherPromise = $editorService.getAvailableTeacherResource();
		teacherPromise.then(function(data) {
			// 完成承诺，接收返回值
			console.log(data + "----是否启用名师资源-------")
			return data;
		}, function(data) {
			// 拒绝承诺，接收拒绝原因
			return data;
		});

		// 是否启用滚播资源
		var rollPromise = $editorService.getAvailableRollResource();
		rollPromise.then(function(data) {
			// 完成承诺，接收返回值
			console.log(data + "----是否启用滚播资源-------")
			return data;
		}, function(data) {
			// 拒绝承诺，接收拒绝原因
			return data;
		});

		// 是否启用精品资源
		var bestPromise = $editorService.getAvailableBestResource();
		bestPromise.then(function(data) {
			// 完成承诺，接收返回值
			console.log(data + "----是否启用精品资源-------")
			return data;
		}, function(data) {
			// 拒绝承诺，接收拒绝原因
			return data;
		});
	}

	// 获取最新资源
	$scope.getNewRes = function(start, num) {
		var promise = $editorService.getNewResource(start, num);
		promise.then(function(data) {
			// 完成承诺，接收返回值
			console.log(data + "----是否启用滚播资源-------")
			return data;
		}, function(data) {
			// 拒绝承诺，接收拒绝原因
			return data;
		});
	}

	// 获取热门资源
	$scope.getHotRes = function(start, num) {
		var promise = $editorService.getHotResource(start, num);
		promise.then(function(data) {
			// 完成承诺，接收返回值
			console.log(data + "----是否启用滚播资源-------")
			return data;
		}, function(data) {
			// 拒绝承诺，接收拒绝原因
			return data;
		});
	}

	// 获取名师资源
	$scope.getTeacherRes = function(start, num) {
		var promise = $editorService.getTeacherResource(start, num);
		promise.then(function(data) {
			// 完成承诺，接收返回值
			console.log(data + "----是否启用滚播资源-------")
			return data;
		}, function(data) {
			// 拒绝承诺，接收拒绝原因
			return data;
		});
	}

	// 获取精品资源
	$scope.getBestRes = function(start, num) {
		var promise = $editorService.getBestRecource(start, num);
		promise.then(function(data) {
			// 完成承诺，接收返回值
			console.log(data + "----是否启用滚播资源-------")
			return data;
		}, function(data) {
			// 拒绝承诺，接收拒绝原因
			return data;
		});
	}

	// 获取滚播资源
	$scope.getRollRes = function(start, num) {
		var promise = $editorService.getRollResource(start, num);
		promise.then(function(data) {
			// 完成承诺，接收返回值
			console.log(data + "----是否启用滚播资源-------")
			return data;
		}, function(data) {
			// 拒绝承诺，接收拒绝原因
			return data;
		});
	}

	// 上传资源
	$scope.uploadResource = function() {
		var path = $("#appendixUrl").val();
		var imgPaths = $(".imgUrl");
		var appendixs = [];
		for (var i = 0; i < imgPaths.length; i++) {
			appendixs.push(imgPaths[i].value)
		}
/*		var subCode = document.getElementById("subject").value;
		var majCode = document.getElementById("major").value;
		var mfCode = document.getElementById("majorField").value;
		$scope.selected.push({
			"type" : 1,
			"code" : subCode
		})
		$scope.selected.push({
			"type" : 2,
			"code" : majCode
		})
		$scope.selected.push({
			"type" : 3,
			"code" : mfCode
		})*/
		console.log(path);
		$scope.selected=$scope.ceshi();
		var jsonLabels = JSON.stringify($scope.selected);
		var jsonAppendixs = JSON.stringify(appendixs);
		var promise = $editorService.uploadResource($scope.name,$scope.author,$scope.description,path, jsonLabels,
				jsonAppendixs);
		promise.then(function(data) {
			// 完成承诺，接收返回值
			console.log(data + "----1111-------")
			return data;
		}, function(data) {
			// 拒绝承诺，接收拒绝原因
			return data;
		});
	}
	
	
	// 修改
	$scope.modifyResource = function() {
		var imgPaths = $(".imgUrl");
		var appendixs = [];
		for (var i = 0; i < imgPaths.length; i++) {
			appendixs.push(imgPaths[i].value)
		}
/*		var subCode = document.getElementById("subject").value;
		var majCode = document.getElementById("major").value;
		var mfCode = document.getElementById("majorField").value;
		$scope.selected.push({
			"type" : 1,
			"code" : subCode
		})
		$scope.selected.push({
			"type" : 2,
			"code" : majCode
		})
		$scope.selected.push({
			"type" : 3,
			"code" : mfCode
		})*/
		$scope.selected=$scope.ceshi();
		var jsonLabels = JSON.stringify($scope.selected);
		var jsonAppendixs = JSON.stringify(appendixs);
		var promise = $editorService.modifyResource($scope.resId,$scope.name,$scope.author,$scope.description,jsonLabels,
				jsonAppendixs);
		promise.then(function(data) {
			// 完成承诺，接收返回值
			console.log(data + "----1111-------")
			return data;
		}, function(data) {
			// 拒绝承诺，接收拒绝原因
			return data;
		});
	}

	$scope.selected = [];

	
	var updateSelected = function(action, label, name, type) {
		if (type == 1) {
			if (action == 'add') {
				list.push(label);
				/*
				 * $scope.selected.push({ "type" : 4, "code" : label.id });
				 */
				console.log($scope.selected + "-----selected------")
			}
			if (action == 'remove') {
				var listIndex=[];
				var map={};
				$.each(list, function(index, data) {
					if (data!=undefined&&label.code == data.code) {
						$.each(list2, function(number, major) {
							if (major!=undefined&&major.parentCode == data.code) {
								listIndex.push(number);
								map[major.code]=major.code;
							}
						})
						list.splice(index, 1);
					}
				})
				var listIndex2=[];
				listIndex2=getListIndexs(list3,listIndex2,map);
				list3=deleteLabels(listIndex2,list3);
				$scope.majorFields=list3;
				list2 = deleteLabels(listIndex,list2);
				$scope.mjaors=list2;
			}
			console.log(list);
			$scope.subjects = list;
		}
		if (type == 2) {
			if (list2 == undefined) {
				list2 = [];
			}
			if (action == 'add') {
				list2.push(label);
				/*
				 * $scope.selected.push({ "type" : 4, "code" : label.id });
				 */
				console.log($scope.selected + "-----selected------")
			}
			if (action == 'remove') {
				var listIndexs = [];
				$.each(list2, function(index, data) {
					if (data!=undefined&&label.code == data.code) {
						$.each(list3, function(number, major) {
							if (major!=undefined&&major.parentCode == data.code) {
								listIndexs.push(number);
							}
						})
						list2.splice(index, 1);
					}
				})
				list3=deleteLabels(listIndexs,list3);
				$scope.majorFields=list3;
			}
			console.log(list2);
			$scope.majors = list2;
		}
		if (type == 3) {
			if (list3 == undefined) {
				list3 = [];
			}
			if (action == 'add') {
				list3.push(label);
				/*
				 * $scope.selected.push({ "type" : 4, "code" : label.id });
				 */
				console.log($scope.selected + "-----selected------")
			}
			if (action == 'remove') {
				$.each(list3, function(index, data) {
					if (data!=undefined&&label.code == data.code) {
						list3.splice(index, 1);
					}
				})
				console.log($scope.selected + "-----selected------")

			}
			console.log(list3);
			$scope.majorFields=list3;
		}
		if(type==4){
			if (action == 'add') {
				list4.push(label);
				/*
				 * $scope.selected.push({ "type" : 4, "code" : label.id });
				 */
				console.log($scope.selected + "-----selected------")
			}
			if (action == 'remove') {
				$.each(list4, function(index, data) {
					if (data!=undefined&&label.code == data.code) {
						list4.splice(index, 1);
					}
				})
				

			}
			console.log(list4);
		}
	}

	$scope.updateSelection = function($event, label, type) {
		var checkbox = $event.target;
		var action = (checkbox.checked ? 'add' : 'remove');
		updateSelected(action, label, checkbox.name, type);
	}

	$scope.isSelected = function(id) {
		return $scope.selected.indexOf(id) >= 0;
	}

	// 查询所有标签
	// $scope.getLabels =function (){
	var promise = $editorService.getLabels();
	var keywords = $editorService.getKeywords(1, 1);
	promise.then(function(data) {
		// 完成承诺，接收返回值
		console.log(data + "----查询所有标签-------")
		labels = strToJson(data);
		$scope.labels = labels;
		selectForLabel(strToJson(data));
		return data;
	}, function(data) {
		// 拒绝承诺，接收拒绝原因
		return data;
	})

	keywords.then(function(data) {
		// 完成承诺，接收返回值
		console.log(data + "----查询所有关键字111-------")
		$scope.keywords = strToJson(data);
		return data;
	}, function(data) {
		// 拒绝承诺，接收拒绝原因
		return data;
	})
	
	$scope.ceshi=function(){
		var countList=[];
		if(list!=undefined){
		$.each(list,function(index,data){
			data.type=1;
			countList.push(data);
		})
		}
		if(list2!=undefined){
		$.each(list2,function(index,data){
			data.type=2;
			countList.push(data);
		})
		}
		if(list3!=undefined){
		$.each(list3,function(index,data){
			data.type=3;
			countList.push(data);
		})
		}
		if(list4!=undefined){
			$.each(list4,function(index,data){
				data.type=4;
				countList.push(data);
			})
		}
		console.log(countList);
		return countList;
	}

});

function selectForLabel(data) {

	for (var i = 0; i < data.length; i++) {
		var op = new Option(data[i].name, data[i].code);
		document.getElementById("subject").options.add(op)
	}
}

function chgSub(thi) {
	thi = thi - 1;
	document.getElementById("major").options.length = 0;
	document.getElementById("majorField").options.length = 0;
	if (thi >= 0) {
		majors = labels[thi].kLabelDTOs;
		for (var i = 0; i < majors.length; i++) {
			var op = new Option(majors[i].name, majors[i].code);
			document.getElementById("major").options.add(op)
		}
		chgMaj(0);
	} else {
		var op = new Option("请选择学科", -1);
		var op1 = new Option("请选择学科", -1);
		document.getElementById("major").options.add(op1)
		document.getElementById("majorField").options.add(op)
	}
}

function chgMaj(thi) {
	document.getElementById("majorField").options.length = 0;
	var majorFields = majors[thi].kLabelDTOs;
	if (majorFields.length > 0) {
		for (var i = 0; i < majorFields.length; i++) {
			var op = new Option(majorFields[i].name, majorFields[i].code);
			document.getElementById("majorField").options.add(op)
		}
	} else {
		var op = new Option("无专业方向", -1);
		document.getElementById("majorField").options.add(op)
	}
}

function strToJson(str) {
	var json = eval('(' + str + ')');
	return json;
}

function newList(list) {
	var newList = [];
	$.each(list, function(index, data) {
		newList.push(data);
	})
	return newList;
}

function getListIndexs(list,listIndexs,map){
	$.each(list,function(index,data){
		if(map[data.parentCode]!=undefined){
			listIndexs.push(index);
		}
	})
	return listIndexs;
}

function deleteLabels(listIndexs,list){
	for(var i=listIndexs.length-1;i>=0;i--){
		list.splice(listIndexs[i], 1);
	}
	return list;
}

function addChecked(list,addCheckMap,type){
	switch(type){
	case 1:
		var listLabels=[];
		$.each(list,function(index,label){
			if(addCheckMap[label.code]!=undefined){
				label.check="checked";
				listLabels.push(label);
			}
		})
		return listLabels;
	case 2:
		var listLabels=[];
		for(var i=0;i<list.length;i++){
			var sbuject=list[i];
			$.each(sbuject.kLabelDTOs,function(number,major){
				if(addCheckMap[major.code]!=undefined){
					major.check="checked";
					listLabels.push(major);
				}
			})
		}
		return listLabels;
	case 3:
		var listLabels=[];
		for(var i=0;i<list.length;i++){
			var major=list[i];
			$.each(major.kLabelDTOs,function(number,majorFiled){
				if(addCheckMap[majorFiled.code]!=undefined){
					majorFiled.check="checked";
					listLabels.push(majorFiled);
				}
			})
		}
		return listLabels;
	case 4:
		var listLabels=[];
		$.each(list,function(index,keyword){
			if(addCheckMap[keyword.code]!=undefined){
				keyword.check="checked";
				listLabels.push(keyword);
			}
		})
		return listLabels;
	}
	
}

