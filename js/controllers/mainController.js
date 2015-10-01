app.controller('MainCtrl', ['$scope', '$location', '$route', 'playerService', 'backgroundService', function($scope, $location, $route, playerService, backgroundService){ 

	$scope.player = playerService.player;
	$scope.gameSaves = '';
	$scope.curPath = $location.path();
	
	
	$scope.getPath = function(){
		$scope.curPath = $location.path();
	};
	$scope.goto = function (path){
		$location.path(path);
	};
	$scope.bkgChng = function(bkg){
		angular.element('html').css('background-image', 'url('+bkg+')');
	};
	
	
	$scope.getSaves = function(){
		$scope.gameSaves = Cookies.getJSON();
	};
	$scope.save = function(x) {
		playerService.saveData(x);
	};
	$scope.load = function(x) {
		playerService.loadData(x);
		$route.reload();
	};
}]);
//functions
