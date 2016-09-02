Fideligard.factory('stockService',
	['$http', '_', '$q', function($http, _, $q) {

		var _stocks = [];

		var _allStocksData = {};

		var _symbols = ['AAPL'];
		// var _symbols = ['AAPL', 'GOOGL', 'TWTR', 'FB'];

		var service = {};

		var _tidyUpData = function(currentDate) {
			for (var i = 0; i < _symbols.length; i++) {
				var symbol = _symbols[i];

				var data = _allStocksData[symbol];

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
		}

		service.buildStock = function(currentDate) {
			if (_.isEmpty(_allStocksData)) {

				var promise = service.fetchStock();

				promise.then(function() {
					_tidyUpData(currentDate);
				});

			} else {
				_stocks = [];
				_tidyUpData(currentDate);
			}

			return _stocks;
		}

		service.fetchStock = function() {
			var urlFirstPart = 'http://query.yahooapis.com/v1/public/yql?q=%20select%20*%20from%20yahoo.finance.historicaldata%20where%20symbol%20=%20%22';
			var urlLastPart = '%22%20and%20startDate%20=%20%222015-01-01%22%20and%20endDate%20=%20%222015-12-31%22%20&format=json%20&diagnostics=true%20&env=store://datatables.org/alltableswithkeys%20&callback='
			var httpRequests = [];

			for (var i = 0; i < _symbols.length; i++) {
				var symbol = _symbols[i];
				var httpRequest = $http.get(urlFirstPart + _symbols[i] + urlLastPart)
				httpRequests.push(httpRequest);
			}

			var promise = $q.all(httpRequests)
				.then(function(response) {
					for (var i = 0; i < response.length; i++) {
						var data = response[i].data.query.results.quote.reverse();
						var symbol = _symbols[i];

						_allStocksData[symbol] = data;
					}
					console.log(_allStocksData);

				})
				return promise;
		}

		service.getSymbols = function() {
			return _symbols;
		}


		return service;
	}])