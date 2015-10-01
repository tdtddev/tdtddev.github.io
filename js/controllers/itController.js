app.controller('ITCtrl', ['$scope', 'playerService', function($scope, playerService){ 
  $scope.level = 10;
	$scope.testItem = new ranItem(['Iron'], $scope.level);
	$scope.newItem = function(){
		$scope.testItem = new ranItem(['Iron'], $scope.level);
	};
	$scope.nums = [];
	$scope.genLevels = function(){
	 for (var i = 1; i < 100; i++){
		 $scope.nums.push([i, levelUp(10,1.4,i)]);
    }
	};
}]);
//functions
