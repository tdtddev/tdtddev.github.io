app.controller('TownCtrl', ['$scope', 'playerService', function($scope, playerService){ 

	$scope.player = playerService.player;
	$scope.inventory = playerService.inventory;
	$scope.disableFood = true;
	$scope.disableWater = true;
	$scope.shop = new generateShop();
	$scope.weaponShop = new generateWeapShop();
	$scope.weaponBuy = false;
	
	
	$scope.newStore = function(){
		$scope.shop = new generateShop();	
	}
	
	$scope.checkWeapon = function(){
		($scope.player.weaponKills >= 10) ? $scope.weaponBuy = true : $scope.weaponBuy = false;
	};
	
	$scope.buyItem = function(x) {
		var item = $scope.shop[x];
		$scope.player[x]++;
		$scope.player.weight += item.weight;
		$scope.player.gold -= item.cost;
	};
	
	$scope.buyWeapon = function(x) {
		var item = $scope.weaponShop[x];
		if ($scope.player.gold >= item.price){
			playerService.player.partInv.items.push(item);
			$scope.player.gold -= item.price;
			$scope.player.weaponKills = 0;
			$scope.weaponBuy = false;
		}
	};
	$scope.available = function(x, xdis){
		var item = $scope.shop[x];
		var weight = $scope.player.weight + item.weight;
		var gold = $scope.player.gold - item.cost;
		var checkWeight = false;
		var checkGold = false;
		
		if (weight <= $scope.player.maxWeight){ checkWeight = true;}else{ checkWeight = false;};
		if (gold >= 0) { checkGold = true;}else{checkGold = false;};	
		if (checkWeight && checkGold) { $scope[xdis] = false}else{ $scope[xdis] = true; };
	};
	function generateWeapShop () {
		this.weapOne = new ranItem(['Iron'], $scope.player.level);
		this.weapTwo = new ranItem(['Iron'], $scope.player.level);
	};
	
	


	
	
	$scope.checkWeapon();
		$scope.bkgChng = function(bkg){
		angular.element('html').css('background-image', 'url('+bkg+')');
	};	
	$scope.bkgChng('https://static.pexels.com/photos/304/city-houses-village-buildings.jpg');
}]);
//functions
function generateShop () { 
		var shopFood = [{name: 'Bread', img: 'img/items/food/toast.png', cost: 1, weight: 1},
										{name: 'Rice', img: 'img/items/food/rice.png', cost: 1, weight: 1},
										{name: 'Fish', img: 'img/items/food/fish.png', cost: 1, weight: 1}];
		
		var shopWater = [{name: 'Water', img: 'img/items/drinks/bluepotion.png', cost: 1, weight: 1},
										 {name: 'Faygo', img: 'img/items/drinks/redpotion.png', cost: 1, weight: 1},
										 {name: 'Champagne', img: 'img/items/drinks/yellowpotion.png', cost: 1, weight: 1}];
		
		this.keep = ownerName.generateWord(4,15,false);
		this.food = shopFood[(Math.floor(Math.random() * shopFood.length))];
		this.water = shopWater[(Math.floor(Math.random() * shopWater.length))];
	};
function getRan(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};
