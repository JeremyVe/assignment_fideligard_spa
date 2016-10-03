Fideligard.controller('PortfolioCtrl', 
	['$scope', 'transactionService', 'dateService', 'portfolioService', 'stockService',
	function($scope, transactionService, dateService, portfolioService, stockService) {

		$scope.date = dateService.date;

		$scope.stock = stockService.buildStock($scope.date.ms);

		$scope.portfolio = transactionService.updatePortfolio($scope.date.ms);

		$scope.cash = portfolioService.getCash();

		$scope.$watch('date.ms', function(newV, oldV) {

			$scope.stock = [];
			$scope.stock = stockService.buildStock($scope.date.ms);

			$scope.portfolio = [];
			$scope.portfolio = transactionService.updatePortfolio($scope.date.ms);

			$scope.total = {};
			$scope.total = portfolioService.updateTotal($scope.portfolio, $scope.stock);
		})

		$scope.findStockBy = function(symbol) {
			var stock = $scope.stock;
			for (var i = 0; i < stock.length; i++) {
				if (stock[i].symbol === symbol) {
					return stock[i];
				}
			}
		}

	}])