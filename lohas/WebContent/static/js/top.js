var app = angular.module("topApp", []);
app.controller("top", function($scope, $http) {
	$scope.n=0;         //判断当前页面在导航显示的类型
	$scope.map=function(n){
		$scope.n=n;
	}
});
/* 走进洛哈思 */
$(".mynavbar .mysubnav").eq(1).mouseenter(function(){
	$(".mynavbar .mysubnav").eq(1).find("ul").css("left","-20px").slideDown(100);
	$(".mynavbar .block").eq(0).css("left","26px").css("display",'block');
	$(".mynavbar .mysubnav").eq(1).find("ul .subli")
	.mouseenter(function(){ $(this).css("background","#2d3e50"); })
	.css("color","#fff")
	.mouseleave(function(){ $(this).css("background","#fff"); });
	$(".mynavbar .mysubnav").eq(1).find("ul .subli1")
	.mouseenter(function(){ $(this).css("background","#2d3e50"); })
	.css("color","#fff")
	.mouseleave(function(){ $(this).css("background","#fff"); });
	
});
$(".mynavbar .mysubnav").eq(1).mouseleave(function(){
	$(".mynavbar .mysubnav").eq(1).find("ul").slideUp(100);
	$(".mynavbar .block").css("display",'none');
});
/* 研发中心 菜单*/
$(".mynavbar .mysubnav").eq(2).mouseenter(function(){
	$(".mynavbar .mysubnav").eq(2).find("ul").css("left","-28px").slideDown(100);
	$(".mynavbar .block").eq(1).css("left","17px").css("display",'block');
	$(".mynavbar .mysubnav").eq(2).find("ul .subli")
	.mouseenter(function(){ $(this).css("background","#2d3e50"); })
	.css("color","#fff")
	.mouseleave(function(){ $(this).css("background","#fff"); });
	$(".mynavbar .mysubnav").eq(2).find("ul .subli1")
	.mouseenter(function(){ $(this).css("background","#2d3e50"); })
	.css("color","#fff")
	.mouseleave(function(){ $(this).css("background","#fff"); });
	
	//子菜单点击事件
	$(".mynavbar .mysubnav").eq(2).find("ul .subli").eq(0).click(function(){
		var title = $(document).attr("title");
		if(title == '研发中心'){
			$("html,body").animate({"scrollTop": "480px"}, 400); 
		}else{
			$(this).find("a").attr("href","devCenter.html?type=1"); 
		}
	});
	$(".mynavbar .mysubnav").eq(2).find("ul .subli1").eq(0).click(function(){
		var title = $(document).attr("title");
		if(title == '研发中心'){
			$("html,body").animate({"scrollTop": "1320px"}, 500); 
		}else{
			$(this).find("a").attr("href","devCenter.html?type=2");
		}
	});
});
$(".mynavbar .mysubnav").eq(2).mouseleave(function(){
	$(".mynavbar .mysubnav").eq(2).find("ul").slideUp(100);
	$(".mynavbar .block").css("display",'none');
});


/*产品与服务*/

$(".mynavbar .mysubnav").eq(3).mouseenter(function(){
	$(".mynavbar .mysubnav").eq(3).find("ul").css("left","-20px").slideDown(100);
	$(".mynavbar .block").eq(2).css("left","26px").css("display",'block');
	$(".mynavbar .mysubnav").eq(3).find("ul .subli")
	.mouseenter(function(){ $(this).css("background","#2d3e50"); })
	.css("color","#fff")
	.mouseleave(function(){ $(this).css("background","#fff"); });
	$(".mynavbar .mysubnav").eq(3).find("ul .subli1")
	.mouseenter(function(){ $(this).css("background","#2d3e50"); })
	.css("color","#fff")
	.mouseleave(function(){ $(this).css("background","#fff"); });
	
});
$(".mynavbar .mysubnav").eq(3).mouseleave(function(){
	$(".mynavbar .mysubnav").eq(3).find("ul").slideUp(100);
	$(".mynavbar .block").css("display",'none');
});

/* 返回顶部 事件 */
$(document).ready(function(){  
    $("#go_top").hide();  
    $(function () {  
        //检测屏幕高度  
        var height=$(window).height();  
        $(window).scroll(function(){  
            if ($(window).scrollTop()>height){  
                $("#go_top").fadeIn(500);  
            }else{  
                $("#go_top").fadeOut(500);  
            }  
        });  
        $("#go_top").click(function(){  
            $('body,html').animate({scrollTop:0},100);  
            return false;  
        });  
    });  
});   