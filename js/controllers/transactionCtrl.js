Fideligard.controller('TransactionCtrl', 
	['$scope', 'transactionService', 'stockService', 
	function($scope, transactionService, stockService) {

		$scope.transactions = transactionService.getTransactions();
		$scope.symbols = stockService.getSymbols();

		$scope.orderColumn = 'symbol',
		$scope.orderReverse = true;
	
	}])