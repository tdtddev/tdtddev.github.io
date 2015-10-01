app.controller('DeathCtrl', ['$scope', '$modalInstance', 'playerService', function($scope, $modalInstance, playerService){ 
	$scope.player = new creature('John','Person',1,100,100,1,1,1,1,1,0,0,levelUp(100, 1, 1));
	
	$scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
	
	$scope.holdClass = new creature('John','Person',1,100,100,1,1,1,1,1,0,0,levelUp(100, 1, 1));
	$scope.loadClass = function (){
		Object.assign($scope.player, playerService.player);
		Object.assign(playerService.player, $scope.holdClass);
		playerService.player.created = false;
	};
	
	$scope.loadClass();
}]);
//functions
