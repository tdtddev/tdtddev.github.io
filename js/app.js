var app = angular.module('app',['ngRoute', 'ui.bootstrap']);
	 app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/viewCreate.html',
        controller: 'CreateCtrl'
      })
      .when('/game', {
        templateUrl: 'views/viewGame.html',
        controller: 'GameCtrl'
      })
			.when('/town', {
        templateUrl: 'views/viewTown.html',
        controller: 'TownCtrl'
      })
			.when('/inventory',{
				templateUrl: 'views/viewInventory.html',
				controller: 'InvenCtrl'
			})
			.when('/death',{
				templateUrl: 'views/viewDeath.html',
				controller: 'DeathCtrl'
			})
		.when('/test',{
				templateUrl: 'views/viewIT.html',
				controller: 'ITCtrl'
			})
      .otherwise({
        redirectTo: '/'
      });
  });

app.filter('thousandSuffix', function () {
    return function (input, decimals) {
      var exp, rounded,
        suffixes = ['k', 'M', 'G', 'T', 'P', 'E'];

      if(window.isNaN(input)) {
        return null;
      }

      if(input < 1000) {
        return input;
      }

      exp = Math.floor(Math.log(input) / Math.log(1000));

      return (input / Math.pow(1000, exp)).toFixed(decimals) + suffixes[exp - 1];
    };
  });

app.run(function($rootScope, $templateCache) {
   $rootScope.$on('$viewContentLoaded', function() {
      $templateCache.removeAll();
   });
});

//Creature Proto
function creature(name, title, level, maxHealth, maxMana, attack, defense, healthRegen, manaRegen, armorPen, skillPoint, exp, nextLvl, gold) {
 var titles = ['Warrior','Wizard','Cleric']
    
 this.name = name;
 this.created = false;
 this.title = title || 'No Title';
 this.level = level || 1;
 this.maxHealth = maxHealth || 50;
 this.health = maxHealth;
 this.maxMana = maxMana || 50;
 this.mana = maxMana;
 this.attack = attack || 1;
 this.defense = defense || 1;
 this.healthRegen = healthRegen || 1;
 this.manaRegen = manaRegen || 1;
 this.armorPen = armorPen || 0;
 this.skillPoint = skillPoint || 0;
 this.exp = exp || 0;
 this.nextLvl = nextLvl || 100;
 this.bossKills = 0;
 this.gold = gold || 0;
 this.weight = 0;
 this.maxWeight = 20;
 this.food = 0;
 this.water = 0;
	
 this.inventory = [];
 this.partInv = [];
	//Player Variables
 this.lootKills = 0;
 this.totalExp = 0;
 this.totalGold = 0;
 this.weaponKills = 10;
	//Enemy Only Variables
 this.zone = '';
	//Handle Final Variables
};

function item(name, slot, level, rarity, material, statArray){
	var rNum = rarity;
	var rarityColor = ['','gray','white','green','blue','orange','red'];
	var rarities = ['','Trash','Common','Uncommon','Rare','Antique','Legendary'];
	
	this.name = name || 'Basic Iron Sword';
	this.slot = slot || 'Sword';
	this.level = level || 1;
	this.rarityNum = rNum|| 1;
	this.rarity = rarities[rarity];
	this.material = material || 'iron';
	this.stats = {
		goldPlus : 0,
		expPlus : 0,
		healthPlus : 0,
		manaPlus : 0,
		attackPlus: 0,
		defensePlus: 0,
		hRegenPlus: 0,
		mRegenPlus: 0,
		armPenPlus: 0
	};
	this.price = this.level * rNum * 10;
	this.color = rarityColor[rNum];
	
	var s = this.stats;
	s.goldPlus += statArray[0];
	s.expPlus += statArray[1];
	s.healthPlus += statArray[2];
	s.manaPlus += statArray[3];
	s.attackPlus += statArray[4];
	s.defensePlus  += statArray[5];
	s.hRegenPlus += statArray[6];
	s.mRegenPlus += statArray[7];
	s.armPenPlus  += statArray[8];
};

//Generate a Random Item
function ranItem(matArray, level){
	var slots = ['Helm','Hauberk','Gorget','Pauldron','Breastplate','Faulds','Gauntlets','Greaves','Chain Mail','Dagger','Knife','Cestus','Sickle','Club','Mace','Pike','Spear','Bow','Long Bow','Short Bow','Staff','Hatchet','War Axe', 'Gladius', 'Shield', 'Tower Shield', 'Spike Shield', 'Rapier', 'Short Sword', 'Gladius', 'Khukari', 'Warhammer', 'Greatclub', 'Greataxe', 'Great Sword', 'Zweihander', 'Lance', 'Ranseur', 'Falchion', 'Chain', 'Rope'];
	
	var lvl = varyLvl(level, 1, -9);
	var slot = slots[Math.floor(Math.random()*slots.length)];
	var rarities = ['','Trash','Common','Uncommon','Rare','Antique','Legendary'];
	var randRare = Math.floor(Math.random()*(rarities.length-1))+1;
	var material = matArray[Math.floor(Math.random()*matArray.length)];
	var statNum = [0,0,0,0,0,0,0,0,0];
	
	for (i = 0; i < randRare; i++){
		//'goldPlus' +1,'expPlus' +1,'healthPlus'+5,'manaPlus'+5,'attackPlus'+.5,'defensePlus'+.5,'hRegenPlus'+.25,'mRegenPlus'+.25,'armPenPlus'+1
		var stats = [1,1,5,5,.5,.5,.25,.25,1];
		var sNum = Math.floor(Math.random()*stats.length)
		
		statNum[sNum] += (lvl * stats[sNum]);
	};
	
	var name = itemName(rarities[randRare], slot, material);	
	
	return new item(name, slot, lvl, randRare, material, statNum);
};

