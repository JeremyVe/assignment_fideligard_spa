Fideligard.controller('DatePickerCtrl', 
	['$scope', 'dateService', function($scope, dateService) {

		$scope.date = dateService.date;

		$scope.minDate = new Date("2015-01-01");

		$scope.maxDate = new Date("2015-12-31");

		$scope.calendarDate = new Date($scope.date.ms);

		$scope.setSliderDate = function() {
			$scope.calendarDate = new Date($scope.date.ms);
		}

		$scope.setCalendarDate = function() {
			var d = $scope.calendarDate.getTime();

			d += 8 * 60 * 60 * 1000; // adjust from the 8 hours different in calendar vs slider time;

			$scope.date.ms = d;
		}

	}])