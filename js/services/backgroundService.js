app.factory('backgroundService', function () {
	//(name, title, level, maxHealth, maxMana, attack, defense, healthRegen, manaRegen, armorPen, skillPoint)
  var backgrounds =  [
		{
			name: 'Green Forest',
			available: true,
			background: 'http://i.imgur.com/3N0WPfx.gif',
			levelMin: 1,
			levelMax: 9,
			expGain: 10,
			kills: 0,
			reqKills: 20,
			materials: ['Tin','Gallium','Lead'],
			boss: 'Green Slime'
		},{
			name: 'Spirit Tree',
			available: false,
			background:'http://i.imgur.com/NW0mK39.gif',
			levelMin: 10,
			levelMax: 19,
			expGain: 30,
			kills: 0,
			reqKills: 20,
			materials: ['Bronze', 'Silver', 'Aluminum'],
			boss: 'Lost Girl'
		},{
			name: 'Ruined Town',
			available: false,
			background:'http://i.imgur.com/4003cn5.gif',
			levelMin: 20,
			levelMax: 29,
			expGain: 60,
			kills: 0,
			reqKills: 20,
			materials: ['Gold','Iron','Thorium'],
			boss: 'Weakly Old Man'
		},{
			name: 'Waterfall',
			available: false,
			background:'http://i.imgur.com/gkKviRB.gif',
			levelMin: 30,
			levelMax: 39,
			expGain: 120,
			kills: 0,
			reqKills: 20,
			materials: ['Platinum','Nickel', 'Steel'],
			boss: 'George Washington'
		},{
			name: 'Stairs of Ascension',
			available: false,
			background:'http://i.imgur.com/OACf5cL.gif',
			levelMin: 40,
			levelMax: 49,
			expGain: 240,
			kills: 0,
			reqKills: 20,
			materials: ['Beryllium', 'Glass', 'Cobalt'],
			boss: 'Shiva'
		},{
			name: 'Temple of Xenmai',
			available: false,
			background:'http://i.imgur.com/5zYBvoG.gif',
			levelMin: 50,
			levelMax: 59,
			expGain: 480,
			kills: 0,
			reqKills: 20,
			materials: ['Uranium', 'Pyrite','Tantalum'],
			boss: 'Mecha Shiva'
		},{
			name: 'Desert',
			available: false,
			background:'http://i.imgur.com/HfCURPU.gif',
			levelMin: 60,
			levelMax: 69,
			expGain: 960,
			kills: 0,
			reqKills: 20,
			materials: ['Hardened Steel','Tungsten','Chromium'],
			boss: 'King George III'
		},{
			name: 'Portal to Hell',
			available: false,
			background:'http://i.imgur.com/tjVOWZY.gif',
			levelMin: 70,
			levelMax: 89,
			expGain: 1920,
			kills: 0,
			reqKills: 20,
			materials: ['Titanium Carbide','Stishovite','Diamond'],
			boss: 'Mecha George Washington'
		}
	];
	
	return backgrounds;
});
