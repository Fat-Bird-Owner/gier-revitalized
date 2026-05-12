const stats = Require("Stats");
const blocks = [
"gr-combustion-barrel"
];

Events.on(EventType.BlockDestroyEvent, event => {
try {

for (let i = 0; i < blocks.length; i++){
const block = Vars.content.block(blocks[i]);
Vars.ui.content.show(block);
Vars.ui.content.hide();

block.stats.add(stats.blastPower, block.attributes.get(Attribute.get("blastPower")));
block.stats.add(stats.blastTier, block.attributes.get(Attribute.get("blastTier"))); 
  
} catch(e){
Vars.ui.showInfoToast(e + "[red] - CombustionBarrel", 5);
}
});


Events.on(EventType.BlockDestroyEvent, event => {
try {
const tile = event.tile;
let found = false;
  
for (let i = 0; i < blocks.length; i++){
if (tile.block() != block) found = true;
}

if (!found) return;
if (tile.overlay() == null || tile.overlay().itemDrop == null) return;
  
const {itemDrop} = tile.overlay();
const core = tile.build.team.core();
  
const {hardness} = itemDrop;
const {block} = tile.block()
let oreHardness = hardness;
if (oreHardness == 0) oreHardness = 1;
  
const amount = block.attributes.get(Attribute.get("blastPower")) / Math.max(oreHardness - block.attributes.get(Attribute.get("blastTier")), oreHardness);
  
let offset = 0;
let len = 0;
  
for (let i = 0; i < 3; i++){
core.items.add(itemDrop, amount);
const fx = Object.assign(new ParticleEffect() , {
sizeFrom: 3,
sizeTo: 0,
region: itemDrop.uiIcon,
particles: Mathf.round(amount - i) / 4,
lifetime: 130,
length: 12 + len,
layer: 21,
spin: Mathf.random(0.05, 0.1),
colorTo: Color.valueOf("ffffff"),
colorFrom: Color.valueOf("ffffff"),
offset: offset,
sizeInterp: Interp.pow10In,
interp: Interp.pow10Out
});

fx.at(tile.worldx(), tile.worldy());
offset += Mathf.random(25, 35);
len += Mathf.random(2, 4.5);
}
  
} catch(e){
Vars.ui.showInfoToast(e + "[red] - CombustionBarrel", 5);
}
});
