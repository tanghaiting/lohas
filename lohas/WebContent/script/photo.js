function imgview(ths ) {
	var dom = document.getElementById(ths.id);
	var fileSize = dom.files[0].size;
	if (fileSize > 8 * 1024 * 1024) {
		// $("#tipone").show();
		return false;
	}
	// $("#tipone").hide();
	var filepath = document.getElementById(ths.id).value;
	var re = /(\\+)/g;
	var filename = filepath.replace(re, "#");
	var one = filename.split("#");
	var two = one[one.length - 1];
	var imgName = two.split(".");
	var suffix = imgName[imgName.length - 1];
	var tp = "jpg,gif,png,JPG,GIF,PNG";
	var rs = tp.indexOf(suffix);
	var id = $(ths).parent().prev().attr("id");
	if (rs >= 0) {
		// $("#tip").hide();
		var fileObj = $(ths)[0].files[0];
		var formData = new FormData();
		formData.append("file", fileObj);
		$.ajax({
			url : '/contest/rest/fileservice' ,
			type : 'POST' ,
			data : formData ,
			success : function(data, status ) {
				if (data != null) {
					$("#img").attr("src","http://localhost:8080/file/"+data);
					$(ths).parent().append(
							'<input type="text" style="display:none;" id="picture" value="' + data + '">')
				}
			} ,
			error : function(data, status, e ) {

			} ,
			// Options to tell jQuery not to process data or worry about
			// content-type.
			cache : false ,
			contentType : false ,
			processData : false
		});
		return true;
	} else {
		ths.html("")
		// $("#tip").show();
		return false;
	}
}
function imgviewOne(ths ) {
	var dom = document.getElementById(ths.id);
	var fileSize = dom.files[0].size;
	if (fileSize > 8 * 1024 * 1024) {
		// $("#tipone").show();
		return false;
	}
	// $("#tipone").hide();
	var filepath = document.getElementById(ths.id).value;
	var re = /(\\+)/g;
	var filename = filepath.replace(re, "#");
	var one = filename.split("#");
	var two = one[one.length - 1];
	var imgName = two.split(".");
	var suffix = imgName[imgName.length - 1];
	var tp = "jpg,gif,png,JPG,GIF,PNG";
	var rs = tp.indexOf(suffix);
	var id = $(ths).parent().prev().attr("id");
	if (rs >= 0) {
		setImagePreview(ths, id);
		// $("#tip").hide();
		var fileObj = $(ths)[0].files[0];
		var formData = new FormData();
		formData.append("file", fileObj);
		$.ajax({
			url : '/sysc/rest/fileservice' ,
			type : 'POST' ,
			data : formData ,
			success : function(data, status ) {
				if (data != null) {
					if ($(ths).parent().find("input").eq(1).length > 0) {
						$(ths).parent().find("input").eq(1).remove();
					}
					$(ths).parent().append(
							'<input type="text" style="display:none;" name="idPicture" value="' + data + '">');
				}
			} ,
			error : function(data, status, e ) {

			} ,
			// Options to tell jQuery not to process data or worry about
			// content-type.
			cache : false ,
			contentType : false ,
			processData : false
		});
		return true;
	} else {
		ths.html("")
		// $("#tip").show();
		return false;
	}
}