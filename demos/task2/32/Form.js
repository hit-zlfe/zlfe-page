function Form(){
	this.cfg = {
		fatherId: "father",
		formId:   "default",
		formClass: "default",
	}
}

Form.prototype = {
	createForm: function(cfg){
		cfg = extend({},this.cfg,cfg); //覆盖默认值
		//console.log("createForm");
		var form = document.createElement("form");
		form.id = cfg.formId;
		addClass(form,cfg.formClass)
		document.getElementById(cfg.fatherId).appendChild(form);

		this.addContent(cfg,form);
	},

	addContent: function(cfg,form){	
		console.log(cfg,"addContent");
		var content = cfg.content;
		console.log(content);
		//console.log(cfg.contents.row1s);
		for(var row in content){
			var newrow = document.createElement("div");
			newrow.id = "row_"+row;
			form.appendChild(newrow);
			type = content[row].type;
			switch(type){
				case "input":
					console.log("addInput");
					this.addInput(content[row],newrow);
					break;
				case "select":
					console.log("addSelect");
					break;
				default:
			};
		}

	},

	addInput: function(cfg,row){
		var input = document.createElement("input");
		var label = document.createElement("label");
		var hint = document.createElement("span");
		hint.id  = "alert"; hint.innerHTML = cfg.rules;
		addClass(hint,"hide");addClass(hint,"hint");

		label.innerHTML = cfg.label;
		row.appendChild(label);
		row.appendChild(input);
		row.appendChild(hint);

		function showalert(rules){
			console.log(".innerHTML = rules;");
		}

		addEvent(input,"focus",function(){
			removeClass(hint,'hide');
		});

		addEvent(input,"blur",function(){
			var input_value = input.value;
			var checkFunction = cfg.validator;

			var check_result = checkFunction(input_value);
			if(check_result == 0){
				removeClass(hint,"hint");
				addClass(hint,'wrong');
				hint.innerHTML = cfg.blank;
			}else if(check_result == 2){
				removeClass(hint,"wrong");
				addClass(hint,'hint');
				hint.innerHTML = cfg.success;
			}else{
				removeClass(hint,"hint");
				addClass(hint,'wrong');
				hint.innerHTML = cfg.fail;
			};
		});

		console.log(cfg);
	},
}

