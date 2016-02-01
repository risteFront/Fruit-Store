angular.module('Filter',[])
.filter('unique',function(){
	return function(data, propertyName){
		if(angular.isArray(data) && angular.isString(propertyName)){
			var array=[];
			var obj={}
			for(var i = 0; i < data.length; i++){
				var temp = data[i][propertyName]
				if(angular.isUndefined(obj[temp])){
					obj[temp]= true;
					array.push(temp)
				}
			}
			return array;
		}else{
			return data;
		}	
	}
})
.filter('range',function($filter){
	return function(data,page,size){
		if(angular.isArray(data) && angular.isNumber(page) && angular.isNumber(size)){
			var start_index = (page-1)* size;
			if(data.length<start_index){
				return []
			}else{
				return $filter('limitTo')(data.splice(start_index),size)
			}
		}else{
			return data;
		}
	}
})
.filter('pageCount',function(){
	return function(data,page){
		if(angular.isArray(data) && angular.isNumber(page)){
			var array=[]
			for(var i =0; i< Math.ceil(data.length/3); i++){
				array.push(i);
			}
			return array;
		}else{
			return data;
		}
	}
})
.filter('offset', function() {
  return function(input, start) {
    start = parseInt(start, 10);
    return input.slice(start);
  };
});