//��������ͼƬ�ϴ�Ԥ������
function setImagePreview(value, id ) {
	var docObj = document.getElementById(value.id);
	var imgObjPreview = document.getElementById(id);
	if (docObj.files && docObj.files[0]) {
		// ����£�ֱ����img����
		imgObjPreview.style.display = 'block';
		imgObjPreview.img_w = $(this).width();
		imgObjPreview.img_h = $(this).height();
		imgObjPreview.style.border = 'solid 2px #e1e2e9';
		// imgObjPreview.src = docObj.files[0].getAsDataURL();

		// ���7���ϰ汾�����������getAsDataURL()��ʽ��ȡ����Ҫһ�·�ʽ
		imgObjPreview.src = window.URL.createObjectURL(docObj.files[0]);
	} else {
		// IE�£�ʹ���˾�
		docObj.select();
		var imgSrc = document.selection.createRange().text;
		var localImagId = document.getElementById("localImag");
		// �������ó�ʼ��С
		localImagId.img_w = $(this).width();
		localImagId.img_h = $(this).height();
		localImagId.style.border = "solid 2px #e1e2e9";
		// ͼƬ�쳣�Ĳ�׽����ֹ�û��޸ĺ�׺��α��ͼƬ
		try {
			localImagId.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
			localImagId.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = imgSrc;
		} catch (e) {
			alert("���ϴ���ͼƬ��ʽ����ȷ��������ѡ��!");
			return false;
		}
		imgObjPreview.style.display = 'none';
		document.selection.empty();
	}
	return true;
}
//