function loadGame(){
	var num = 0,
		fight = 0,
		enemyPos = [],
		checkCol = false,
		canFight = true,
		inBattle = false;
	
	var canvas = document.getElementById("game-canvas");
	var renderer = new PIXI.autoDetectRenderer(800,600,{view:canvas, backgroundColor: 0x1099bb});
	
	
var stage = new PIXI.Container();
//Sprite
var ground = PIXI.Sprite.fromImage('img/ground.png');
//Cloud Sprites
var cloud1 = PIXI.Sprite.fromImage('img/scene/cloud1.png');
var cloud2 = PIXI.Sprite.fromImage('img/scene/cloud2.png');
var cloud3 = PIXI.Sprite.fromImage('img/scene/cloud3.png');
var cloud4 = PIXI.Sprite.fromImage('img/scene/cloud4.png');
var cloud5 = PIXI.Sprite.fromImage('img/scene/cloud5.png');
//Set Position


var fightPanelContainer = new PIXI.Container();
var fightContainer = new PIXI.Container();

fightContainer.width = 800;
fightContainer.height = 600;

// create a texture from an image path
var texture = PIXI.Texture.fromImage('img/button.png');
var player = PIXI.Sprite.fromImage('img/pc/vendor.png');
var orc = PIXI.Texture.fromImage('img/pc/orc.png');
//cloud anchors
cloud1.anchor.set(0.5,0.5);
cloud2.anchor.set(0.5,0.5);
cloud3.anchor.set(0.5,0.5);
cloud4.anchor.set(0.5,0.5);
cloud5.anchor.set(0.5,0.5);


cloud3.position.set(450,75);
cloud1.position.set(0,120);
cloud5.position.set(710,175);
cloud2.position.set(800,200);
cloud4.position.set(260,250);

function ranCloud(cloud){
	var ranY = Math.floor(Math.random() * (300-25))+25;
	
	cloud.position.y = ranY;
}

cancelAnimationFrame(animate);
//Add Children
stage.addChild(ground);
stage.addChild(fightContainer);
//Add Clouds

stage.addChild(cloud3);
stage.addChild(cloud1);
stage.addChild(cloud5);
stage.addChild(cloud2);
stage.addChild(cloud4);

// start animating
collision();
animate();
function animate() {
    requestAnimationFrame(animate);
    // Switch for the Current Container
		cloud1.position.x += .2;
		cloud2.position.x -= .3;
		cloud3.position.x -= .25;
		cloud4.position.x += .4;
		cloud5.position.x -= .1;
	
		if (cloud1.position.x >= 850){
			ranCloud(cloud1);
			cloud1.position.x = -50;	
		}	
		if (cloud2.position.x <= -70){
			ranCloud(cloud2);
			cloud2.position.x = 870;	
		}
		if (cloud3.position.x <= -70){
			ranCloud(cloud3);
			cloud3.position.x = 870;	
		}
		if (cloud4.position.x >= 870){
			ranCloud(cloud4);
			cloud4.position.x = -70;	
		}
		if (cloud5.position.x <= -70){
			ranCloud(cloud5);
			cloud5.position.x = 870;	
		}
    // render the container
    renderer.render(stage);
}
	

// create the root of the scene graph

// create a new Sprite using the texture

//Set Stage
//Fight Panel Container
//Functions
	//Add player to Scene
this.createPlayer = function(){
	player.anchor.set(.5,.5);
	player.position.set(-58, 430);
	fightContainer.addChild(player);
	checkCol = true;
}


//Spawn Battles (number of battles wanted)
this.battle = function(enemyArray){
	for (var i = fightContainer.children.length - 1; i >= 0; i--) {
		fightContainer.removeChild(fightContainer.children[i]);
	};
	enemyPos = [];
	var num = enemyArray.length;
	var xPos = 740/num;
	for (i = 1; i <= num; i++){
		var name = 'orc'+i;
		orcs = new PIXI.Sprite(orc);
		orcs.anchor.set(.5, .5);
		orcs.scale.x = -1;
		orcs.position.set(Math.floor(xPos*i), 430);
		fightContainer.addChild(orcs);
		enemyPos.push({
			id: orcs,
			creature: name,
			position: orcs.position.x})
	};
}

this.nextFight = function(){
	fightContainer.removeChild(enemyPos[0].id);
	enemyPos.splice(0,1);
	canFight = true;
	checkCol = true;
	inBattle = false;	
}
//Check for Collisions
function collision(){
	requestAnimationFrame(collision);
	if (player.position.x > 840){
		fightContainer.removeChild(player);	
	}
	
	if (checkCol){
		if (enemyPos.length > 0){
			var xCol = enemyPos[0].position || 0;
			player.position.x += 1;
		} else {
			player.position.x += 1;	
		}
		
		if (player.position.x == xCol-58){
			inBattle = true;
			checkCol = false;
			fightPanelContainer.alpha = 1;
		};
	} else if (inBattle) {
		if (canFight){
			angular.element(document.getElementById('gameCtrl')).scope().handleFight();
			canFight = false;
		}
	}
}

}