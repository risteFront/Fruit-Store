'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.version',
  'Filter'
])
.constant("baseUrl","http://localhost:2403/staff")
.constant('ordersUrl',"http://localhost:2403/orders")
.config(['$routeProvider',function($routeProvider) {
	$routeProvider
	.when('/checkout',{
		templateUrl : 'view1/checkout.html',
		controller:'checkoutCtrl'
	})
	.when('/products',{
		templateUrl:'view1/productList.html',
		controller:'productListCtrl'
	})
	.when('/placeorder',{
		templateUrl:'view1/placeOrder.html'
	})
	.when('/complete',{
		templateUrl:"view1/thankYou.html"
	})
  $routeProvider.otherwise({redirectTo: '/products'});

}])
.controller('appCtrl',function($scope,$filter,baseUrl,$http,cart,ordersUrl,$location){
	$scope.dataa={
		productss:[
		{id:0,name:"Product#1",description:"A product",category:"Category1",price:23},
		{id:1,name:"Product#2",description:"A product",category:"Category1",price:22},
		{id:2,name:"Product#3",description:"A product",category:"Category2",price:2},
		{id:3,name:"Product#4",description:"A product",category:"Category3",price:2.22},
		{id:4,name:"Product#5",description:"A product",category:"Category4",price:3.33}
	]}
	$scope.data = {}
	$http.get(baseUrl).success(function(data){
		$scope.data.products = data
		console.log($scope.data.products)
	})
	$scope.sendOrder = function(order){
		var order = angular.copy(order)
		order.products = cart.getProducts();
		$http.post(ordersUrl, order).success(function(data){
			$scope.data.orderId = data.id
			cart.getProducts().length = 0;
		})
		.error(function(error){
			$scope.data.orderError = error
		})
		.finally(function(){
			$location.path('/complete')
		})
	}
})

