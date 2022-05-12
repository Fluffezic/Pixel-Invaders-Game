/**
 * 
 */
var intpause = setInterval(PauseCheck, 1);
var int1 = setInterval(Move, 1);
var int2 = setInterval(Shoot, 1);
var int3 = setInterval(Special, 1);
var int4 = setInterval(Bulletmove, 1);
var int5 = setInterval(EnemyBulletmove, 1);
var int6 = setInterval(Collisiondetect, 1);
var int7 = setInterval(CollisiondetectEnemy, 1);
var int8 = setInterval(Collisiondetect2, 1);
var int9 = setInterval(MoveEnemy2, 3000);
var int10 = setInterval(Enemyshoot, 1000);
var Bulletcolor = "Shot1.png"
var CustomShow = false;
var level = 0;
var Score = 0;
var Lives = 3;
var Musicon = false;
var SoundFXon = true;
var Bulletnumber = 0;
var Bulletarray = [];
var BulletPosx = [];
var BulletPosy = [];
var BulletLeft = [];
var BulletRight = [];
var EnemyBulletnumber = 0;
var EnemyBulletarray = [];
var EnemyBulletPosx = [];
var EnemyBulletPosy = [];
var Enemyarray = [];
var EnemyPosx = [];
var EnemyPosy = [];
var Enemynumber = 0;
var Enemytodelete = [];
var Enemy2array = [];
var Enemy2Posx = [];
var Enemy2Posy = [];
var Enemy2Hits = [];
var Enemy2number = 0;
var Enemy2todelete = [];
var Position = 50.00;
var Shipleft = false;
var Shipright = false;
var Shipshoot = false;
var Cooldown = false;
var Shipspecial = false
var SpecialCooldown = false;
var IsPaused = false;
var PausePress = false;
var PauseCooldown = false;
var Pxposit = Position + "%";



