Fideligard.factory('transactionService',
	function() {

		var _transactions = [];

		var service = {};

		service.newTransaction = function(data) {
			var transaction = data;

			_transactions.push(transaction);
			return transaction;
		}

		service.getTransactions = function() {
			return _transactions;
		}

		return service;

	})