const statUnit = require("StatUnits");
const stat = require("Stats");
let observerActivations = 0;
let circuitActivations = 0;
let time = 0;
let builds = null;

const blocks = [
"gr-circuit-wire",
"gr-circuit-splitter",
"gr-power-cell",
"gr-circuit-timer",
"gr-signal",
"gr-signal-detector",
"gr-piston",
"gr-observer"
];

const other = [
"gr-power-cell",
"gr-circuit-splitter",
"gr-circuit-timer",
"gr-signal-detector",
"gr-piston",
"gr-observer"
];

function runCircuit(startTile){
try{
  
if(!startTile || !startTile.build) return;

const wireBlock = Vars.content.block("gr-circuit-wire");

let heating = [];
let distance = 0;

const range = startTile.block().attributes.get(Attribute.get("circuitRange"));
  
function nearby(build){
try{
if(!build || !build.build || !build.block().rotate || build.block().size > 1 || Vars.state.isPaused() || !Vars.state.isPlaying())
return;

const frontBuild = build.nearbyBuild(build.build.rotation);

if(!frontBuild || !frontBuild.block) return;

let found = false;
let index = -1;

for(let i = 0; i < other.length; i++){
if(frontBuild.block.name == other[i]){
found = true;
index = i;
break;
}}

if(frontBuild.block != wireBlock && !found) return;
if (circuitActivations >= 7){
Time.runTask(0.1 * 60, () => {nearby(build)});
return;
}
  
distance++;

const block = frontBuild.block;
let baseTimer = 1;

const circuitRate = block.attributes.get(Attribute.get("circuitRate")) || 1;
const circuitHeatingDamage = block.attributes.get(Attribute.get("circuitHeatDamage")) || 0;

for(let i = 0; i < heating.length; i++){
if(heating[i] == frontBuild){
frontBuild.damage(circuitHeatingDamage);
heating.splice(i,1);
Fx.turbinegenerate.at(frontBuild.x, frontBuild.y);
return;
}}

heating.push(frontBuild);

if(distance > range) return;

Fx.absorb.at(frontBuild.x, frontBuild.y);
circuitActivations++;

if(found){

if(index == 0){
if(!frontBuild.power || !frontBuild.power.graph || frontBuild.power.graph.getBatteryStored() < 45) return;

frontBuild.power.graph.transferPower(-45);

frontBuild.block.configureSound.at(frontBuild.x, frontBuild.y);
Fx.generate.at(frontBuild.x, frontBuild.y);
  
Sounds.shootPulsar.at(frontBuild.x, frontBuild.y);

Lightning.create(
frontBuild.team,
frontBuild.team.color,
35,
frontBuild.x,
frontBuild.y,
Mathf.random(360),
25
);

return;
}

else if(index == 2){
const number = Number(frontBuild.message.toString());

if(number){
baseTimer = Mathf.clamp(number, 1/circuitRate, 15) * circuitRate;
}} else if(index == 3){
  
const msg = frontBuild.message;
msg.setLength(0);
msg.append(String(distance));
  
} else if(index == 4){

const maxPush = block.attributes.get(Attribute.get("pistonPushLength")) || 1;

let chain = [];
let currentTile = frontBuild.tile.nearby(frontBuild.rotation);

for(let i = 0; i < maxPush; i++){

if(!currentTile) return;

if(!currentTile.build) break;

if(currentTile.solid() && !currentTile.build) return;
if (currentTile.block().size > frontBuild.block.size) return;

chain.push(currentTile);

currentTile = currentTile.nearby(frontBuild.rotation);
}

if(!currentTile) return;
if(currentTile.build) return;
if(currentTile.solid()) return;

for(let i = chain.length - 1; i >= 0; i--){

const fromTile = chain[i];
const toTile = fromTile.nearby(frontBuild.rotation);

if(!fromTile || !fromTile.build || !toTile) continue;

const movingBuild = fromTile.build;
const fx = new ParticleEffect();
Object.assign(fx, {
length: 8,
cone: 0,
sizeFrom: movingBuild.block.size * 4,
sizeTo: movingBuild.block.size * 4,
colorFrom: Color.valueOf("ffffff00"),
colorTo: Color.valueOf("ffffff"),
region: movingBuild.block.uiIcon,
offset: frontBuild.rotation * 90 - 90,
layer: 30,
randLength: false,
lifetime: 5
});

if (movingBuild){
fx.at(
movingBuild.x,
movingBuild.y,
frontBuild.rotation * 90
);
}
Sounds.unitCreate.at(movingBuild.x, movingBuild.y);
toTile.setBlock(
movingBuild.block,
movingBuild.team,
movingBuild.rotation
);

for(let k in movingBuild){
try{
if(
typeof movingBuild[k] != "function" &&
k != "tile" &&
k != "x" &&
k != "y" &&
k != "proximity" &&
k != "team" &&
k != "object"
){
toTile.build[k] = movingBuild[k];
}
}catch(e){}
}

fromTile.setAir();
//Events.fire(new EventType.TileChangeEvent(toTile));
  
Fx.placeBlock.at(
toTile.worldx(),
toTile.worldy(),
movingBuild.block.size
);
}

return;
}
  
}

Time.run((baseTimer/circuitRate) * 60, () => {
try{
if(!frontBuild || !frontBuild.isValid() || Vars.state.isPaused() || !Vars.state.isPlaying()) return;

nearby(frontBuild.tile);

if(index == 1){
const left = frontBuild.left();
const right = frontBuild.right();

if(left && left.isValid()) nearby(left.tile);
if(right && right.isValid()) nearby(right.tile);
}

}catch(e){
Vars.ui.showInfoToast(String(e) + "[red] - propagation", 5);
}});
}catch(e){
Vars.ui.showInfoToast(String(e) + "[red] - nearby", 5);
}}

Fx.generate.at(startTile.worldx(), startTile.worldy());
startTile.block().configureSound.at(startTile.worldx(), startTile.worldy());

nearby(startTile);

}catch(e){
Vars.ui.showInfoToast(String(e) + "[red] - runCircuit", 5);
}}

