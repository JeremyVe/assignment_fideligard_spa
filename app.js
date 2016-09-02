var Fideligard = angular.module('Fideligard', ['ui.router', 'ngMaterial']);

Fideligard.config(
	['$stateProvider', '$urlRouterProvider', 
	function($stateProvider, $urlRouterProvider) {

		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('dashboard', {
				url: '',
				views: {
					'date-picker': {
						templateUrl: 'js/templates/datePicker.html',
						controller: 'DatePickerCtrl'
					},
					'stock-panel': {
						templateUrl: 'js/templates/stockPanel.html',
						controller: 'StockCtrl'
					},
					'main-panel': {
						template: 'this is the main panel <a ui-sref="dashboard.main-panel">click</a> <div ui-view></div>'
					}
				}
			})
			.state('dashboard.main-panel', {
				url: "/main",
				template: 'hello from the main panel'
			})

	}])

Fideligard.factory('_', 
	['$window', function($window) {
		return $window._;
	}])