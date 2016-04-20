var cityAndCollege = [
    ["艾欧尼亚", "北京大学", "清华大学", "上海交通大学", "浙江大学"],
    ["均衡教派", "Harvard University", "Yale University", "University of Cambridge", "Oxford University"],
    ["黑色玫瑰", "STANFORD University", "University of Chicago", "Massachusetts Institute of Technology"],
    ["诺克萨斯", "Duke University", "University of Pennsylvania", "California Institute of Technology"],
    ["德玛西亚", "Columbia University", "princeton University", "University of California, Berkeley"],
    ["班德尔城", "南京大学", "华南理工大学", "中国科学院大学", "国防科技大学"]
];
function showCollege(obj, sub) {
    sub.innerHTML = "";
    var option = null;
    for (var i = 1, len = cityAndCollege[obj.selectedIndex].length; i < len; i++) {
        option = document.createElement("option");
        option.innerHTML = cityAndCollege[obj.selectedIndex][i];
        sub.appendChild(option);
    }
};
window.onload = function(){
	function init(){
		var student = $("#student");
		var arrRadio = document.getElementsByName("people");
		var college = $("#college");
		var company = $("#company");
		var city = $("#city");
		var school = $("#school");
		/**
		 * 在校生和非在校生切换的时候改变选择内容，原理是改变display值
		 */
		delegateEvent(student, "input", "click", function () {
			//console.log("afd",arrRadio);
		    var current = "";
		    for (var i = 0, len = arrRadio.length; i < len; i++) {
		        if (arrRadio[i].checked) {
		            current = arrRadio[i].value;
		            break;
		        }
		    }
		    if (current === "在校生") {
		        college.style.display = "block";
		        company.style.display = "none";
		    } else {
		        college.style.display = "none";
		        company.style.display = "block";
		    }
		});
		addEvent(city, "click", function () {
		    showCollege(city, school);
		});
	}
	init();	
}	
