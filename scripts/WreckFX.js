Events.on(BlockDestroyEvent, e => {
try{ 
if (!Core.settings.getBool("wreckEnabled")) return;
  
const tile = e.tile;
const block = tile.block();
const build = tile.build;

if (!build || !build.x || !build.y || !build.team || !build.team.color || !build.block.createRubble) return;
  
const particle = new ParticleEffect();
Object.assign(particle, {
particles: 1,
cone: 0,
cap: false,
layer: 22,
length: 0,
lifetime: 600,
colorTo: Color.valueOf("00000000"),
colorFrom: Color.valueOf("9f9f9f"),
interp: Interp.sineIn,
clip: 1000,
lightScl: 0
});

var rotation = 0;
if (block instanceof BaseTurret){
rotation = build.rotation + -90;
} else if (!block.rotate){
rotation = 0;
} else {
rotation = build.rotation * 90;
}

const baseLength = Mathf.random(-5,5);
const offset = Mathf.random(-45,45) + rotation;

if (block.underBullets) particle.layer -= 2;

particle.region = block.region;
if (block instanceof Turret || block.rotate == true || block instanceof Drill) particle.region = block.fullIcon;
else if (block.region == Core.atlas.find("error")) particle.region = block.fullIcon;
  
particle.sizeFrom = particle.sizeTo = block.size * 3.95;
particle.lifetime = Mathf.random(300,3000);
particle.baseLength = baseLength;
particle.offset = offset;
particle.randLength = false;
  
const regionT = block.teamRegion;
if (regionT != Core.atlas.find("error")){
const teamEffect = new ParticleEffect();

for (let k in particle){
try{
let val = particle[k];

if(typeof val !== "function" && k != "class"){
teamEffect[k] = val;
}

}catch(e){
Vars.ui.showInfoToast(e + "[red] - WreckFX", 5);
}}

const base = build.team.color.cpy();
teamEffect.layer += 0.01;
teamEffect.region = regionT;
teamEffect.colorFrom = base.cpy().mul(0.6, 0.6, 0.6, 1);
teamEffect.baseLength = baseLength;
teamEffect.offset = offset;
teamEffect.colorTo = base.cpy().mul(0, 0, 0, 0);
teamEffect.at(build.x, build.y);
}
particle.at(build.x, build.y);
  
} catch(e){
Vars.ui.showInfoToast(e + "[red] - WreckFX",5); 
}});


Events.on(UnitDestroyEvent, e => {
try{ 
if (!Core.settings.getBool("unitWreckEnabled")) return;
  
const unit = e.unit;
const type = unit.type;
if (type instanceof MissileUnitType) return;
  
const particle = new ParticleEffect();
Object.assign(particle, {
particles: 1,
cone: 5,
cap: false,
layer: 23,
length: 0.1,
lifetime: 600,
colorTo: Color.valueOf("00000000"),
colorFrom: Color.valueOf("2b2b2bff"),
interp: Interp.sineIn,
clip: 1000,
randLength: false,
lightScl: 0
});
  
var region = type.region;
if (Mathf.random(0,2) >= 1){
region = type.fullIcon;
}
  
particle.region = region;
particle.sizeFrom = particle.sizeTo = ((region.width + region.height) / 2.5) / 8;
particle.lifetime = Mathf.random(300,3000);
particle.baseLength = Mathf.random(-8, 8);
particle.offset = Mathf.random(-25, 25) + (unit.rotation) + -90;

if (unit.flying) {
particle.layer += 3.5;
}

const regionT = type.cellRegion;
if (type.drawCell == true && type.drawCell && regionT != Core.atlas.find("error")){
const teamEffect = new ParticleEffect();

for (let k in particle){
try{
let val = particle[k];

if(typeof val !== "function" && k != "class"){
teamEffect[k] = val;
}

}catch(e){
Vars.ui.showInfoToast(e + "[red] - WreckFX", 5);
}}

const base = Team.derelict.color.cpy();
teamEffect.layer += 0.01;
teamEffect.region = regionT;
teamEffect.colorFrom = base.cpy().mul(0.2, 0.2, 0.2, 1);
teamEffect.baseLength = particle.baseLength;
teamEffect.offset = particle.offset;
teamEffect.colorTo = base.cpy().mul(0, 0, 0, 0);
teamEffect.at(unit.x, unit.y);
} 

if (type.drawBody){
particle.at(unit.x, unit.y);
}
  
} catch(e){
Vars.ui.showInfoToast(e,5); 
}});
