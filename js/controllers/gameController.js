app.controller('GameCtrl', ['$scope', '$location', '$interval', '$modal', 'playerService', 'backgroundService', function($scope, $location, $interval, $modal, playerService, backgroundService){
	
	$scope.pService = playerService;
	$scope.player = playerService.player;
	$scope.zones = backgroundService;
  $scope.playerTwo = new creature('ᕙ(˵ ಠ ਊ ಠ ˵)ᕗ');
  $scope.enemyArray = [];
	$scope.button = true;
	$scope.toggleMagic = true;
	$scope.skillPoint = 0;
	$scope.fightToggle = false;
	var holdLvl = 0;
	var stillAlive = true;
	var fighting = false;
	var invSize = 3;
	var invTwoSize = 2;
	
	

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
		protHealth();
	};
	
	var protHealth = function (){
		if ($scope.player.health > $scope.mHealth){
			$scope.player.health = $scope.mHealth;	
		}
	};
	//Player Shiz
	$scope.$watchCollection('pService', function(){
		updateStats();
	});
	
	$scope.$watchCollection('pService.player', function(){
		updateStats();
	});
//-------------------TheFunctions
	var clear = function(){
		$scope.stopFight();
		$scope.playerTwo = '';
		$scope.enemyArray = [];
	};
	
	$scope.magicToggle = function() {
		if ($scope.toggleMagic === false){
			$scope.toggleMagic = true;
		} else {
			$scope.toggleMagic = false;
		};
	};
	$scope.run = function(){
		$scope.zone.kills = 0;
	};
	
	$scope.addAlert = function(iName) {
    $scope.alerts.push({type: 'success', msg: 'You looted '+iName+'!'});
  };
	
	$scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };
	
	$scope.alerts = [];
	
//-------------------Apply Damage Bonuses
	
	//-----------------Combat Function
	var damage = function(attacker, defender) {
		var bonusAtk = 0;
			
		if ($scope.toggleMagic === true && (attacker === $scope.player)){
			var mana = $scope.player.mana;
			var atk = Math.floor($scope.mAttack);
			$scope.player.mana -= useAll(atk, mana);
			bonusAtk = useAll(atk, mana);
		} else {
			bonusAtk = 0;	
		};

		//Put the entire arm = defende -= attack in if statement instead
		if (attacker === $scope.player){
			var arm = $scope.playerTwo.defense -= $scope.mAttack;
				if (arm < 0) { arm = 0;}
			var atk = $scope.mAttack - arm;
				if (atk < 0) { atk = 0;}
			$scope.playerTwo.health -= Math.floor(atk + bonusAtk);
			
		}else{
			var arm = $scope.mDefense -= $scope.playerTwo.attack;
				if (arm < 0) { arm = 0;}
			var atk = $scope.playerTwo.attack - arm;
				if (atk < 0) { atk = 0;}
			$scope.player.health -= Math.floor(atk + bonusAtk);
		};
  };

	//Fight Toggle
	$scope.fightCheck = function(){
		if ($scope.enemyArray.length >0){
			$scope.fightToggle = true;	
		} else {
			$scope.fightToggle = false;	
		}
		
		if ((!fighting) || ($scope.enemyArray.length === 0)){
			$scope.button = false;
		} else {
			$scope.button = true;
		}
	};
	
//--------------------Upgrades && Passives
	var regen;
	var regenHealth = function(){
	var food = 0;
		if ( angular.isDefined(regen) ) return;
			
		regen = $interval(function(){
			var hth = $scope.player.health;
			var mth = $scope.mHealth;

			if (stillAlive && (hth < mth)){
				
				if ($scope.player.food > 0){
					$scope.player.health += Math.floor($scope.mHRegen);
					food++;
					
					if (food >= 5){
						$scope.player.food --;
						$scope.player.weight --;
						food = 0;
					}
				};
				
				if ($scope.player.health > $scope.player.mHealth){
					$scope.player.health = $scope.player.mHealth;
				};
				
			} else {
				$scope.stopRegen();	
			};
		}, 1000);
			};
	$scope.stopRegen = function() {
		if (angular.isDefined(regen)) {
			$interval.cancel(regen);
			regen = undefined;
		}
	};
	var regenM;
	var regenMana = function(){
	var water = 0;
		if ( angular.isDefined(regenM) ) return;
			
		regenM = $interval(function(){
			var mtm = $scope.player.mana;
			var maxtm = $scope.mMana;
			if (stillAlive && (mtm < maxtm)){
				
				if ($scope.player.water > 0){
					$scope.player.mana += Math.floor($scope.player.manaRegen);
					water++;
					
					if (water >= 5){
					$scope.player.water--;
					$scope.player.weight --;
					water = 0;
					}
				}; 
			
				if ($scope.player.mana > $scope.player.maxMana){
					$scope.player.mana = $scope.player.maxMana;
				};
				
			} else {
				$scope.stopRegenM();	
			};
		}, 1000);
			};
	$scope.stopRegenM = function() {
		if (angular.isDefined(regenM)) {
			$interval.cancel(regenM);
			regenM = undefined;
		}
	};	
//---------------------Fighting  
	$scope.startFight = function(){
		createPlayer();
	};
	
	$scope.handleFight = function() {
		console.log('handling');
		fighting = true;
		regenHealth();
		regenMana();
		$scope.fightCheck();
		var enemiesLeft = $scope.enemyArray.length;
		if (enemiesLeft > 0 && stillAlive) {
			$scope.playerTwo = $scope.enemyArray.shift();
			$scope.fight($scope.player, $scope.playerTwo);
		} else if (stillAlive){
			fighting = false;
			
		}
	};
	
	var stop;	
 	$scope.fight = function(objOne, objTwo) {		
			holdLvl = objTwo.level;
      // Don't start a new fight if we are already fighting
    if ( angular.isDefined(stop) ) return;

    stop = $interval(function() {
			if (objOne.health > 0 && objTwo.health > 0) {
        damage(objOne,objTwo);
        damage(objTwo,objOne);
			} else {
				$scope.stopFight();
			}
		}, 1000);
	};

	$scope.stopFight = function() {
		if (angular.isDefined(stop)) {
			$interval.cancel(stop);
			stop = undefined;
			
			if ($scope.player.health > 0){
				$scope.playerWin();
				$scope.playerTwo = $scope.enemyArray[0];
				nextFight();
			} else {
				$scope.playerLoss();
				fightContainer.removeChild(player);
			};
		}
		fighting = false;
	};
	
	//-----Win
	$scope.playerWin = function(){
		
		var enemy = $scope.playerTwo;
		$scope.player.weaponKills++;
		
		if (findLoot($scope.player.lootKills)){
			var item = ranItem(enemy.zone.materials, enemy.level)
			$scope.player.lootKills = 0;
			 if($scope.player.inventory.items.length < invSize){
				 addIn(item, $scope.player.inventory.items);
				 $scope.addAlert(item.name);
			 } else if ($scope.player.partInv.items.length >= invTwoSize){
				 
			 } else {
				 addIn(item, $scope.player.partInv.items);
				 $scope.addAlert(item.name);
			 }
		} else {
			$scope.player.lootKills += 1;
		};
		
			$scope.player.exp += (enemy.exp + $scope.mExpPlus) || 0;
			$scope.player.totalExp += (enemy.exp + $scope.mExpPlus) || 0;
			$scope.player.gold += (enemy.gold + $scope.mGoldPlus) || 0;
			$scope.player.totalGold += (enemy.gold + $scope.mGoldPlus) || 0;
						 
			if ($scope.player.exp >= $scope.player.nextLvl){
				$scope.player.skillPoint += skillUp($scope.player.level);
				$scope.player.exp -= $scope.player.nextLvl;
				$scope.player.level++;
				$scope.player.nextLvl = levelUp(10, 1.4, $scope.player.level);
			}
		
		//Handle Unlocks
		switch (enemy.title){
			case 'Green Slime':
				$scope.zones[1].available = true;
				$scope.player.skillPoint++;
				$scope.player.bossKills++;
				$scope.player.gold += 10;
				break;
			case 'Lost Girl':
				$scope.zones[2].available = true;
				$scope.player.skillPoint++;
				$scope.player.bossKills++;
				$scope.player.gold += 20;
				break;
			case 'Weakly Old Man':
				$scope.zones[3].available = true;
				$scope.player.skillPoint++;
				$scope.player.bossKills++;
				$scope.player.gold += 40;
				break;
			case 'George Washington':
				$scope.zones[4].available = true;
				$scope.player.skillPoint++;
				$scope.player.bossKills++;
				$scope.player.gold += 80;
				break;
			case 'Shiva':
				$scope.zones[5].available = true;
				$scope.player.skillPoint++;
				$scope.player.bossKills++;
				$scope.player.gold += 160;
				break;
			case 'Mecha Shiva':
				$scope.zones[6].available = true;
				$scope.player.skillPoint++;
				$scope.player.bossKills++;
				$scope.player.gold += 320;
				break;
			case 'King George III':
				$scope.zones[7].available = true;
				$scope.player.skillPoint++;
				$scope.player.bossKills++;
				$scope.player.gold += 640;
				break;
			case 'Mecha George Washington':
				
				break;	
			default:
				
				break;
		};
		
	};
	//------------------Loss
	$scope.playerLoss = function(){	
		$scope.openDeath();
		stillAlive = false;
		$scope.stopRegen();
		$scope.stopRegenM();
	};
	
	$scope.$on('$destroy', function() {
		// Make sure that the interval is destroyed too
		$scope.stopFight();
	});
	
//----------------------Random Generation
	$scope.generatePeople = function (num, zone){
		var bosses = ['⊂(●￣(エ)￣●)⊃','((((((︵╰(«○»益«○»)╯︵))))))','(◞≼◉ื≽◟ ;益;◞≼◉ื≽◟)','╰(゜益゜)╯╰(゜益゜)╯╰(゜益゜)╯'];
		
		var len = $scope.enemyArray.length;
		for(var i = len; i < num+len; i++){
			var kills = zone.kills;
			var reqKills = zone.reqKills;
			var minLvl = zone.levelMin;
			var ran = (Math.floor(Math.random() * bosses.length));
			var ceiling = Math.floor(((kills/reqKills)*10)+minLvl);
    	var level = (Math.ceil(Math.random() * (ceiling - minLvl) + minLvl));
			var face = createDonger();
			var gold = Math.floor(Math.random() * (level + 1));
			
			if (kills < reqKills){
				$scope.enemyArray[i] = new creature(face,'donger',level,varyLvl(level, 2, -2),varyLvl(level, 2, -2),varyLvl(level, 1, -3),varyLvl(level, 1, -3),varyLvl(level, 2, -2),varyLvl(level, 2, -2),0,0,zone.expGain,0,gold);
				$scope.enemyArray[i].zone = zone;
				zone.kills++;
			} else { //(name, title, level, maxHealth, maxMana, attack, defense, healthRegen, manaRegen, armorPen, skillPoint, experience, nextLvl)
				$scope.enemyArray[i] = new creature(bosses[ran],zone.boss,varyLvl(zone.levelMax, 5, -1),varyLvl(zone.levelMax, 5, -1),varyLvl(zone.levelMax, 5, -1),varyLvl(zone.levelMax, 5, -1),varyLvl(zone.levelMax, 5, -1),varyLvl(zone.levelMax, 5, -1),varyLvl(zone.levelMax, 5, -1),0,0,(zone.expGain*10),0,gold);
				$scope.enemyArray[i].zone = zone;
				zone.kills = 0;
			}
		}
		$scope.fightCheck();
		battle($scope.enemyArray);
	};
	
//--------------------Background Changes
	$scope.bkgChng = function(selection){
		angular.element('html').css('background-image', 'url('+selection+')');
	};
//--------------------Modal	
	$scope.openDeath = function (size) {
    var modalInstance = $modal.open({
      animation: $scope.animationsEnabled,
      templateUrl: '/views/viewDeath.html',
      controller: 'DeathCtrl',
      size: size,
      resolve: {
       go: function(){
					 $location.path('/');
				 	$scope.bkgChng('');
				}
      }
    });
  };
	$scope.openInven = function (size) {
    var modalInstance = $modal.open({
      animation: $scope.animationsEnabled,
      templateUrl: '/views/viewInventory.html',
      controller: 'InvenCtrl',
      size: size,
      resolve: {
       
      }
    });
  };
	$scope.openStats = function (size) {
    var modalInstance = $modal.open({
      animation: $scope.animationsEnabled,
      templateUrl: '/views/viewStats.html',
      controller: 'StatCtrl',
      size: size,
      resolve: {
				re: function(){
       		arm = playerService.playerEquip;
				}
      }
    });
  };
	
	loadGame();
	regenHealth();
	regenMana();
	$scope.openInven();
}]);

