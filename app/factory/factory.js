angular.module('myApp')
.factory('cart',function(){
	var cartData = []
	return {
		addProduct : function(id,name,price){
			var addToExsistingItem = false;
			for(var i = 0; i < cartData.length; i ++){
				if(cartData[i].id == id){
					addToExsistingItem = true;
					cartData[i].count++;
					console.log(cartData)
					break;
				}
			}
			if(!addToExsistingItem){
				console.log(!addToExsistingItem)
				cartData.push(
					{count: 1, id: id, price: price, name:name})
			}
		},
		removeProduct: function(id){
			for (var i =0; i < cartData.length ; i++) {
				if(	cartData[i].id == id){
					cartData.splice(i ,1)
					break;
				}
			}
		},
		getProducts: function(){
			return cartData;
		}
	}
})
.directive('cartSummary',function(cart){
	return {
		restrict: "E",
		templateUrl:"view1/cartSummary.html",
		controller: function($scope){
			var cartData = cart.getProducts();
			$scope.total = function(){
				var total=0;
					for (var i = 0; i < cartData.length; i++) {
					 total += cartData[i].count * cartData[i].price;
					}
				return total;
			}
			$scope.itemCount = function(){
				var total =0;
				for (var i = 0; i < cartData.length; i++) {
					total += cartData[i].count
				};
				return total;
			}
		}
	}
	
})