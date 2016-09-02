Fideligard.controller('TradeCtrl', 
	['$scope', '$stateParams', 'transactionService', 'portfolioService', 
	function($scope, $stateParams, transactionService, portfolioService) {

		$scope.trade = {};
		$scope.trade.symbol = $stateParams.symbol;
		$scope.trade.date = new Date( parseInt($stateParams.date) );
		$scope.trade.price = $stateParams.price;
		$scope.trade.type = "buy";
		$scope.trade.quantity = 1;

		$scope.cashAvailable = portfolioService.getCash();

		$scope.createTrade = function(formValid) {
			var trade = angular.copy($scope.trade, {});
			if (formValid) {
				var validTrade = portfolioService.checkTrade(trade);

				if (validTrade) {

					transactionService.newTransaction(trade);
					
					console.log('saving the transaction');
				} else {
					console.log("cannot buy or sell this");
				}
			} else {
				console.log("wrong inputs");
			}
		}

	}])