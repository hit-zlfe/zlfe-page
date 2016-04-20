默认接口：
function Form(){
    this.cfg = {
        fatherId: "father",  //创建表单所在的父节点ID
        formId:   "default", //创建表单节点ID
        formClass: "default",//默认样式
        content: {           //表单的内容，按行添加
            row1:
            row2:
        },
    }
}
row: {
            label: '用户名',                   // 表单标签
            type: 'input',                     // 表单类型
            validator: function (str) {},    
                                                // 表单验证规0-空 1-wrong 2-success
            rules: '必填，长度为4-16个字符',    // 填写规则提示
            success: '格式正确',                // 验证通过提示
            blank: '名称不能为空',              // 验证无输入提示
            fail: '用户名格式错误',             // 验证失败
}

例子：
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


//目前只是实现完input类型的函数
//按照mdn的html指南，还有...
//但是就是函数逻辑可能不一样而已，框架已经搭完了

<button>   HTMLButtonElement   button元素表示一个可点击的按钮。
<datalist>  HTMLDataListElement 
datalist元素包含一组 <option> 元素，表示其它表单元素的可能值。

<fieldset>  HTMLFieldSetElement 
fieldset元素用于将几个表单元素分组到一个form。

<form>  HTMLFormElement 
form元素表示文档的一部分，包含使用户通过web浏览器提交信息的交互元素。

<input> HTMLInputElement    
input元素用于创建表单的交互控件。

<keygen>    HTMLKeygenElement   
keygen元素促进key material的产生，以及公共密钥作为HTML表单的提交。

<label> HTMLLabelElement    
label元素表示用户界面中的一个条目的标题。

<legend>    HTMLLegendElement   
legend元素表示它的父级<fieldset>元素内容的标题。

<meter> HTMLMeterElement    
meter元素表示一个可知范围的标量值或分数值。

<optgroup>  HTMLOptGroupElement 
optgroup元素创建<select>元素中的选项集。

<option>    HTMLOptionElement   
HTML的option元素用来创建一个控件，表示<select>，<optgroup>或<datalist>元素中的一个条目。

<output>    HTMLOutputElement   
output元素表示计算结果。

<progress>  HTMLProgressElement 
progress元素用来查看任务的完成进展。

<select>    HTMLSelectElement   select元素表示展示选项菜单的控件。
<textarea>  HTMLTextAreaElement textarea元素表示一个多行明文可编辑控件。