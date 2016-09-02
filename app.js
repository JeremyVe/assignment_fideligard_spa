var Fideligard = angular.module('Fideligard', ['ui.router', 'ngMaterial']);

Fideligard.config(
	['$stateProvider', '$urlRouterProvider', 
	function($stateProvider, $urlRouterProvider) {

		$urlRouterProvider.otherwise('dashboard');

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
						templateUrl: 'js/templates/mainPanel.html'
					}
				}
			})
			.state('dashboard.trade', {
				url: 'trade?symbol&price&date',
				templateUrl: 'js/templates/main-panel/trade.html',
				controller: 'TradeCtrl'
			})

	}])

Fideligard.factory('_', 
	['$window', function($window) {
		return $window._;
	}])