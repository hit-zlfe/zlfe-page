var nameArr = ["名称不能为空","名称不能包含除中文、英文及数字以外的字符","名称长度过短","名称长度过长","名称可用"]
var passwordArr = ["密码不能为空","密码不能包含除英文及数字以外的字符","密码长度过短","密码长度过长","密码可用"]
var againArr = ["俩次密码不相同","请正确输入第一次密码","密码正确"];
var emailArr = ["名称不能为空","邮箱格式错误","邮箱格式正确"];
var phoneArr = ["手机号码不能为空","手机号码格式错误","手机号码格式正确"]
var nowPassword = "";
var passwordRight = false;

function checkName(str){
	var count=0;
	if(str==="")return nameArr[0];
	else if(/[^0-9a-z\u4e00-\u9fa5]/i.test(str))return nameArr[1];
	else {
		for(var i=0;i<str.length;i++){
			if(/[a-z0-9]/i.test(str[i]))count++;
			else count+=2;
		}
		if(count<4)return nameArr[2];
		if(count>18)return nameArr[3];
	}
	return nameArr[4];
};
function checkPassword(str){
	var count=0;
	passwordRight=false;
	if(str==="")return passwordArr[0];
	else if(/[^0-9a-z]/gi.test(str))return passwordArr[1];
	else {
		if(str.length<9)return passwordArr[2];
		else if(str.length>24)return passwordArr[3];
		else {
			passwordRight=true;
			nowPassword=str;
			return passwordArr[4];
		}
	}
};
function checkAgain(str){
	if(passwordRight){
		if(nowPassword===str)return againArr[2];
		else return againArr[0];
	}
	else return againArr[1];
};
function checkEmail(str){
	if(str==="")return emailArr[0];
	else if(/^[\w]+@([a-z0-9]+\.)+[a-z0-9]{2,4}$/i.test(str))return emailArr[2];
	else return emailArr[1];
};
function checkPhone(str){
	if(str==="")return phoneArr[0];
	else if(/^\d{11}$/.test(str))return phoneArr[2];
	else return phoneArr[1];
};
function checkTotal(obj){
	switch(obj.id){
		case "name":
			return checkName(obj.value);
			break;
		case "password":
			return checkPassword(obj.value);
			break;
		case "repassword":
			return checkAgain(obj.value);
			break;
		case "email":
			return checkEmail(obj.value);
			break;
		case "phone":
			return checkPhone(obj.value);
			break;
		default:
			alert("wrong");
	}
}
window.onload = function(){
	var name       = $("#name"),
	    name_alert = $("#name_alert"),
		password       = $("#password"),
		password_alert = $("#password_alert"),
		repassword       = $("#repassword"),
		repassword_alert = $("#repassword_alert"),
		phone       = $("#phone"),
		phone_alert = $("#phone_alert"),
		email       = $("#email"),
		email_alert = $("#email_alert");
		check = $("#check");
    var arrInput = [name,password,repassword,phone,email];
    var arrAlert = [name_alert,password_alert,repassword_alert,phone_alert,email_alert];
    var arrHint  = ["必填，长度为4~18个字符，只允许输入中文、英文字母和数字,中文占2字符",
    				"必填，长度为9~24个字符，只允许输入英文字母和数字",
					"请再次输入密码",
					"必填，请输入正确的手机号码",
					"必填，请输入正确的邮箱地址",
   					];
   	var arrCheck = ["名称可用",
				   	"密码可用",
				   	"密码正确",
				   	"邮箱格式正确",
				   	"手机号码格式正确",
   					]
	function init(){
		for (var i = arrInput.length - 1; i >= 0; i--) {
			(function (k) {
		        addEvent(arrInput[k], "focus", function () {
		        	addClass(arrAlert[k],'hint');
		        	arrAlert[k].innerHTML = arrHint[k]
		        	//console.log(k,arrHint[k]);
		        });

		        addEvent(arrInput[k], "blur", function () {
		        	(function(){
		        		//console.log(arrInput[k].value);
		        		arrAlert[k].innerHTML = checkTotal(arrInput[k]);
		        		if (arrCheck.indexOf(arrAlert[k].innerHTML)){
		        			removeClass(arrAlert[k],"hint");
							addClass(arrAlert[k],"wrong");
		        		}
		        	})();
		        });
		    })(i);
		    
		}
		addEvent(check,"click",function(){
			if(phone_alert.innerHTML=="手机号码格式正确"&&email_alert.innerHTML=="邮箱格式正确"&&repassword_alert.innerHTML=="密码正确"&&password_alert.innerHTML=="密码可用"&&name_alert.innerHTML=="名称可用"){
				alert("提交成功");
			}
			else alert("输入有误");
		})
	}
	init();	
}	
