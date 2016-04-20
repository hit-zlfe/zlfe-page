var form1 = {
	fatherId: "father_form1",
	formId: "form1",
	formClass: "form1",
	//content: [row1,row2],
	content: {
		row1: {
			label: '用户名',                    // 表单标签
		    type: 'input',                     // 表单类型
		    validator: function (str) {//0-空 1-wrong 2-success
		    	var count=0;
				if(str==="") return 0;
				else if(/[^0-9a-z\u4e00-\u9fa5]/i.test(str))return 1;
				else {
					for(var i=0;i<str.length;i++){
						if(/[a-z0-9]/i.test(str[i]))count++;
						else count+=2;
					}
					if(count<4)return 1;
					if(count>18)return 1;
				}
				return 2;
		    },    // 表单验证规
		    rules: '必填，长度为4-16个字符',    // 填写规则提示
		    success: '格式正确',                // 验证通过提示
		    blank: '名称不能为空',              // 验证失败提示
		    fail: '用户名格式错误',
		},
		row2: {
			label: '密码',                    // 表单标签
		    type: 'input',                   // 表单类型
		    validator: function (str){//0-空 1-wrong 2-success
							if(str==="") return 0;
							else if(/[^0-9a-z]/gi.test(str))return 1;
							else {
								if(str.length<9)return 1;
								else if(str.length>16)return 1;
								else {
									passwordRight=true;
									nowPassword=str;
									return 2;
								}
							}
						},// 表单验证规
		    rules: '必填，长度为9-16个字符',    // 填写规则提示
		    success: '格式正确',                // 验证通过提示
		    blank: '名称不能为空',              // 验证失败提示
		    fail: '密码格式错误',
		}
	}
}

window.onload = function(){
	function init(){
		var form = new Form();
		form.createForm(form1);
	}
	init();	
}


