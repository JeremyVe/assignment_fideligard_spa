Fideligard.factory('dateService',
	['_', function(_) {

		var service = {};

		service.date = {};


		service.date.ms = 1451520000000; // date in ms for the slider;

		service.date.string = new Date("2015-12-31");

		return service;
	}])