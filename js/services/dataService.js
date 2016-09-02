Fideligard.factory('dataService', 
	['_', '$http', function(_, $http) {

		var _data = [];

		var _retrieveData = function() {
			$http.get('js/data/aapl.json')
				.then(function(response) {
					var data = response.data.query.results.quote;

					for (var i = 0; i < data.length; i++) {

						var currentData = {}
						currentData.Symbol = data[i].Symbol;
						currentData.Close = data[i].Close;
						currentData.Date = data[i].Date;
						currentData.High = data[i].High;
						currentData.Low = data[i].Low;
						currentData.Open = data[i].Open;

						_data.push(currentData);
					}

					return _data;

				}, function(response) {
					console.error("Couldn't retrieve the aapl data");
				})
		}


		var service = {};

		service.all = function() {
			if (_.isEmpty(_data)) {
				console.log("retrieving data...");
				_retrieveData();

				return _data;
			} else {
				return _data;
			}
		}

		return service;
	}])