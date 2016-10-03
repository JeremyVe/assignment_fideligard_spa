Fideligard.factory('transactionService',
	['_',
	function(_) {

		var _transactions = [];

		var _symbols = [];

		var seedTransactions = function() {
			var symbols = ['AAPL', 'GOOGL', 'TWTR', 'FB'];
			for (var i = 0; i < 10; i++) {
				var transaction = {};
				var randSymbol = Math.floor(Math.random() * 4);
				transaction.symbol = symbols[randSymbol];
				transaction.price = 100;
				transaction.quantity = 5;
				transaction.type = 'buy'
				transaction.date = new Date('01-06-2015');
				_transactions.push(transaction);
			}
		}
		seedTransactions();


		var service = {};

		service.updatePortfolio = function(date) {
			var _portfolio = [];

			var transactions = _.filter(_transactions, function(transaction) {
				return transaction.date <= date;
			})

			for (var i = 0; i < _symbols.length; i++) {
				var symbol = _symbols[i];

				var stock = {
					symbol: symbol,
					quantity: 0,
					paidPrice: 0
				};

				for (var j = 0; j < transactions.length; j++) {
					var transaction = transactions[j];

					if (transaction.symbol === symbol) {
						if (transaction.type === "buy") {
							stock.quantity += parseFloat(transaction.quantity);
							stock.paidPrice += parseFloat(transaction.price) * transaction.quantity;
						} else {
							stock.quantity -= parseFloat(transaction.quantity);
							stock.paidPrice -= parseFloat(transaction.price) * transaction.quantity;
						}
					}
				}

				_portfolio.push(stock);
			}
			return _portfolio;
		}

		service.newTransaction = function(data) {
			var transaction = data;

			_transactions.push(transaction);

			if (_.indexOf(_symbols, data.symbol) === -1) {
				console.log('pushed ' + data.symbol + ' to the symbols array');
				_symbols.push(data.symbol);
			}
			return transaction;
		}

		service.getTransactions = function() {
			return _transactions;
		}

		return service;

	}])