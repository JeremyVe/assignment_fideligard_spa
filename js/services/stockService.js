Fideligard.factory('stockService',
	['$http', '_', function($http, _) {

		var _stocks = [];

		var _allStocks = {};

		var _symbols = ['aapl'];

		var service = {};

		service.buildStock = function(currentDate) {
			// if (_.isEmpty(_allStocks)) {
				_stocks = [];
			// }

			var promise = service.getStock();


			promise.then(function() {
				for (var i = 0; i < _symbols.length; i++) {
					var symbol = _symbols[i];

					var data = _allStocks[symbol];

					console.log(_allStocks);

					for (var j = 0; j < data.length; j++) {
						var date = new Date(data[j].Date);
						if (date.getTime() === currentDate) {

							var dataObj = {};
							dataObj.symbol = symbol;
							dataObj.price = data[j].Close;

							dataObj.oneDay = (j - 1 >= 0) ? dataObj.price - data[j-1].Close : 'Nan';

							dataObj.sevenDays = (j - 7 >= 0) ? dataObj.price - data[j-7].Close : 'Nan';

							dataObj.thirtyDays = (j - 30 >= 0) ? dataObj.price - data[j-30].Close: 'Nan';

							_stocks.push(dataObj);
							break;
						}
					}
				}
			});
			return _stocks;
		}

		service.getStock = function() {
			var promise = $http.get('js/data/aapl.json')
				.then(function(response) {
					var data = response.data.query.results.quote;
					data.reverse();

					_allStocks['aapl'] = data;
				})
				return promise;
		}

		return service;
	}])