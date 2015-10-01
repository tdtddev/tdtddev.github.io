app.controller('CreateCtrl', ['$scope', '$location', 'playerService', 'patchService', function($scope, $location, playerService, patchService){ 
	
	$scope.player = playerService.player;
	$scope.patches = patchService;
	$scope.name = '';
	$scope.race = '';
	$scope.toggleStart = false;
	
	
	$scope.toggleCheck = function(){
		angular.forEach($scope.classes, function (item) {
      item.toggled = false;
			$scope.toggleStart = true;
     });
	};
	//Set the class variables
	$scope.holdClass = new creature('John','Person',1,100,100,1,1,1,1,1,0,0,levelUp(10, 1.25, 1));
	$scope.loadClass = function (){
		Object.assign(playerService.player, $scope.holdClass);
		playerService.player.created = true;
	};
	
	var setIt = function(title, level, maxHealth, maxMana, attack, defense){
	 var titles = ['Warrior','Wizard','Cleric']

	 $scope.holdClass.name = $scope.name || title;
	 $scope.holdClass.title = title;
	 $scope.holdClass.level = level;
	 $scope.holdClass.health = maxHealth;
	 $scope.holdClass.maxHealth = maxHealth;
	 $scope.holdClass.mana = maxMana;
	 $scope.holdClass.maxMana = maxMana;
	 $scope.holdClass.attack = attack;
	 $scope.holdClass.defense = defense;
	 $scope.holdClass.skillPoint = 0;
	 $scope.holdClass.created = true;
	 $scope.holdClass.gold = 0;
		
	 $scope.holdClass.inventory = new inventory();
	 $scope.holdClass.partInv = new inventory();
	};

	//Classes (title, level, maxHealth, maxMana, attack, defense, healthRegen, manaRegen, armorPen) setIt('Warri0or',1,175,100,1,5);
	$scope.classes = [
		{
			name: 'Warrior',
			health: 50,
			maxHealth: 50,
			mana: 20,
			maxMana: 20,
			attack: 2,
			defense: 4,
			create: function(){
				setIt('Warrior',1,this.maxHealth,this.maxMana,this.attack,this.defense);
				},
			toggle: function(){
				$scope.toggleCheck();
				this.toggled = true;
			},
			toggled: false
		},
		{
			name: 'Wizard',
			health: 30,
			maxHealth: 30,
			mana: 50,
			maxMana: 50,
			attack: 5,
			defense: 1,
			create: function(){
					setIt(this.name,1,this.maxHealth,this.maxMana,this.attack,this.defense);
				},
			toggle: function(){
				$scope.toggleCheck();
				this.toggled = true;
			},
			toggled: false
		},
		{
			name: 'Priest',
			health: 40,
			maxHealth: 40,
			mana: 40,
			maxMana: 40,
			attack: 2,
			defense: 4,
			create: function(){
					setIt(this.name,1,this.maxHealth,this.maxMana,this.attack,this.defense);
				},
			toggle: function(){
				$scope.toggleCheck();
				this.toggled = true;
			},
			toggled: false
		},
		{
			name: 'Shaman',
			health: 40,
			maxHealth: 40,
			mana: 40,
			maxMana: 40,
			attack: 4,
			defense: 2,
			create: function(){
					setIt(this.name,1,this.maxHealth,this.maxMana,this.attack,this.defense);
				},
			toggle: function(){
				$scope.toggleCheck();
				this.toggled = true;
			},
			toggled: false
		},
		{
			name: 'Peasant',
			health: 10,
			maxHealth: 10,
			mana: 10,
			maxMana: 10,
			attack: 1,
			defense: 1,
			create: function(){
					setIt(this.name,1,this.maxHealth,this.maxMana,this.attack,this.defense);
				},
			toggle: function(){
				$scope.toggleCheck();
				this.toggled = true;
			},
			toggled: false
		}
	];

}]);

//functions
