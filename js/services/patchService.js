app.factory('patchService', function () {
	var patches = [
		{
			patchNo: '0.0.3',
			notes: ['Rebalanced Classes to have lower starting stats, All classes are based around a starting 8 point buy.', 'Added Shaman Class', 'Added in new inventory system with 3 equip slots and 2 bag slots', 'Added Item generation with stats and rarities', 'Added Event Tracker', 'Redesigned Game Page with more mobile friendly css', 'New modal system for death/inventory/stats','Introduced a Weapon Shop that allows you to buy one weapon. You may buy more after a time.','Increased Exponential Experience, Reduced extra Skill Points to +1 per 10 levels'],
			date: new Date("August 4, 2015 1:08:00")
		},
		{
			patchNo: '0.0.2D',
			notes: ['Town and basic shop system', 'Hunger and Thirst mechanics tied to Health and Mana Regen', 'Added Food, Water and Carry Weight to player', 'Gold now gained on kills', 'Save system updated to allow for 5 saves'],
			date: new Date("July 27, 2015 5:30:00")
		},
		{
			patchNo: '0.0.2C',
			notes: ['Implemented Save system'],
			date: new Date("July 25, 2015 9:32:00")
		}, 
		{
			patchNo: '0.0.2B',
			notes: ['Leveling system is now experience based', 'Added new scaling skill points', 'Boss kills now grant 1 skill point', 'Added Boss Kill tracker'],
			date: new Date("July 23, 2015 10:26:00")
		},
		{
			patchNo: '0.0.2A',
			notes: ['More CSS tweaks', '"Background" Mode', 'Added Zones and Zone progression', 'New enemy generation based on Zone', 'Zone Specific bosses, that spawn after a short time', 'New moving backgrounds(placeholder)'],
			date: new Date("July 22, 2015 2:52:00")
		},
		{
			patchNo: '0.0.1C',
			notes: ['New device friendly Icons', 'New Class Creation with basic Preview', 'Small CSS tweaks', 'Removed "long" dongers'],
			date: new Date("July 21, 2015 2:52:00")
		},
		{
			patchNo: '0.0.1B',
			notes: ['Added patch system', 'Changed class creation to toggle', 'Creation without class selection now prohibited', 'Added "Schoobs" class to replace default "John"'],
			date: new Date("July 20, 2015 9:26:00")
		},
		{
			patchNo: '0.0.1A',
			notes: ['Added fight generation ',' Added Auto Fighting ','Added Health Regeneration ','Added level tracking','Added Basic combat mechanic'],
			date: new Date("July 11, 2015 11:13:00")
		}
	];
 
	return patches;
});
