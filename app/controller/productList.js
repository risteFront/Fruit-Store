angular.module('myApp')
.constant('productActiveClass','btn-primary')
.constant('pageSize', 3)
.controller('productListCtrl',function($scope,$filter,productActiveClass,pageSize,cart){
    var selectedCategory = null;
     $scope.selectedPage = 1;
     $scope.pageSize = pageSize

 	$scope.selectCategory = function(newCategory){
 		selectedCategory = newCategory
 		$scope.selectedPage = 1;

 	}
 	$scope.selectPage = function(page){
 		$scope.selectedPage = page;
 	}
 	$scope.categoryFilterFn = function(product){
 		 return selectedCategory == null || product.category == selectedCategory
 	}
 	$scope.getActiveClass= function(category){
 		return selectedCategory == category ? productActiveClass : "";
 	}
 	$scope.getPageClass = function(page){
 		 return $scope.selectedPage == page ? productActiveClass : "";
 	}
 	$scope.addToCart = function(product){
      cart.addProduct(product.id,product.name,product.price);
 	}
 	$scope.itemsPerPage = 3;
  $scope.currentPage = 0;
  $scope.items = $scope.data.products


  $scope.range = function() {
    var rangeSize = 5;
    var ret = [];
    var start;

    start = $scope.currentPage;
    if ( start > $scope.pageCount()-rangeSize ) {
      start = $scope.pageCount()-rangeSize+1;
    }

    for (var i=start; i<start+rangeSize; i++) {
      ret.push(i);
    }
    return ret;
  };

  $scope.prevPage = function() {
    if ($scope.currentPage > 0) {
      $scope.currentPage--;
    }
  };

  $scope.prevPageDisabled = function() {
    return $scope.currentPage === 0 ? "disabled" : "";
  };

  $scope.pageCount = function() {
    return Math.ceil($scope.items.length/$scope.itemsPerPage)-1;
  };

  $scope.nextPage = function() {
    if ($scope.currentPage < $scope.pageCount()) {
      $scope.currentPage++;
    }
  };

  $scope.nextPageDisabled = function() {
    return $scope.currentPage === $scope.pageCount() ? "disabled" : "";
  };

  $scope.setPage = function(n) {
    $scope.currentPage = n;
  };

})