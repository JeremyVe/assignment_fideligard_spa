Fideligard.factory('companyService',
	['dataService', function(dataService) {

		var _companies = [
			{
			name: 'apple',
			Symbol: 'aapl',
			data: dataService.all()
		}]

		var service = {};

		service.all = function() {
			return _companies;
		}

		return service;
	}])