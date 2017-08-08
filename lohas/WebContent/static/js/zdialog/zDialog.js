/**
 * zzDialog 2.1 20100629
 * QQ： E-mail:
 * 最后修正：2014-12-31
 **/

var webroot=window.parent.document.location.href;
if(webroot.indexOf('#') > 0){
	webroot=webroot.substring(0,webroot.indexOf('#'));
}else if(webroot.indexOf('?') > 0){
	webroot=webroot.substring(0,webroot.indexOf('?'));
}
webroot=webroot.substring(0,webroot.lastIndexOf('/'));

var IMAGESPATH = webroot+'/static/js/zdialog/images/'; //图片路径配置，如在有iframe情况下使用，此路径为最顶层窗口页面的相对路径
//var IMAGESPATH = 'http://www.wangzhaohui.com/wp-content/uploads/2009/11/'; //图片路径配置
var HideScrollbar=true;//弹出zDialog时是否隐藏滚动条
/*************************一些公用方法和属性****************************/
var agt =   window.navigator.userAgent;
var isIE = agt.toLowerCase().indexOf("msie") != -1;
var isGecko = agt.toLowerCase().indexOf("gecko") != -1;
var ieVer = isIE ? parseInt(agt.split(";")[1].replace(/(^\s*)|(\s*$)/g,"").split(" ")[1]) : 0;
var isIE8 = !!window.XDomainRequest && !!document.documentMode;
var isIE7 = ieVer==7 && !isIE8;
var ielt7 = isIE && ieVer<7;

var getDom = function (id) {
    return typeof id == "string" ? document.getElementById(id) : id;
};
//if (!window.$) var $ = getDom;
function stopEvent(evt){//阻止一切事件执行,包括浏览器默认的事件
	evt = window.event||evt;
	if(!evt){
		return;
	}
	if(isGecko){
		evt.preventDefault();
		evt.stopPropagation();
	}
	evt.cancelBubble = true
	evt.returnValue = false;
}

Array.prototype.remove = function (s, dust) { //如果dust为ture，则返回被删除的元素
    if (dust) {
        var dustArr = [];
        for (var i = 0; i < this.length; i++) {
            if (s == this[i]) {
                dustArr.push(this.splice(i, 1)[0]);
            }
        }
        return dustArr;
    }
    for (var i = 0; i < this.length; i++) {
        if (s == this[i]) {
            this.splice(i, 1);
        }
    }
    return this;
}
if(!isIE&&HTMLElement){
	if(!HTMLElement.prototype.attachEvent){
		window.attachEvent = document.attachEvent = HTMLElement.prototype.attachEvent = function(evtName,func){
			evtName = evtName.substring(2);
			this.addEventListener(evtName,func,false);
		}
		window.detachEvent = document.detachEvent = HTMLElement.prototype.detachEvent = function(evtName,func){
			evtName = evtName.substring(2);
			this.removeEventListener(evtName,func,false);
		}
	}
}else if(isIE&&ieVer<8){
	try{ document.execCommand('BackgroundImageCache',false,true); }catch(e){}
}
var $topWindow = function () {
    var parentWin = window;
    while (parentWin != parentWin.parent) {
        if (parentWin.parent.document.getElementsByTagName("FRAMESET").length > 0) break;
        parentWin = parentWin.parent;
    }
    return parentWin;
};
var $bodyDimensions = function (win) {
    win = win || window;
    var doc = win.document;
    var cw = doc.compatMode == "BackCompat" ? doc.body.clientWidth : doc.documentElement.clientWidth;
    var ch = doc.compatMode == "BackCompat" ? doc.body.clientHeight : doc.documentElement.clientHeight;
    var sl = Math.max(doc.documentElement.scrollLeft, doc.body.scrollLeft);
    var st = Math.max(doc.documentElement.scrollTop, doc.body.scrollTop);
    var sw = Math.max(doc.documentElement.scrollWidth, doc.body.scrollWidth);
    var sh = Math.max(doc.documentElement.scrollHeight, doc.body.scrollHeight);
	if(sh<ch)
		sh=ch; //IE下在页面内容很少时存在scrollHeight<clientHeight的情况
    return {
        "clientWidth": cw,
        "clientHeight": ch,
        "scrollLeft": sl,
        "scrollTop": st,
        "scrollWidth": sw,
        "scrollHeight": sh
    }
}

