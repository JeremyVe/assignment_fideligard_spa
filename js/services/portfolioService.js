Fideligard.factory('portfolioService', 
	function() {

		var _cash = 1000000;

		var _stockOwn = {};

		var service = {};

		service.checkTrade = function(trade) {

			if (trade.type === 'buy') {
				if (trade.price * trade.quantity > _cash) {
					console.log("the trade is not done");
					return false;
				} else {
					var quantity = parseFloat(trade.quantity);
					var price = parseFloat(trade.price);
					var total = quantity * price;

					if (_stockOwn[trade.symbol]) {
						_stockOwn[trade.symbol].quantity += quantity;
						_stockOwn[trade.symbol].paidPrice += total;
					} else {
						_stockOwn[trade.symbol] = {};
						_stockOwn[trade.symbol].symbol = trade.symbol;
						_stockOwn[trade.symbol].quantity = quantity;
						_stockOwn[trade.symbol].paidPrice = total;

					}
					_cash -= trade.price * trade.quantity;
					console.log("the trade is done");
					return true;
				}
			} else if (trade.type === 'sell') {
				if (_stockOwn[trade.symbol] && _stockOwn[trade.symbol].quantity > trade.quantity) {
					_stockOwn[trade.symbol].quantity -= trade.quantity;
					_stockOwn[trade.symbol].paidPrice -= trade.quantity * trade.price;
					_cash += trade.price;
					console.log("the trade is not done");
					return true;
				} else {
					console.log("the trade is done");
					return false;
				}
			}
		}

		service.updateTotal = function(portfolio, stock) {
			var total = {
				costBasis: 0,
				currentValue: 0,
				oneDay: 0,
				sevenDays: 0,
				thirtyDays: 0
			};
			for (var i = 0; i < portfolio.length; i++) {
				
				var transaction = portfolio[i];

				var currentStock;

				for (var i = 0; i < stock.length; i++) {
					if (stock[i].symbol === transaction.symbol) {
						currentStock = stock[i];
						break;
					}
				}

				total.costBasis += transaction.paidPrice;

				total.currentValue += parseFloat(currentStock.price) * transaction.quantity;
				total.oneDay += currentStock.oneDay * transaction.quantity;
				total.sevenDays += currentStock.sevenDays * transaction.quantity;
				total.thirtyDays += currentStock.thirtyDays * transaction.quantity;

			}
			return total;
		}

		service.getCash = function() {
			return _cash;
		}

		service.getPortfolio = function() {
			return _stockOwn;
		}

		return service;

	})