function onload() {
	setupInputs()
setTimeout(SetupEnemy, 500);

}
function setupInputs() {
	document.addEventListener("keydown", function(event) {
	if(event.key === "q" || event.key === "ArrowLeft" || event.key === "a"){
		Shipleft = true;
	}
	else if(event.key === "d" || event.key === "ArrowRight"){
		Shipright = true;
	}
		else if(event.key === " "){
		Shipshoot = true;
	}
			else if(event.key === "Enter"){
		Shipspecial = true;
	}
					else if(event.key === "Escape"){
		PausePress = true;
		}
		
	});
		document.addEventListener("keyup", function(event) {
	if(event.key === "q" || event.key === "ArrowLeft" || event.key === "a"){
		Shipleft = false;
	}
	else if(event.key === "d" || event.key === "ArrowRight"){
		Shipright = false;
	}
			else if(event.key === " "){
		Shipshoot = false;
	}
				else if(event.key === "Enter"){
		Shipspecial = false;
		}
						else if(event.key === "Escape"){
		PausePress = false;
	}
		
		
	});
}
function Move() {
	Pxposit = Position + "%";
	if(!Shipleft && !Shipright || Shipleft && Shipright) {
	}
	else if (Shipleft == true){
		if(Position > 2) {
			Position = Position - 0.1;
			document.getElementById("ship").style.left = Position + "%"
		}
		
	}
		else if (Shipright == true){
		if(Position < 95) {
			Position = Position + 0.1;
						document.getElementById("ship").style.left = Position + "%"
		}
		
	}
	
	
}
function Shoot(){
	if(Shipshoot == true && Cooldown == false){
		CreateBullet();
		Cooldown = true;
		setTimeout(charge, 500)
	}
	
}
function charge(){
	document.getElementById("shoottext").style.color = "white";
	Cooldown = false;
}
function CreateBullet() {
	if(SoundFXon == true) {
		document.getElementById("ShootFX").pause();
		document.getElementById("ShootFX").load();
	document.getElementById("ShootFX").play();
	}
 var img = document.createElement("img");
img.src = Bulletcolor;
document.getElementById("body").appendChild(img);
console.log("New bullet created");
img.setAttribute("style", "height: 90px; width: 30px; z-index: -1")
img.style.left = Position + 1.05 + "%";
img.style.position = "fixed";
img.style.top = "750px";
img.classList.add("bulletclass");
Bulletarray[Bulletnumber] = img;
BulletPosy[Bulletnumber] = 750;
BulletPosx[Bulletnumber] =  Position;
BulletLeft[Bulletnumber] =  false;
BulletRight[Bulletnumber] =  false;
console.log(Bulletarray[Bulletnumber])
Bulletnumber++;

}
function CreateEnemyBullet(x, y) {
	if(SoundFXon == true) {
	document.getElementById("EnemyShootFX").play();
	}
 var img = document.createElement("img");
img.src = Bulletcolor;
document.getElementById("body").appendChild(img);
console.log("New bullet created");
img.setAttribute("style", "height: 90px; width: 30px; filter: invert(100%); z-index: -1")
img.style.left = x + 0.5 + "%";
img.style.position = "fixed";
img.style.top = y + "px";
img.classList.add("bulletclass");
EnemyBulletarray[EnemyBulletnumber] = img;
EnemyBulletPosy[EnemyBulletnumber] = y;
EnemyBulletPosx[EnemyBulletnumber] =  x + 0.5;
console.log(EnemyBulletarray[EnemyBulletnumber])
EnemyBulletnumber++;

}
function Bulletmove() {
	if (Bulletnumber > 0) {
	for(var i =0; i < Bulletarray.length; i++){
		if(BulletLeft[i] == true) {
		BulletPosx[i] =BulletPosx[i] - 0.15;
		Bulletarray[i].style.left = BulletPosx[i] + "%";
		}
				if(BulletRight[i] == true) {
		BulletPosx[i] =BulletPosx[i] + 0.15;
		Bulletarray[i].style.left = BulletPosx[i] + "%";
		}
		BulletPosy[i] = BulletPosy[i] - 2;
		Bulletarray[i].style.top = BulletPosy[i] + "px";
		if (BulletPosy[i] == 0 || BulletPosx[i] < 0) {
	document.getElementById("body").removeChild(Bulletarray[i])
	Bulletarray.splice(i, 1);
	BulletPosy.splice(i, 1);
	BulletPosx.splice(i, 1);
		BulletRight.splice(i, 1);
	BulletLeft.splice(i, 1);
	Bulletnumber = Bulletnumber - 1;
		console.log(Bulletarray)

		}
		}
		
	}
	
	
	
}
function EnemyBulletmove() {
	if (EnemyBulletnumber > 0) {
	for(var i =0; i < EnemyBulletarray.length; i++){
		EnemyBulletPosy[i] = EnemyBulletPosy[i] + 2;
		EnemyBulletarray[i].style.top = EnemyBulletPosy[i] + "px";
		if (EnemyBulletPosy[i] > 900) {
	document.getElementById("body").removeChild(EnemyBulletarray[i])
	EnemyBulletarray.splice(i, 1);
	EnemyBulletPosy.splice(i, 1);
	EnemyBulletPosx.splice(i, 1);
	EnemyBulletnumber = EnemyBulletnumber - 1;
		console.log(EnemyBulletarray)

		}
		}
		
	}
	
	
	
}
function CreateEnemy() {
 var img = document.createElement("img");
img.src = "Enemy.png";
var posy = Math.floor(Math.random() * 500) + 50;
var posx = Math.floor(Math.random() * 93)+ 2;
document.getElementById("body").appendChild(img);
console.log("New Enemy created");
img.setAttribute("style", "height: 108px; width: 48px; z-index: -1")
img.style.left = posx + "%";
img.style.position = "fixed";
img.style.top = posy + "px";
img.classList.add("Enemyclass");
Enemyarray[Enemynumber] = img;
EnemyPosy[Enemynumber] = posy;
EnemyPosx[Enemynumber] =  posx;
console.log(Enemyarray[Enemynumber])
Enemynumber++;

}
function Collisiondetect() {
if (Bulletnumber > 0 && Enemynumber > 0) {
	for(var i = 0; i < Enemynumber; i++) {
		for(var j = 0; j < Bulletnumber; j++) {
		if(((BulletPosx[j]) < EnemyPosx[i] + 1.5) && ((BulletPosx[j] + 2.5)> EnemyPosx[i]) && (BulletPosy[j] < EnemyPosy[i] + 48) && ((BulletPosy[j] + 24) > EnemyPosy[i])) {
			console.log("hit registered");
			if(SoundFXon == true) {
				document.getElementById("HitEnemy").pause();
				document.getElementById("HitEnemy").load();
				document.getElementById("HitEnemy").play();
				}
				document.getElementById("body").removeChild(Bulletarray[j])
	Bulletarray.splice(j, 1);
	BulletPosy.splice(j, 1);
	BulletPosx.splice(j, 1);
	BulletRight.splice(j, 1);
	BulletLeft.splice(j, 1);
	Bulletnumber = Bulletnumber - 1;
	Enemyarray[i].src = "explosion-gif.gif"
	Enemyarray[i].style.width ="80px"
	Enemyarray[i].style.height ="130px"
	EnemyPosx[i] = EnemyPosx[i] - 1;
	Enemyarray[i].style.left = EnemyPosx[i] + "%";
	Enemytodelete.push(Enemyarray[i])
	setTimeout(Explosion, 300)
	Enemyarray.splice(i, 1);
	EnemyPosy.splice(i, 1);
	EnemyPosx.splice(i, 1);
	Enemynumber--;
 Score = Score + 200;
document.getElementById("pointcount").innerHTML = Score;
		}
		
		
	}
		
		
	}
	}

}
function Collisiondetect2() {
 if (Bulletnumber > 0 && Enemy2number > 0) {
	for(var o = 0; o < Enemy2number; o++) {
		for(var p = 0; p < Bulletnumber; p++) {
		if((BulletPosx[p] < Enemy2Posx[o] + 1.4) && (BulletPosx[p] > Enemy2Posx[o] - 1.4) && (BulletPosy[p] < Enemy2Posy[o] + 20) && (BulletPosy[p] > Enemy2Posy[o] - 25)) {
			console.log("hit registered");
			if(SoundFXon == true) {
				document.getElementById("HitEnemy").pause();
				document.getElementById("HitEnemy").load();
			document.getElementById("HitEnemy").play();
			}
				document.getElementById("body").removeChild(Bulletarray[p]);
	Bulletarray.splice(p, 1);
	BulletPosy.splice(p, 1);
	BulletPosx.splice(p, 1);
	Bulletnumber = Bulletnumber - 1;
	BulletRight.splice(p, 1);
	BulletLeft.splice(p, 1);
	Enemy2Hits[o] = Enemy2Hits[o] - 1;
	if(Enemy2Hits[o] == 2) {
		Enemy2array[o].src = "Enemy2-1.png"
		}
			else if(Enemy2Hits[o] == 1) {
			Enemy2array[o].src = "Enemy2-2.png"
		}
	else if(Enemy2Hits[o] == 0) {
		CreateEnemyBullet(Enemy2Posx[o], Enemy2Posy[o])
		Enemy2array[o].style.opacity = 1;
		console.log("enemy2 dead");
	Enemy2array[o].src = "explosion2-gif.gif"
		Enemy2array[o].style.width ="80px"
	Enemy2array[o].style.height ="130px"
	Enemy2Posx[o] = Enemy2Posx[o] - 1;
	Enemy2array[o].style.left = Enemy2Posx[o] + "%";
	Enemy2todelete.push(Enemy2array[o])
	setTimeout(Explosion2, 300)
		Enemy2array.splice(o, 1);
	Enemy2Posy.splice(o, 1);
	Enemy2Posx.splice(o, 1);
	Enemy2Hits.splice(o, 1);
	Enemy2number--;
 Score = Score + 1000;
document.getElementById("pointcount").innerHTML = Score;
}
		}
		
		
	}
		
		
	}
	}
}
function CollisiondetectEnemy() {
	if(EnemyBulletnumber > 0) {
		for(var i = 0; i < EnemyBulletnumber; i++) {
			if((EnemyBulletPosx[i] < Position + 3) &&  (EnemyBulletPosx[i] + 1.5 > Position) && (EnemyBulletPosy[i] > 800)) {
							console.log("hit registered");
							if(SoundFXon == true) {
			document.getElementById("HitShip").pause();
			document.getElementById("HitShip").load();
			document.getElementById("HitShip").play();
			}
				document.getElementById("body").removeChild(EnemyBulletarray[i])
	EnemyBulletarray.splice(i, 1);
	EnemyBulletPosy.splice(i, 1);
	EnemyBulletPosx.splice(i, 1);
	EnemyBulletnumber--;
	Lives--;
	document.getElementById("Lifecount").innerHTML = Lives;
	document.getElementById("ship").src = "explosion-gif.gif"
	setTimeout(ResetShip, 300)
	if(Lives == 0) {
			document.getElementById("Maintheme").pause();
		if(Musicon == true || SoundFXon == true) {
	document.getElementById("GameOverFX").play();
		}
	document.getElementById("GameOverScreen").style.display = "block";
	document.getElementById("GameOverText").innerHTML = "Game Over" + "<br>" + "Your score Is: " + Score + "!" + "<br>" + "Would you like to Retry?";
		setTimeout(GameOver, 100);
	}
			}
		}
	}
}
function SetupEnemy() {
CreateEnemy();
CreateEnemy();
CreateEnemy();
CreateEnemy();
CreateEnemy();
CreateEnemy();
setInterval(checkalldefeat1, 5)


	}