Events.on(ClientLoadEvent, () => {
try{
for(let i = 0; i < blocks.length; i++){
const block = Vars.content.block(blocks[i]);
  
Vars.ui.content.show(block);
Vars.ui.content.hide();

const rate = block.attributes.get(Attribute.get("circuitRate"));
const heatDamage = block.attributes.get(Attribute.get("circuitHeatDamage"));
const circuitRange = block.attributes.get(Attribute.get("circuitRange"));
const pistonPushLength = block.attributes.get(Attribute.get("pistonPushLength"));
  
block.databaseTag = "circuit-logic";

block.stats.remove(stat.CircuitRate);

if(rate) block.stats.add(stat.CircuitRate, rate, statUnit.circuitUnit);
if(heatDamage) block.stats.add(stat.CircuitHeatDamage, heatDamage);
if(circuitRange) block.stats.add(stat.CircuitRange, circuitRange, statUnit.circuitRange);
if (pistonPushLength) block.stats.add(stat.PistonPushLength, pistonPushLength, StatUnit.blocks);

block.replaceable = false;
if (blocks[i] != "gr-signal"){
let node = new TechTree.TechNode(Vars.content.block("gr-signal") , block, block.requirements)
}
  
}
}catch(e){
Vars.ui.showText("CircuitLogic", String(e));
}});



Events.on(TapEvent, event => {
try{
  
if(!event.tile || !event.tile.build || !event.player || event.player.team() != event.tile.build.team) return;

if (event.tile.block() != Vars.content.block("gr-signal")) return;
  
  runCircuit(event.tile);
  
} catch(e){
Vars.ui.showInfoToast(String(e) + "[red] - TapEvent", 5);
}
});


// Observer
Events.on(TileChangeEvent, event => {
try {

const {tile} = event;
const block = Vars.content.block(other[5]);
const {build} = tile;

if (!build || !block || !tile) return;
if (time >= 60){
builds = Groups.build.copy().select(b => b.block == block);
time = 0;
}
  
builds.each(b => {
try {
Time.run(1, () => {
  
if (b.block == block && b.isValid()){

let ro = 0;
if (b.rotation == 0) ro = 2;
else if (b.rotation == 1) ro = 3;
else if (b.rotation == 2) ro = 0;
else ro = 1;
  
if (b.tile.nearby(ro) == tile) {
  
if (observerActivations >= 4) {
Time.runTask(0.1 * 60, () => {runCircuit(b.tile)});
} else {
runCircuit(b.tile);
}

observerActivations++;

Fx.generate.at(b.tile.nearby(b.rotation).worldx(), b.tile.nearby(b.rotation).worldy());
}
  
}});

} catch(e){
Vars.ui.showInfoToast(e + "[red] - CircuitLogic - Observer - Repeat Loop", 5);
}
});

} catch(e){
Vars.ui.showInfoToast(e + "[red] - CircuitLogic - Observer", 5);
}
});

Events.run(Trigger.update, () => {
try {
  
observerActivations = 0;
circuitActivations = 0;
time += Time.delta; 
  
} catch(e){
Vars.ui.showInfoToast(e, 5);  
}});

/*
Events.on(BuildDamageEvent, e => {
try{
const build = e.build;
const source = e.source;
const blockSignal = Vars.content.block("gr-damage-signal");

if(!build || !build.team) return;

let found = false;

Vars.indexer.eachBlock(
build.team,
build.x,
build.y,
10 * Vars.tilesize,

boolf(b => b.block == blockSignal),

cons(b => {
found = true;
runCircuit(b.tile);
})
);

}catch(err){
Vars.ui.showInfoToast(
String(err) + "[red] - CircuitLogic - DamageSignal",
5
);
}});
*/