var fadeEffect = function(element, start, end, speed, callback){//透明度渐变：start:开始透明度 0-100；end:结束透明度 0-100；speed:速度1-100
	if(!element.effect)
		element.effect = {fade:0, move:0, size:0};
	clearInterval(element.effect.fade);
	var speed=speed||20;
	element.effect.fade = setInterval(function(){
		start = start < end ? Math.min(start + speed, end) : Math.max(start - speed, end);
		element.style.opacity =  start / 100;
		element.style.filter = "alpha(opacity=" + start + ")";
		if(start == end){
			clearInterval(element.effect.fade);
			if(callback)
				callback.call(element);
		}
	}, 20);
};

/*************************弹出框类实现****************************/
var topWin = $topWindow();
var topDoc = topWin.document;
var zDialog = function () {
    /****以下属性以大写开始，可以在调用show()方法前设置值****/
    this.ID = null;
    this.Width = null;
    this.Height = null;
    this.URL = null;
	this.OnLoad=null;
    this.InnerHtml = ""
    this.InvokeElementId = ""
    this.Top = "50%";
    this.Left = "50%";
    this.Title = "　";
    this.OkButtonText = "确 定";
    this.CancelButtonText = "取 消";
    this.OKEvent = null; //点击确定后调用的方法
    this.CancelEvent = null; //点击取消及关闭后调用的方法
    this.ShowButtonRow = false;
    this.MessageIcon = "window.gif";
    this.MessageTitle = "";
    this.Message = "";
    this.ShowMessageRow = false;
    this.Modal = true;
    this.Drag = true;
    this.AutoClose = null;
    this.ShowCloseButton = true;
	this.Animator = !ielt7;
	this.MsgForESC = "";
	this.InnerFrameName = null;
    /****以下属性以小写开始，不要自行改变****/
    this.dialogDiv = null;
	this.bgDiv=null;
    this.openerWindow = null;
    this.openerzDialog = null;
    this.innerFrame = null;
    this.innerWin = null;
    this.innerDoc = null;
    this.zindex = 900;
    this.cancelButton = null;
    this.okButton = null;
    this.unauthorized = false;

    if (arguments.length > 0 && typeof(arguments[0]) == "string") { //兼容旧写法
        this.ID = arguments[0];
    } else if (arguments.length > 0 && typeof(arguments[0]) == "object") {
        zDialog.setOptions(this, arguments[0])
    }
	if(!this.ID){
		this.ID = topWin.zDialog._dialogArray.length + "";
	}
};
zDialog._dialogArray = [];
zDialog._childzDialogArray = [];
zDialog.bgDiv = null;
zDialog.setOptions = function (obj, optionsObj) {
    if (!optionsObj) return;
    for (var optionName in optionsObj) {
        obj[optionName] = optionsObj[optionName];
    }
};
zDialog.attachBehaviors = function () {
	document.attachEvent("onkeydown", zDialog.onKeyDown);
	window.attachEvent('onresize', zDialog.resetPosition);
	if(!HideScrollbar&&ielt7)
		window.attachEvent("onscroll", zDialog.resetPosition);
};
zDialog.prototype.attachBehaviors = function () {
	var self = this;
    if (this.Drag && topWin.Drag){//注册拖拽方法
		var dragHandle=topWin.getDom("_Draghandle_" + this.ID),dragBody=topWin.getDom("_zDialogDiv_" + this.ID);
		topWin.Drag.init(dragHandle, dragBody);
		dragBody.onDragStart = function (left,top,mouseX,mouseY) {
			if (!isIE && self.URL) { //非ie浏览器下在拖拽时用一个层遮住iframe，以免光标移入iframe失去拖拽响应
				topWin.getDom("_Covering_" + self.ID).style.display = ""
			}
		}
		dragBody.onDragEnd = function(left,top,mouseX,mouseY){
			if (!isIE && self.URL) {
				topWin.getDom("_Covering_" + self.ID).style.display = "none"
			}
			var bd = $bodyDimensions(topWin);
			if(left<0)
				this.style.left='0px';
			if(left+this.clientWidth>bd.clientWidth)
				this.style.left=bd.clientWidth-this.clientWidth+'px';
			if(ielt7){
				if(top<bd.scrollTop)
					this.style.top=bd.scrollTop+'px';
				if(top+33>bd.scrollTop+bd.clientHeight)
					this.style.top=bd.scrollTop+bd.clientHeight-33+'px';
			}else{
				if(top<0)
					this.style.top='0px';
				if(top+33>bd.clientHeight)
					this.style.top=bd.clientHeight-33+'px';
			}
		}
	}
};
zDialog.prototype.displacePath = function () {
    if (this.URL.substr(0, 7) == "http://" || this.URL.substr(0, 1) == "/" || this.URL.substr(0, 11) == "javascript:") {
        return this.URL;
    } else {
        var thisPath = this.URL;
        var locationPath = window.location.href;
        locationPath = locationPath.substring(0, locationPath.lastIndexOf('/'));
        while (thisPath.indexOf('../') >= 0) {
            thisPath = thisPath.substring(3);
            locationPath = locationPath.substring(0, locationPath.lastIndexOf('/'));
        }
        return locationPath + '/' + thisPath;
    }
};
zDialog.prototype.setPosition = function () {
    var bd = $bodyDimensions(topWin);
    var thisTop = this.Top,
        thisLeft = this.Left,
		thisdialogDiv=this.getzDialogDiv();
    if (typeof this.Top == "string" && this.Top.indexOf("%") != -1) {
        var percentT = parseFloat(this.Top) * 0.01;
			thisTop =ielt7?bd.clientHeight * percentT - thisdialogDiv.scrollHeight * percentT + bd.scrollTop:bd.clientHeight * percentT - thisdialogDiv.scrollHeight * percentT;
    }
    if (typeof this.Left == "string" && this.Left.indexOf("%") != -1) {
        var percentL = parseFloat(this.Left) * 0.01;
        thisLeft = ielt7?bd.clientWidth * percentL - thisdialogDiv.scrollWidth * percentL + bd.scrollLeft:bd.clientWidth * percentL - thisdialogDiv.scrollWidth * percentL;
    }
    thisdialogDiv.style.top = Math.round(thisTop) + "px";
    thisdialogDiv.style.left = Math.round(thisLeft) + "px";
};
zDialog.setBgDivSize = function () {
    var bd = $bodyDimensions(topWin);
	if(zDialog.bgDiv){
			if(ielt7){
				zDialog.bgDiv.style.height = bd.clientHeight + "px";
				zDialog.bgDiv.style.top=bd.scrollTop + "px";
				zDialog.bgDiv.childNodes[0].style.display = "none";//让div重渲染,修正IE6下尺寸bug
				zDialog.bgDiv.childNodes[0].style.display = "";
			}else{
				zDialog.bgDiv.style.height = bd.scrollHeight + "px";
			}
		}
};
zDialog.resetPosition = function () {
    zDialog.setBgDivSize();
    for (var i = 0, len = topWin.zDialog._dialogArray.length; i < len; i++) {
        topWin.zDialog._dialogArray[i].setPosition();
    }
};
zDialog.prototype.create = function () {
    var bd = $bodyDimensions(topWin);
    if (typeof(this.OKEvent)== "function") this.ShowButtonRow = true;
    if (!this.Width) this.Width = Math.round(bd.clientWidth * 4 / 10);
    if (!this.Height) this.Height = Math.round(this.Width / 2);
    if (this.MessageTitle || this.Message) this.ShowMessageRow = true;
    var zDialogDivWidth = this.Width + 13 + 13;
    var zDialogDivHeight = this.Height + 33 + 13 + (this.ShowButtonRow ? 40 : 0) + (this.ShowMessageRow ? 50 : 0);

    if (zDialogDivWidth > bd.clientWidth) this.Width = Math.round(bd.clientWidth - 26);
    if (zDialogDivHeight > bd.clientHeight) this.Height = Math.round(bd.clientHeight - 46 - (this.ShowButtonRow ? 40 : 0) - (this.ShowMessageRow ? 50 : 0));
    var html = '\
  <table id="_zDialogTable_{thisID}" width="' + (this.Width + 26) + '" cellspacing="0" cellpadding="0" border="0" onselectstart="return false;" style="-moz-user-select: -moz-none; font-size:12px; line-height:1.4;border-collapse: collapse;">\
    <tr id="_Draghandle_{thisID}" style="' + (this.Drag ? "cursor: move;" : "") + '">\
      <td width="13" height="33" style="background-image: url({IMAGESPATH}dialog_lt.png) !important;background: url({IMAGESPATH}dialog_lt.gif) no-repeat 0 0;"><div style="width: 13px;"></div></td>\
      <td height="33" style="background-image:url({IMAGESPATH}dialog_ct.png) !important;background: url({IMAGESPATH}dialog_ct.gif) repeat-x top;"><div style="padding: 9px 0 0 4px; float: left; font-weight: bold; color:#fff;"><img align="absmiddle" src="{IMAGESPATH}icon_dialog.gif"/><span id="_Title_{thisID}">' + this.Title + '</span></div>\
        <div id="_ButtonClose_{thisID}" onclick="zDialog.getInstance(\'{thisID}\').cancelButton.onclick.apply(zDialog.getInstance(\'{thisID}\').cancelButton,[]);" onmouseout="this.style.backgroundImage=\'url({IMAGESPATH}dialog_closebtn.gif)\'" onmouseover="this.style.backgroundImage=\'url({IMAGESPATH}dialog_closebtn_over.gif)\'" style="margin: 4px 0 0;*margin-top: 5px; position: relative;top:auto; cursor: pointer; float: right; height: 17px; width: 28px; background: url({IMAGESPATH}dialog_closebtn.gif) 0 0;' + (ielt7 ? "margin-top: 3px;" : "") + (this.ShowCloseButton ? "" : "display:none;") + '"></div></td>\
      <td width="13" height="33" style="background-image: url({IMAGESPATH}dialog_rt.png) !important;background: url({IMAGESPATH}dialog_rt.gif) no-repeat right 0;"><div style="width: 13px;"><a id="_forTab_{thisID}" href="#;"></a></div></td>\
    </tr>\
    <tr valign="top">\
      <td width="13" style="background-image: url({IMAGESPATH}dialog_mlm.png) !important;background: url({IMAGESPATH}dialog_mlm.gif) repeat-y left;"></td>\
      <td align="center"><table width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#ffffff">\
          <tr id="_MessageRow_{thisID}" style="' + (this.ShowMessageRow ? "" : "display:none") + '">\
            <td valign="top" height="50"><table width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#eaece9 url({IMAGESPATH}dialog_bg.jpg) no-repeat scroll right top;" id="_MessageTable_{thisID}">\
                <tr>\
                  <td width="50" height="50" align="center"><img width="32" height="32" src="{IMAGESPATH}' + this.MessageIcon + '" id="_MessageIcon_{thisID}"/></td>\
                  <td align="left" style="line-height: 16px;"><div id="_MessageTitle_{thisID}" style="font-weight:bold">' + this.MessageTitle + '</div>\
                    <div id="_Message_{thisID}">' + this.Message + '</div></td>\
                </tr>\
              </table></td>\
          </tr>\
          <tr>\
            <td valign="top" align="center"><div id="_Container_{thisID}" style="position: relative; width: ' + this.Width + 'px; height: ' + this.Height + 'px;background-color:white;">\
                <div style="position: absolute; height: 100%; width: 100%; display: none; background-color:#fff; opacity: 0.5;" id="_Covering_{thisID}">&nbsp;</div>\
	' + (function (obj) {
        if (obj.InnerHtml) return obj.InnerHtml;
        if (obj.URL) return '<iframe width="100%" height="100%" frameborder="0" style="border:none 0;" id="_zDialogFrame_' + obj.ID + '" ' + (obj.InnerFrameName?'name="'+obj.InnerFrameName+'"':'')+' src="' + obj.displacePath() + '"></iframe>';
        return "";
    })(this) + '\
              </div></td>\
          </tr>\
          <tr id="_ButtonRow_{thisID}" style="' + (this.ShowButtonRow ? "" : "display:none") + '">\
            <td height="36"><div id="_zDialogButtons_{thisID}" style="border-top: 1px solid #DADEE5; padding: 8px 20px; text-align: right; background-color:#f6f6f6;">\
                <input type="button" class="btn btn-success btn-sm" value="' + this.OkButtonText + '" id="_ButtonOK_{thisID}"/>\
                <input type="button" class="btn btn-default btn-sm" value="' + this.CancelButtonText + '" onclick="zDialog.getInstance(\'{thisID}\').close();" id="_ButtonCancel_{thisID}"/>\
              </div></td>\
          </tr>\
        </table></td>\
      <td width="13" style="background-image: url({IMAGESPATH}dialog_mrm.png) !important;background: url({IMAGESPATH}dialog_mrm.gif) repeat-y right;"></td>\
    </tr>\
    <tr>\
      <td width="13" height="13" style="background-image: url({IMAGESPATH}dialog_lb.png) !important;background: url({IMAGESPATH}dialog_lb.gif) no-repeat 0 bottom;"></td>\
      <td style="background-image: url({IMAGESPATH}dialog_cb.png) !important;background: url({IMAGESPATH}dialog_cb.gif) repeat-x bottom;"></td>\
      <td width="13" height="13" style="background-image: url({IMAGESPATH}dialog_rb.png) !important;background: url({IMAGESPATH}dialog_rb.gif) no-repeat right bottom;"><a onfocus=\'getDom("_forTab_{thisID}").focus();\' href="#;"></a></td>\
    </tr>\
  </table>\
</div>\
';
	html=html.replace(/\{IMAGESPATH\}/gm,IMAGESPATH).replace(/\{thisID\}/gm,this.ID)
    var div = topWin.getDom("_zDialogDiv_" + this.ID);
    if (!div) {
        div = topDoc.createElement("div");
        div.id = "_zDialogDiv_" + this.ID;
        topDoc.getElementsByTagName("BODY")[0].appendChild(div);
    }
    div.style.position =ielt7?"absolute":"fixed";
    div.style.left = "-9999px";
    div.style.top = "-9999px";
    div.innerHTML = html;
    if (this.InvokeElementId) {
        var element = getDom(this.InvokeElementId);
        element.style.position = "";
        element.style.display = "";
        if (isIE) {
            var fragment = topDoc.createElement("div");
            fragment.innerHTML = element.outerHTML;
            element.outerHTML = "";
            topWin.getDom("_Covering_" + this.ID).parentNode.appendChild(fragment)
        } else {
            topWin.getDom("_Covering_" + this.ID).parentNode.appendChild(element)
        }
    }
    this.openerWindow = window;
    if(window.ownerzDialog)
        this.openerzDialog = window.ownerzDialog;
    if (this.URL) {
        if (topWin.getDom("_zDialogFrame_" + this.ID)) {
            this.innerFrame = topWin.getDom("_zDialogFrame_" + this.ID);
        };
        var self = this;
        this.innerFrameOnload = function () {
				self.innerWin = self.innerFrame.contentWindow;
            try {
				self.innerWin.ownerzDialog = self;
                self.innerDoc = self.innerWin.document;
                if (self.Title=='　' && self.innerDoc && self.innerDoc.title) {
                    if (self.innerDoc.title) topWin.getDom("_Title_" + self.ID).innerHTML = self.innerDoc.title;
                };
            } catch(e) {
                if (window.console && window.console.log) console.log("可能存在访问限制，不能获取到浮动窗口中的文档对象。");
                self.unauthorized=true;
            }
            if (typeof(self.OnLoad)== "function")self.OnLoad();
        };
        if (!isGecko) {
            this.innerFrame.attachEvent("onreadystatechange", function(){//在ie下可以给iframe绑定onreadystatechange事件
				if((/loaded|complete/).test(self.innerFrame.readyState)){
					self.innerFrameOnload();
				}
			});
            //this.innerFrame.attachEvent("onload", self.innerFrameOnload);
        } else {
			//this.innerFrame.contentWindow.addEventListener("load", function(){self.innerFrameOnload()}, false);//在firefox下iframe仅能够绑定onload事件
            this.innerFrame.onload = self.innerFrameOnload;
        };
    };
    topWin.getDom("_zDialogDiv_" + this.ID).dialogId = this.ID;
    topWin.getDom("_zDialogDiv_" + this.ID).dialogInstance = this;
    this.attachBehaviors();
    this.okButton = topWin.getDom("_ButtonOK_" + this.ID);
    this.cancelButton = topWin.getDom("_ButtonCancel_" + this.ID);
	div=null;
};
zDialog.prototype.setSize = function (w, h) {
    if (w && +w > 20) {
        this.Width = +w;
        topWin.getDom("_zDialogTable_" + this.ID).width = this.Width + 26;
        topWin.getDom("_Container_" + this.ID).style.width = this.Width + "px";
    }
    if (h && +h > 10) {
        this.Height = +h;
        topWin.getDom("_Container_" + this.ID).style.height = this.Height +200 + "px";
    }
    this.setPosition();
};
zDialog.prototype.show = function () {
    this.create();
    var bgdiv = zDialog.getBgdiv(),
		thisdialogDiv=this.getzDialogDiv();
    thisdialogDiv.style.zIndex = this.zindex = parseInt(zDialog.bgDiv.style.zIndex) + 1;
    if (topWin.zDialog._dialogArray.length > 0) {
        thisdialogDiv.style.zIndex = this.zindex = topWin.zDialog._dialogArray[topWin.zDialog._dialogArray.length - 1].zindex + 2;
    } else {
        bgdiv.style.display = "none";
    	if(HideScrollbar){
	        var topWinBody = topDoc.getElementsByTagName(topDoc.compatMode == "BackCompat" ? "BODY" : "HTML")[0];
	        topWinBody.styleOverflow = topWinBody.style.overflow;
    		if(window.navigator.userAgent.indexOf("Firefox/3.6") != -1){//在firefox下改变overflow属性会导致scrollTop=0;
    			var topWinBodyScrollTop=topWinBody.scrollTop;
		        topWinBody.style.overflow = "hidden";
    			topWinBody.scrollTop=topWinBodyScrollTop;
    		}else{
	        	topWinBody.style.overflow = "hidden";
	        }
        }
    }
    topWin.zDialog._dialogArray.push(this);
	zDialog._childzDialogArray.push(this);
	if(zDialog._childzDialogArray.length==1){
		if(window.ownerzDialog){
			ownerzDialog.hiddenCloseButton();
		}
	}
    if (this.Modal) {
        bgdiv.style.zIndex = topWin.zDialog._dialogArray[topWin.zDialog._dialogArray.length - 1].zindex - 1;
        zDialog.setBgDivSize();
		if(bgdiv.style.display == "none"){
			if(this.Animator){
				var bgMask=topWin.getDom("_zDialogBGMask");
				bgMask.style.opacity = 0;
				bgMask.style.filter = "alpha(opacity=0)";
        		bgdiv.style.display = "";
				fadeEffect(bgMask,0,40,ielt7?20:10);
				bgMask=null;
			}else{
        		bgdiv.style.display = "";
			}
		}
    }
    this.setPosition();
    if (this.CancelEvent) {
        this.cancelButton.onclick = this.CancelEvent;
        if(this.ShowButtonRow)this.cancelButton.focus();
    }
    if (this.OKEvent) {
        this.okButton.onclick = this.OKEvent;
        if(this.ShowButtonRow)this.okButton.focus();
    }
    if (this.AutoClose && this.AutoClose > 0) this.autoClose();
    this.opened = true;
	bgdiv=null;
};
zDialog.prototype.close = function () {
    if(this.unauthorized==false){
    	if(this.innerWin&&this.innerWin.zDialog&&this.innerWin.zDialog._childzDialogArray.length>0){
    		return;
    	}
    }
	var thisdialogDiv=this.getzDialogDiv();
    if (this == topWin.zDialog._dialogArray[topWin.zDialog._dialogArray.length - 1]) {
        var isTopzDialog = topWin.zDialog._dialogArray.pop();
    } else {
        topWin.zDialog._dialogArray.remove(this);
    }
	zDialog._childzDialogArray.remove(this);
	if(zDialog._childzDialogArray.length==0){
		if(window.ownerzDialog){
			ownerzDialog.showCloseButton();
		}
	}

    if (this.InvokeElementId) {
        var innerElement = topWin.getDom(this.InvokeElementId);
        innerElement.style.display = "none";
        if (isIE) {
            //ie下不能跨窗口拷贝元素，只能跨窗口拷贝html代码
            var fragment = document.createElement("div");
            fragment.innerHTML = innerElement.outerHTML;
            innerElement.outerHTML = "";
            document.getElementsByTagName("BODY")[0].appendChild(fragment)
        } else {
            document.getElementsByTagName("BODY")[0].appendChild(innerElement)
        }

    }
    if (topWin.zDialog._dialogArray.length > 0) {
        if (this.Modal && isTopzDialog){
        	var index=topWin.zDialog._dialogArray.length;
        	var hiddenBgDiv=true;
        	while(index){
        		--index;
        		if(topWin.zDialog._dialogArray[index].Modal){
		        	zDialog.bgDiv.style.zIndex = topWin.zDialog._dialogArray[index].zindex - 1;
		        	hiddenBgDiv=false;
		        	break;
		        }
        	}
        	if(hiddenBgDiv){
		        zDialog.bgDiv.style.display = "none";
        	}
        }
    } else {
        zDialog.bgDiv.style.zIndex = "900";
        zDialog.bgDiv.style.display = "none";
        if(HideScrollbar){
	        var topWinBody = topDoc.getElementsByTagName(topDoc.compatMode == "BackCompat" ? "BODY" : "HTML")[0];
	        if(topWinBody.styleOverflow != undefined)
	    		if(window.navigator.userAgent.indexOf("Firefox/3.6") != -1){//在firefox下改变overflow属性会导致scrollTop=0;
	    			var topWinBodyScrollTop=topWinBody.scrollTop;
			        topWinBody.style.overflow = topWinBody.styleOverflow;
	    			topWinBody.scrollTop=topWinBodyScrollTop;
	    		}else{
		        	topWinBody.style.overflow = topWinBody.styleOverflow;
		        }
        }
    }
    this.openerWindow.focus();
	/*****释放引用，以便浏览器回收内存**/
    if (isIE&&!isIE8) {
		thisdialogDiv.dialogInstance=null;
		if (this.CancelEvent){this.cancelButton.onclick = null;};
		if (this.OKEvent){this.okButton.onclick = null;};
		topWin.getDom("_zDialogDiv_" + this.ID).onDragStart=null;
		topWin.getDom("_zDialogDiv_" + this.ID).onDragEnd=null;
		topWin.getDom("_Draghandle_" + this.ID).onmousedown=null;
		topWin.getDom("_Draghandle_" + this.ID).root=null;
        thisdialogDiv.outerHTML = "";
		CollectGarbage();
    } else {
        var RycDiv = topWin.getDom("_RycDiv");
        if (!RycDiv) {
            RycDiv = topDoc.createElement("div");
            RycDiv.id = "_RycDiv";
        }
        RycDiv.appendChild(thisdialogDiv);
        RycDiv.innerHTML = "";
		RycDiv=null;
    }
	this.innerFrame=null;
	this.bgDiv=null;
	thisdialogDiv=null;
    this.closed = true;
};
zDialog.prototype.autoClose = function () {
    if (this.closed) {
        clearTimeout(this._closeTimeoutId);
        return;
    }
    this.AutoClose -= 1;
    topWin.getDom("_Title_" + this.ID).innerHTML = this.AutoClose + " 秒后自动关闭";
    if (this.AutoClose <= 0) {
        this.close();
    } else {
        var self = this;
        this._closeTimeoutId = setTimeout(function () {
            self.autoClose();
        },
        1000);
    }
};
zDialog.getInstance = function (id) {
    var dialogDiv = topWin.getDom("_zDialogDiv_" + id);
    if (!dialogDiv) alert("没有取到对应ID的弹出框页面对象");
	try{
    	return dialogDiv.dialogInstance;
	}finally{
		dialogDiv = null;
	}
};
zDialog.prototype.addButton = function (id, txt, func) {
    topWin.getDom("_ButtonRow_" + this.ID).style.display = "";
    this.ShowButtonRow = true;
    var button = topDoc.createElement("input");
    button.id = "_Button_" + this.ID + "_" + id;
    button.type = "button";
    button.style.cssText = "margin-right:5px";
    button.value = txt;
    button.onclick = func;
    var input0 = topWin.getDom("_zDialogButtons_" + this.ID).getElementsByTagName("INPUT")[0];
    input0.parentNode.insertBefore(button, input0);
    return button;
};
zDialog.prototype.removeButton = function (btn) {
    var input0 = topWin.getDom("_zDialogButtons_" + this.ID).getElementsByTagName("INPUT")[0];
    input0.parentNode.removeChild(btn);
};
zDialog.prototype.hiddenCloseButton = function (btn) {
    var closebtn = topWin.getDom("_ButtonClose_" + this.ID);
	if(closebtn)
		closebtn.style.display='none';
};
zDialog.prototype.showCloseButton = function (btn) {
    var closebtn = topWin.getDom("_ButtonClose_" + this.ID);
	if(closebtn)
		closebtn.style.display='';
};
zDialog.getBgdiv = function () {
    if (zDialog.bgDiv) return zDialog.bgDiv;
    var bgdiv = topWin.getDom("_zDialogBGDiv");
    if (!bgdiv) {
        bgdiv = topDoc.createElement("div");
        bgdiv.id = "_zDialogBGDiv";
        bgdiv.style.cssText = "position:absolute;left:0px;top:0px;width:100%;height:100%;z-index:900";
        var bgIframeBox = '<div style="position:relative;width:100%;height:100%;">';
		var bgIframeMask = '<div id="_zDialogBGMask" style="position:absolute;background-color:#333;opacity:0.4;filter:alpha(opacity=40);width:100%;height:100%;"></div>';
		var bgIframe = ielt7?'<iframe src="about:blank" style="filter:alpha(opacity=0);" width="100%" height="100%"></iframe>':'';
		bgdiv.innerHTML=bgIframeBox+bgIframeMask+bgIframe+'</div>';
        topDoc.getElementsByTagName("BODY")[0].appendChild(bgdiv);
        if (ielt7) {
            var bgIframeDoc = bgdiv.getElementsByTagName("IFRAME")[0].contentWindow.document;
            bgIframeDoc.open();
            bgIframeDoc.write("<body style='background-color:#333' oncontextmenu='return false;'></body>");
            bgIframeDoc.close();
			bgIframeDoc=null;
        }
    }
    zDialog.bgDiv = bgdiv;
	bgdiv=null;
    return zDialog.bgDiv;
};
zDialog.prototype.getzDialogDiv = function () {
	var dialogDiv=topWin.getDom("_zDialogDiv_" + this.ID)
	if(!dialogDiv)alert("获取弹出层页面对象出错！");
	try{
		return dialogDiv;
	}finally{
		dialogDiv = null;
	}
};
zDialog.onKeyDown = function (evt) {
	var evt=window.event||evt;
    if ((evt.shiftKey && evt.keyCode == 9)
		 ||evt.keyCode == 8) { //shift键及tab键,或backspace键
        if (topWin.zDialog._dialogArray.length > 0) {
			var target = evt.srcElement||evt.target;
			if(target.tagName!='INPUT'&&target.tagName!='TEXTAREA'){//如果在不在输入状态中
				stopEvent(evt);
				return false;
			}
        }
    }
    if (evt.keyCode == 27) { //ESC键
        zDialog.close();
    }
};
zDialog.close = function (id) {
    if (topWin.zDialog._dialogArray.length > 0) {
        var diag = topWin.zDialog._dialogArray[topWin.zDialog._dialogArray.length - 1];
        if(diag.MsgForESC){
			zDialog.confirm(diag.MsgForESC,function(){diag.cancelButton.onclick.apply(diag.cancelButton, []);})
        }else{
        	diag.cancelButton.onclick.apply(diag.cancelButton, []);
        }
    }
};
zDialog.alert = function (msg, func, w, h) {
    var w = w || 300,
        h = h || 110;
    var diag = new zDialog({
        Width: w,
        Height: h
    });
    diag.ShowButtonRow = true;
    diag.Title = "系统提示";
    diag.CancelEvent = function () {
        diag.close();
        if (func) func();
    };
    diag.InnerHtml = '<table height="100%" border="0" align="center" cellpadding="10" cellspacing="0">\
		<tr><td align="right"><img id="Icon_' + this.ID + '" src="' + IMAGESPATH + 'icon_alert.gif" width="34" height="34" align="absmiddle"></td>\
			<td align="left" id="Message_' + this.ID + '" style="font-size:9pt">' + msg + '</td></tr>\
	</table>';
    diag.show();
    diag.okButton.parentNode.style.textAlign = "center";
    diag.okButton.style.display = "none";
    diag.cancelButton.value = diag.OkButtonText;
    diag.cancelButton.focus();
};
zDialog.confirm = function (msg, funcOK, funcCal, w, h) {
    var w = w || 300,
        h = h || 110;
    var diag = new zDialog({
        Width: w,
        Height: h
    });
    diag.ShowButtonRow = true;
    diag.Title = "信息确认";
    diag.CancelEvent = function () {
        diag.close();
        if (funcCal) funcCal();
    };
    diag.OKEvent = function () {
        diag.close();
        if (funcOK) funcOK();
    };
    diag.InnerHtml = '<table height="100%" border="0" align="center" cellpadding="10" cellspacing="0">\
		<tr><td align="right"><img id="Icon_' + this.ID + '" src="' + IMAGESPATH + 'icon_query.gif" width="34" height="34" align="absmiddle"></td>\
			<td align="left" id="Message_' + this.ID + '" style="font-size:9pt">' + msg + '</td></tr>\
	</table>';
    diag.show();
    diag.okButton.parentNode.style.textAlign = "center";
    diag.okButton.focus();
};
zDialog.open = function (arg) {
    var diag = new zDialog(arg);
    diag.show();
    return diag;
};
window.attachEvent("onload", zDialog.attachBehaviors);
