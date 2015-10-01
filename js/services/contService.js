app.factory('playerService', function () {
	//(name, title, level, maxHealth, maxMana, attack, defense, healthRegen, manaRegen, armorPen, skillPoint, experience, nextLvl)
	
  var playerHandle = {
		player: new creature('John','Person',1,100,100,1,1,1,1,1,0,0,levelUp(100, 1, 1)),
		playerEquip: 0,		
		skillUp: function(skill, num){
			if (this.player.skillPoint > 0){
				this.player.skillPoint--;
				this.player[skill] += num;
				}
			},
		saveData: function(x){
			var p = this.player;
			Cookies.set(x, {
				save: x,
				date: new Date(),
				created: p.created,
				name: p.name,
				title: p.title,
				level: p.level,
				exp: p.exp,
				nextLvl: p.nextLvl,
				maxHealth: p.maxHealth,
				health: p.health,
				healthRegen: p.healthRegen,
				maxMana: p.maxMana,
				mana: p.mana,
				manaRegen: p.manaRegen,
				attack: p.attack,
				defense: p.defense,
				armorPen: p.armorPen,
				skillPoint: p.skillPoint,
				gold: p.gold,
				totalGold: p.totalGold,
				totalExp: p.totalExp,
				weight: p.weight,
				maxWeight: p.maxWeight,
				food: p.food,
				water: p.water,
				bossKills: p.bossKills,
				inventory: p.inventory,
				partInv: p.partInv
			});
			console.log('Saved Cookie');
		},
		loadData: function(x){
			var cookie = Cookies.getJSON(x.toString());
			var p = this.player;
				p.created = cookie.created;
				p.name = cookie.name;
				p.title = cookie.title;
				p.level = cookie.level;
				p.exp = cookie.exp;
				p.nextLvl = cookie.nextLvl;
				p.maxHealth = cookie.maxHealth;
				p.health = cookie.health;
				p.healthRegen = cookie.healthRegen;
				p.maxMana = cookie.maxMana;
				p.mana = cookie.mana;
				p.manaRegen = cookie.manaRegen;
				p.attack = cookie.attack;
				p.defense = cookie.defense;
				p.armorPen = cookie.armorPen;
				p.skillPoint = cookie.skillPoint;
				p.gold = cookie.gold;
				p.totalGold = cookie.totalGold;
				p.totalExp = cookie.totalExp;
				p.weight = cookie.weight;
				p.maxWeight = cookie.maxWeight;
				p.food = cookie.food;
				p.water = cookie.water;
				p.bossKills = cookie.bossKills;
				p.inventory = cookie.inventory;
				p.partInv = cookie.partInv;
		}
	};
	
	return playerHandle;
});