function Explosion() {
	document.getElementById("body").removeChild(Enemytodelete[0])
	Enemytodelete.splice(0, 1);
}
function Explosion2() {
						document.getElementById("body").removeChild(Enemy2todelete[0]);
Enemy2todelete.splice(0, 1);

	
}
function CreateEnemy2() {
 var img = document.createElement("img");
img.src = "Enemy2-0.png";
var posy = Math.floor(Math.random() * 500) + 50;
var posx = Math.floor(Math.random() * 93)+ 2;
document.getElementById("body").appendChild(img);
console.log("New Enemy2 created");
img.setAttribute("style", "height: 108px; width: 48px; z-index: -1")
img.style.left = posx + "%";
img.style.position = "fixed";
img.style.top = posy + "px";
img.classList.add("Enemy2class");
Enemy2array[Enemy2number] = img;
Enemy2Posy[Enemy2number] = posy;
Enemy2Posx[Enemy2number] =  posx;
Enemy2Hits[Enemy2number] = parseInt("3");
console.log(Enemy2array[Enemy2number]);
Enemy2number++;
}
function MoveEnemy2() {
	if (Enemy2number > 0) {
		for(var i = 0; i < Enemy2number; i++) {
			var posy = Math.floor(Math.random() * 500) + 50;
			var posx = Math.floor(Math.random() * 93)+ 2;
			Enemy2array[i].style.left = posx + "%";
			Enemy2array[i].style.top = posy + "px";
			Enemy2Posy[i] = posy;
			Enemy2Posx[i] =  posx;
		}
	}
}
function checkalldefeat1() {
	if (Enemynumber == 0 && Enemy2number == 0) {
		 Score = Score + 2000;
document.getElementById("pointcount").innerHTML = Score;
		level++;
	var random1 = Math.floor(Math.random() * 6) + (level - 1);
	var random2 = Math.floor(Math.random() * 6) + 1 + (level - 1);
	for(var i = 0; i < random1; i++) {
				CreateEnemy2()
	}
		for(var j = 0; j < random2; j++) {
				CreateEnemy()
	}
	}
}
function CreateBulletLeft() {
 var img = document.createElement("img");
img.src = Bulletcolor;
//img.height = "90px";
//img.width = "30px";
//img.top = "800px";
//img.position = "fixed";

document.getElementById("body").appendChild(img);
console.log("New bullet created");
img.setAttribute("style", "height: 90px; width: 30px;  transform: rotate(-45deg); z-index: -1")
img.style.left = (Position + 0.55) + "%";
img.style.position = "fixed";
img.style.top = "750px";
img.classList.add("bulletclass");
Bulletarray[Bulletnumber] = img;
BulletPosy[Bulletnumber] = 750;
BulletPosx[Bulletnumber] =  Position;
BulletLeft[Bulletnumber] =  true;
BulletRight[Bulletnumber] =  false;
console.log(Bulletarray[Bulletnumber])
Bulletnumber++;
}
function CreateBulletRight() {
 var img = document.createElement("img");
img.src = Bulletcolor;
//img.height = "90px";
//img.width = "30px";
//img.top = "800px";
//img.position = "fixed";

document.getElementById("body").appendChild(img);
console.log("New bullet created");
img.setAttribute("style", "height: 90px; width: 30px;  transform: rotate(45deg); z-index: -1")
var Leftbul = Position + 2.55;
img.style.left = Leftbul + "%";
img.style.position = "fixed";
img.style.top = "750px";
img.classList.add("bulletclass");
Bulletarray[Bulletnumber] = img;
BulletPosy[Bulletnumber] = 750;
BulletPosx[Bulletnumber] =  Position + 2.55;
BulletLeft[Bulletnumber] =  false;
BulletRight[Bulletnumber] =  true;
console.log(Bulletarray[Bulletnumber])
Bulletnumber++;
}
function Special() {
	if(Shipspecial == true && SpecialCooldown == false) {
		CreateBulletRight()
		CreateBulletLeft()
		CreateBullet()
		setTimeout(Specialrepeat, 250)
				setTimeout(Specialrepeat, 500)
						setTimeout(Specialrepeat, 750)
								setTimeout(Specialrepeat, 1000)
		SpecialCooldown = true;
		setTimeout(ResetSpecial, 10000)
				Cooldown = true;
		setTimeout(charge, 1500)
		document.getElementById("shoottext").style.color = "red";
		document.getElementById("specialtext").style.color = "red";
	}
	
}
function ResetSpecial() {
	SpecialCooldown = false;
	document.getElementById("specialtext").style.color = "white";
}
function Specialrepeat() {
			CreateBulletRight()
		CreateBulletLeft()
		CreateBullet()
}
function togglemain() {
	if(Musicon == false) {
	document.getElementById("Maintheme").load();
	document.getElementById("Maintheme").play();
	Musicon = true;
	document.getElementById("musicbutton").innerHTML = "Turn Music Off";
	}
	else {
	document.getElementById("Maintheme").pause();
		Musicon = false;
		document.getElementById("musicbutton").innerHTML = "Turn Music On";
	}
	
}
function Enemyshoot() {
	if(Enemynumber > 0) {
	var enemyselect = Math.floor(Math.random() * Enemynumber);
	CreateEnemyBullet(EnemyPosx[enemyselect], EnemyPosy[enemyselect]);
}
}
function ResetShip() {
	document.getElementById("ship").src = "Char.png";
}
function GameOver() {

	Musicon = false;
	clearInterval(int1);
	clearInterval(int2);
	clearInterval(int3);
	clearInterval(int4);
	clearInterval(int5);
	clearInterval(int6);
	clearInterval(int7);
	clearInterval(int8);
	clearInterval(int9);
	clearInterval(int10);
}
function GameOverretry() {
		 if (confirm("Game Over. Your Score is; " + Score + "     would you like to retry?")) {
    document.location.reload(true);
  } else {
	GameOverretry();
    
  }
}
function ToggleFX() {
	if(SoundFXon == true) {
		SoundFXon = false;
		document.getElementById("SoundButton").innerHTML = "Turn FX On";
	}
		else if(SoundFXon == false) {
		SoundFXon = true;
		document.getElementById("SoundButton").innerHTML = "Turn FX Off";
	}
}
function Changebulletcolor(){
	var selected = document.getElementById("Bulletcolorid").value;
	if(selected == 1) {
		Bulletcolor = "Shot1.png"
	}
		else if(selected == 2) {
		Bulletcolor = "Shot2.png"
	}
}
function Retry() {
	location.reload();
}
function ToggleCustom() {
	if(CustomShow == false) {
		document.getElementById("CustomOptions").style.display = "block";
		document.getElementById("CustomMenuText").innerHTML = "Customization Menu-"
		CustomShow = true;
	}
		else if(CustomShow == true) {
		document.getElementById("CustomOptions").style.display = "none";
		document.getElementById("CustomMenuText").innerHTML = "Customization Menu+"
		CustomShow = false;
	}
}
function PauseCheck() {
	if(PausePress == true && PauseCooldown == false) {
		PauseGame();
		setTimeout(PauseCooldownEnd, 250);
		PauseCooldown = true;
	}
}
function PauseCooldownEnd() {
	PauseCooldown = false
}
function PauseGame() {
	if(IsPaused == false) {
		IsPaused = true;
	clearInterval(int1);
	clearInterval(int2);
	clearInterval(int3);
	clearInterval(int4);
	clearInterval(int5);
	clearInterval(int6);
	clearInterval(int7);
	clearInterval(int8);
	clearInterval(int9);
	clearInterval(int10);
		document.getElementById("PauseScreen").style.display = "block";
		
	}
	else if(IsPaused == true) {
		IsPaused = false;
		int1 = setInterval(Move, 1);
		int2 = setInterval(Shoot, 1);
		int3 = setInterval(Special, 1);
		 int4 = setInterval(Bulletmove, 1);
 		int5 = setInterval(EnemyBulletmove, 1);
		int6 = setInterval(Collisiondetect, 1);
 		int7 = setInterval(CollisiondetectEnemy, 1);
		 int8 = setInterval(Collisiondetect2, 1);
		 int9 = setInterval(MoveEnemy2, 3000);
		 int10 = setInterval(Enemyshoot, 1000);
	document.getElementById("PauseScreen").style.display = "none";
		
	}
}
