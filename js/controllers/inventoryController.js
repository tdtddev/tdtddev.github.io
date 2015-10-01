app.controller('InvenCtrl', ['$scope', 'playerService', function($scope, playerService){ 

	$scope.player = playerService.player;
	$scope.inventory = playerService.player.inventory;
	$scope.equip = playerService.playerEquip;
	$scope.partInv = playerService.player.partInv.items;
	$scope.remove = function(x){
		playerService.player.inventory.items.splice(x,1);
	};
	$scope.pushUp = function(x){
		if (playerService.player.inventory.items.length < 3){
			var hold = playerService.player.partInv.items.splice(x,1);
			playerService.player.inventory.items.push(hold[0]);
		}	
	};
	$scope.removeTwo = function(x){
		playerService.player.partInv.items.splice(x,1);
	};

	
	// Handle All the stat stuffs!!
	var backup = {
		stats: {
		goldPlus : 0,
		expPlus : 0,
		healthPlus : 0,
		manaPlus : 0,
		attackPlus: 0,
		defensePlus: 0,
		hRegenPlus: 0,
		mRegenPlus: 0,
		armPenPlus: 0
		}
	}
	
	$scope.$watchCollection('inventory.items', function(){
		var itemOne = playerService.player.inventory.items[0] || backup;
		var itemTwo = playerService.player.inventory.items[1] || backup;
		var itemThree = playerService.player.inventory.items[2] || backup;
		var itemIt = function(x){
			return itemOne.stats[x] + itemTwo.stats[x] + itemThree.stats[x];
		};
		
		var goldPlus = itemIt('goldPlus');
		var expPlus = itemIt('expPlus');
		var healthPlus = itemIt('healthPlus');
		var manaPlus = itemIt('manaPlus');
		var attackPlus = itemIt('attackPlus');
		var defensePlus = itemIt('defensePlus');
		var hRegenPlus = itemIt('hRegenPlus');
		var mRegenPlus = itemIt('mRegenPlus');
		var armPenPlus = itemIt('armPenPlus');
		var eqUp = function(){
			playerService.playerEquip = [goldPlus,expPlus,healthPlus,manaPlus,attackPlus,defensePlus,hRegenPlus,mRegenPlus,armPenPlus];
		};
		
		eqUp();
	});
	
	
}]);
//functions
