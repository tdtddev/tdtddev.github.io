app.controller('StatCtrl', ['$scope', 'playerService', function($scope, playerService){ 

	$scope.player = playerService.player;
	$scope.pService = playerService;
	$scope.inventory = playerService.player.inventory;
	$scope.skillUp = function(skill, num){
		playerService.skillUp(skill, num);
	};
	
		$scope.$watchCollection('player', function(){
			
	});
	
	var updateStats = function(){
		armor = playerService.playerEquip;
		$scope.mGoldPlus = armor[0];
		$scope.mExpPlus = armor[1];
		$scope.mHealth = $scope.player.maxHealth + armor[2];
		$scope.mMana = $scope.player.maxMana + armor[3];
		$scope.mAttack = $scope.player.attack + armor[4];
		$scope.mDefense = $scope.player.defense + armor[5];
		$scope.mHRegen = $scope.player.healthRegen + armor[6];
		$scope.mMRegen = $scope.player.manaRegen + armor[7];
		$scope.mArmPen = $scope.player.armorPen + armor[8];
	};
	
	//Player Shiz
	$scope.$watchCollection('pService', function(){
		updateStats();
	});
	
	$scope.$watchCollection('pService.player', function(){
		updateStats();
	});
}]);
//functions
