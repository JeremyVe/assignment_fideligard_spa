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
					_stockOwn[trade.symbol] += trade.quantity;
					_cash -= trade.price * trade.quantity;
					console.log("the trade is done");
					return true;
				}
			} else if (trade.type === 'sell') {
				if (_stockOwn[trade.symbol] && _stockOwn[trade.symbol] > trade.quantity) {
					_stockOwn[trade.symbol] -= trade.quantity;
					_cash += trade.price;
					console.log("the trade is not done");
					return true;
				} else {
					console.log("the trade is done");
					return false;
				}
			}
		}

		service.getCash = function() {
			return _cash;
		}

		return service;

	})