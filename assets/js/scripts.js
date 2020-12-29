
jQuery(document).ready(function() {
	
    /*
        Fullscreen background
    */
    $.backstretch("assets/img/backgrounds/1.jpg");
    
    $('#top-navbar-1').on('shown.bs.collapse', function(){
    	$.backstretch("resize");
    });
    $('#top-navbar-1').on('hidden.bs.collapse', function(){
    	$.backstretch("resize");
    });
    
    /*
        Form
    */
    $('.registration-form fieldset:first-child').fadeIn('slow');
    
    $('.registration-form input[type="text"], .registration-form input[type="password"], .registration-form textarea').on('focus', function() {
    	$(this).removeClass('input-error');
    });
    
    // next step
    $('.registration-form .btn-next').on('click', function() {
		var param = $('#form-param-sql').val();
		var result = '';
		if(param){
			var temp = param.split("\n",-1);
			if(temp.length < 2){
				alert("入参少于2行")
			}else{
				var param_sql = '';//带有占位符的sql
				var param_params = '';//包含所有参数的字符串
				var params_size = 0;//参数个数
				var placeholders_size = 0;//占位符个数
				if(temp[0].indexOf("==>  Preparing:")>-1){
					//获取带有占位符的sql语句
					param_sql = temp[0].substr(temp[0].indexOf("==>  Preparing:") + 16);
					result_sqls = param_sql.split('?',-1);
					placeholders_size = result_sqls.length-1;
				}else{
					alert("第一行未找到==>  Preparing:");
					return;
				}
				
				if(temp[1].indexOf("==> Parameters:")>-1){
					//获取所有参数的字符串
					param_params = temp[1].substr(temp[1].indexOf("==> Parameters:") + 16);
					result_params = param_params.split(", ",-1);
					params_size = result_params.length
				}else{
					alert("第二行未找到==> Parameters:");
					return;
				}
				if(placeholders_size != params_size){
					alert("占位符与参数个数不一致！");
					return;
				}else{
					//处理入参
					for(var i=0;i<params_size;i++){
						var temp = result_params[i];
						value = temp.substr(0,temp.lastIndexOf("("));
						type = temp.substr(temp.lastIndexOf("(")+1,temp.lastIndexOf(")")-temp.lastIndexOf("(")-1);
						if(type=="String"||type=="Timestamp"||type=="Date"||type=="Time"||type=="LocalDate"||type=="LocalTime"||type=="LocalDateTime"){
							result_params[i] = "\'"+value+"\'";
						}else{
							result_params[i] = value;
						}
						
					}
					//拼装结果
					for(var i=0;i<params_size;i++){
						result = result + result_sqls[i] + result_params[i]
					}
					result = result + result_sqls[params_size];
					$('#form-result').val(result);
				}
				
			}
		}else{
			alert("入参为空！");
		}
		
    });
  
});