//Generate an item Name
var itemName = function(rare, slot, material){
	var name = weaponName.generateWord(4,15,false)+', the ';
	var owner = 'of ' + ownerName.generateWord(4,15,false);
	var fullName = '';
	
	if (cFlip()){
		fullName += rare+' ';
	};
	fullName += name;
	if (cFlip()){
		fullName += material+' ';
	};
	fullName += slot+' ';
	if (cFlip()){
		fullName += owner;
	};
	return fullName;
};


//Inventory Object
function inventory(){
	this.items = [];
};

var findLoot = function(num){
	//Chance is the maximum number of kills w/o an item
	var chance = 20;
	chance += 1;
		var ran = Math.floor((Math.random() * (chance - num) + num));
		if (ran >= (chance - 1)) {	
			return true;
		} else {
			return false;
		}
};
    
//fancy .push !!!!! Reminder to add inventory size checking
function addIn(obj, inven){
	inven.push(obj);
};
//Donger Creator
function createDonger() {
	var leftArm = ['','ԅ','୧','╰','┌∩┐','ლ','┌','☆*:. o','⋌','<','҉*\ ','☆ﾐ'];
	var body = ['(˵ ಠ ਊ ಠ ˵)','( ͡↑ ͜ʖ ͡↑)','༼ಠل͟ಠ༽','( ರ Ĺ̯ ರೃ )','(░ಥ╭͜ʖ╮ಥ░)','〳 ರ ︿ ರೃ 〵','( ⁰ ਊ ⁰ )','║ ಡ ͜ ʖ ಡ ║','། ຈ ◞౪◟ຈ །','( ◕ 益 ◕ )','༼ •̀ ⌂ •́ ༽','╏ ʘ̆ ‸ ʘ̆ ╏','( ‘ω’ )','(≧∀≦)','(‡▼益▼)','(▼へ▼メ)','(￣∀￣)','(´д｀)','(o*･ω･)','(ಠ_ರೃ)','ᶘ ᵒᴥᵒᶅ','ʕ •̀ o •́ ʔ','(๑•̀ᗝ•́)'];
	var rightArm = ['','و','୨','╯','┌∩┐','ლ','┐','o .:*☆','⋋','>','/*҉'];
	var dongerNum = (leftArm.length) * (body.length) * (rightArm.length);
	var laran = Math.ceil(Math.random() * leftArm.length-1);
	var boran = Math.ceil(Math.random() * body.length-1);
	var raran = Math.ceil(Math.random() * rightArm.length-1);
	var dong = '';		
	var dong = leftArm[laran] + body[boran] + rightArm[raran];
	return dong;
};

var fl = function(x, y){
	var xx = x + (x*y);		
	return Math.floor(xx);	
};
	
var ranRange = function(max,min){
	return Math.random() * (max - min) + min;
};
var cFlip = function(){
	return (Math.floor(Math.random() * 2) == 0);
};
//X is resource used, y is the resource pool
var useAll = function(x, y){
		var xhold = 0;
			if ((y-x) < 0){
				xhold = x + (y - x);
			} else {
				xhold = x;	
			}
    return xhold;
	};
//Add variance to creature stats
var varyLvl = function(lvl, high, low){
    low -= 1;
    var variance = (Math.ceil(Math.random() * (high - low) + low));
    var finalNum = 0;
    if ((lvl + variance) < 1){
     finalNum = 1;   
    } else {
     finalNum = lvl + variance;   
    }
    return finalNum;
};
//Handle exponential experience
var levelUp = function(x, y, lvl){
	y += (lvl/100);
	return Math.floor(x*(Math.pow(lvl,y)));
};   
//1 extra skill point for every 5 levels
var skillUp = function(level){
	var x = Math.floor(level / 10);
	if (x < 1){
		return 1;	
	} else {
		return 1 + x;	
	}
};

var filt = function(x){	
	if (typeof x === 'number'){
	 return x;	
	} else {
		return 0;	
	}
};
//Make cookies if cookie doesn't exist
var makeCookies = function(){
	for (i = 1; i <= 5; i++){
		var cook = Cookies.getJSON();
		 if (typeof cook[i] === 'undefined'){
			console.log('Cookie '+i+' does not exist');
			 Cookies.set(i, {save: i});
		 }
	};
};

makeCookies();

var weaponName = new Foswig(3);
var ownerName = new Foswig(4);
weaponName.addWordsToChain(weaponArray);
ownerName.addWordsToChain(nameArray);
