Fideligard.controller('StockCtrl',
	['$scope', 'dateService', 'stockService', 
	function($scope, dateService, stockService) {

		$scope.date = dateService.date;

		//$scope.stocks = stockService.buildStock($scope.date.ms);

		$scope.$watch('date.ms', function(newV, oldV) {
			$scope.stocks = [];
			$scope.stocks = stockService.buildStock($scope.date.ms);
		})

	}])