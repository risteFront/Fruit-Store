angular.module('myApp')
.controller('checkoutCtrl',function($scope,cart){
	$scope.cartData = cart.getProducts();
	console.log($scope.cartData);

	$scope.total = function(){
		var total = 0
		for(var i = 0; i < $scope.cartData.length; i ++){
			total += $scope.cartData[i].count * $scope.cartData[i].price
		}
		return total;
	}
	$scope.removeItem = function(id){
		cart.removeProduct(id);
	}
})