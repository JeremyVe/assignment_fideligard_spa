Fideligard.factory('transactionService',
	function() {

		var _transactions = [];


		var seedTransactions = function() {
			var symbols = ['AAPL', 'GOOGL', 'TWTR', 'FB'];
			for (var i = 0; i < 10; i++) {
				var transaction = {};
				var randSymbol = Math.floor(Math.random() * 4);
				transaction.symbol = symbols[randSymbol];
				transaction.price = 100;
				transaction.quantity = 5;
				transaction.type = ( Math.floor(Math.random() * 2) === 0 ) ? 'buy' : 'sell';
				transaction.date = new Date('01-03-2015');
				_transactions.push(transaction);
			}
		}
		seedTransactions();



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