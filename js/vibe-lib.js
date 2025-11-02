$(function(window, document){
	window.AjaxGet = function AjaxGet(url,data, callback){
		      $.ajax({
        type: "GET",
        data: data,
        url: url,
        success: function(data){
            callback(null, data);
        },
        error: function(data){
            callback(data, null);
        }
        });
    }

    window.AjaxPost = function AjaxPost(url, data, callback){
        $.ajax({
        type: "POST",
        url: url,
        data: data,
        success: function(data){
            callback(null, data);
        },
        error: function(data){
            callback(data, null);
        }
        });
    }

    window.addArray = function addArray(array, obj){
        if(array.length == 0){
          array[0] = obj;
        }else{
          array.push(obj);
        }
        return array;
    }

    window.msgAlert = function msgAlert(message){
    	var itens = "<div class='alert alert-danger' role='alert'>";
          itens += "<p class='alert-link '>"+message+"</p>";
          itens += "</div>";

        return itens;
    }

    window.changeFormat = function changeFormat(value){
      if(typeof value === 'string'){
        value = parseFloat(value.replace(',','.'));
      }
      return value;

    }

    window.formatValue = function formatValue(value){
        console.log(value);
        value = value.split('$')[1].split('');

        var aux="";
        for(var i = 1; i <= value.length-1;i++){
            aux += value[i];
        }

        return aux;
      }
})(window);
